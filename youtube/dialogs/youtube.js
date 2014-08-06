(function() {
// get absolute plugin path
var h = CKEDITOR.plugins.get('youtube');
var path = h.path;

// load css and javascript files
CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(path + 'css/dialog.css'));

CKEDITOR.scriptLoader.load(path + 'js/itemsearch.js');
CKEDITOR.scriptLoader.load(path + 'js/service.js');
CKEDITOR.scriptLoader.load(path + 'js/key.js');
CKEDITOR.scriptLoader.load(path + 'js/result.js');
CKEDITOR.scriptLoader.load(path + 'js/bind-itemsearch-to-container.js');

var displayYouTubeSearchPage = function() {
  var div = $('<div/>');

  $.ajax({
    url: path + 'html/search-form.html',
    dataType: 'html',
    async: false,
    success: function(html) {
      div.html(html);
    }
  });

  return div.html();
};

CKEDITOR.dialog.add('youtubeDialog', function(editor) {
  return {
    title:     'YouTube Video Search',
    minWidth:  500,
    minHeight: 200,
    resizable: CKEDITOR.DIALOG_RESIZE_NONE,

    contents: [
      {
        id: 'tab-search',
        label: 'Search YouTube',
        elements : [
          {
            type: 'html',
            id: 'searchpage',
            html: displayYouTubeSearchPage(),
            onLoad: function() {
              YouTubeSearchService.pt.key = youTubeSearchV3ApiKey;

              var container = $('#youTubeSearchForm');
              var searchResults = $('#youTubeSearchResults');
              var result = new YouTubeSearchResult(path);

              BindYouTubeSearchToContainer(container, searchResults, result);
            },
            setup: function(element) {
              var $frame = $('#youTubeSearchIframe');
              var setUpElement = function() {
                var contents = $frame.contents();
                var value = element.getAttribute('data-src') || $('#searchResultId').val();
                contents.find('input').val(value);
                contents.find('form').submit();
              };

              setUpElement();
              $frame.load(setUpElement);
            },
            commit: function (element) {
              // use the search result id if it has been set
              var value = $('#searchResultId').val();

              if (!value) {
                value = $('#youTubeSearchIframe').contents().find('input').val();
              }

              if (value) {
                element.setAttribute('data-src', value);
              } else if (!this.insertMode) {
                element.removeAttribute('data-src');
              }
            }
          },
        ]
      }
    ],

    onLoad: function() {
      // give dialog a class for easier styling
      $(this.getElement()).attr('id', 'youTubeDialog');
    },

    onShow: function() {
      this.fakeImage = this.youTubeNode = null;
      var  fakeImage = this.getSelectedElement();

      if (fakeImage && fakeImage.data('cke-real-element-type') && fakeImage.data('cke-real-element-type') == 'div') {
        this.fakeImage = fakeImage;
        this.youTubeNode = editor.restoreRealElement(fakeImage);
        this.insertMode = false;
        this.setupContent(this.youTubeNode);
      } else {
        this.insertMode = true;
      }
    },

    onOk: function() {
      var youTubeNode = (!this.fakeImage)? new CKEDITOR.dom.element('div') : this.youTubeNode;
      youTubeNode.setAttribute('data-youtube-embed', 'true');

      this.commitContent(youTubeNode);
      var newFakeImage = editor.createFakeElement(youTubeNode, 'cke_youtube', 'div', false);

      if (this.fakeImage) {
        newFakeImage.replace(this.fakeImage);
        editor.getSelection().selectElement(newFakeImage);
      } else {
        editor.insertElement(newFakeImage);
      }
    }
  };
});
})();
