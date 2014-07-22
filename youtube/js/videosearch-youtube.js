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
  
  
/*
var YouTubeSearchService = function(options) {

  this.key    = options.key;
  this.params = options.params || {};
  this.url = 'https://www.googleapis.com/youtube/v3/search';
  
  this.prepareQueryParams = function(settings) {
    
    if (!this.key) {
      throw 'NoYouTubeApiKeySpecified';
    }
  
    return $.extend({
      key: this.key,
      part: 'snippet',
      q: searchTerm,
      order: 'relevance',
      maxResults: '5',
    }, settings)
  }

  // takes a string and returns array of objects representing each search
  // result (i.e. {title, url, etc...})
  this.performQuery = function(searchTerm) {

    var results = [];

    // now perform the JSON call to get the results and format them
    $.ajax({
      url: url,
      data: this.prepareQueryParams(this.params),
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

};*/
