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

    /**
      * METHODS
      */
    // binds search functionality to the form
    var bindEventsToForm = function() {
      // if any of the settings-based parameters change, stick that new value into the query
      $.each(settings.params, function(param, value) {
        $(settings.classes[param]).change(function() {
          query[param] = $(this).val();
        });
      });

      // if the search button is clicked, run the search
      $(settings.classes.button).click(function () {
        search();
        return false;
      });

      // if the form is submitted (e.g. by hitting enter), run the search
      this.on('submit', function() {
        search();
        return false;
      });
    };
  };
})(jQuery);
