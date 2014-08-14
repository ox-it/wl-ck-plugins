# USAGE

Ensure that you have jQuery v1.11.1+ running on your pages.

## For the Editor
1. Copy `/oxitems` to your CKEDITOR `/plugins` directory

2. When instantiating the editor with JavaScript, ensure that you enable
   `oxitems` as an extra plugin (and if need be, load it externally)

        CKEDITOR.plugins.addExternal('oxitems', 'path/to/oxitems/'); // if you are loading it externally
        editor.config.extraPlugins += 'oxitems';
        editor.config.allowedContent = true;                         // else the 'data-' attributes get stripped

## For your pages
1. On the pages that display the OxItems, have the following scripts
   and CSS loaded:

        <script src="path/to/oxitems/js/oxitems.js"></script>

2. Then invoke the `.soloCitation()` method on the correct divs to replace them with the embed code:

        $('[data-oxitem]').oxItems();
