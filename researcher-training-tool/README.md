# USAGE

Ensure that you have jQuery v1.11.1+ running on your pages.

## For the Editor
1. Copy `/researcher-training-tool` and `/common-wl` to your CKEDITOR `/plugins` directory

2. When instantiating the editor with JavaScript, ensure that you enable
   `researcher-training-tool` as an extra plugin (and if need be, load it externally)

        CKEDITOR.plugins.addExternal('researcher-training-tool', 'path/to/researcher-training-tool/'); // if you are loading it externally
        editor.config.extraPlugins += 'researcher-training-tool';
        editor.config.allowedContent = true;                                                           // else the 'data=' attributes get stripped

## For your pages
1. On the pages that display the courses, have the following script loaded:

        <script src="//static.data.ox.ac.uk/courses-js-widget/oxford-courses-widget.js"></script>
