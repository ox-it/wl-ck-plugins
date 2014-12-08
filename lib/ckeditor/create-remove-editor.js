var editor, html = '';

var getCurrentDirectory = function() {
  var scripts = document.getElementsByTagName('script');
  var src = scripts[scripts.length-1].baseURI.split('/');
  src.pop(); // remove current directory
  src = src.join('/') + '/';
  return src;
};


var createEditor = function(targetId, plugins) {
  if (editor) {
    return;
  }

  var config = {};
  editor = CKEDITOR.appendTo(targetId, config, html);
  editor.config.allowedContent = true;

  for (i in plugins) {
    var plugin = plugins[i];

    CKEDITOR.plugins.addExternal(plugin.id, plugin.dir, 'plugin.js');
    editor.config.extraPlugins += plugin.id + ',';
  }
}

var removeEditor = function() {
  if (!editor) {
    return;
  }

  document.getElementById('editorcontents').innerHTML = html = editor.getData();
  document.getElementById('contents').style.display = '';

  editor.destroy();
  editor = null;

  // done for the sake of the (to evaluate the scripts)
  var $contents = $('<div/>').append($('#editorcontents').clone());
  var assets = $contents.find('script, link');
  var head = $('head');

  // add the assets
  assets.each(function(i, asset) {
    var $asset = $(asset);
    if ($asset.prop("tagName") == 'SCRIPT') {
      if ($asset.attr('src')) {
        $.getScript($asset.attr('src'));
      } else {
        eval($asset.html());
      }
    } else {
      head.append($asset);
    }
  });
};
