$(document).ready(function() {
  // load all of the webpages
  var pageLinks = $('#menu .pages a');
  var $content = $('.content');

  // credit to Scott Dowding @ StackOverflow
  // http://stackoverflow.com/questions/487073/check-if-element-is-visible-after-scrolling
  var isScrolledIntoView = function(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    console.log([docViewTop, docViewBottom, elemTop, elemBottom]);

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  };

  pageLinks.each(function(i, p) {
    var $this = $(this);
    var id = $this.attr('href').replace('#', '');
    var page = id + '.html';
    var $title = $('.header h2');
    var $page = $('<div/>').addClass('page').attr('data-page', id);

    $.ajax({
      url: page,
      dataType: 'html',
      async: false,
      success: function(html) {
        var $html = $('<div/ >').append($(html));
        var title = $html.find('#title').html();
        var content = $html.find('#content').html();
        var h2 = $('<h2/>').addClass('content-subhead').html(title);
        var pageContent = $('<div/>').html(content);
        var a = $('<a/>').attr('name', id);

        $page.append(a).append(h2).append(pageContent);
      },
      error: function() {
      },
      complete: function() {
        $content.append($page);


        if (i == (pageLinks.length - 1)) {
          var pages = $('.page');
          pages.waypoint(function(direction) {
            var $this = $(this);
            var page = $this.data('page');

            var link = $('#menu a[href="#' + page + '"]');
            pageLinks.closest('li').removeClass('active');
            link.closest('li').addClass('active');
          });
        }

        return false;
      }
    });

    $this.on('click', function() {
      pageLinks.closest('li').removeClass('active');
      $this.closest('li').addClass('active');
    });
  });
});
