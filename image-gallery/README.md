# USAGE

Ensure that you have jQuery v1.11.1+ running on your pages.

## For the Editor
1. Copy `/image-gallery` and `/common-wl` to your CKEDITOR `/plugins` directory

3. When instantiating the editor with JavaScript, ensure that you enable
   `image-gallery` as an extra plugin (and if need be, load it externally)

        CKEDITOR.plugins.addExternal('image-gallery', 'path/to/image-gallery/'); // if you are loading it externally
        editor.config.extraPlugins += 'image-gallery';
        editor.config.allowedContent = true;                                     // else the 'data-' attributes get stripped

## For your pages
1. On the pages that display the gallery, have the following scripts and styles loaded in the `head`:

        <script src="path/to/image-gallery/lib/colorbox/colorbox.js"></script>
        <script src="path/to/image-gallery/js/image-gallery.js"></script>
        
        <link rel="stylesheet" href="path/to/image-gallery/lib/colorbox/colorbox.css"/>
        <link rel="stylesheet" href="path/to/image-gallery/css/image-gallery.css"/>

2. Then invoke the `.wlImageGallery()` method on the correct divs to replace them with the embed code:

        $('[data-image-gallery]').wlImageGallery();

   The editor will create divs with a data attribute `image-gallery`, hence the method should target
   those divs (as shown above).

