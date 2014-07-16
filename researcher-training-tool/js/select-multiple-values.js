CKEDITOR.ui.dialog.uiElement.prototype.getValues = function() {
  // get the options from the dialog's input element
  var select = this.getInputElement();
  var selectedOptions = select.$.selectedOptions;
  var values = [];

  // add values to array
  for (i = 0; i < selectedOptions.length; i++) {
    values.push(selectedOptions[i].value);
  }

  return values;
};

CKEDITOR.ui.dialog.uiElement.prototype.setValues = function(values) {
  var select = this.getInputElement();

  // go through options; if that option is in the values array, set it
  for (i = 0; i < select.$.length; i++) {
    // first reset the option, otherwise if the dialog has been used
    // multiple times, the options for various rtt embeds may bleed together
    select.$[i].selected = false;

    if (values.indexOf(select.$[i].value) > -1) {
      select.$[i].selected = true;
    }
  }
};
