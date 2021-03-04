$(function() {
    if ($(window).width() < 769) {
        $(".bottomHeader").css({ top: $('.topHeader').outerHeight(true) });
    }
 
    $(".tab_title_inner_blk li").on("click", function(e) {
        changeTab($(this));
    });

    if (window.location.hash) {
        var hash = window.location.hash;
        $(".tab_title_inner_blk li span a[href='" + hash + "']").parents("li").click();
    }
   
    if ($('.scroll').length) {
        $('.scroll').jScrollPane();
    }

});

$(window).resize(function() {
    if ($('.scroll').length) {
        $('.scroll').jScrollPane();
    }
    // var bannerHeight = $(window).height() - $("header").height();
    // $(".banner_blk").height(bannerHeight);
});

function changeTab(el) {
    el.parents(".tab_blk").find(".tab_title_inner_blk li").removeClass("active");
    el.addClass("active");
    var index = el.parents(".tab_blk").find(".tab_title_inner_blk li").index(el);
    el.parents(".tab_blk").find(".tab_cont_li").removeClass("active").eq(index).addClass("active");
    // console.log(index);
}