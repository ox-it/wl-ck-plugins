/**
 * The ccphoto dialog definition.
 *
 * Created out of the CKEditor Plugin SDK:
 * http://docs.ckeditor.com/#!/guide/plugin_sdk_sample_1
 */

// Our dialog definition.
CKEDITOR.dialog.add( 'ccphotoDialog', function( editor ) {
	return {
		title: 'Embed Creative Commons Images',
		width: 500,
		minHeight: 300,
		resizable: CKEDITOR.DIALOG_RESIZE_NONE,

		contents: [
		  {
		    id: 'search-cc',
		    label: 'Search CC Images',
		    elements: [
		      {
		        type: 'html',
		        id: 'search-cc-form',
		        html: 
		            '<iframe class="ccsearchframe" src="about:blank"></iframe>' +
                '<ul id="ccsearchresults"></ul>',
		        onLoad: function() {
		          var iframe = $('.ccsearchframe').contents();
		          
		          iframe.find('head').append($('head script, head link').clone());
		          iframe.find('body').append(
		            '<h2>Flickr Search</h2>' +
		            '<p>Search below for Creative Commons images in Flickr, then click the desired size image to get the URL. Click OK to embed the image on the page.</p>' +
		            '<p><strong>Note: </strong> to change the image, delete it and insert a new one.</p>' +
		            
		            '<div id="ccsearchform">' +
	                '<form>' +
	                  '<input id="ccsearchquery" type="text" class="cke_dialog_ui_input_text" name="text" placeholder="Search here..."/>' +
	                  //'<div id="queryselect">' + 
	                    '<select id="ccsearchtype" class="cke_dialog_ui_input_select">' +
	                      '<option value="text">Text</option>' + 
	                      '<option value="tags">Tags</option>' + 
	                    '</select>' +
	                  //'</div>' +
	                  '<a id="ccsearchbutton" class="cke_dialog_ui_button cke_dialog_ui_button_ok">&#xf002;</a>' +
	                '</form>' +
	              '</div>');
		          
		          iframe.find('body').css({
                padding: 0,
                width: '100%',
              });
              
              iframe.find('#ccsearchform').ccsearch({
                key: '249e4e26d111d01865ac3f5964ecbb5d',
                service: 'Flickr',
                params: {
                  //cx: '000657265857149328728:dfiumu__awa',
                  'sort': 'relevance',
                  'license': 1,
                  'per_page': 20,
                },
                results: '#ccsearchresults',
                displayResult: function (item) {
                  var display = $('<li></li>');
                  var getImgLink = function(size) {
                    return 'https://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + size + '.jpg';
                  }
                  var img = $('<img/>')
                              .attr('class', 'img')
                              .attr('src', getImgLink('_q'))
                              .data('src', getImgLink(''));        
                  var options = [
                    $('<a/>').attr('href', getImgLink('_q')).attr('class', 'square').html('&#xf096;'),
                    $('<a/>').attr('href', getImgLink('_m')).attr('class', 'small').html('S'),
                    $('<a/>').attr('href', getImgLink('_z')).attr('class', 'medium').html('M'),
                    $('<a/>').attr('href', getImgLink('_b')).attr('class', 'large').html('L')
                  ];
                  var span = $('<span/>')
                                  .attr('class', 'sizes')
                                  .data('title', item.title);
                                 
                  for (op in options) span.append(options[op]);
                  
                  display.append(img).append(span);
                  
                  /*
                  var html = '<li>';
                  var img = function(size) {
                    return 'https://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + size + '.jpg';
                  }
                  
                  var url = 'https://www.flickr.com/photos/' + item.owner + '/' + item.id;
                  
                  html = html + '<img data-src="' + img('') + '" src="' + img('') + '" class="img" data-credit="' + '' + '"/>';
                  
                  html = html + '<span class="sizes" data-title="' + item.title + '"><a href="' + img('_q') + '" class="square">[]</a>' +
                                '<a href="' + img('_m') + '" class="small">S</a>' +
                                '<a href="' + img('_z') + '" class="medium">M</a>' +
                                '<a href="' + img('_b') + '" class="large">L</a></span>';
                  
                  html = html + '</li>';
                  return html;
                  */
                  
                  return display;
                }
              });
              
              iframe.find('#ccsearchform').on('change', 'select', function() {
                iframe.find('#ccsearchquery').attr('name', $(this).val());
              });
		          		        
		          var dialog = this.getDialog();
		          $('#ccsearchresults').on('click', '.sizes a', function() {
		            dialog.setValueOf('settings', 'src', $(this).attr('href'));
		            dialog.setValueOf('settings', 'credit', $(this).closest('.sizes').data('title'));
		            dialog.selectPage('settings');
		            return false;
		          });
            }
		      }
		    ],
		  },
			{
				// Definition of the Basic Settings dialog tab (page).
				id: 'settings',
				label: 'Settings',

				// The tab contents.
				elements: [
					{
						// Text input field for the ccphotoeviation text.
						type: 'text',
						id: 'src',
						label: 'Source',

						// Validation checking whether the field is not empty.
						validate: CKEDITOR.dialog.validate.notEmpty( "URL source cannot be empty" ),
					  setup: function(element) {
							this.setValue(element.getAttribute('src'));
						},
					  commit: function (element) {
							var src = this.getValue();
							if (src) {
							  //alert(src);
								element.setAttribute('src', src);
							}
							else if (!this.insertMode)
								element.removeAttribute('src');
						}
					},
					{
						type: 'text',
						id: 'credit',
						label: 'Credit',
						setup: function(element) {
							this.setValue(element.getAttribute('alt'));
						},
					  commit: function (element) {
							var credit = this.getValue();
							if (credit)
								element.setAttribute('alt', credit);
							else if (!this.insertMode)
								element.removeAttribute('alt');
						}
					},
					
					{
						type: 'select',
						id: 'alignment',
						label: 'Alignment',
						items: [['Not Set', 'none'], ['Left', 'left'], ['Right', 'right']],
						setup: function(element) {
						  //if (element.getAttribute('style'))
						    //this.setValue(element.getAttribute('data-credit')
							//this.setValue(element.getAttribute('data-credit'));
						},
					  commit: function (element) {
					    /*
							var credit = this.getValue();
							if (credit)
								element.setAttribute('data-credit', credit);
							else if (!this.insertMode)
								element.removeAttribute('data-credit');
						  */
						}
					}
					
				]
			}
		],

		onShow: function() {
      var selection = editor.getSelection();
      var element = selection.getStartElement();
      if ( element )
				element = element.getAscendant( 'img', true );

			if ( !element || element.getName() != 'img' || !element.hasClass('ccimage')) {
				element = editor.document.createElement('img');
				element.addClass('ccimage');

				// Flag the insertion mode for later use.
				this.insertMode = true;
			}
			else
				this.insertMode = false;

			this.element = element;

			// Invoke the setup methods of all dialog elements, so they can load the element attributes.
			if (!this.insertMode) {
				this.setupContent(this.element);
				this.selectPage('settings');
		  }
		},

		// This method is invoked once a user clicks the OK button, confirming the dialog.
		onOk: function() {
			var dialog = this;
			var img = this.element;
			this.commitContent(img);
      if (this.insertMode)
        editor.insertElement(img);
		}
	};
});
