(function() {
// get plugin paths
var h = CKEDITOR.plugins.get('researcher-training-tool');
var path = h.path;

// load css and javascript files
if (!$.browser)         // fix for $.browser being undefined in jQuery 1.9+
  CKEDITOR.scriptLoader.load('http://code.jquery.com/jquery-migrate-1.2.1.js');
if (!$.fn.autocomplete) // fix in case the ui library hasn't loaded yet
  CKEDITOR.scriptLoader.load('https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.22/jquery-ui.min.js');

CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(h.path + 'css/dialog.css'));
CKEDITOR.scriptLoader.load(path + '/js/oxpoints-autocomplete.js');
CKEDITOR.scriptLoader.load(path + '/js/skills.js');
CKEDITOR.scriptLoader.load(path + '/js/select-multiple-values.js');

// method for getting starting before/after date from string
var getCourseDate = function(date) {
  return (date && date.split('T')[0]) ? date.split('T')[0] : null;
};

// keeps track of attributes in preview (so preview doesn't refresh if attributes stay the same)
var previewAttributes = {};

// register dialog
CKEDITOR.dialog.add('researcherTrainingToolDialog', function(editor) {
  return {
    title: 'Embed Researcher Training Tool Listing',
    minWidth: 500,
    minHeight: 200,
    resizable: CKEDITOR.DIALOG_RESIZE_NONE,

    contents: [
      {
        // selection criteria
        id: 'selection-criteria',
        label: 'Selection Criteria',
        elements: [
          {
            type: 'text',
            id: 'provided-by',
            label: 'Provided By',
            className: 'oxpoint_autocomplete',
            onLoad: function() {
              var input = $('.oxpoint_autocomplete input');
              input.oxPointsAutoComplete({
                select: function(event, ui) {
                  input.attr('data-uri', ui.item.uri);
                  input.attr('data-name', input.val());
                }
              });
            },
            setup: function(element) {
              this.setValue(element.getAttribute('data-providedBy'));
            },
            commit: function(element) {
              var value = '';
              var uri = $('.oxpoint_autocomplete input').data('uri');

              if (uri)
                value = uri;
              else
                value = this.getValue();

              element.setAttribute('data-providedBy', value);
            }
          },
          {
            type: 'hbox',
            widths: ['50%', '50%'],
            children: [
              {
                type: 'text',
                id: 'starting-after',
                label: 'Starting After',
                className: 'cke_datepicker',
                setup: function(element) {
                  // parse date from the full string (everything prior to the T)
                  var date = getCourseDate(element.getAttribute('data-startingAfter'));
                  this.setValue(date);
                },
                commit: function(element) {
                  var date = this.getValue();

                  if (date)
                    element.setAttribute('data-startingAfter', date + 'T00:00:00');
                  else if (!this.insertMode)
                    element.removeAttribute('data-startingAfter');
                }
              },
              {
                type: 'text',
                id: 'starting-before',
                label: 'Starting Before',
                className: 'cke_datepicker',
                setup: function(element) {
                  var date = getCourseDate(element.getAttribute('data-startingBefore'));
                  this.setValue(date);
                },
                commit: function(element) {
                  var date = this.getValue();

                  if (date)
                    element.setAttribute('data-startingBefore', date + 'T00:00:00');
                  else if (!this.insertMode)
                    element.removeAttribute('data-startingBefore');
                }
              }
            ]
          },
          {
            type: 'hbox',
            widths: ['50%', '30%', '20%'],
            children: [
              {
                type: 'select',
                id: 'eligibility',
                label: 'Eligibility',
                className: 'select_multiple',
                multiple: true,
                items: [
                  ['Staff', 'ST'],
                  ['Members of the University', 'OX'],
                  ['Public', 'PU'],
                ],
                setup: function(element) {
                  var values = element.getAttribute('data-eligibility');
                  if (values)
                    this.setValues(values.trim().split(' '));
                },
                commit: function(element) {
                  var values = this.getValues();
                  element.setAttribute('data-eligibility', values.join(' '));
                }
              },
              {
                type: 'select',
                id: 'skill',
                label: 'Skill',
                className: 'select_multiple',
                multiple: true,
                items: [['', '']].concat(getSkillCodes()),
                setup: function(element) {
                  var skills = element.getAttribute('data-skill');
                  if (skills)
                    this.setValues(values.trim().split(' '));
                },
                commit: function(element) {
                  var skills = this.getValues();
                  if (skills)
                    element.setAttribute('data-skill', skills.join(' '));
                  else if (!this.insertMode)
                    element.removeAttribute('data-skill');
                }
              },
              {
                type: 'select',
                id: 'research-method',
                label: 'Research Method',
                items: [
                  ['', ''],
                  ['Qualitative', 'qualitative'],
                  ['Quantitative', 'quantitative'],
                ],
                setup: function(element) {
                  this.setValue(element.getAttribute('data-researchMethod'));
                },
                commit: function(element) {
                  var method = this.getValue();
                  if (method)
                    element.setAttribute('data-researchMethod', this.getValue());
                  else if (!this.insertMode)
                    element.removeAttribute('data-researchMethod');
                }
              }
            ]
          }
        ]
      },
      {
        // display settings
        id: 'display-settings',
        label: 'Display Settings',
        elements: [
          {
            type: 'text',
            id: 'title',
            label: 'Title',
            setup: function(element) {
              this.setValue(element.getAttribute('data-title'));
            },
            commit: function(element) {
              element.setAttribute('data-title', this.getValue());
            }
          },
          {
            type: 'hbox',
            widths: ['50%', '25%', '25%'],
            children: [
              {
                type: 'select',
                id: 'display-columns',
                label: 'Columns to display',
                className: 'select_multiple',
                multiple: true,
                items: [
                  ['Start', 'start'],
                  ['Title', 'title'],
                  ['Subject', 'subject'],
                  ['Provider', 'provider'],
                  ['Description', 'description'],
                  ['Venue', 'venue'],
                  ['Eligibility', 'eligibility'],
                ],
                'default': 'title',
                setup: function(element) {
                  this.setValues(element.getAttribute('data-displayColumns').trim().split(' '));
                },
                commit: function(element) {
                  var values = this.getValues();
                  element.setAttribute('data-displayColumns', values.join(' '));
                }
              },
              {
                type: 'select',
                id: 'default-dates-view',
                label: 'Default dates view',
                items: [
                  ['With Dates', 'withDates'],
                  ['Wihout Dates', 'withoutDates'],
                ],
                setup: function(element) {
                  this.setValue(element.getAttribute('data-defaultDatesView'));
                },
                commit: function(element) {
                  element.setAttribute('data-defaultDatesView', this.getValue());
                }
              },
              {
                type: 'checkbox',
                id: 'show-without-dates-link',
                label: 'Show without dates link?',
                setup: function(element) {
                  this.setValue(element.getAttribute('data-showWithoutDatesLink') == 'true');
                },
                commit: function(element) {
                  element.setAttribute('data-showWithoutDatesLink', this.getValue());
                }
              }
            ]
          }
        ]
      },
      {
        // preview
        id: 'preview',
        label: 'Preview',
        elements: [
          {
            type: 'html',
            id: 'preview',
            html: '<div class="rttpreview"></div>',
            onShow: function() {
              // get the dialog so we can access the element values
              var dialog = this.getDialog();

              // make clicking the tab trigger the preview
              $('#researcherTrainingToolDialog').on('click', "[id*='cke_preview_']", function() {

                var previewWindow = $('.rttpreview');
                var div = $('<div class="courses-widget-container"/>');
                var dateSuffix = 'T00:00:00';

                // get data from the fields
                var attributes = {
                  // selection criteria
                  'providedBy':     $('.oxpoint_autocomplete input').data('uri'),
                  'startingBefore': dialog.getValueOf('selection-criteria', 'starting-before') + dateSuffix,
                  'startingAfter':  dialog.getValueOf('selection-criteria', 'starting-after') + dateSuffix,
                  'skill':          dialog.getContentElement('selection-criteria', 'skill').getValues().join(' '),
                  'eligibility':    dialog.getContentElement('selection-criteria', 'eligibility').getValues().join(' '),
                  'researchMethod': dialog.getValueOf('selection-criteria', 'research-method'),

                  // display settings
                  'title':                dialog.getValueOf('display-settings', 'title'),
                  'displayColumns':       dialog.getContentElement('display-settings', 'display-columns').getValues().join(' '),
                  'defaultDatesView':     dialog.getValueOf('display-settings', 'default-dates-view'),
                  'showWithoutDatesLink': dialog.getValueOf('display-settings', 'show-without-dates-link')
                };

                // go through the attributes, putting the data into the div
                for (attr in attributes) {
                  if (attributes[attr] == '' || attributes[attr] === "undefined" || attributes[attr] == dateSuffix)
                    delete attributes[attr];

                  if (attributes[attr])
                    div.attr('data-' + attr, attributes[attr]);
                }

                if (JSON.stringify(previewAttributes) !== JSON.stringify(attributes)) {
                  // empty the preview window and put the new div in
                  previewWindow.empty().append(div);

                  // bind functionality to the container
                  previewWindow.find('.courses-widget-container').oxfordCoursesWidget({
                    callbacks: {
                      fnInitComplete: function(settings, json) {
                        // add CKEditor classes for uniform styling
                        var table = previewWindow.find('.courses-widget-container');

                        table.find('input').addClass('cke_dialog_ui_input_text');
                        table.find('select').addClass('cke_dialog_ui_input_select');

                        // buttons
                        table.find('.dataTables_paginate a').each(function(i, button) {
                          var $this = $(this);
                          var inner = $this.html();
                          $this.html($('<span class="cke_dialog_ui_button"/>').html(inner));
                          $this.addClass('cke_dialog_ui_button cke_dialog_ui_button_ok');
                        });
                      }
                    }
                  });

                  // add classes for easier styling of the table
                  previewAttributes = attributes;
                }
              });
            },
          }
        ]
      }
    ],

    onLoad: function() {
      // give dialog a class for easier styling
      $(this.getElement()).attr('id', 'researcherTrainingToolDialog');

      // put datepicker functionality on appropriate fields
      $('.cke_datepicker input').datepicker({ dateFormat: 'yy-mm-dd' });
    },

    onShow: function() {
      var selection = editor.getSelection();
      var element = selection.getStartElement();
      if (element)
        element = element.getAscendant('div', true);

      if (!element || element.getName() != 'div' || !element.hasClass('courses-widget-container')) {
        element = editor.document.createElement('div');
        element.addClass('courses-widget-container');

        this.insertMode = true;
      }
      else
        this.insertMode = false;

      this.element = element;

      if (!this.insertMode)
        this.setupContent(this.element);
    },

    onOk: function() {
      var dialog = this;
      var div = this.element;

      this.commitContent(div);

      if (this.insertMode)
        editor.insertElement(div);
    }
  };
});
})();
