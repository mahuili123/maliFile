$(document).ready(function(){
    $(".goods_img img").each(function(index){
        var $width=$(this).width();
        var $height=$(this).height();
        var $left=-$width/2+"px";
        var $top=-$height/2+"px";
        $(this).css({ "position": "absolute","left":"50%","top":"50%","margin-left":$left,"margin-top":$top});
    });
});
