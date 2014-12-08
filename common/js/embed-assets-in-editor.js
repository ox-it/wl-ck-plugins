/**
 * Embed javascript and css assets in the editor content
 * @param params
 *    @param editor
 *    @param id
 *    @param scripts
 *    @param stylesheets
 */
embedAssetsInCKEditor =  function(params) {
  /** variables */
  params = $.extend({
    scripts: [],
    stylesheets: [],
    jquery: {
      prefix: 'https://code.jquery.com/', // need to change the prefix to the correct internal version of jquery
      version: 'jquery-1.11.1.js',
    }
  }, params);
  var data = params.editor.getData();
  var $data = $('<div>').append($(data));
  var scripts = [];
  var stylesheets = [];
  var assets = $data.find('#' + params.id);
  var container = (assets.length) ? assets.detach().empty() : $('<div/>').attr({ id: params.id }).hide();
  

  /** methods */
  var embedJQuery = function($data, jqueryParams) {
    if (params.jquery) {
      var scripts = $data.find("script[src*='" + jqueryParams.prefix + jqueryParams.version + "']").remove();
      var script = $('<script/>').attr({
        type : 'text/javascript',
        src: jqueryParams.prefix + jqueryParams.version,
      });

      $data.prepend(script);
    }
  };

  /** procedure */
  // load scripts
  for (i in params.scripts) {
    container.append(
      $('<script>').attr({
        type: 'text/javascript',
        src: params.scripts[i],
      })
    );
  }

  // load stylesheets
  for (i in params.stylesheets) {
    // we append a script that loads the css because ckeditor validates
    // <link> tags to not be included in <div> (meaning that they get
    // pushed out of the container)
    container.append(
      $('<script>').attr({
        type: 'text/javascript',
      }).html(
        '$("<link/>", {' +
        '   rel: "stylesheet",' +
        '   type: "text/css",' +
        '   href: "' + params.stylesheets[i] + '"' +
        '}).appendTo("head");'
      )
    );
  }

  $data.prepend(container);

  embedJQuery($data, params.jquery);

  // add to the current ckeditor instance
  var instance = params.editor.name;
  CKEDITOR.instances[instance].setData($data.html());
};
