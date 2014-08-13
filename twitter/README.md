# USAGE

Ensure that you have jQuery v1.11.1+ running on your pages.

## For the Editor
1. Copy `/twitter` to your CKEDITOR `/plugins` directory

2. When instantiating the editor with JavaScript, ensure that you enable
   `twitter` as an extra plugin (and if need be, load it externally)

        CKEDITOR.plugins.addExternal('twitter', 'path/to/twitter/'); // if you are loading it externally
        editor.config.extraPlugins += 'twitter';
        editor.config.allowedContent = true;                         // else the 'data=' attributes get stripped

## For your pages
1. On the pages that display the Custom Timelines, have the following script loaded:

        <script src="twitter/js/embed-timeline.js"></script>

2. Then invoke the `.twitterTimeline()` method on the correct divs to replace them with the embed code:

        $('[data-twitter-timeline]').twitterTimeline();

   The editor will create divs with a data attribute `twitter-timeline`, hence the method should target
   those divs (as shown above).

3. As the contents of the timeline are delivered via an `iframe`, no CSS stylings can be done on it.
   The CSS selectors for the `div` and the `iframe` are `data-twitter-timeline` and `.twitter_timeline`
   respectively.
