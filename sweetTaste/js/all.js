$(document).ready(function() {
   $('.burgerBar').on('click',  function(e){
      e.preventDefault();
      $('.menu').toggleClass('menu-show');
  });
});