(function() {
// get absolute plugin path
var h = CKEDITOR.plugins.get('youtube');
var path = h.path;

// load css and javascript files
CKEDITOR.document.appendStyleSheet('http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css');
CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(path + 'css/dialog.css'));

CKEDITOR.scriptLoader.load(path + '/js/videosearch.js');
CKEDITOR.scriptLoader.load(path + '/js/service.js');
CKEDITOR.scriptLoader.load(path + '/js/key.js');
CKEDITOR.scriptLoader.load(path + '/js/result.js');
CKEDITOR.scriptLoader.load(path + '/js/bind-videosearch-to-container.js');

var displaySearchPage = function() {
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
            html: displaySearchPage(),
            onLoad: function() {
              YouTubeSearchService.pt.key = googleApiKey;

              var container = $('#youTubeSearchForm');
              var searchResults = $('#youTubeSearchResults');
              var result = new YouTubeSearchResult(path);

              bindVideoSearchToContainer(container, searchResults, result);
            },
            setup: function(element) {
              var iframe = $('#youTubeSearchIframe').contents();
              var id = $('#searchResultId').val();

              // populate the search field with existing video's id then submit
              // the form so that the video is the first result
              iframe.find('input').val(id);
              iframe.find('form').submit();
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
      var selection = editor.getSelection();
      var element = selection.getStartElement();
      if (element)
        element = element.getAscendant('div', true);

      // create new div if it doesn't exist
      if (
        !element || 
        !element.hasAttribute('data-youtube-embed')
      ) {
        element = editor.document.createElement('div');
        element.data('youtube-embed', true);
        this.insertMode = true;
      } else {
        this.insertMode = false;
      }

      this.element = element;

      if (!this.insertMode) {
        this.setupContent(this.element);
      }
    },

    onOk: function() {
      var dialog = this;
      var youtube = this.element;
      this.commitContent(youtube);
      if (this.insertMode) {
        editor.insertElement(youtube);
      }
    }
  };
});
})();
