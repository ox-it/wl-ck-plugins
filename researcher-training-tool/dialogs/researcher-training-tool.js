(function() {
// get plugin paths
var h = CKEDITOR.plugins.get('researcher-training-tool');
var path = h.path;

// load css and javascript files
CKEDITOR.scriptLoader.load(path + '/js/skills.js');

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
            // eligibility
          }
        ]
      },
      {
        // display settings
        id: 'display-settings',
        label: 'Display Settings',
        elements: [
          // fields
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
