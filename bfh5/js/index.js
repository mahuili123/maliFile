var winW = document.documentElement.clientWidth;
var desW = 640;
var proportion = desW/100;/*±ÈÀý*/
document.documentElement.style.fontSize = winW/proportion +"px";
if(winW>desW){
    document.documentElement.style.fontSize = "100px";
}
/////
$(function(){
    //login
    $(".inputIn>li").children("input").on("click",function(){
        $(this).parent().children("span").show();
        $(this).parent().siblings().children("span").hide();
    });
    ///
    $(".checkChange").on("click",function(){
        $(this).hasClass("checked") ? $(this).removeClass("checked").siblings("input").removeAttr("checked","false") :  $(this).addClass("checked").siblings("input").attr("checked","checked");
    });
    //
    var $carTSpan=$(".carT span");
    $carTSpan.each(function(index){
        new FastClick($carTSpan[index]);
        $(this).on("click",function(){
            $(this).hasClass("selected") ? $(this).removeClass("selected").parent().siblings().hide():($(this).is("[id]") ? $(this).addClass("selected").siblings().removeClass("selected").parent().siblings().show().children("input").focus(): $(this).addClass("selected").siblings().removeClass("selected").parent().siblings().hide());
        })
    });
 /*   $(".carT span").on("click",function(){
        if($(this).hasClass("selected")){
            $(this).removeClass("selected").parent().siblings().hide();
        }else{
            $(this).is("[id]") ? $(this).addClass("selected").siblings().removeClass("selected").parent().siblings().show(): $(this).addClass("selected").siblings().removeClass("selected").parent().siblings().hide();
        }
    });*/
    //
    function buyNum(){
        var $increment= $(".increment");
        var $decrement= $(".decrement");
        var $buyNum=$("#buy-num");
        $increment.each(function(){
            new FastClick($increment[0]);
           $(this).on("click",function(){
                var $num=parseInt($("#buy-num").val());
                $num++;
                $("#buy-num").val($num);
            });
        })
        $decrement.each(function(){
            new FastClick($decrement[0]);
            $(this).on("click",function(){
                var $num=parseInt($("#buy-num").val());
                $num<=0 ? $num=0 : $num--;
                $("#buy-num").val($num);
            });
        })
        $buyNum.each(function(){
            new FastClick($buyNum[0]);
            $(this).on("click",function(){
                $(this).focus();
            });
        })
    }
    buyNum();
    //
    var $tagBli = $(".tagBox dl li");
    $tagBli.each(function(index){
        new FastClick($tagBli[index]);
        $(this).on("click",function(){
            $(this).hasClass("disable") ? $(this).removeClass("selected") : $(this).addClass("selected").siblings().removeClass("selected");
        })
    });
    $(".selectedTag").on("click",function(){
        $(".tagLayer").show();
    });
    $("#btnSure").click(function(){
        $(".tagLayer").hide();
    });
    $(".closed .close").on("click",function(){
        $(".tagLayer").hide();
    });
    //
    var $befTar=$(".manageAd li .befTar");
    $befTar.each(function(index){
        new FastClick($befTar[index]);
        $(this).on("click",function(){
            $(this).hasClass("selected") ?  $(this).parent().siblings().children(".befTar").removeClass("selected") : $(this).addClass("selected").parent().siblings().children(".befTar").removeClass("selected");
        });
    });















});






