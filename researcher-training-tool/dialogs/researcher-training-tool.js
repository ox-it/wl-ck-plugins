(function() {
// get plugin paths
var h = CKEDITOR.plugins.get('researcher-training-tool');
var path = h.path;

// load css and javascript files
// ...

// register dialog
CKEDITOR.dialog.add('researcherTrainingToolDialog', function(editor) {
  return {
    // dialog definition
  };
});
})();
