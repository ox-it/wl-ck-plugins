var initOxPointMapPath = (function(){
  // find current scripts
  var path = '';

  // find current scripts and copy the url (without the current filename)
  $('script').each(function(){
    var src = $(this).attr('src');
    if (src.indexOf('init-oxpoint-map.js') > -1) {
      path = src.replace('init-oxpoint-map.js', '');
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
