CKEDITOR.plugins.add('twitter', {
  icons: 'twitter',
  init: function(editor) {
    editor.addCommand('twitter', new CKEDITOR.dialogCommand('twitterDialog'));
    editor.ui.addButton('twitter', {
      label: 'Insert Twitter Timeline',
      command: 'twitter',
      toolbar: 'insert'
    });

    if (editor.contextMenu) {
      editor.addMenuGroup('twitterGroup');
      editor.addMenuItem('twitterItem', {
        label: 'Edit Timeline',
        icon: this.path + 'icons/twitter.png',
        command: 'twitter',
        group: 'twitterGroup'
      });

      editor.contextMenu.addListener(function(element) {
        if (element.getAscendant('div', true) && element.hasClass('twitter-timeline')) {
          return { twitterItem: CKEDITOR.TRISTATE_OFF };
        }
      });
    }

    CKEDITOR.dialog.add('twitterDialog', this.path + 'dialogs/twitter.js');
  }
});
