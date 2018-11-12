var baseUrl="http://47.104.26.79:8081";
$(function(){
    $('#btn_add').on('click',function () {
		init_form();//初始化表单
        $('#exampleModal').modal('show');//表单模态框
    });
    $('#btn_delete').on('click',function(){
        var selectedItems=$("#data_table").bootstrapTable('getSelections');
        if(selectedItems.length==0){
            alert("请选择要删除的数据！");
        }else{
            var ids=[];
            for(var i=0;i<selectedItems.length;i++){
                ids.push(selectedItems[i].genusId);
            }
            $.ajax({//批量删除
                url: baseUrl+'/genus/deleteByIds?ids='+encodeURI(ids.join(',')),
                type:'DELETE',
                contentType: 'application/json',//数据类型
                success:function(res){	        //请求成功回调函数
                    if(res.code==200){
                        alert('删除成功');
                        $("#data_table").bootstrapTable('refresh',{url : baseUrl+'/genus/findAllNoQuery'});
                    }else{
                        alert(res.msg);
                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown) {//请求失败回调函数

                }
            });
        }
    });
	$('#btn_save').on('click',function () {
		var genusId = $('#genusId').val();
		var genusNameCh = $('#genusNameCh').val();
		var genusNameEn = $('#genusNameEn').val();
		var genusNameLd = $('#genusNameLd').val();
		var genusNameOth = $('#genusNameOth').val();
		var sortNum = $('#sortNum').val();
		var genusDesc = $('#genusDesc').val();
		var formData={
		  "genusDesc": genusDesc,
		  "genusId": genusId,
		  "genusNameCh": genusNameCh,
		  "genusNameEn": genusNameEn,
		  "genusNameLd": genusNameLd,
		  "genusNameOth": genusNameOth,
		  "sortNum": sortNum
		};
		if(genusId==""){//新增
			formData.genusId=0;
			$.ajax({
				url:baseUrl+'/genus/save',		//请求路径
				type:'POST',			        //请求方式
				data:JSON.stringify(formData),	//数据
                contentType: 'application/json',//数据类型
				success:function(res){	        //请求成功回调函数
                    if(res.code==200){
                        alert('新增成功');
                        $("#data_table").bootstrapTable('refreshOptions',{pageNumber : 1});
                        $('#exampleModal').modal('hide');
                    }else{
                        alert(res.msg);
                    }
				},
				error:function(XMLHttpRequest, textStatus, errorThrown) {//请求失败回调函数

				}
			});
		}else{//修改
			$.ajax({
				url:baseUrl+'/genus/update',	//请求路径
				type:'PUT',				        //请求方式
				data:JSON.stringify(formData),	//数据
                contentType: 'application/json',//数据类型
				success:function(res){	        //请求成功回调函数
                    if(res.code==200){
                        alert('修改成功');
                        $("#data_table").bootstrapTable('refresh',{url : baseUrl+'/genus/findAllNoQuery'} );
                        $('#exampleModal').modal('hide');
                    }else{
                        alert(res.msg);
                    }
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){		//请求失败回调函数
				}
			});
		}
    });

    function init(){

            $('#data_table').bootstrapTable({
                url:baseUrl+'/genus/findAllNoQuery',//数据源，请求后台的路径
                //data:dataSoure,//数据源，json数据
                toolbar:'#btn_area',//按钮组
                search:true,//可以搜索
                showRefresh:true,//可以刷新
                showToggle:true,//可以视图切换
                showColumns:true,//可以选择列
                sortName:'id',//排序字段
                sortOrder:'asc',//排序类型，asc正序，desc倒序初始化加載第一頁
                pageList:[5, 10, 20],//每页数量组
                pageSize:5,//默认每页数量
                pagination:true,//可以分页
                showPaginationSwitch:true,//
                sidePagination:'server',//服務器端分頁
                //method:'POST',
                responseHandler:function(res){
                    return {
                        "total": res.data.totalElements,//总记录数
                        "rows": res.data.content        //数据
                        //"total": 100,//总记录数
                        //"rows": res.data       //数据
                    };
                },
                queryParams:function(params){
                    return {
                        page:params.offset/params.limit,
                        size:params.limit
                    }
                },

                cache:false,//是否使用緩存
                columns:[//列数据
                    {
                        checkbox:true,//有复选框
                        valign:'middle',//垂直居中
                        field:'checkbox',//数据列
                        cellStyle:function(value,row,index,field){
                            return{
                                css:{
                                    'min-width':'36px',
                                    'max-width':'36px',
                                    'vertical-align': 'middle'
                                }
                            };
                        }
                    },
                    {
                        field:'',//数据列
                        title:'操作',//数据列名称
                        width:'80px',
                        align:'center',//水平居中
                        valign:'middle',//垂直居中
                        formatter:function(value,row,index){//格式化，自定义内容
                            var _html = '<button onclick="edit(\''+row.genusId+'\')" class="btn btn-info btn-xs" data-toggle="tooltip" data-placement="bottom" title="修改"><i class="demo-psi-pen-5"></i></button>';
                            _html += '<button  onclick="dele(\''+row.genusId+'\')"class="btn btn-danger btn-xs" data-toggle="tooltip" data-placement="bottom" title="删除"><i class="demo-pli-cross"></i></button>'
                            return _html;
                        },
                        cellStyle:function(value,row,index,field){
                            return{
                                css:{
                                    'min-width':'80px'
                                }
                            };
                        }
                    },
                    {
                        field:'genusId',//数据列
                        title:'genusId',//数据列名称
                        visible:false
                    },
                    {
                        field:'genusNameCh',//数据列
                        title:'中文名',//数据列名称
                        sortable:true,//可排序
                        align:'center',//水平居中
                        valign:'middle',//垂直居中
                        cellStyle:function(value,row,index,field){
                            return{
                                css:{
                                    'min-width':'80px'
                                }
                            };
                        }
                    },
                    {
                        field:'genusNameEn',//数据列
                        title:'英文名',//数据列名称
                        sortable:true,//可排序
                        align:'center',//水平居中
                        valign:'middle',//垂直居中
                        cellStyle:function(value,row,index,field){
                            return{
                                css:{
                                    'min-width':'80px'
                                }
                            };
                        }
                    },
                    {
                        field:'genusNameLd',//数据列
                        title:'拉丁名',//数据列名称
                        sortable:true,//可排序
                        align:'center',//水平居中
                        valign:'middle',//垂直居中
                        cellStyle:function(value,row,index,field){
                            return{
                                css:{
                                    'min-width':'80px'
                                }
                            };
                        }
                    },
                    {
                        field:'genusNameOth',//数据列
                        title:'别名',//数据列名称
                        sortable:true,//可排序
                        align:'center',//水平居中
                        valign:'middle',//垂直居中
                        cellStyle:function(value,row,index,field){
                            return{
                                css:{
                                    'min-width':'80px'
                                }
                            };
                        }
                    },
                    {
                        field:'sortNum',//数据列
                        title:'序号',//数据列名称
                        sortable:true,//可排序
                        align:'center',//水平居中
                        valign:'middle',//垂直居中
                        cellStyle:function(value,row,index,field){
                            return{
                                css:{
                                    'min-width':'80px'
                                }
                            };
                        }
                    },
                    {
                        field:'genusDesc',//数据列
                        title:'描述',//数据列名称
                        sortable:true,//可排序
                        align:'center',//水平居中
                        valign:'middle',//垂直居中
                        cellStyle:function(value,row,index,field){
                            return{
                                css:{
                                    'min-width':'80px',
                                    'max-width':'150px',
                                    'word-break': 'break-all'
                                }
                            };
                        }
                    }

                ]
            });
    }
    init();
});
function edit(id) {
	init_form();
    $.ajax({
        url:baseUrl+'/genus/findId/'+id,		//请求路径
        type:'GET',			                    //请求方式
        dataType:"JSON",		                //返回数据类型
        contentType: 'application/json',        //数据类型
        success:function(res){	                //请求成功回调函数
            if(res.code==200){
                $('#genusId').val(res.data.genusId);
                $('#genusNameCh').val(res.data.genusNameCh);
                $('#genusNameEn').val(res.data.genusNameEn);
                $('#genusNameLd').val(res.data.genusNameLd);
                $('#genusNameOth').val(res.data.genusNameOth);
                $('#sortNum').val(res.data.sortNum);
                $('#genusDesc').val(res.data.genusDesc);
                $('#exampleModal').modal('show');
            }
            else{
                alert(res.msg)
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown) {//请求失败回调函数

         }
    });
}
function dele(gid){
    bootbox.confirm("您确定删除数据吗？", function(result) {
        if (result) {
            $.ajax({
                url:baseUrl+'/genus/delete/'+gid,//请求路径,单个删除
                type:'DELETE',				    //请求方式
                contentType: 'application/json', //数据类型
                success:function(res){	        //请求成功回调函数
                    if(res.code==200){
                        //alert('删除成功');
                        $.niftyNoty({
                            type: 'success',
                            icon : 'pli-like-2 icon-2x',
                            message : '删除成功',
                            container : 'floating',
                            timer : 5000
                        });
                        $("#data_table").bootstrapTable('refresh',{url : baseUrl+'/genus/findAllNoQuery'} );
                        $('#exampleModal').modal('hide');
                    }else{
                        //alert(res.msg);
                        $.niftyNoty({
                            type: 'danger',
                            icon : 'pli-cross icon-2x',
                            message : res.msg,
                            container : 'floating',
                            timer : 5000
                        });
                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){		//请求失败回调函数
                }
            });

        }else{
            $.niftyNoty({
                type: 'danger',
                icon : 'pli-cross icon-2x',
                message : '您取消了删除',
                container : 'floating',
                timer : 5000
            });
        };

    });
}



//初始化表单元素的值
function init_form(){
	$('#genusNameCh').val("");
	$('#genusNameEn').val("");
	$('#genusNameLd').val("");
	$('#genusNameOth').val("");
	$('#sortNum').val("");
	$('#genusDesc').val("");
	$('#genusId').val("");
}