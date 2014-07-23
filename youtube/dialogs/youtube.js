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

// object for handling the html display of search results
var YouTubeSearchResult = function() {
  var resultTemplate = $('<div/>').load(path + 'html/result.html');

  this.display = function(result) {
    var template = resultTemplate.clone();

    template.find('h2').html(result.title);
    template.find('p').html(result.description);
    template.find('.result').attr('data-src', result.meta.id);
    template.find('.thumbnail').attr('src', result.meta.thumbnails.m);

    return template.html();
  };
};

// method for easily confirming the dialog
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
              var result = new YouTubeSearchResult;

              container.videosearch({
                service: YouTubeSearchService,
                resultsContainer: searchResults,
                displayResult: result.display,
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
                contents.find('input').addClass('searchQuery cke_dialog_ui_input_text')
                                      .attr('placeholder', 'Search here...');
                contents.find('a').addClass('searchButton cke_dialog_ui_button cke_dialog_ui_button_ok')
                                  .html('&#xf002;');
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
