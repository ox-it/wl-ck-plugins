/**
  * Title:        ItemSearch
  * Description:  Provides a form with item-searching functionality for
                  correctly configured APIs
  * Author:       Lawrence Okoth-Odida
  * Version:      0.1
  * Date:         04/08/2014

  * BASIC USAGE
      1. Create an empty div as a placeholder for your search form, and a div
         for your search results:

          <div class="searchForm" />
          <div class="searchResults" />

      2. With JavaScript, create a class for getting the results data. This
         class needs only one public method, performQuery(), which should take
         a search term and return an array of objects (your search results).

         var YourSearchService = function() {
           // ...
           this.performQuery = function(searchTerm) {
             var results = [];
             // do procedure to get results, e.g. an ajax request
             return results;
           }
         }

      3. Call $.itemSearch() on your div with the following parameters:

         $('.searchForm').itemSearch({
           service: YourSearchService,
           resultsContainer: $('.searchResults'),
         });

      4. You will now have a search form in your searchForm div, that when you
         hit 'Search' or Enter, will run a search query and display the results
         in your searchResults div.

  * ADVANCED USAGE
      @param service {object}
        Your search service, which as described above should have a public
        method that performs the search query named peformQuery.

      @param resultsContainer {jQuery object}
        A jQuery object that targets where your results should be displayed.

      @param displayResults {function(object)}
        A function that takes a search result item (an object) and returns the
        html output for that result as a string. The object's properties are
        dependent on how your format the results in your search service.

        // example
        return '<li><a href="' + result.url + '">' + result.title + '</li>';

      @param waiting {string || html}
        A message that's shown in the resultsContainer while the results are
        loading

      @param registerElements {array[jQuery object]}
        An array of jQuery objects which are extra search fields that
        parameterise the query. So for example, if your search query should also
        be parameterised by a variable 'max' which the user should specify, you
        could have:

        [
          $('<input type="text" name="max" placeholder="Maximum # of results"/>'),
        ]

      @param noResult {string}
        Message for if there are no results (i.e. the search results array is
        empty).

      @param pagination {integer || boolean}
        Maximum number of results per page before being split into multiple
        pages. If set to false, pagination is disabled.

      @param params {object}
        Default parameters for your search query. If specified, then your
        search service object should take those parameters as well:

        var YourSearchService = function(params) {

        Then you can access those parameters in the body of the search service
        object.
  */

(function($) {
$.fn.itemSearch = function(options) {
  // initialze settings
  var settings = $.extend({
    resultsContainer: $('#results'),
    displayResult: function (result) {
      return '<li><a href="' + result.url + '">' + result.title + '</li>';
    },
    waiting: 'Loading...',
    registerElements: [],
    noResult: 'Sorry, no results',
    pagination: 5,
    params: {},
  }, options);

  // form element classes (used when the form is built)
  var selectors = {
    form  : 'item-search-form',
    query : 'item-search-query',
    button: 'item-search-button'
  };

  // builds search form (just a form with an input and anchor for a button)
  var buildSearchForm = function() {
    var form = $('<form/>').addClass(selectors.form);
    var input = $('<input/>').addClass(selectors.query);
    var button = $('<a/>').addClass(selectors.button).html('Search');

    form.append(input);
    addRegisteredElementsToForm(form);
    form.append(button);

    return form;
  };

  var addRegisteredElementsToForm = function(form) {
    for (i in settings.registerElements) {
      var element = settings.registerElements[i];

      form.append(element);
    }
  };

  var getParamsFromRegisteredElements = function() {
    var params = {};

    for (i in settings.registerElements) {
      var $element = settings.registerElements[i];
      params[$element.attr('name')] = $element.val();
    }

    return params;
  };

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

    if (settings.pagination) {
      html = buildPaginatedResults(html);
    }

    return html;
  };
  
  var buildPaginatedResults = function(resultsHtml) {
    var results = $(resultsHtml);
        results = results.filter(function(result) {
          // remove empty text nodes
          return this.nodeType != 3;
        });
    var nav = $('<div/>').addClass('pagination');
    var pages = Math.ceil(results.length / settings.pagination);
    var container = $('<div/>').addClass('paginated-results');
    var pagesContainer = $('<div/>').addClass('pages');

    // build page numbers and containers
    for (i = 1; i <= pages; i++) {
      nav.append($('<a/>').html(i).attr({'class': 'pageNum', 'href': '#', 'data-page': i}));
      pagesContainer.append($('<div/>').attr({'class': 'page', 'data-page': i}));
    };

    container.append(pagesContainer);

    var nav2 = nav.clone();


    // now move results into the correct containers
    for (i = 0; i < results.length; i++) {
      var page = Math.ceil((i+1) / settings.pagination);
      container.find('.page[data-page="' + page + '"]').append(results[i]);
    }

    $(document).on('click', '.pageNum', function() {
      // find closest results container
      var $this = $(this);
      var localContainer = $this.closest('.paginated-results');
      var page = $this.data('page');

      localContainer.find('.page').hide();
      localContainer.find('.page[data-page="' + page + '"]').show();

      return false;
    });

    // add navigational elements
    container.prepend(nav);
    container.append(nav2);

    // show the first page
    container.find('.page').hide();
    container.find('.page[data-page="1"]').show();

    return $('<div/>').append(container).html();
  };

  // return this, binding the functionality accordingly
  return this.each(function() {
    var $form = buildSearchForm();
    
    var bindToSubmit = function(e) {
      if (settings.waiting) {
        settings.resultsContainer.html(settings.waiting);
      }

      var params = $.extend(getParamsFromRegisteredElements(), settings.params);
      var service = new settings.service(params || {});
      var query   = $form.find('.' + selectors.query).val();
      var results = service.performQuery(query);
      var html    = buildResultsPage(results);

      settings.resultsContainer.html(html);

      e.preventDefault();
    };

    // now bind search functionality to the form elements
    $form.on('click', '.' + selectors.button, bindToSubmit);

    $form.on('keydown', 'input', function(e) {
      if (e.keyCode === 13) {
        // done so that users can simply use on('submitItemSearchForm' ....) for
        // their elements defined in registeredElements literal
        $(this).trigger('submitItemSearchForm');
      }
    });

    $form.on('submitItemSearchForm', 'input', function(e) {
      bindToSubmit(e);
    });

    $form.on('submit', bindToSubmit);

    $(this).prepend($form);
  });
};
})(jQuery);
