# USAGE

Ensure that you have jQuery v1.11.1+ running on your pages.

## For the Editor
1. Copy `/youtube` and `/common` to your CKEDITOR `/plugins` directory

2. Edit `/youtube/js/key.js`. Set the variable in that file to your valid
   YouTube Search API V3 Key.

        var googleApiKey = 'YourApiKey';

3. When instantiating the editor with JavaScript, ensure that you enable
   `youtube` as an extra plugin (and if need be, load it externally)

        CKEDITOR.plugins.addExternal('youtube', 'path/to/youtube/'); // if you are loading it externally
        editor.config.extraPlugins += 'youtube';
        editor.config.allowedContent = true;                         // else the 'data=' attributes get stripped

## For your pages
1. On the pages that display the YouTube videos, have the following script loaded:

        <script src="path/to/youtube/js/youtube-embed.js"></script>

2. Then invoke the `.youtubeEmbed()` method on the correct divs to replace them with the embed code:

        $('[data-youtube-embed]').youtubeEmbed();

   The editor will create divs with a data attribute 'youtube-embed', hence the method should target
   those divs (as shown above).
