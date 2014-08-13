/**
  * Title:        Weblearn Image Gallery (jQuery Plugin for WebLearn)
  * Description:  Embeds an image gallery in the page based on a directory from
                  Oxford's Weblearn environment
  * Author:       Lawrence Okoth-Odida
  * Version:      0.1
  * Date:         28/07/2014

  * BASIC USAGE
      1. Have a div with the following attributes:

           <div data-image-gallery="true" data-directory="...">

         Setting the data-directory property to the correct Weblearn directory
         (starting with either /group or /user).

      2. Call .wlImageGallery() on the correct divs:

           $('[data-image-gallery]').wlImageGallery();

  * ADVANCED USAGE

  */ 
(function($){
$.fn.wlImageGallery = function(options) {
  // settings
  var settings = $.extend({
    slideshow: false,
    slideshowSpeed: 0,
    maxWidth: false,
    maxHeight: false,
    rel: false,
  }, options);

  var acceptedFileTypes = ['png', 'gif', 'jpg', 'jpeg'];
  var urlPrefix = 'https://weblearn.ox.ac.uk/direct/content/resources/';

  var getSettingsFromContainer = function(i, $container) {
    var slideshowSpeed = $container.data('slideshowspeed') || settings.slideshowSpeed;
    var slideshow = (slideshowSpeed && slideshowSpeed > 0) || settings.slideshow;
    var maxHeight = $container.data('maxheight') || settings.maxHeight;
    var maxWidth = $container.data('maxwidth') || settings.maxWidth;
    var rel = $container.data('rel') || settings.rel || 'wl_image_gallery_' + i;

    var containerSettings = {
      slideshow: slideshow,
      slideshowAuto: true,
      slideshowSpeed: slideshowSpeed,
      maxHeight: maxHeight,
      maxWidth: maxWidth,
      rel: rel,
      onComplete: function() {
        $("#cboxTitle").hide();
        $("#cboxLoadedContent").append($("#cboxTitle").html()).css({color: $("#cboxTitle").css("color")});
        $.fn.colorbox.resize();
      },
    };

    console.log(containerSettings);
    return containerSettings;
  };

  var isInArray = function(value, array) {
    return array.indexOf(value) > -1;
  };

  var addAutoPlaytoSlimbox = function($slimbox) {
    console.log($slimbox);
    $slimbox.on('click', '.thumbnail', function() {
      slimBoxAutoplay = setInterval(function () {
        var e = jQuery.Event('keydown');
        e.which = 39;
        $(document).trigger(e);
      }, 300);
    });

    $slimbox.on('click', 'lbCloseLink', function() {
      clearInterval(slimBoxAutoplay);
    });
    
  };

  var addImageToGallery = function(image, gallery) {
    var ext = image.url.split('.'); console.log(['extension:', ext]);
        ext = ext[ext.length-1].toLowerCase();

    console.log(image);
    console.log([image.mimeType, image.hidden, ext, acceptedFileTypes, isInArray(ext, acceptedFileTypes)]);
    console.log(['boolean', image.mimeType && !image.hidden && isInArray(ext, acceptedFileTypes)]);
    if (image.mimeType && !image.hidden && isInArray(ext, acceptedFileTypes)) {
      //gallery.push([image.url, image.description]);

      var filename = image.url.split('/');
          filename = filename[filename.length-1];
      var title    = (filename != image.name) ? image.name : false;

      var description = image.description || image.name;

      if (title) {
        description = $('<div/>').append(
                        $('<h3/>').html(title)
                      ).append(
                        $('<p/>').html(description)
                      ).html();
      }

      var a = $('<a/>').attr('title', description)
                       .attr('href', image.url)
                       .addClass('thumbnail')
                       .css({
                          'background': 'url(' + image.url + ') center center no-repeat',
                          'background-size': 'auto 100%',
                        });
      gallery.append(a);

      return true;
    } else {
      return false;
    }
  };

  var displayGallery = function(i, $container, folder) {
    // get the folder data with an ajax call
    $.ajax({
      url: urlPrefix + folder + '.json',
      dataType: 'json',
      success: function(json) {
        var data = json['site_collection'] || json['content_collection'] || { resourceChildren: [] };
            data = data[0]; // json from data means we only need the 0th element

        var html = $('<div/>');

        for (i in data['resourceChildren']) {
          var image = data['resourceChildren'][i];
          addImageToGallery(image, html);
        }

        if (html.children().length > 0) {
          var params = getSettingsFromContainer(i, $container);
          //html.find('a').slimbox(params);
          //addAutoPlaytoSlimbox(html);
          html.find('a').colorbox(params);

          $container.append(html);
        } else {
          $container.append('No images in this directory.');
        }
      }
    });
  };

  return this.each(function(i, container) {
    var $this = $(container);

    displayGallery(i, $this, $this.data('directory'));
  });
};
})(jQuery);
