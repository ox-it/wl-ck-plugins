/**
  * Title:        YouTubeEmbed
  * Description:  Search for and embed YouTube videos from within CKEditor
  * Author:       Lawrence Okoth-Odida
  * Version:      0.1
  * Date:         04/06/2014
  * Notes:        Created using the abbr sample plugin on CKEditor Documentation
 */
CKEDITOR.plugins.add('youtube', {
  icons: 'youtube',

  init: function(editor) {
    editor.addCommand('youtube', new CKEDITOR.dialogCommand('youtubeDialog'));
  editor.ui.addButton( 'Youtube', {
    label: 'Embed Youtube Video',
    command: 'youtube',
    toolbar: 'insert'
    });

  // add context menu for editing a video link
    if (editor.contextMenu) {
      editor.addMenuGroup('youtubeGroup');

      editor.addMenuItem( 'youtubeItem', {
        label: 'Edit Video',
        icon: this.path + 'icons/youtube.png',
        command: 'youtube',
        group: 'youtubeGroup'
      });

      editor.contextMenu.addListener(function(element) {
        if (element.getAscendant('div', true) && element.hasAttribute('data-youtube-embed')) {
          return { youtubeItem: CKEDITOR.TRISTATE_OFF };
        }
      });
    }

    // register dialog
    CKEDITOR.dialog.add( 'youtubeDialog', this.path + 'dialogs/youtube.js' );
  }
});
