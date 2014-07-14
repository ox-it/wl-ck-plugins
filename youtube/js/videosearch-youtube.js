/**
  * Title:        VideoSearch for YouTube
  * Description:  Converts YouTube API V3 Search results to be compatible with
                  VideoSearch.
  * Author:       Lawrence Okoth-Odida
  * Notes:        Credit to Amit Agarwal for the only working code I could find
                  for using the v2 API to fetch search results
  * Version:      0.1
  * Date:         14/06/2014

  * USAGE
      When calling videosearch on a form, for the callback parameter define the
      function thus:

        ...
        callback: function() {
          return YouTubeSearch({
            // parameters explained below
          });
        }
        ...

  * PARAMETERS
      @param key {string}
        Google API Key required to access Youtube's Search API.
        THIS IS A REQUIRED FIELD.

      @param params {object}
        Parameters for the search list in accordance with Youtube's v3 API Search List
        documentation (https://developers.google.com/youtube/v3/docs/search/list)

        e.g.
          params: {
            order: 'date',
            maxResults: 10
          }

        ensures that the query is sorted by creation date and that (at most) 10 results
        will be displayed.

      @param classes {object}
        Define the CSS classes or ids for inputs that will affect the search query.
        For example, if you have an input field that lets the user change the maximum
        number of results displayed (e.g. <input id="changemaxresults">), then

          classes: {
            maxResults: '#changemaxresults'
          }

        will make it so that if that input is changed by the user, its value will be
        used for the search query. Each class can be either a CSS selector or a
        jQuery object (e.g. maxResults: $('#changemaxresults')).

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
};
