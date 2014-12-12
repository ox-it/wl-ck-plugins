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

  var data = editor.getData();
  document.getElementById('editorcontents').innerHTML = html = editor.getData();
  document.getElementById('contents').style.display = '';

  // create iframe and display contents in there
  $('#editorcontents').find('iframe').remove();
  var iframe = $('<iframe src="about:blank"></iframe>');

  iframe.load(function() {
    var contents = $(this).contents();

    contents.find('body').html(data);

    // load scripts
    var scripts = $(data).find('script');
    scripts.each(function() {
      var src = $(this).attr('src');
      contents.find('body').append($('<script>').attr({src: src}));
    });

    // fix iframe dimensions
    iframe.height(contents.find('body').outerHeight() + 20);
    iframe.width('100%');
  });

  $('#editorcontents').html(iframe);

  editor.destroy();
  editor = null;

  return;

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
