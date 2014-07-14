/**
  * DOCUMENTATION
  */
(function($) {
$.fn.videosearch = function(options) {
  // this
  var _this = this;

  // settings
  var settings = $.extend({
    callback: function() { // provides array of objects (the search results)
      return [];
    },
    classes: {
      results: '#results',
      query: '#query',
      button: '#button'
    }
    displayResult(result): function() {
      return '<li><a href="' + result.url + '">' + result.title + '</li>';
    }
    noResult: '<p>Sorry, no results!</p>'
  }, options);
  
  // uses json data to display results
  var displayResults = function() {
    // ...
  };
};
})(jQuery);
