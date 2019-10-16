
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
        direction: 'left',
        hoverEnabled: false
    });
});

(function($){
    $(window).on("load",function(){
        // var Scrollbar = window.Scrollbar;
        // Scrollbar.initAll();
        // Scrollbar.init(document.querySelector('#card-content'));
    });
})(jQuery);