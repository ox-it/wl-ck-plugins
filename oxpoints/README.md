# USAGE

Ensure that you have jQuery v1.11.1+ running on your pages.

## For the Editor
1. Copy `/oxpoints` and `/common-wl` to your CKEDITOR `/plugins` directory

2. When instantiating the editor with JavaScript, ensure that you enable
   `oxpoints` as an extra plugin (and if need be, load it externally)

        CKEDITOR.plugins.addExternal('oxpoints', 'path/to/oxpoints/'); // if you are loading it externally
        editor.config.extraPlugins += 'oxpoints';
        editor.config.allowedContent = true;                           // else the 'data-' attributes get stripped

## For your pages
1. On the pages that display the OxPoints, have the following scripts
   and CSS loaded:

        <script src="path/to/oxpoints/js/oxpoints.js"></script>
        <link rel="stylesheet" href="path/to/oxpoints/css/oxpoints.css">

2. Then invoke the `.oxPointMap()` method on the correct divs to replace them with the embed code:

        $('[data-oxpoint]').oxPointMap();

   The editor will create divs with a data attribute `data-oxpoint`, hence the method should target
   those divs (as shown above).
