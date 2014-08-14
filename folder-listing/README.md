# USAGE

Ensure that you have jQuery v1.11.1+ running on your pages.

## For the Editor
1. Copy `/folder-listing` and `/common-wl` to your CKEDITOR `/plugins` directory

2. When instantiating the editor with JavaScript, ensure that you enable
   `folder-listing` as an extra plugin (and if need be, load it externally)

        CKEDITOR.plugins.addExternal('folder-listing', 'path/to/folder-listing/'); // if you are loading it externally
        editor.config.extraPlugins += 'folder-listing';
        editor.config.allowedContent = true;                                       // else the 'data=' attributes get stripped

## For your pages
1. On the pages that display the folder listing, have the following scripts loaded:

        <script src="path/to/folder-listing/js/file-tree-weblearn.js"></script>
        <script src="path/to/folder-listing/js/folder-listing.js"></script>

2. Then invoke the `.folderListing()` method on the correct divs to replace them with the embed code:

        $('[data-folder-listing]').folderListing();

   The editor will create divs with a data attribute `folder-listing`, hence the method should target
   those divs (as shown above).
