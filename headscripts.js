/**
 * Scripts to run in the header for all output pages from CKEditor
 */

$(document).ready(function() {
  // youtube
  $('[data-youtube-embed]').youtubeEmbed();

  // vimeo
  $('[data-vimeo-embed]').vimeoEmbed();

  // twitter
  $('[data-twitter-timeline]').twitterTimeline();

  // folder-listing
  $('[data-folder-listing]').folderListing();

  // image-gallery
  $('[data-image-gallery]').wlImageGallery();

  // oxam
  $('[data-oxam-embed]').oxamEmbed();

  // solo-citation
  $('[data-solo-citation]').soloCitation();

  // oxpoints
  $('[data-oxpoint]').oxPointMap();

  // oxitems
  $('[data-oxitem]').oxItems();

  // researcher-training-tool
  $('[data-researcher-training-tool]').oxfordCoursesWidget();
});
