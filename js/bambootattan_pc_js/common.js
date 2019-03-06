//baseUrl="http://47.106.74.107:8081";
//var baseUrl="http://192.168.35.1:8080";
//var baseUrl="http://192.168.0.2:8080";
var baseUrl="http://10.5.139.187:8080";
//给body元素手动加上 modal-open
var openModalClass=function () {
    $('body').addClass('modal-open');
}
var openLoading=function () {
    var _PageHeight = document.documentElement.clientHeight,
        _PageWidth = document.documentElement.clientWidth;
    //计算loading框距离顶部和左部的距离（loading框的宽度为108px，高度为108px）
    var _LoadingTop = _PageHeight > 100 ? (_PageHeight - 108) * 0.382 : 0,
        _LoadingLeft = _PageWidth > 100 ? (_PageWidth - 108) * 0.5: 0;
    //在页面未加载完毕之前显示的loading Html自定义内容
    var _LoadingHtml = '' +
        '<div id="loadingFckDiv" style="position:fixed;left:0;width:100%;height:' + _PageHeight + 'px;top:0;z-index:1000000;filter:alpha(opacity=70); -moz-opacity:0.7; -khtml-opacity: 0.7; opacity: 0.7;">' +
        '   <div style="position: absolute; cursor: wait; left: ' + _LoadingLeft + 'px; top:' + _LoadingTop + 'px; width: 108px; height: 108px; line-height: 100px;">' +

        '<div class="spiner-example" style="z-index:20000;position:absolute;">' +
        '<div class="sk-spinner sk-spinner-fading-circle">' +
        '<div class="sk-circle1 sk-circle"></div>' +
        '<div class="sk-circle2 sk-circle"></div>' +
        '<div class="sk-circle3 sk-circle"></div>' +
        '<div class="sk-circle4 sk-circle"></div>' +
        '<div class="sk-circle5 sk-circle"></div>' +
        '<div class="sk-circle6 sk-circle"></div>' +
        '<div style="color:#fff;width:100%;color:#8BC34A;" align="center">请稍等...</div>'+
        '<div class="sk-circle7 sk-circle"></div>' +
        '<div class="sk-circle8 sk-circle"></div>' +
        '<div class="sk-circle9 sk-circle"></div>' +
        '<div class="sk-circle10 sk-circle"></div>' +
        '<div class="sk-circle11 sk-circle"></div>' +
        '<div class="sk-circle12 sk-circle"></div>' +

        '</div>' +
        '</div>' +


        '       </div>' +
        '   </div>' +
        '</div>';
    //呈现loading效果


    var div = document.createElement("div");
    div.id = "mainFckLoading";
    div.innerHTML = _LoadingHtml;
    document.body.appendChild(div);

}
var closeLoading=function () {
    $('#mainFckLoading').remove();
}
$(function () {

    $.ajaxSetup({
        beforeSend: function(xhr,request){
            openLoading();
        },
        complete: function(xhr) {
            closeLoading();
        }
    });
    //退出
    $("#logout").on('click',logout);
});
// $("#logout").on('click',logout);
 //退出
 function logout() {
     $.ajax({
         url: baseUrl + '/user/logOut',		//请求路径
         type: 'POST',			                    //请求方式
         dataType: "JSON",		                //返回数据类型
         contentType: 'application/json',

         success: function (res) {
            // console.log("res:"+res);
             if (res.code === 200) {
                 $.niftyNoty({
                     type: 'success',
                     icon: 'pli-like-2 icon-2x',
                     message: '退出成功',
                     container: 'floating',
                     timer: 2000
                 });
                 window.location.href = "../../page-login.html";
             } else if (res.code == 400) {
                 window.location.href = '../../page-404.html';
             }
             else if (res.code == 505) {
                 window.location.href = '../../page-500.html';
             }
             else {
                 $.niftyNoty({
                     type: 'danger',
                     icon: 'pli-cross icon-2x',
                     message: res.msg,
                     container: 'floating',
                     timer: 1000
                 });
             }
         },
         error: function (XMLHttpRequest, textStatus, errorThrown) {		//请求失败回调函数
         }
     });
 }

 //根据名称获取地址栏的参数值
 var getUrlParam = function (name) {
     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if (r != null) return unescape(r[2]); return null;
 }