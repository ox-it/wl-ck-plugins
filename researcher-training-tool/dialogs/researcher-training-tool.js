(function() {
// get plugin paths
var h = CKEDITOR.plugins.get('researcher-training-tool');
var path = h.path;

// load css and javascript files
// ...

// register dialog
CKEDITOR.dialog.add('researcherTrainingToolDialog', function(editor) {
  return {
    title: 'Embed Researcher Training Tool Listing',
    minWidth: 350,
    minHeight: 200,

    contents: [
      {
        // settings tab
        id: 'settings',
        label: 'Configure Courses',
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
