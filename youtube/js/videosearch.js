/**
  * Title:        VideoSearch
  * Description:  Provides a form with video-searching functionality for
                  correctly configured APIs
  * Author:       Lawrence Okoth-Odida
  * Version:      0.2
  * Date:         22/07/2014

  * BASIC USAGE

  * ADVANCED USAGE

  */

(function($) {
$.fn.videosearch = function(options) {
  // initialze settings
  var settings = $.extend({
    resultsContainer: $('#results'),
    displayResult: function (result) {
      return '<li><a href="' + result.url + '">' + result.title + '</li>';
    },
    noResult: 'Sorry, no results',
    params: {},
  }, options);

  // form element classes (used when the form is built)
  var selectors = {
    form  : 'video-search-form',
    query : 'video-search-query',
    button: 'video-search-button'
  };

  // builds search form (just a form with an input and anchor for a button)
  var buildSearchForm = function() {
    var form = $('<form/>').addClass(selectors.form);
    var input = $('<input/>').addClass(selectors.query);
    var button = $('<a/>').addClass(selectors.button).html('Search');

    form.append(input).append(button);

    return form;
  }

  // constructs the output html for the formatted results as a string
  var buildResultsPage = function(results) {
    var html = '';

    if (results) {
      $.each(results, function(key, result)  { 
        html += settings.displayResult(result);
      });
    } else {
      html = $('<div/>').append($('<p/>').append(settings.noResult)).html();
    }

    return html;
  }

  // return this, binding the functionality accordingly
  return this.each(function() {
    var $form = buildSearchForm();
    
    var bindToSubmit = function(e) {
      var service = new settings.service(settings.params);
      var query   = $form.find('input').val();
      var results = service.performQuery(query);
      var html    = buildResultsPage(results);

      settings.resultsContainer.html(html);

      e.preventDefault();
    }

    $form.on('click', '.' + selectors.button, bindToSubmit);
    $form.on('submit', bindToSubmit);

    $(this).prepend($form);
  });
};
})(jQuery);
