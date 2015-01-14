var initOxPointMapPath = (function(){
  // find current scripts
  var path = '';

  // find current scripts and copy the url (without the current filename)
  $('script').each(function(){
    var href = $(this).attr('href');
    if (href.indexof('init-oxpoint-map.js') > -1) {
      path = href.replace('init-oxpoint-map.js', '');
    }
  });

  return path;
})();

function initOxPointMap() {
  var gomap = initOxPointMapPath + 'gomap.js';
  var oxpoints = initOxPointMapPath + 'oxpoints-map.js';

  // load gomap, then oxpoints
  $.getScript(gomap).done(function() {
    $.getScript(oxpoints);
  });
}
