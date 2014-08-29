(function() {
/* properties */
var jQueryVersion = 'jquery-1.11.1.js';

/* methods */
var getEditorDataJQuery = function(editor) {
  return $('<div>').append(editor.getData());
};

var embedJQueryInEditor = function(editor) {
  var $data = getEditorDataJQuery(editor);
  var scripts = $data.find("script[src*='https://code.jquery.com/" + jQueryVersion + "']").remove();
  var script = $('<script/>').attr({
    type : 'text/javascript',
    src: 'https://code.jquery.com/' + jQueryVersion,
  });

  $data.prepend(script);

  CKEDITOR.instances[editor.name].setData($data.html());
};

/* add the plugin */
CKEDITOR.plugins.add('jquery', {
  requires: 'dialog,',
  icons: 'jquery',

  init: function(editor) {
    editor.addCommand('jquery', {
      exec: function(editor) {
        embedJQueryInEditor(editor);
      },
    });
    editor.ui.addButton('jquery', { label: 'Embed jQuery Library', command: 'jquery', toolbar: 'insert' });
  },
});
})();
