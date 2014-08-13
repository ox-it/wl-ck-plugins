# USAGE

Ensure that you have jQuery v1.11.1+ running on your pages.

## For the Editor
1. Copy `/oxam` to your CKEDITOR `/plugins` directory

2. When instantiating the editor with JavaScript, ensure that you enable
   `oxam` as an extra plugin (and if need be, load it externally)

        CKEDITOR.plugins.addExternal('oxam', 'path/to/oxam/'); // if you are loading it externally
        editor.config.extraPlugins += 'oxam';
        editor.config.allowedContent = true;                   // else the 'data-' attributes get stripped

## For your pages
1. On the pages that display the OXAM results, have the following scripts and CSS loaded:

        <link rel="stylesheet" href="path/to/oxam/css/results.css">
        <script src="path/to/oxam/js/oxam-embed.js"></script>

2. Then invoke the `.oxamEmbed()` method on the correct divs to replace them with the embed code:

        $('[data-oxam-embed]').oxamEmbed();

   The editor will create divs with a data attribute 'oxam-embed', hence the method should target
   those divs (as shown above).
