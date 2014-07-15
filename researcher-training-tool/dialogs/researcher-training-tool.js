(function() {
// get plugin paths
var h = CKEDITOR.plugins.get('researcher-training-tool');
var path = h.path;

// load css and javascript files
CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(h.path + 'css/dialog.css'));
CKEDITOR.scriptLoader.load(path + '/js/skills.js');

// method for getting values from a multi-select field
var getValues = function(dialog) {
  // get the options from the dialog's input element
  var select = element.getInputElement();
  var selectedOptions = select.$.selectedOptions;
  var values = [];

  // add values to array
  for (i = 0; i < selectedOptions.length; i++) {
    values.push(selectedOptions[i]);
  }

  return values;
}

// register dialog
CKEDITOR.dialog.add('researcherTrainingToolDialog', function(editor) {
  return {
    title: 'Embed Researcher Training Tool Listing',
    minWidth: 350,
    minHeight: 200,

    contents: [
      {
        // selection criteria
        id: 'selection-criteria',
        label: 'Selection Criteria',
        elements: [
          {
            type: 'text',
            id: 'provided-by',
            label: 'Provided By',
            setup: function(element) {
              this.setValue(element.getAttribute('data-providedBy'));
            },
            commit: function(element) {
              element.setAttribute('data-providedBy', this.getValue());
            }
          },
          {
            type: 'text',
            id: 'starting-after',
            label: 'Starting After',
            setup: function(element) {
              this.setValue(element.getAttribute('data-startingAfter'));
            },
            commit: function(element) {
              element.setAttribute('data-startingAfter', this.getValue());
            }
          },
          {
            type: 'text',
            id: 'starting-before',
            label: 'Starting Before',
            setup: function(element) {
              this.setValue(element.getAttribute('data-startingBefore'));
            },
            commit: function(element) {
              element.setAttribute('data-startingBefore', this.getValue());
            }
          },
          {
            type: 'select',
            id: 'skill',
            label: 'Skill',
            items: skillCodes,
            setup: function(element) {
              this.setValue(element.getAttribute('data-skill'));
            },
            commit: function(element) {
              element.setAttribute('data-skill', this.getValue());
            }
          },
          {
            type: 'select',
            id: 'research-method',
            label: 'Research Method',
            items: [
              ['Qualitative', 'qualitative'],
              ['Quantitative', 'quantitative'],
            ],
            setup: function(element) {
              this.setValue(element.getAttribute('data-researchMethod'));
            },
            commit: function(element) {
              element.setAttribute('data-researchMethod', this.getValue());
            }
          },
          {
            type: 'select',
            id: 'eligibility',
            label: 'Eligibility',
            className: 'select_multiple',
            multiple: true,
            items: [
              ['Staff', 'ST'],
              ['Members of the University', 'OX'],
              ['Public', 'PU'],
            ],
            setup: function(element) {
              this.setValue(element.getAttribute('data-eligibility'));
            },
            commit: function(element) {
              element.setAttribute('data-eligibility', this.getValue());
            }
          }
        ]
      },
      {
        // display settings
        id: 'display-settings',
        label: 'Display Settings',
        elements: [
          {
            type: 'select',
            id: 'display-columns',
            label: 'Columns to display',
            className: 'select_multiple',
            multiple: true,
            items: [
              ['Start', 'start'],
              ['Title', 'title'],
              ['Subject', 'subject'],
              ['Provider', 'provider'],
              ['Description', 'description'],
              ['Venue', 'venue'],
              ['Eligibility', 'venue'],
            ],
            setup: function(element) {
              this.setValue(element.getAttribute('data-displayColumns'));
            },
            commit: function(element) {
              var values = getValues(this);
              element.setAttribute('data-displayColumns', values.join(' '));
            }
          },
          {
            type: 'text',
            id: 'title',
            label: 'Title',
            setup: function(element) {
              this.setValue(element.getAttribute('data-title'));
            },
            commit: function(element) {
              element.setAttribute('data-title', this.getValue());
            }
          },
          {
            type: 'checkbox',
            id: 'show-without-dates-link',
            label: 'Show without dates link?',
            setup: function(element) {
              this.setValue(element.getAttribute('data-showWithoutDatesLink') == 'true');
            },
            commit: function(element) {
              element.setAttribute('data-showWithoutDatesLink', this.getValue());
            }
          },
          {
            type: 'select',
            id: 'default-dates-view',
            label: 'Default dates view',
            items: [
              ['With Dates', 'withDates'],
              ['Wihout Dates', 'withoutDates'],
            ],
            setup: function(element) {
              this.setValue(element.getAttribute('data-defaultDatesView'));
            },
            commit: function(element) {
              element.setAttribute('data-defaultDatesView', this.getValue());
            }
          }
        ]
      },
      {
        // preview
        id: 'preview',
        label: 'Preview',
        elements: [
          // fields
        ]
      }
    ],

    onLoad: function() {
      // fired when dialog loads for first time
    },

    onShow: function() {
      var selection = editor.getSelection();
      var element = selection.getStartElement();
      if (element)
        element = element.getAscendant('div', true);

      if (!element || element.getName() != 'div' || !element.hasClass('courses-widget-container')) {
        element = editor.document.createElement('div');
        element.addClass('courses-widget-container');

        this.insertMode = true;
      }
      else
        this.insertMode = false;

      this.element = element;

      if (!this.insertMode)
        this.setupContent(this.element);
    },

    onOk: function() {
      var dialog = this;
      var div = this.element;

      this.commitContent(div);

      if (this.insertMode)
        editor.insertElement(div);
    }
  };
});
})();
