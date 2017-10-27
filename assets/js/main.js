$(window).scroll(function() {
    var height = $(window).scrollTop();
    if (height > 100) {
        $('#return-to-top').fadeIn();
    } else {
        $('#return-to-top').fadeOut();
    }
});

$(document).ready(function() {
    $("#return-to-top").click(function(event) {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });
});