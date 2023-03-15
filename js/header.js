
$(document).ready(function(){
    // 메뉴 호버 이벤트
    $(".gnb-wrap .gnb ul li").on('mouseover', function(){
        $(".all-menu").removeClass('on')
        $(this).children(".all-menu").addClass("on")
        $(this).addClass("on")
    });
    $(".gnb-wrap .gnb").on('mouseleave', function(){
        $(".all-menu").removeClass('on')
        $(".gnb-wrap .gnb ul>li").removeClass('on')
    });

    //tab 접근성
    $(".gnb > ul > li> a").on("focus", function () {
        $(this).next(".all-menu").addClass("on");
    }); 
});