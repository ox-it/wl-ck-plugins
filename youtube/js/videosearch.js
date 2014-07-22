/**
  * Title:        VideoSearch
  * Description:  Provides a form with video-searching functionality for
                  correctly configured APIs
  * Author:       Lawrence Okoth-Odida
  * Version:      0.1
  * Date:         14/06/2014

  * BASIC USAGE
      1. Provide some markup for your search form and search results, e.g.

            <form>
              <input id="query" type="text"><input id="submit" type="submit">
            </form>
            <div id="searchresults"></div>

     2. Call videosearch on the form:

            var params = {
              // params explained in ADVANCED USAGE
            };
            $('form').videosearch(params);

     3. If the user writes a search query and hits the submit button, the #searchresults
        div will be populated with the first 5 results from the query.

  * ADVANCED USAGE
      The videosearch method takes an object literal as a parameter, and that literal
      defines the options. These options affect the functionality thus:

      @param callback {function}
        A function that actually provides the search results, returning an array of
        objects of the following form:

          {
            title: 'Video Title',
            url: 'http://full.url.to.video/',
            description: 'Video Description',
            meta: ''
          }

          The meta property can hold any other miscellaneous details and can be of
          any type. Any API used must fit its results to this format to be used with
          videosearch.
          
          If this method is not defined, an empty array will be returned.

      @param classes {object}
        Literal to define the classes of important interactive elements. Namely:

          {
            results: 'CSS selector for results',
            query: 'CSS selector for search query input field',
            button: 'CSS selector for search button',
          }

      @param displayResult {function}
        Function called to display an individual result. Returns a string with the
        formatted output for the result. Takes a result from callback as a parameter,
        thus all of the properties referred to in the callback are available.

      @param noResult {string}
        Message to show if there are no results found.
  */
  
/*
(function($) {
$.fn.videosearch = function(options) {
  // this
  var _this = this;

  // css selectors for the form
  var selectors = {
    form: 'video-search-form',
    query: 'video-search-query',
    button: 'video-search-button'
  };

  // settings
  var settings = $.extend({
    // provides array of objects (the search results)
    service: function() {
      var performQuery = function() {
        return [];
      };
    },
    resultsContainer: '#results',
    // formats each result for html output
    displayResult: function(result) {
      return '<li><a href="' + result.url + '">' + result.title + '</li>';
    },
    // shown if there are no results
    noResult: 'Sorry, no results!'
  }, options);
  
  // builds the form
  var buildSearchForm = function() {
    var form = $('<form/>').addClass(selectors.form);
    var input = $('<input/>').addClass(selectors.query);
    var button = $('<a/>').addClass(selectors.button).html('Search');

    form.append(input).append(button);

    return form;
  };

  // uses json data to display results
  var displayResults = function(results) {
    // loop through results and build an html string
    var html = '';

    if (results) {
      $.each(results, function(key, result)  {
        html += settings.displayResult(result);
      });
    } else {
      html = noResult;
    }

    return html;
  };

  // now bind the functionality to the form
  return this.each(function() {
    var $this = $(this);
    var form = buildSearchForm();

    form.on('submit', function(e) {
      var searchTerm = $(this).find('input').val();
      var service = new settings.service();

      var results = service.performQuery(searchTerm);

      $(settings.resultsContainer).html(displayResults(results));

      return false;
    });
    
    $this.append(form);
  });
};
})(jQuery);
*/
