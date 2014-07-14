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
      order: 'relevance',
      maxResults: '5',
    },
  }, options);

  // initialize the query
  var query = settings.params;

  // take values from existing fields (if the classes are defined)
  $.each(settings.params, function(param, value) {
    var setting = $(settings.classes[param]).val();
    if (setting) query[param] = setting;
  });

  // get base Youtube API URL and build up the string
  var url = 'https://www.googleapis.com/youtube/v3/search?key=' + settings.key + ' &part=snippet';

  // build the string using the query property defined at the start
  $.each(query, function(key, value) {
    url = url + '&' + key + '=' + value;
  });

  // now perform the JSON call to get the results and format them
  $.ajax({
    url: url,
    dataType: 'json',
    async: false,
    success: function(json) {
      if (json.items.length > 0) {
        // go through each result, formatting them for VideoSearch
        $.each(json.items, function(item) {
          results.push({
            url: 'http://youtu.be/' + item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            meta: item.snippet
          });
        });
      }
    }
  });

  return results;
};
