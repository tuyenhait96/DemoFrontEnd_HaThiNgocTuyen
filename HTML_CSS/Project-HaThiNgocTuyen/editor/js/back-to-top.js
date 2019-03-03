(function() {
    var link;

        toggleScrollToTopLink  = function() {
            if($("body").scrollTop() > 0 || $("html").scrollTop() > 0) { // scrollTop: vị trí chiều dọc hiện tại
                link.fadeIn(400);
            }else{
                link.fadeOut(400);
            }
        };
        
        $(document).ready(function() {
            link = $(".page-top");
            $(window).scroll(toggleScrollToTopLink); //Thêm vào sự kiện scroll của window, nghĩa là lúc trượt sẽ

            toggleScrollToTopLink();
            link.on("click", function(){
                $("body").animate({scrollTop: 0});
                $("html").animate({scrollTop: 0});
            });
        });
})();