$(document).ready(function() {
  $('#layout').on('click', '#menuLink', function() {
    $('#layout, #menu, #menuLink').toggleClass('active');
  });
});
