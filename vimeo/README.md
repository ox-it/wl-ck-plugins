# USAGE

Ensure that you have jQuery v1.11.1+ running on your pages.

## For the Editor
1. Copy `/vimeo` and `/common` to your CKEDITOR `/plugins` directory

2. When instantiating the editor with JavaScript, ensure that you enable
   `vimeo` as an extra plugin (and if need be, load it externally)

        CKEDITOR.plugins.addExternal('vimeo', 'path/to/vimeo/'); // if you are loading it externally
        editor.config.extraPlugins += 'vimeo';
        editor.config.allowedContent = true;                     // else the 'data=' attributes get stripped

## For your pages
1. On the pages that display the Vimeo videos, have the following script loaded:

        <script src="path/to/vimeo/js/vimeo-embed.js"></script>

2. Then invoke the `.vimeoEmbed()` method on the correct divs to replace them with the embed code:

        $('[data-vimeo-embed]').vimeoEmbed();

   The editor will create divs with a data attribute 'vimeo-embed', hence the method should target
   those divs (as shown above).
