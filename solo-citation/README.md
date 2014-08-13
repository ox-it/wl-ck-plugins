# USAGE

Ensure that you have jQuery v1.11.1+ running on your pages.

## For the Editor
1. Copy `/solo-citation` and `/common-wl` to your CKEDITOR `/plugins` directory

2. When instantiating the editor with JavaScript, ensure that you enable
   `solo-citation` as an extra plugin (and if need be, load it externally)

        CKEDITOR.plugins.addExternal('solo-citation', 'path/to/solo-citation/'); // if you are loading it externally
        editor.config.extraPlugins += 'solo-citation';
        editor.config.allowedContent = true;                                     // else the 'data=' attributes get stripped

## In the Editor
1. If you wish to push all of the citations into one block at a certain point
   in the page, create a `div` with the id `citationsContainer` and follow
   instruction 3 on `For your pages`.

## For your pages
1. On the pages that display the citations, have the following scripts
   and CSS loaded:

        <script src="path/to/solo-citation/js/solo-citation.js"></script>
        <link rel="stylesheet" href="path/to/solo-citation/css/solo-citation.css">

2. Then invoke the `.soloCitation()` method on the correct divs to replace them with the embed code:

        $('[data-solo-citation]').soloCitation();

   The editor will create divs with a data attribute `solo-citation`, hence the method should target
   those divs (as shown above).

3. To push all of the citations into one block, pass the parameter `citationsContainer`
   with the jQuery object of the container into soloCitation(), like so:

        $('[data-solo-citation]').soloCitation({
          citationsContainer: $('#citationsContainer'),
        });

   At the point in the page where the individual citation would be, a link in
   square brackets will be placed that goes down the page to the citation block.
