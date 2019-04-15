$(function(){
    var genusId=getUrlParam('genusId');
    loadGenus(genusId);
});
function loadGenus(genusId){
    $.ajax({
        url:baseUrl+'/genus/findId/'+genusId,
        type:'GET',
        success:function(response){
            if(response.code==200){
                var genus=response.data;
                if(genus!=null){
                    $('#genusName').html(genus.genusNameCh)
                    $('.info p').html(genus.genusDesc);
                    loadSpeces(genusId,genus.genusNameCh);
                }
            }
        }
    });
}
function loadSpeces(genusId,genusNameCh){
    $.ajax({
        url:baseUrl+'/spec/findAll',
        type:'GET',
        success:function(response){
            if(response.code==200){
                var speces=response.data;
                if(speces!=null&&speces.length>0){
                    var html='\
                            <div class="col-sm-12">\
                                <h4>'+genusNameCh+'的竹种</h4>\
                            </div>\
                        ';
                    for(var i=0;i<speces.length;i++){
                        var spec=speces[i];                        
                        if(spec.genus!=null&&spec.genus.genusId==genusId){
                            var img='';
                            if(spec.files!=null&&spec.files.length>0){
                                for(var j=0;j<spec.files.length;j++){
                                    var file=spec.files[j];
                                    if(file.type=='image'){
                                        img=baseUrl+'/'+ file.path;
                                        break;
                                    }
                                }
                            }
                            html+='\
                                <div class="col-sm-2">\
                                    <div class="thumbnail" data-id="'+spec.specId+'">\
                                        <img src="'+img+'" alt="暂无">\
                                        <div class="caption">\
                                            <h4>'+spec.specNameCh+'</h4>\
                                        </div>\
                                    </div>\
                                </div>\
                            ';
                        }
                    }
                    $('.spec').html(html);
                    $('.thumbnail').on('click',function(){
                        location.href='specdetail.html?specId='+$(this).attr('data-id');
                    });
                }
            }
        }    
    });
}