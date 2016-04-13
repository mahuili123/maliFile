//
$(function(){
   $("#addAdd").click(function(){
        $("#addressPopups").show();
        $("#select2-chosen-1").html("省份/直辖市 ");
        $("#select2-chosen-2").html("城市/地区");
        $("#select2-chosen-3").html("区/县");
        $("#btnAddSave").attr("onclick","getAddress()");
   });
    $(".btnAddCancel").click(function(){
        $("#addressPopups").hide();
        $("#btnAddSave").removeAttr("onclick");
        $(".inputIn li input").attr("value","");
        $(".inputIn li.textLi span").css({"top":"15px","font-size":"14px"});
        $("#errorMsg").html("");
    });
});
///
$(function(){
    $(".inputIn>li").click(function(){
        $(this).children("input").focus();
        $(this).children("span").stop().animate({top:"-9px"});
        $(this).addClass("onSpan");
        $(this).siblings().removeClass("onSpan");
        $(this).children("input").blur(function(){
            if($(this).val()==""){
                $(this).next("span").stop().animate({top:"15px"}).css({"color":"#999","font-size":"14px"});
                $(this).attr("placeholder","");
            }else{
                $(this).next("span").stop().animate({top:"-9px"}).css({"color":"#999","font-size":"14px"});
            }
        });
        $(this).children("input").focus(function(){
            $(this).next("span").css({"color":"#e73d4d","font-size":"14px"})
        });
    });
});
//////
$(function(){
    //login
   $(".checkChange").click(function(){
       if($(this).hasClass("checked")){
           $(this).removeClass("checked").siblings("input").removeAttr("checked","false");
       }else{
           $(this).addClass("checked").siblings("input").attr("checked","checked");
       }
   });
    //orderSubmit
    $(".orderInfoR").click(function(){
        var $childI=$(this).children("i");
        if($childI.hasClass("down")){
            $(this).parent().siblings(".orderContent").hide();
            $childI.removeClass("down");
            $(this).prev().show();
        }else{
            $(this).parent().siblings(".orderContent").show();
            $(this).prev().hide();
            $childI.addClass("down");
        }
    });
    //
    $(".tab li").click(function () {
        var $index = $(this).index();
        $(this).addClass("select").siblings().removeClass("select");
        $(this).parent().siblings(".tabDiv").each(function (index, item) {
            index === $index ? $(item).addClass("select") : $(item).removeClass("select");
        });
        if($(this).attr("id")){
            $(".unitInvoice input").focus().keydown(function(event){
                $(this).prev().hide();
                $(".vSave").show();
            });
        }
    });
    //
    $(".vSave").click(function(){
        var $value=$(this).siblings("input").val();
        $(this).siblings("dl").show().find(".vContent").html($value);
        $(this).siblings("input").hide();
        $(this).siblings("p").hide();
        $(this).hide();
    });
    //
    $(".vModify").click(function(){
        $(this).parent().parent().hide();
        var $parent=$(this).parent().parent();
        var $value=$(this).siblings(".vContent").html();
        $parent.siblings("input").show().val($value);
        $parent.siblings("p").show();
        $parent.siblings("input").val($value).focus();
        $parent.siblings(".vSave").hide();
    });
});
///////

$(function() {
    $("#name").blur(function () {
        if (!$(this).attr("value")) {
            $("#errorMsg").html("请填写收货人!");
        } else {
            $("#errorMsg").html("");
        }
    });
    $("#mobile").blur(function () {
        if (!$(this).attr("value")) {
            $("#errorMsg").html("请填写手机号!");
        }else if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test($(this).attr("value"))){
            $("#errorMsg").html("你输入的手机号格式不正确!");
        }else{
            $("#errorMsg").html("");
        }
    });
    $("#addressDetail").blur(function () {
        if (!$(this).attr("value")) {
            $("#errorMsg").html("请填写详细地址!");
        } else {
            $("#errorMsg").html("");
        }
    });
});
//
$(function(){
    $(".shippingAddress li:nth-child(2)").addClass("selected");
    $(".shippingAddress li#addAdd").removeClass("selected");
    $(".shippingAddress li dl").each(function(index){
        $(this).click(function(){
            if($(this).parent().attr("id")=="addAdd"){
                return;
            }
            if($(this).parent().hasClass("selected")){
                $(this).parent().removeClass("selected");
            }else{
                $(this).parent().addClass("selected").siblings().removeClass("selected");
            }
        });
    });
    //
    $(".addressControlList .defaultBtn").click(function(){
        $(this).html("默认收货地址").addClass("default").parent().parent().addClass("defaultselect");
        $(this).parent().parent().siblings().removeClass("defaultselect");
        var $m= $(this).parent().parent().siblings().find(".defaultBtn").removeClass("default").html("设为默认地址");
    });
    ///
    $(".addressControl .btn,.addressControl .del").hover(function(){
        $(this).css("color","#e73d4d");
    },function(){
        $(this).css("color","#333");
    });

});
//
$(function(){
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
    //page
    $(".pageList li").click(function(){
        $(this).addClass("on").siblings().removeClass("on");
        if($(this).attr("id")=="more"){
            $(this).removeClass("on");
        }else if($(this).attr("id")=="first"){
            $(this).parent().prev().addClass("noPage");
        }else if($(this).attr("id")=="last"){
            $(this).parent().next().addClass("noPage");
        }else{
            $(this).parent().siblings().removeClass("noPage")
        }
    });
    //
    //
    var $heightUl=$(".showAddress").height();
    var $oHeightUl=156;
    var $heightU=$oHeightUl+'px';
    var $length=$(".showAddress li").length;
    if($length>4){
        $(".showAddress").css({"height":$heightU})
    }else{
        $(".addressShow").hide();
    }
    $(".addressShow").click(function(){
           if($(this).hasClass("addressUp")){
            $(this).removeClass("addressUp").prev("ul").css({"height":$heightU});
            $(this).children("span").html("更多地址");
        }else{
            $(this).addClass("addressUp").prev("ul").css({"height":"100%"});
            $(this).children("span").html("收起地址");
        }

    });
//浏览器滚动距离
   function scollHeight(){
       $(window).scroll(function(){
           var $Top=$(document).scrollTop();
           var $oHeight= $(document.body).height();
           var $viewH=$(window).height();
           var $maxTop=$oHeight-$viewH-50;
           $Top>=$maxTop ? $(".fixedBtn").hide() : $(".fixedBtn").show();
       });
       $(".fixedBtn .comBtn").hover(function(){
           $(this).css({"background-color":"#b5313d"});
       },function(){
           $(this).css({"background-color":"#e73d4d"});
       });
       $(".fixedBtn .comBtn").click(function(){
           $(this).attr("onclick","submitData()");
       });
   }
    scollHeight();

});



