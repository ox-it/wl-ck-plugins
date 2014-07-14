/**
  * DOCUMENTATION
  */
(function($) {
  $.fn.videosearch = function(options) {
    /**
      * PROPERTIES 
      */
    // internal reference to this
    var _this = this;
      
    // initialize the settings
    var settings = $.extend({
      baseUrl: 'http://youtu.be/',
      classes: {
        query: '#query',
        button: '#button',
        results: '#searchresults',
      },
      params: {
        order: 'relevance',
        maxResults: '5',
      },
      noResults: '<p>Sorry, no results!</p>',
      displayResult: function (result) {
        return '<p><a href="' settings.baseUrl + result.id + '">' + item.title + '</p>';
      },
    }, options);
    
    // initialize the query
    var query = settings.params;
  };
})(jQuery);
