$(function () {   
    loadGenus();
    $("#btn_search").on("click",function(){
        var key_word=$("#kw").val();//搜索内容
        //如果搜索内容不为空，这跳转到搜索页面
        if($.trim(key_word)!=''){
            window.location.href="page-sousuopageone.html?keyWord="+key_word;//跳转到搜索页面
        }
    })
});
function loadGenus(){
    $.ajax({
        url:baseUrl+ '/genus/findAll',
        type:'GET',
        success:function(response){
            if(response.code==200){
                var genuses=response.data;
                loadSpec(genuses);
            }
        }
    });
}
function loadSpec(genuses){
    $.ajax({
        url:baseUrl+ '/spec/findAll',
        type:'GET',
        success:function(response){
            if(response.code==200){
                var speces= response.data;
                var newGenuses=resetGenus(genuses,speces);
                if(newGenuses.length>0){
                    var html='';
                    for(var i=0;i<newGenuses.length;i++){
                        var genus=newGenuses[i];
                        var data=[
                            {
                                specImgUrl:'',
                                specName:'暂无'},
                            {
                                specImgUrl:'',
                                specName:'暂无'},
                            {
                                specImgUrl:'',
                                specName:'暂无'},
                            {
                                specImgUrl:'',
                                specName:'暂无'}];
                        if(typeof genus.speces!='undefined'&&genus.speces.length>0){
                            for(var j=0;j<genus.speces.length;j++){                                
                                var files=genus.speces[j].files;
                                if(files!=null&&files.length>0){
                                    for(var k=0;k<files.length;k++){
                                        if(files[k].type=='image'){
                                            data[j].specImgUrl =baseUrl+'/'+ files[k].path;
                                            data[j].specName=genus.speces[j].specNameCh;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        html+='\
                            <div class="col-sm-2">\
                                <div class="thumbnail" data-id="'+genus.genusId+'">\
                                    <img src="'+data[0].specImgUrl+'" alt="'+data[0].specName+'">\
                                    <div class="col-xs-4">\
                                        <img src="'+data[1].specImgUrl+'" alt="'+data[1].specName+'">\
                                    </div>\
                                    <div class="col-xs-4">\
                                        <img src="'+data[2].specImgUrl+'" alt="'+data[2].specName+'">\
                                    </div>\
                                    <div class="col-xs-4">\
                                        <img src="'+data[3].specImgUrl+'" alt="'+data[3].specName+'">\
                                    </div>\
                                    <div class="clearfix"></div>\
                                    <div class="caption">\
                                        <h4>'+genus.genusNameCh+'</h4>\
                                    </div>\
                                </div>\
                            </div>'
                    }
                    $('.row').html(html);
                    $('.thumbnail').on('click',function(){
                        location.href='genusdetail.html?genusId='+$(this).attr('data-id');
                    });
                }
            }
        }
    });
}
function resetGenus(genuses,speces){
    if(genuses==null||genuses.length<=0){
        return [];
    }
    if(speces==null||speces.length<=0){
        return genuses;
    }
    var newGenuses=[];
    for(var i=0;i<genuses.length;i++){
        var newGenus=genuses[i];
        newGenus.speces=[];
        for(var j=0;j<speces.length;j++){
            var spec=speces[j];
            if(spec!=null&&spec.genus!=null&&spec.genus.genusId==newGenus.genusId){
                if(newGenus.speces.length<4){
                    newGenus.speces.push(spec);
                }else{
                    newGenus.speces=replaceByHasImg(newGenus.speces,spec);
                }
            }
        }
        newGenus.speces=hasImgToTop(newGenus.speces);
        newGenuses.push(newGenus);
    }
    return newGenuses;
}
function replaceByHasImg(speces,spec){
    for(var i=0;i<speces.length;i++){
        var hasImg=false;
        for(var j=0;j<speces[i].files.length;j++){
            if(speces[i].files[j].type='image'&&speces[i].files[j].path!=null&&speces[i].files[j].path!=''){
                hasImg=true;
                break;
            }
        }
        if(hasImg){
            break;
        }
        var files=spec.files;
        for(var j=0;j<files.length;j++){
            if(files[j].type='image'&&files[j].path!=null&&files[j].path!=''){
                speces[i]=spec;
            }
        }
    }
    return speces;
}
//图片从上开始放
function hasImgToTop(speces){
    var newSpeces=[];
    for(var i=0;i<speces.length;i++){
        var hasImg=false;
        for(var j=0;j<speces[i].files.length;j++){
            if(speces[i].files[j].type='image'&&speces[i].files[j].path!=null&&speces[i].files[j].path!=''){
                hasImg=true;
                break;
            }
        }
        if(hasImg){
            newSpeces.unshift(speces[i]);
        }else{
            newSpeces.push(speces[i]);
        }
    }
    return newSpeces;
}