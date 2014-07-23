# USAGE

Ensure that you have jQuery v1.11.1+ running on your pages.

## For the Editor
1. Copy `/youtube` your CKEDITOR `/plugins` directory

2. Edit `/youtube/js/key.js`. Set the variable in that file to your valid
   YouTube Search API V3 Key.
   
3. When instantiating the editor with JavaScript, ensure that you enable
   `youtube` as an extra plugin (and if need be, load it externally)

```
CKEDITOR.plugins.addExternal('youtube', 'path/to/youtube/');
editor.config.extraPlugins += 'youtube';
```

## For your pages
1. On the pages that display the YouTube videos, have the following script run:

```
$('[data-youtube-embed]').ytembed();
```

   This replaces all div placeholders for the YouTube videos with the actual embed code.
