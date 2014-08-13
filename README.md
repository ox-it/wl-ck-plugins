# WebLearn CKEditor plugins

Each CKEditor plugin has their own folder.

## Testing

All the plugins can be tested by opening `test.html`.

Extra plugins can be added with the following:

    CKEDITOR.plugins.addExternal('pluginname', src + '/pluginname/', 'plugin.js');
    editor.config.extraPlugins += 'pluginname,';

If CSS needs to be loaded into the editor's frame then add to the `editor.config.contentsCss` array:

    editor.config.contentsCss.push('path/to/stylesheet.css');
