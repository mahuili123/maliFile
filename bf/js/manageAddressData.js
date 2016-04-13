//getAddress
function getAddress(){
    if(!$("#name").val()){
        $("#errorMsg").html("收货人不能为空!");
    }else if(!$("#mobile").val()){
        $("#errorMsg").html("手机号不能为空!");
    }else if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test($("#mobile").attr("value"))){
        $("#errorMsg").html("手机号格式不正确!");
    }else if(!$("#loc_province").val()||!$("#loc_city").val()||!$("#loc_town").val()){
        $("#errorMsg").html("省市区不能为空!");
    }else if(!$("#addressDetail").val()){
        $("#errorMsg").html("详细地址不能为空!");
    }else if(!$("#postcode").val()){
        getData();
        $(".inputIn .textLi span").css({"top":"15px","font-size":"14px"});
    }else if($("#postcode").val()&&$("#postcode").val().length!=6){
        $("#errorMsg").html("邮政编码格式不正确!");
    }else{
        getData();
        $(".inputIn .textLi span").css({"top":"15px","font-size":"14px"});
    }
    function getData(){
        var sData={
            "uid": $("#uid").attr("data-value"),
            "accept_name": $("#name").val(),
            "mobile": $("#mobile").val(),
            "address": $("#addressDetail").val(),
            "zipcode": $("#postcode").val(),
            "tag": $("#tag").val(),
            // int
            "province": $("#loc_province").val(),
            "city": $("#loc_city").val(),
            "area": $("#loc_town").val()
        };
        console.log(sData);
        $.ajax({
            url: "http://mall.baofeng.net/address/add",
            type:"get",
            data:sData,
            success: function(data){
                console.log(data);
                if(data.status == 0)
                {
                    var template = "<li data-value='"+data.info.addresses.address_id+"'>" +
                        "<dl>"+
                        "<dt>"+
                        "<h3><span><%= info.addresses.accept_name %></span><i><%= info.addresses.tag %></i></h3>"+
                        "</dt>"+
                        "<dd><%= info.addresses.mobile %></dd>" +
                        "<dd><%= info.addresses.province_val %> <%= info.addresses.city_val %> <%= info.addresses.area_val %></dd>" +
                        "<dd><%= info.addresses.address %></dd>" +
                        "</dl>"+
                        "<div class='addressControl'>"+
                        "<div class='btn'><%= '修改' %></div>"+"<div class='del'><%= '删除' %></div>"+"<div class='defaultBtn'><%= '设为默认地址' %></div>"+
                        "</div>"+
                        "</li>";
                    var tpl = _.template(template);
                    var oUl=$("#addressSelected");
                    var oAdd=$("#addAdd");
                    oAdd.after(tpl(data));
                    btnClick();
                    $(".addressControlList .defaultBtn").click(function(){
                        $(this).html("默认收货地址").addClass("default").parent().parent().addClass("defaultselect");
                        $(this).parent().parent().siblings().removeClass("defaultselect");
                        var $m= $(this).parent().parent().siblings().find(".defaultBtn").removeClass("default").html("设置收货地址");
                    });
                    delData();
                    defData();
                }
                else{
                    alert(data.info);
                }
            },
            complete: function() {
                $("#addressPopups").hide();
                $("#btnAddSave").removeAttr("onclick");
                $("#name").attr("value","");
                $("#mobile").attr("value","");
                $("#addressDetail").attr("value","");
                $("#postcode").attr("value","");
                $("#tag").attr("value","");
            }
        });
    }
}


//modifyAddress

