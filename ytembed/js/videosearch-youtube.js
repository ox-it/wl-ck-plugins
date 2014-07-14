/**
  * DOCUMENTATION
  */
var YouTubeSearch = function(options) {
  // initialized results
  var results = [];
  
  // merge default settings and options
  var settings = $.extend({
    key: 'YOURAPIKEY',
    classes: {
      q: '#query',
    },
    params: {
      q: '#query',
      order: 'relevance',
      maxResults: '5',
    },
  }, options);

  return results;
};
