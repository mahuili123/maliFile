$(function(){
    //
    $(".itemFr ul li").click(function(){
        $(this).hasClass("selected") ? $(this).removeClass("selected") : $(this).addClass("selected").siblings().removeClass("selected");
    });
    //search
    $(".search label").click(function(){
        $(this).hide().next().focus();
        $(this).next().click(function () {
            $(this).prev().hide();
        });
        $(this).next().blur(function(){
            if($(this).val()){
                $(this).prev().hide();
            }else{
                $(this).prev().show();
            }
        });
    });
//
    $(".textInput p").click(function(){
        $(this).next("ol").show();
        $(this).children("i").addClass("foo");
        $(this).next("ol").children().click(function(){
            $(this).parent().hide();
            $(this).parent().prev().children("span").html($(this).html());
            $(this).parent().prev().children("i").removeClass("foo");
            $(this).parent().prev().prev().val($(this).html());
        });
    });
//
    $(".codeSend label").click(function(){
        $(this).hide();
        $(this).next("input").focus();
    });
    $(".codeSend input").click(function(){
        $(this).prev("label").hide();
    });
//
    $(".sendClick").click(function(){
        $(".sendPop .mask").show();
        $(".sendPop .sendContent").show();
    });
    $(".cancelSend").click(function(){
        $(".sendPop .mask").hide();
        $(".sendPop .sendContent").hide();
    });


    function buyNum(){
        $(".increment").click(function(){
            var $num=parseInt($("#buy-num").val());
            $num++;
            $("#buy-num").val($num);
        });
        $(".decrement").click(function(){
            var $num=parseInt($("#buy-num").val());
            $num<=0 ? $num=0 : $num--;
            $("#buy-num").val($num);
        });
    }
    buyNum();





});
