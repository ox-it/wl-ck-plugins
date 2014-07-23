(function() {
// get absolute plugin path
var h = CKEDITOR.plugins.get('youtube');
var path = h.path;

// load css and javascript files
CKEDITOR.document.appendStyleSheet("http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css");
CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(path + "css/ytembed.css"));

CKEDITOR.scriptLoader.load(path + '/js/videosearch.js');
CKEDITOR.scriptLoader.load(path + '/js/service.js');
CKEDITOR.scriptLoader.load(path + '/js/key.js');

var displaySearchPage = function() {
  var header = $('<h2/>').html('Embed a video');
  var explanation  = $('<p>').html('Type a search term or YouTube URL below, hit the search button, then select a result to embed that video.');
  var searchResultId = $('<input/>').attr('type', 'hidden').attr('id', 'searchResultId');
  var searchForm = $('<div/>').attr('id', 'youTubeSearchForm');
  var searchResults = $('<div/>').attr('id', 'youTubeSearchResults');

  return $('<div/>').append(header)
                    .append(explanation)
                    .append(searchResultId)
                    .append(searchForm)
                    .append(searchResults)
                    .html();
};

var displaySearchResult = function(result) {
  return '<li class="result" data-src="' + result.meta.id + '">' +
            '<img class="thumbnail" src="' + result.meta.thumbnails.m + '">' +
            '<h2>' + result.title + '</h2>' +
            '<p>' + result.description + '</p>' +
         '</li>';
};

var clickDialogOK = function() {
  var ckDialog = window.CKEDITOR.dialog.getCurrent();
  var ckOk = ckDialog._.buttons['ok'];
  ckOk.click();
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

              container.videosearch({
                service: YouTubeSearchService,
                resultsContainer: searchResults,
                displayResult: displaySearchResult
              });

              var iframe = $('<iframe src="about:blank"></iframe>').attr('id', 'youTubeSearchIframe');
              container.after(iframe);

              iframe.load(function() {
                var $this = $(this);
                var contents = $this.contents();
                contents.find('head').append($('head script, head link').clone());
                contents.find('body').html(container);
                contents.find('body').css({
                  padding: 0,
                  width: '100%',
                });
              });

              // if you click on a search result, its id should populate the
              // search field and the OK button should be clicked
              searchResults.on('click', '.result', function(e) {
                $('#searchResultId').val($(this).data('src'));
                clickDialogOK();
                e.preventDefault();
              });
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
