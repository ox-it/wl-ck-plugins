(function() {
// get plugin paths
var h = CKEDITOR.plugins.get('researcher-training-tool');
var path = h.path;

// load css and javascript files
if (!$.browser)         // fix for $.browser being undefined in jQuery 1.9+
  CKEDITOR.scriptLoader.load('http://code.jquery.com/jquery-migrate-1.2.1.js');
if (!$.fn.autocomplete) // fix in case the ui library hasn't loaded yet
  CKEDITOR.scriptLoader.load('https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.22/jquery-ui.min.js');

CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(h.path + 'css/dialog.css'));
CKEDITOR.scriptLoader.load(path + '/js/oxpoints-autocomplete.js');
CKEDITOR.scriptLoader.load(path + '/js/skills.js');
CKEDITOR.scriptLoader.load(path + '/js/select-multiple-values.js');

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
            className: 'oxpoint_autocomplete',
            onLoad: function() {
              var input = $('.oxpoint_autocomplete input');
              input.oxPointsAutoComplete({
                select: function(event, ui) {
                  input.attr('data-uri', ui.item.uri);
                  input.attr('data-name', input.val());
                }
              });
            },
            setup: function(element) {
              this.setValue(element.getAttribute('data-providedBy'));
            },
            commit: function(element) {
              var value = '';
              var uri = $('.oxpoint_autocomplete input').data('uri');

              if (uri)
                value = uri;
              else
                value = this.getValue();

              element.setAttribute('data-providedBy', value);
            }
          },
          {
            type: 'text',
            id: 'starting-after',
            label: 'Starting After',
            className: 'starting_after',
            onLoad: function() {
              var input = $('.starting_after input');
              input.datepicker({ dateFormat: 'yy-mm-dd' });
            },
            setup: function(element) {
              // parse date from the full string (everything prior to the T)
              var date = element.getAttribute('data-startingAfter').split('T')[0];
              this.setValue(date);
            },
            commit: function(element) {
              element.setAttribute('data-startingAfter', this.getValue() + 'T00:00:00');
            }
          },
          {
            type: 'text',
            id: 'starting-before',
            label: 'Starting Before',
            className: 'starting_before',
            onLoad: function() {
              var input = $('.starting_before input');
              input.datepicker({ dateFormat: 'yy-mm-dd' });
            },
            setup: function(element) {
              var date = element.getAttribute('data-startingBefore').split('T')[0];
              this.setValue(date);
            },
            commit: function(element) {
              element.setAttribute('data-startingBefore', this.getValue() + 'T00:00:00');
            }
          },
          {
            type: 'select',
            id: 'skill',
            label: 'Skill',
            items: getSkillCodes(),
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
            type: 'hbox',
            widths: ['50%', '50%'],
            children: [
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
                  this.setValues(element.getAttribute('data-eligibility').trim().split(' '));
                },
                commit: function(element) {
                  var values = this.getValues();
                  element.setAttribute('data-eligibility', values.join(' '));
                }
              },
              {
                type: 'text',
                id: 'id2',
              }
            ]
          }
        ]
      },
      {
        // display settings
        id: 'display-settings',
        label: 'Display Settings',
        elements: [
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
            type: 'hbox',
            widths: ['50%', '25%', '25%'],
            children: [
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
                  ['Eligibility', 'eligibility'],
                ],
                setup: function(element) {
                  this.setValues(element.getAttribute('data-displayColumns').trim().split(' '));
                },
                commit: function(element) {
                  var values = this.getValues();
                  element.setAttribute('data-displayColumns', values.join(' '));
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
              }
            ]
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
