/**
  * jQuery for handling the loading of the site and behaviour of the links
  */
$(document).ready(function() {
  /**
    * VARIABLES
    */
  var pageLinks = $('#menu .pages a');
  var $content = $('.content');

  /**
    * FUNCTIONS
    */

  var setCurrentPageLink = function($pageLinks, $link) {
    $pageLinks.closest('li').removeClass('active');
    $link.closest('li').addClass('active');
  };

  var loadAjaxPageContent = function($page, ajaxHtml, pageId) {
    var $html = $('<div/ >').append($(ajaxHtml));
    var title = $html.find('#title').html();
    var content = $html.find('#content').html();
    var h2 = $('<h2/>').addClass('content-subhead').html(title);
    var pageContent = $('<div/>').html(content);
    var a = $('<a/>').attr('name', pageId);

    $page.append(a).append(h2).append(pageContent);
  };

  var historyPushState = function(pageId) {
    history.pushState(null, $('title').text(), '#' + pageId);
  };

  var bindWaypointToPages = function($pages, $pageLinks) {
    var setUpPage = function($page) {
      var page = $page.data('page');
      var link = $('#menu a[href="#' + page + '"]');
      var title = $page.find('h2').first().text();
      var titlePrefix = $('.header h1').text();

      setCurrentPageLink($pageLinks, link);
      $('title').html(titlePrefix + ' - ' + title);
    };

    $pages
      .waypoint(function(direction) {
        if (direction === 'down') {
          setUpPage($(this));
        }
      })
      .waypoint(function(direction) {
        if (direction === 'up') {
          setUpPage($(this));
        }
      }, {
        offset: function() {
          return -$(this).height();
        }
      });
  };

  var bindScrollToPage = function($anchor, pageId) {
    $anchor.on('click', function() {
      $('html, body').animate({
        scrollTop: $('[data-page="' + pageId + '"]').offset().top + 3,
      }, 1000);

      historyPushState(pageId);

      return false;
    });
  }

  /**
    * PROCEDURES
    */

  pageLinks.each(function(i, p) {
    var $this = $(this);
    var id = $this.attr('href').replace('#', '');
    var page = id + '.html';
    var $title = $('.header h2');
    var $page = $('<div/>').addClass('page').attr('data-page', id);

    // load the page content
    $.ajax({
      url: page,
      dataType: 'html',
      async: false,
      success: function(html) {
        loadAjaxPageContent($page, html, id);
      },
      error: function() {
      },
      complete: function() {
        $content.append($page);

        // once all pages are loaded, bind waypoint() to them
        if (i == (pageLinks.length - 1)) {
          var pages = $('.page');
          bindWaypointToPages(pages, pageLinks);
        }
      }
    });

    bindScrollToPage($this, id);
  });
});
