$(document).ready(function() {
  // load all of the webpages
  var pageLinks = $('#menu .pages a');
  var $content = $('.content');

  pageLinks.each(function() {
    var $this = $(this);
    var page = $this.attr('href').replace('#', '') + '.html';
    var $title = $('.header h2');
    var $page = $('<div/>').addClass('page');

    $.ajax({
      url: page,
      dataType: 'html',
      success: function(html) {
        var $html = $('<div/ >').append($(html));
        var title = $html.find('#title').html();
        var content = $html.find('#content').html();
        var h2 = $('<h2/>').addClass('content-subhead').html(title);
        var pageContent = $('<div/>').html(content);
        var a = $('<a/>').attr('name', $this.attr('href').replace('#', ''));

        $page.append(a).append(h2).append(pageContent);
      },
      error: function() {
      },
      complete: function() {
        $content.append($page);

        return false;
      }
    });

    $this.on('click', function() {
      
    });
  });
});
