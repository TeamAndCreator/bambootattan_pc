$(function () {
    $("#btn_search").on("click",function(){
        var key_word=$("#kw").val();//搜索内容
        //如果搜索内容不为空，这跳转到搜索页面
        if($.trim(key_word)!=''){
            window.location.href="page-sousuopageone.html?keyWord="+key_word;//跳转到搜索页面
        }
    })
})