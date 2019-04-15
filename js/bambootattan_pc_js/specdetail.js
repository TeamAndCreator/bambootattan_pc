$(function(){
    var specId=getUrlParam('specId');
    loadSpec(specId);
});
function loadSpec(specId){
    $.ajax({
        url:baseUrl+'/spec/findId/'+specId,
        type:'GET',
        success:function(response){
            if(response.code==200){
                var spec=response.data;
                if(spec!=null){
                    $('#specNameCh').html(spec.specNameCh);
                    var files=spec.files;
                    var imgsHtml='';
                    for(var i=0;i<files.length;i++){
                        var file=files[i];
                        if(file!=null&&file.type=='image'){
                            imgsHtml+='<img src="'+baseUrl+'/'+file.path+'" alt="暂无">';
                        }
                    }
                    var html='\
                        <div class="col-sm-12">\
                            <p>'+spec.specDesc+'</p>'
                            +imgsHtml+'\
                        </div>\
                    ';
                    $('.info').html(html);
                }
            }
        }
    });
}