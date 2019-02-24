var queryPageUrl='';
$(function(){
    queryPageUrl = baseUrl+'/Elasticsearch/search';
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
