$(document).ready(function () {
    var touch = $('a#touch-menu');
    var menu  = $('ul.menu');

    $(touch).on('click', function(e){
        e.preventDefault();
        menu.slideToggle();
    });
});