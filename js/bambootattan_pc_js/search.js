var queryPageUrl='';
$(function(){
    queryPageUrl = baseUrl+'/Elasticsearch/search'
    var key_word=getUrlParam("keyWord");//获取地址栏中keyWord的值
    search(key_word);
    $("#bnt_search").on('click',search_click);
});
//获取搜索内容
function search(keyWord){
    $.ajax({
        url:queryPageUrl,
        //data:
        success:function(res){
            if(res.code==200){
                var result=res.data;
                if(result){
                    var _html='';
                    for(var i=0;i<result.length;i++) {
                        var item=result[i];

                        //有图片
                        _html += '\
                            <li class="list-group-item list-item-lg media">\
                                <div class="pull-left">\
                                    <img class="img-md" alt="Image" src="img/image/1.jpg">\
                                </div>\
                                <div class="media-body">\
                                    <div class="media-heading">\
                                        <a class="h4 text-primary mar-no" href="#">Beautiful Nature | Landscapes Wallpapers</a>\
                                    </div>\
                                    <a class="btn-link text-success box-inline" href="#">http://www.example.com/nifty/admin</a>\
                                    <p class="text-sm">Lorem ipsum dolor sit amet, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>\
                                </div>\
                            </li>';
                        //没有图片
                        _html += '\
                            <li class="list-group-item list-item-lg">\
                                <div class="media-heading mar-no">\
                                    <a class="h4 text-primary" href="#">Nifty - Responsive Admin Template</a>\
                                </div>\
                                <a class="btn-link text-success box-inline" href="#">http://www.example.com/nifty/admin</a>\
                                <p class="text-sm">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>\
                            </li>';
                    }
                    result={
                        count:12,//total
                        list:[
                            {},
                            {},
                            {}
                        ],
                        time:0.56
                    }
                    $("#search_count").html(result.count);
                    $("#search_content").html('"'+keyWord+'"');
                    $("#search_time").html(result.time);
                }
            }
        }
    });
}
//点击搜索
function search_click(){
    var key_word=$("#kw").val();//搜索内容
    //如果搜索内容不为空，这跳转到搜索页面
    if($.trim(key_word)!=''){
        search(key_word);
    }
}
