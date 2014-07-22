/**
  * Title:        VideoSearch for YouTube
  * Description:  Converts YouTube API V3 Search results to be compatible with
                  VideoSearch.
  * Author:       Lawrence Okoth-Odida
  * Notes:        Credit to Amit Agarwal for the only working code I could find
                  for using the v2 API to fetch search results
  * Version:      0.2
  * Date:         22/07/2014

  * USAGE

  * PARAMETERS

  */
var YouTubeSearchService = function(options) {
  // initialize settings
  var settings = $.extend({
    key: 'YOURAPIKEY',
    params: {
      order: 'relevance',
      maxResults: '5',
    },
  }, options);

  // takes a string and returns array of objects representing each search
  // result (i.e. {title, url, etc...})
  var performQuery = function(searchTerm) {
    var results = [];
    var query = settings.query;
    var url = 'https://www.googleapis.com/youtube/v3/search?key=' + settings.key + ' &part=snippet';

    // build the string using the query property defined at the start
    $.each(query, function(key, value) {
      url = url + '&' + key + '=' + value;
    });

    url += '&q=' + searchTerm;

    // now perform the JSON call to get the results and format them
    $.ajax({
      url: url,
      dataType: 'json',
      async: false,
      success: function(json) {
        if (json.items.length > 0) {
          // go through each result, formatting them for VideoSearch
          $.each(json.items, function(key, item) {
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
  }
};
