CKEDITOR.plugins.add('researcher-training-tool', {
  icons: 'researcher-training-tool',
  init: function(editor) {
    editor.addCommand('researcher-training-tool', new CKEDITOR.dialogCommand('researcherTrainingToolDialog'));
    editor.ui.addButton('researcher-training-tool', {
      label: 'Insert Researcher Training Tool Listing',
      command: 'researcher-training-tool',
      toolbar: 'insert'
    });

    if (editor.contextMenu) {
      editor.addMenuGroup('researcherTrainingToolGroup');
      editor.addMenuItem('researcherTrainingToolItem', {
        label: 'Configure Courses',
        icon: this.path + 'icons/researcher-training-tool.png',
        command: 'researcher-training-tool',
        group: 'researcherTrainingToolGroup'
      });

      editor.contextMenu.addListener(function(element) {
        if (element.getAscendant('div', true) && element.hasClass('courses-widget-container')) {
          return { researcherTrainingToolItem: CKEDITOR.TRISTATE_OFF };
        }
      });
    }

    CKEDITOR.dialog.add('researcherTrainingToolDialog', this.path + 'dialogs/researcher-training-tool.js');
  }
});
