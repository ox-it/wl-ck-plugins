var BindSoloSearchToDialog = function(path) {
  var container = $('#soloSearchForm');
  var searchResults = $('#soloSearchResults');
  var result = new SOLOSearchResult(path);

  // initialization
  var init = function() {
    bindToContainer();
    pushFormIntoIframe();
    closeDialogOnResultClick();
  };

  // initial binding
  var bindToContainer = function() {
    var id     = $('<input name="id" type="hidden" id="soloSearchResultId" / >');
    var author = $('<input name="author" placeholder="Author"/ >');
    var isbn   = $('<input name="isbn" placeholder="ISBN"/ >');
    var count  = $('<input name="count" placeholder="# of results to display"/ >');

    container.itemSearch({
      service: SOLOSearchService,
      resultsContainer: searchResults,
      displayResult: result.display,
      registerElements: [
        id,
        author,
        isbn,
        count
      ]
    });
  };

  // now initialize iframe which will isolate the search field (so we can submit
  // the form without closing the dialog)
  var pushFormIntoIframe = function() {
    var iframe = $('<iframe src="about:blank"></iframe>').attr('id', 'soloSearchIframe');
    container.after(iframe);

    iframe.load(function() {
      var contents = $(this).contents();

      contents.find('head').append($('head script, head link').clone());
      contents.find('body').html(container);
      contents.find('body').css({ padding: 0, width: '100%' });
      contents.find('input').addClass('searchQuery cke_dialog_ui_input_text');
      contents.find('a').addClass('searchButton cke_dialog_ui_button cke_dialog_ui_button_ok');
      contents.find('input').first().attr('placeholder', 'Title');
    });
  };

  var closeDialogOnResultClick = function() {
    searchResults.on('click', '.result', function(e) {
      var soloSearchResultId = $('#soloSearchIframe').contents().find('#soloSearchResultId');
      soloSearchResultId.val($(this).data('id'));
      clickDialogOK();
      e.preventDefault();
    });
  };

  var clickDialogOK = function() {
    var ckDialog = window.CKEDITOR.dialog.getCurrent();
    var ckOk = ckDialog._.buttons['ok'];
    ckOk.click();
  };

  init();
};
