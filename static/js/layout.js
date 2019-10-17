
document.addEventListener('DOMContentLoaded', function () {
    const elems = document.querySelectorAll('.fixed-action-btn');
    const instances = M.FloatingActionButton.init(elems, {
        direction: 'left',
        hoverEnabled: false
    });
});

$(document).ready(function () {
    $('.sidenav').sidenav();
    // const instance = M.Sidenav.getInstance($('.sidenav'));
    // instance.open();
});

function scrollToBot() {
    const dialogWrapper = $('#card-content');
    if (dialogWrapper[0]) {
        const height = dialogWrapper[0].scrollHeight;
        dialogWrapper.scrollTop(height);
    }
}

(function ($) {
    $(window).on("load", function () {
        // const Scrollbar = window.Scrollbar;
        // Scrollbar.initAll();
        // Scrollbar.init(document.querySelector('#card-content'));

        $("#logout-btn").click(function (e) {
            e.preventDefault();
            alert("logout")
        });

        scrollToBot();
    });
})(jQuery);