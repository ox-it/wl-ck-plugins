(function() {
/* methods */
var getEditorDataJQuery = function(editor) {
  return $('<div>').append(editor.getData());
};

var embedJQueryInEditor = function(editor, version) {
  var $data = getEditorDataJQuery(editor);
  var scripts = $data.find("script[src*='https://code.jquery.com/" + version + "']").remove();
  var script = $('<script/>').attr({
    type : 'text/javascript',
    src: 'https://code.jquery.com/' + version,
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
        console.log(editor.config);
        console.log(editor.config.jQueryVersion);
        var version = 'jquery-' + (editor.config.jQueryVersion || '1.11.1') + '.js';
        embedJQueryInEditor(editor, version);
      },
    });
    editor.ui.addButton('jquery', { label: 'Embed jQuery Library', command: 'jquery', toolbar: 'insert' });
  },
});
})();
