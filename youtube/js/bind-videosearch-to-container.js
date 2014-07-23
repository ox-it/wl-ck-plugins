var bindVideoSearchToContainer = function(container, searchResults, result) {
  // method for easily confirming the dialog
  var clickDialogOK = function() {
    var ckDialog = window.CKEDITOR.dialog.getCurrent();
    var ckOk = ckDialog._.buttons['ok'];
    ckOk.click();
  };

  // initial binding
  container.videosearch({
    service: YouTubeSearchService,
    resultsContainer: searchResults,
    displayResult: result.display,
  });

  // now initialize iframe which will isolate the search field (so we can submit
  // the form without closing the dialog
  var iframe = $('<iframe src="about:blank"></iframe>').attr('id', 'youTubeSearchIframe');
  container.after(iframe);

  // put form into iframe and fix the internal css styling
  iframe.load(function() {
    var contents = $(this).contents();

    contents.find('head').append($('head script, head link').clone());
    contents.find('body').html(container);
    contents.find('body').css({ padding: 0, width: '100%' });
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
};