var btnClick=function(){
    $(function(){
        $(".addressSelected").find(".btn").click(function(){
            $("#btnAddSave").attr("onclick","modifyAddress()");
            $("#addressPopups").show();
            $(".inputIn .textLi").find("span").css({"top":"-9px"});
            var $tar=$(this).parent().parent();
            var $name=$tar.find("h3").find("span").html();
            var $tag=$tar.find("h3").find("i").html();
            var $mobile=$tar.find("dd").eq(0).html();
            var $area=$tar.find("dd").eq(1).html();
            var $ary=$area.split(" ");
            var $addressDetail=$tar.find("dd").eq(2).html();
            var $addressId=$tar.attr("data-value");
            var $province= $tar.attr("province");
            var $city=$tar.attr("city");
            var $area1= $tar.attr("area");
            $("#name").val($name);
            $("#mobile").val($mobile);
            $("#select2-chosen-1").html($ary[0]).attr("province",$province);
            $("#select2-chosen-2").html($ary[1]).attr("city",$city);
            $("#select2-chosen-3").html($ary[2]).attr("area1",$area1);
            $("#addressDetail").val($addressDetail);
            $("#tag").val($tag);
            $(".inputIn").attr("addressId",$addressId);
        });
    });
};
btnClick();
function modifyAddress(){
    var $p=$("#loc_province").val() ? $("#loc_province").val():$("#select2-chosen-1").attr("province");
    var $c=$("#loc_city").val() ? $("#loc_city").val():$("#select2-chosen-2").attr("city");
    var $a=$("#loc_town").val() ? $("#loc_town").val():$("#select2-chosen-3").attr("area1");
    var mData={
        "addressId":$(".inputIn").attr("addressId"),
        "uid": $("#uid").attr("data-value"),
        "accept_name": $("#name").val(),
        "mobile": $("#mobile").val(),
        "address": $("#addressDetail").val(),
        "zipcode": $("#postcode").val(),
        "tag": $("#tag").val(),
        // int
        "province":$p,
        "city":$c ,
        "area":$a
    };
    console.log(mData)
    $.ajax({
        url: "http://mall.baofeng.net/address/edit",
        type:"get",
        data:mData,
        success: function(data){
            console.log(data)
            if(data.status == 0)
            {
                // 服务器返回，遍历ul 根据服务器返回address_id删除li
                var aId = data.info.addresses.address_id;
                var oList=$("#addressSelected li");
                oList.each(function(index){
                    var oId=$(this).attr("data-value");
                    if(oId==aId){
                        oList[index].remove();
                    }
                });
                // 添加服务器返回的新的
                var template = "<li data-value='"+data.info.addresses.address_id+"'>" +
                    "<dl>"+
                    "<dt>"+
                    "<h3><span><%= info.addresses.accept_name %></span><i><%= info.addresses.tag %></i></h3>"+
                    "</dt>"+
                    "<dd><%= info.addresses.mobile %></dd>" +
                    "<dd><%= info.addresses.province_val %> <%= info.addresses.city_val %> <%= info.addresses.area_val %></dd>" +
                    "<dd><%= info.addresses.address %></dd>" +
                    "</dl>"+
                    "<div class='addressControl'>"+
                    "<div class='btn'><%= '修改' %></div>"+"<div class='del'><%= '删除' %></div>"+"<div class='defaultBtn'><%= '设为默认地址' %></div>"+
                    "</div>"+
                    "</li>";
                var tpl = _.template(template);
                var oAdd=$("#addAdd");
                oAdd.after(tpl(data));
                $(".addressControlList .defaultBtn").click(function(){
                    $(this).html("默认收货地址").addClass("default").parent().parent().addClass("defaultselect");
                    $(this).parent().parent().siblings().removeClass("defaultselect");
                    var $m= $(this).parent().parent().siblings().find(".defaultBtn").removeClass("default").html("设置收货地址");
                });
                btnClick();
                delData();
                defData();
            }
            else{
                alert(data.info);
            }
        },
        complete: function() {
            $("#addressPopups").hide();
            $("#btnAddSave").removeAttr("onclick");
            $(".inputIn .textLi").children("input").val("");
            $("#select2-chosen-1").html("省份/直辖市 ");
            $("#select2-chosen-2").html("城市/地区");
            $("#select2-chosen-3").html("区/县");
            $(".inputIn .textLi").children("span").css({"top":"15px"});
        }
    });


}

//deleteData
var delData=function(){
    $(function(){
        $(".addressControl .del").click(function(){
            deleteData.call(this);
        });
    })
};
delData();
var defData=function(){
    $(function(){
        $(".addressControl .defaultBtn").click(function(){
            setDefaultData.call(this);
        });
    });
};
defData();
function deleteData(){
    var titleValue=$("#invoice_title").val();
    var deleteData={
        "uid": $("#uid").attr("data-value"),
        "addressId": $(this).parent().parent().attr("data-value"),
    };
    console.log(deleteData);
    $.ajax({
        url: "http://mall.baofeng.net/address/delete",
        type:"get",
        data:deleteData,
        success: function(data){
            if(data.status == 0){
                // 服务器返回，遍历ul 根据服务器返回address_id删除li
                var uId = data.info.addressId;
                var oUl=$("#addressSelected");
                var oList=$("#addressSelected li");
                oList.each(function(index){
                    var oUid=$(this).attr("data-value");
                    if(oUid==uId){
                        oList[index].remove();
                    }
                });
            }else{
                alert(data.info);
            }
        }
    });
}
//setDefaultData
function setDefaultData(){
    var titleValue=$("#invoice_title").val();
    var defaultData={
        "uid": $("#uid").attr("data-value"),
        "addressId": $(this).parent().parent().attr("data-value"),
    };
    console.log(defaultData);
    $.ajax({
        url: "http://mall.baofeng.net/address/setdefault",
        type:"get",
        data:defaultData,
        success: function(data){
            if(data.status == 0){
                // 服务器返回，遍历ul 根据服务器返回address_id删除li
                var uId = data.info.addressId;
                var oUl=$("#addressSelected");
                var oList=$("#addressSelected li");
                oList.each(function(index){
                    var oUid=$(this).attr("data-value");
                    if(oUid==uId){
                        $(this).find(".defaultBtn").addClass("default");
                    }
                });
            }else{
                alert(data.info);
            }
        }
    });
}
