
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
        direction: 'left',
        hoverEnabled: false
    });
});

$(document).ready(function(){
    $('.sidenav').sidenav();
    // var instance = M.Sidenav.getInstance($('.sidenav'));
    // instance.open();
});

function scrollToBot(){
    var dialogWrapper = $('#card-content');
    var height = dialogWrapper[0].scrollHeight;
    dialogWrapper.scrollTop(height);
}

(function($){
    $(window).on("load",function(){
        // var Scrollbar = window.Scrollbar;
        // Scrollbar.initAll();
        // Scrollbar.init(document.querySelector('#card-content'));
    
        $("#logout-btn").click(function(e){
            e.preventDefault();
            alert("logout")
        });

        scrollToBot();
    });
})(jQuery);