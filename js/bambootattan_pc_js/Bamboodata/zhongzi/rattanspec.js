var queryPageUrl='';
var queryGenusPageUrl='';
var  myDropzone;
var  myDropzoneImg;
$(function(){
    $('.username').html('欢迎您，'+ $.cookie('BAM_USERNAME'));
    queryPageUrl = baseUrl+'/rattanSpec/findAllQuery';
    queryGenusPageUrl = baseUrl+'/rattanGenus/findAllQuery';
    //新增点击事件
    $('#btn_add').on('click',function () {
        init_form();//初始化表单
        $('#exampleModal .modal-title').html("新增");
        $('#exampleModal').modal('show');//表单模态框
    });
    //打开弹出框，去掉验证信息显示
    $('#exampleModal').on('shown.bs.modal',function () {
        $('#registrationForm').data('bootstrapValidator').resetForm();
    });
    //批量删除点击事件
    $('#btn_delete').on('click',deles);
    //保存点击事件
    $('#btn_save').on('click',save);
    //点击选择属按钮
    $('#btn_select_genus').on('click',function () {
        $('#genusModal').modal('show');
        $('#genus_table').bootstrapTable('refresh',queryGenusPageUrl);
    });
    //确认选择的属
    $('#btn_genus_ok').on('click',selectedGenus);
    //选择属的模态框关闭时，调用openModalClass，给body元素手动加上 modal-open
    $('#genusModal').on('hidden.bs.modal',function () {
        openModalClass();
    });
    //初始化表格
    init_table();
    init_genus_table();
    init_sunmmernote();
    //初始化文件上传
    init_file_upload();
    //表单验证
    $('#registrationForm').bootstrapValidator();
});
//初始化表格
function init_table(){
    $('#data_table').bootstrapTable({
        url:queryPageUrl,//数据源，请求后台的路径
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
        clickToSelect:true,
        //method:'POST',
        responseHandler:function(res){//后台返回数据进行修改，修改成bootstrap-table能够使用的数据格式
            return {
                "total": res.data.totalElements,//总记录数
                "rows": res.data.content        //数据
            };
        },
        queryParams:function(params){//请求参数，向后台传的数据，修改成后台可以接收的数据格式
            return {
                page:params.offset/params.limit,    //页码，就是第几页
                size:params.limit,                   //每页数量
                search:params.search
            }
        },
        onColumnSwitch:function(filed,checked){
            $('#data_table').bootstrapTable('resetView');
        },
        cache:false,//是否使用緩存
        // fixedColumns: true,//固定列
        // fixedNumber:4,//固定前三列
        columns:[//列数据

            {
                checkbox:true,//有复选框
                field:'checkbox'//数据列
            },
            {
                field:'',//数据列
                title:'操作',//数据列名称
                width:'80px',
                align:'center',//水平居中
                valign:'middle',//垂直居中
                formatter:function(value,row,index){//格式化，自定义内容
                    var _html = '<button onclick="edit(\''+row.specId+'\')" class="btn btn-info btn-xs" data-toggle="tooltip" data-placement="bottom" title="修改"><i class="demo-psi-pen-5"></i></button>';
                    _html += '<button  onclick="dele(\''+row.specId+'\')"class="btn btn-danger btn-xs" data-toggle="tooltip" data-placement="bottom" title="删除"><i class="demo-pli-cross"></i></button>'
                    _html += '<button  onclick="check(\''+row.specId+'\')"class="btn btn-primary btn-xs" data-toggle="tooltip" data-placement="bottom" title="查看"><i class="fa fa-search"></i></button>'
                    return _html;
                },
                cellStyle:function(value,row,index,field){
                    return{css:{'min-width':'100px'}};
                }
            },
            {
                field:'rattanGenus',//数据列
                title:'属名',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                },
                formatter:function(value,row,index){
                    return row.rattanGenus == null ? '' : row.rattanGenus.genusNameCh;
                }
            },
            {
                field:'specNameCh',//数据列
                title:'中文名',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field){
                    return{css:{'min-width':'80px'} };
                }
            },
            {
                field:'specNameEn',//数据列
                title:'英文名',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field){
                    return{css:{'min-width':'80px'} };
                }
            },
            {
                field:'specNameLd',//数据列
                title:'拉丁名',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field){
                    return{css:{'min-width':'80px'} };
                }
            },
            {
                field:'specNameOth',//数据列
                title:'别名',//数据列名称
                sortable:true,//可排序
                visible:false,
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field){
                    return{css:{'min-width':'80px'} };
                }
            },
            {
                field:'specCode',//数据列
                title:'种类编码',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field){
                    return{css:{'min-width':'80px'} };
                }
            },
            {
                field:'specBarCode',//数据列
                title:'种类条形码',//数据列名称
                sortable:true,//可排序
                visible:false,
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field){
                    return{css:{'min-width':'80px'} };
                }
            },
            {
                field:'specDna',//数据列
                title:'种类DNA码',//数据列名称
                sortable:true,//可排序
                visible:false,
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field){
                    return{css:{'min-width':'80px'} };
                }
            },
            {
                field:'specDomestic',//数据列
                title:'国内分布',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field){
                    return{css:{'min-width':'80px'} };
                }
            },
            {
                field:'specForeign',//数据列
                title:'国外分布',//数据列名称
                sortable:true,//可排序
                visible:false,
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field){
                    return{css:{'min-width':'80px'} };
                }
            },
            {
                field:'specVidio',//数据列
                title:'上传视频',//数据列名称
                sortable:true,//可排序
                visible:false,
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field){
                    return{css:{'min-width':'80px'} };
                }
            },
            {
                field:'specImgs',//数据列
                title:'上传图片',//数据列名称
                sortable:true,//可排序
                visible:false,
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field){
                    return{css:{'min-width':'80px'} };
                }
            },
            // {
            //     field:'specSortNum',//数据列
            //     title:'序号',//数据列名称
            //     sortable:true,//可排序
            //     align:'center',//水平居中
            //     valign:'middle',//垂直居中
            //     cellStyle:function(value,row,index,field){
            //         return{css:{'min-width':'80px','max-width':'150px','word-break': 'break-all'}};
            //     }
            // },
            {
                field:'specDesc',//数据列
                title:'描述',//数据列名称
                sortable:true,//可排序
                visible:false,
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field){
                    return{css:{'min-width':'80px','max-width':'150px','word-break': 'break-all'}};
                }
            },

            { field:'genusId',title:'genusId',visible:false }//隐藏不显示
        ]
    });
}

//初始化属表格
function init_genus_table(){
    $('#genus_table').bootstrapTable({
        url:queryGenusPageUrl,//数据源，请求后台的路径
        search:true,//可以搜索
        showRefresh:true,//可以刷新
        showToggle:true,//可以视图切换
        showColumns:true,//可以选择列
        sortName:'id',//排序字段
        sortOrder:'asc',//排序类型，asc正序，desc倒序初始化加載第一頁
        pageList:[5, 10, 20],//每页数量组
        pageSize:10,//默认每页数量
        pagination:true,//可以分页
        showPaginationSwitch:true,//
        sidePagination:'server',//服務器端分頁
        clickToSelect:true,
        onDblClickRow:function(row, $element){
            $("#rattanGenus").val(row.genusNameCh);
            $("#genusId").val(row.genusId);
            $('#genusModal').modal('hide');
        },
        // onClickRow:function(row, $element){
        //     $("#rattanGenus").val(row.genusNameCh);
        //     $("#genusId").val(row.genusId);
        // },
        //method:'POST',
        responseHandler:function(res){//后台返回数据进行修改，修改成bootstrap-table能够使用的数据格式
            return {
                "total": res.data.totalElements,//总记录数
                "rows": res.data.content        //数据
            };
        },
        queryParams:function(params){//请求参数，向后台传的数据，修改成后台可以接收的数据格式
            return {
                page:params.offset/params.limit,    //页码，就是第几页
                size:params.limit                   //每页数量
            }
        },
        cache:false,//是否使用緩存

        columns:[//列数据

            {
                radio:true,//有复选框
                field:'radio'//数据列
            },
            {
                field:'genusNameCh',//数据列
                title:'中文名',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field){
                    return{css:{'min-width':'80px'} };
                }
            },
            {
                field:'genusNameEn',//数据列
                title:'英文名',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field){
                    return{ css:{'min-width':'80px'}};
                }
            },
            {
                field:'genusNameLd',//数据列
                title:'拉丁名',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field){
                    return{css:{'min-width':'80px'}};
                }
            },
            {
                field:'genusNameOth',//数据列
                title:'别名',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field){
                    return{css:{'min-width':'80px'}};
                }
            },
            {
                field:'sortNum',//数据列
                title:'序号',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field){
                    return{css:{'min-width':'80px'}};
                }
            },
            {
                field:'genusDesc',//数据列
                title:'描述',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field){
                    return{css:{'min-width':'80px','max-width':'150px','word-break': 'break-all'}};
                }
            },
            { field:'genusId',title:'genusId',visible:false }//隐藏不显示
        ]
    });
}

// //保存
// function save() {
//     bootbox.confirm({
//         title: '保存确认',
//         message: '<div class="text-center"><h2>您确定保存该数据吗<i class="demo-pli-question-circle text-danger"></i></h2></div>',
//         //size:'small',
//         buttons: {
//             cancel: {label: '<i class="demo-pli-cross"></i> 取消'},
//             confirm: {label: '<i class="demo-pli-check2"></i> 确认'}
//         },
//         callback: function (result) {
//             if (result) {
//
//                 var validateForm = $('#registrationForm').data('bootstrapValidator');
//                 //手动触发验证
//                 validateForm.validate();
//                 //表单验证不通过，直接return，不往下执行
//                 if(!validateForm.isValid()){
//                     return;
//                 }
//
//                 var specDesc=$('#demo-summernote').summernote('code');
//                 var specId = $('#specId').val();
//                 var genusId=$('#genusId').val();
//                 var specNameCh = $('#specNameCh').val();
//                 var specNameEn = $('#specNameEn').val();
//                 var specNameLd = $('#specNameLd').val();
//                 var specNameOth = $('#specNameOth').val();
//                 var specCode = $('#specCode').val();
//                 var specBarCode = $('#specBarCode').val();
//                 var specDna = $('#specDna').val();
//                 var specDomestic = $('#specDomestic').val();
//                 var specForeign = $('#specForeign').val();
//                 var specVidio = $('#specVidio').val();
//                 var specImgs = $('#specImgs').val();
//                 // var specDesc = $('#specDesc').val();
//                 var specSortNum = $('#specSortNum').val();
//                 var formData = {
//                     "specId": specId,
//                     "rattanGenus":{'genusId':genusId},
//                     "specNameCh": specNameCh,
//                     "specNameEn": specNameEn,
//                     "specNameLd": specNameLd,
//                     "specNameOth": specNameOth,
//                     "specCode": specCode,
//                     "specBarCode": specBarCode,
//                     "specDna": specDna,
//                     "specDomestic": specDomestic,
//                     "specForeign": specForeign,
//                     "specVidio": specVidio,
//                     "specImgs": specImgs,
//                     "specDesc": specDesc,
//                     "specSortNum": specSortNum
//                 };
//                 if (specId === "") {//新增
//                     formData.specId = 0;
//                     $.ajax({
//                         url: baseUrl + '/rattanSpec/save',		//请求路径
//                         type: 'POST',			            //请求方式
//                         data: JSON.stringify(formData),	    //数据
//                         contentType: 'application/json',    //数据类型
//                         success: function (res) {	        //请求成功回调函数
//                             if (res.code === 200) {
//                                 $.niftyNoty({
//                                     type: 'success',
//                                     icon: 'pli-like-2 icon-2x',
//                                     message: '新增成功',
//                                     container: 'floating',
//                                     timer: 2000
//                                 });
//                                 $("#data_table").bootstrapTable('refresh', {url: queryPageUrl});
//                                 $('#exampleModal').modal('hide');
//                             } else if(res.code == 400){
//                                 window.location.href='../../page-404.html';
//                             }
//                             else if(res.code == 505){
//                                 window.location.href='../../page-500.html';
//                             }else {
//                                 $.niftyNoty({
//                                     type: 'danger',
//                                     icon: 'pli-cross icon-2x',
//                                     message: res.msg,
//                                     container: 'floating',
//                                     timer: 1000
//                                 });
//                             }
//                         },
//                         error: function (XMLHttpRequest, textStatus, errorThrown) {		//请求失败回调函数
//                         }
//                     });
//                 } else {//修改
//                     $.ajax({
//                         url: baseUrl + '/rattanSpec/update',	    //请求路径
//                         type: 'PUT',				        //请求方式
//                         data: JSON.stringify(formData),	    //数据
//                         contentType: 'application/json',    //数据类型
//                         success: function (res) {	        //请求成功回调函数
//                             if (res.code == 200) {
//                                 $.niftyNoty({
//                                     type: 'success',
//                                     icon: 'pli-like-2 icon-2x',
//                                     message: '修改成功',
//                                     container: 'floating',
//                                     timer: 2000
//                                 });
//                                 $("#data_table").bootstrapTable('refresh', {url: queryPageUrl});
//                                 $('#exampleModal').modal('hide');
//                             } else if(res.code == 400){
//                                 window.location.href='../../page-404.html';
//                             }
//                             else if(res.code == 505){
//                                 window.location.href='../../page-500.html';
//                             }else {
//                                 $.niftyNoty({
//                                     type: 'danger',
//                                     icon: 'pli-cross icon-2x',
//                                     message: res.msg,
//                                     container: 'floating',
//                                     timer: 1000
//                                 });
//                             }
//                         },
//                         error: function (XMLHttpRequest, textStatus, errorThrown) {		//请求失败回调函数
//                         }
//                     });
//                 }
//             } else {
//                 $.niftyNoty({
//                     type: 'danger',
//                     icon: 'pli-cross icon-2x',
//                     message: '您取消了新增',
//                     container: 'floating',
//                     timer: 1000
//                 });
//             }
//         }
//     });
// }

function save() {
    bootbox.confirm({
        title: '保存确认',
        message: '<div class="text-center"><h2>您确定保存该数据吗<i class="demo-pli-question-circle text-danger"></i></h2></div>',
        //size:'small',
        buttons: {
            cancel: {label: '<i class="demo-pli-cross"></i> 取消'},
            confirm: {label: '<i class="demo-pli-check2"></i> 确认'}
        },
        callback: function (result) {
            if (result) {
                var validateForm = $('#registrationForm').data('bootstrapValidator');
                //手动触发验证
                validateForm.validate();
                //表单验证不通过，直接return，不往下执行
                if(!validateForm.isValid()){
                    return;
                }
                //定义一个FormData对象
                var formData = new FormData();
                //从表单取值
                var specDesc=$('#demo-summernote').summernote('code');
                var specId = $('#specId').val();
                var genusId=$('#genusId').val();
                var specNameCh = $('#specNameCh').val();
                var specNameEn = $('#specNameEn').val();
                var specNameLd = $('#specNameLd').val();
                var specNameOth = $('#specNameOth').val();
                var specCode = $('#specCode').val();
                var specBarCode = $('#specBarCode').val();
                var specDna = $('#specDna').val();
                var specDomestic = $('#specDomestic').val();
                var specForeign = $('#specForeign').val();
                var specVidio = $('#specVidio').val();
                var specImgs = $('#specImgs').val();
                // var specDesc = $('#specDesc').val();
                var specSortNum = $('#specSortNum').val();

                formData.append("specId", specId);
                formData.append("genus.genusId",genusId);
                formData.append("specNameCh", specNameCh);
                formData.append("specNameEn", specNameEn);
                formData.append("specNameLd", specNameLd);
                formData.append("specNameOth", specNameOth);
                formData.append("specCode", specCode);
                formData.append( "specBarCode", specBarCode);
                formData.append("specDna", specDna);
                formData.append( "specDomestic", specDomestic);
                formData.append( "specForeign", specForeign);
                formData.append("specVidio", specVidio);
                formData.append("specImgs", specImgs);
                formData.append("specDesc", specDesc);
                formData.append("specSortNum", specSortNum);

                //将文件数组添加进来
                var multipartFiles = myDropzoneImg.files;
                for (var i = 0; i < multipartFiles.length; i++) {
                    formData.append("multipartFiles", myDropzoneImg.files[i]);
                }
                multipartFiles = myDropzone.files;
                for (var i = 0; i < multipartFiles.length; i++) {
                    formData.append("multipartFiles", myDropzone.files[i]);
                }

                if (specId === "") {//新增
                    $.ajax({
                        url: baseUrl + '/rattanspec/save',		//请求路径
                        type: 'POST',			            //请求方式
                        dataType: 'JSON',
                        processData: false,
                        contentType: false,
                        data: formData,	    //数据
                        success: function (res) {	        //请求成功回调函数
                            if (res.code = 200) {
                                console.log(3332)
                                $.niftyNoty({
                                    type: 'success',
                                    icon: 'pli-like-2 icon-2x',
                                    message: '新增成功',
                                    container: 'floating',
                                    timer: 2000
                                });
                                $("#data_table").bootstrapTable('refresh', {url: queryPageUrl});
                                $('#exampleModal').modal('hide');
                            } else if(res.code == 400){
                                window.location.href='../../page-404.html';
                            }
                            else if(res.code == 505){
                                window.location.href='../../page-500.html';
                            }else {
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
                } else {//修改
                    $.ajax({
                        url: baseUrl + '/spec/update',	    //请求路径
                        type: 'PUT',				        //请求方式
                        data: JSON.stringify(formData),	    //数据
                        contentType: 'application/json',    //数据类型
                        success: function (res) {	        //请求成功回调函数
                            if (res.code == 200) {
                                $.niftyNoty({
                                    type: 'success',
                                    icon: 'pli-like-2 icon-2x',
                                    message: '修改成功',
                                    container: 'floating',
                                    timer: 2000
                                });
                                $("#data_table").bootstrapTable('refresh', {url: queryPageUrl});
                                $('#exampleModal').modal('hide');
                            } else if(res.code == 400){
                                window.location.href='../../page-404.html';
                            }
                            else if(res.code == 505){
                                window.location.href='../../page-500.html';
                            }else {
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
            } else {
                $.niftyNoty({
                    type: 'danger',
                    icon: 'pli-cross icon-2x',
                    message: '您取消了新增',
                    container: 'floating',
                    timer: 1000
                });
            }
        }
    });
}


//修改,填充表单元素的数据
function edit(id) {
    init_form();
    $.ajax({
        url:baseUrl+'/rattanSpec/findId/'+id,		//请求路径
        type:'GET',			                    //请求方式
        dataType:"JSON",		                //返回数据类型
        contentType: 'application/json',        //数据类型
        success:function(res){	                //请求成功回调函数
            if(res.code==200){
                $('#demo-summernote').summernote('code',res.data.specDesc);
                $('#specId').val(res.data.specId);
                $('#specNameCh').val(res.data.specNameCh);
                $('#specNameEn').val(res.data.specNameEn);
                $('#specNameLd').val(res.data.specNameLd);
                $('#specNameOth').val(res.data.specNameOth);
                $('#specCode').val(res.data.specCode);
                $('#specBarCode').val(res.data.specBarCode);
                $('#specDna').val(res.data.specDna);
                $('#specDomestic').val(res.data.specDomestic);
                $('#specForeign').val(res.data.specForeign);
                $('#specVidio').val(res.data.specVidio);
                $('#specImgs').val(res.data.specImgs);
                //$('#specDesc').val(res.data.specDesc);
                $('#specSortNum').val(res.data.specSortNum);
                if(res.data.rattanGenus!=null){
                    $('#rattanGenus').val(res.data.rattanGenus.genusNameCh);
                    $('#genusId').val(res.data.rattanGenus.genusId);
                }
                $('#exampleModal .modal-title').html("修改");
                $('#exampleModal').modal('show');
            }else if(res.code == 400){
                window.location.href='../../page-404.html';
            }
            else if(res.code == 505){
                window.location.href='../../page-500.html';
            }
            else{
                $.niftyNoty({
                    type: 'danger',
                    icon: 'pli-cross icon-2x',
                    message: res.msg,
                    container: 'floating',
                    timer: 1000
                });
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown) {//请求失败回调函数

        }
    });
}

//删除
function dele(gid){
    bootbox.confirm({
        title: '删除确认',
        message: '<div class="text-center"><h2>您确定删除该条数据吗<i class="demo-pli-question-circle text-danger"></i></h2></div>',
        //size:'small',
        buttons: {
            cancel: {label: '<i class="demo-pli-cross"></i> 取消'},
            confirm: {label: '<i class="demo-pli-check2"></i> 确认'}
        },
        callback: function(result) {
            if (result) {
                $.ajax({
                    url:baseUrl+'/rattanSpec/delete/'+gid,   //请求路径,单个删除
                    type:'DELETE',				        //请求方式
                    contentType: 'application/json',    //数据类型
                    success:function(res){	            //请求成功回调函数
                        if(res.code===200){
                            $.niftyNoty({
                                type: 'success',
                                icon : 'pli-like-2 icon-2x',
                                message : '删除成功',
                                container : 'floating',
                                timer : 2000
                            });
                            $("#data_table").bootstrapTable('refresh',{url :queryPageUrl} );
                            $('#exampleModal').modal('hide');
                        }else if(res.code == 400){
                            window.location.href='../../page-404.html';
                        }
                        else if(res.code == 505){
                            window.location.href='../../page-500.html';
                        }else{
                            $.niftyNoty({
                                type: 'danger',
                                icon : 'pli-cross icon-2x',
                                message : res.msg,
                                container : 'floating',
                                timer : 1000
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
                    timer : 1000
                });
            };
        }
    });
}

//批量删除
function deles() {
    //选中的数据
    var selectedItems=$("#data_table").bootstrapTable('getSelections');
    if(selectedItems.length===0){    //没有选中任何数据
        $.niftyNoty({
            type: 'danger',
            icon : 'pli-cross icon-2x',
            message : '请选择要删除的数据！',
            container : 'floating',
            timer : 5000
        });
    }else{
        bootbox.confirm({
            //标题
            title: '删除确认',
            //内容
            message: '<div class="text-center"><h2>您确定删除选中的数据吗<i class="demo-pli-question-circle text-danger"></i></h2></div>',
            //大小
            //size:'small',
            //按钮组
            buttons: {
                cancel: {label: '<i class="demo-pli-cross"></i> 取消'},   //取消按钮
                confirm: {label: '<i class="demo-pli-check2"></i> 确认'}  //确认按钮
            },
            callback: function(result) {//点击按钮的回调事件，result:false-取消，true-确认
                if (result) {   //确认
                    var ids=[]; //选中数据的genusId数组
                    for(var i=0;i<selectedItems.length;i++){
                        //循环遍历选中的数据并将genusId放入到ids数组中
                        ids.push(selectedItems[i].specId);
                    }
                    $.ajax({    //批量删除
                        //现将数据每个元素用‘,(逗号)’分隔拼接成字符串，再用encodeURI进行编码，最后拼接到url的后面
                        url: baseUrl+'/rattanSpec/deleteByIds?ids='+encodeURI(ids.join(',')),
                        type:'DELETE',
                        contentType: 'application/json',//数据类型
                        success:function(res){	        //请求成功回调函数
                            if(res.code===200){  //删除成功
                                //alert('删除成功');

                                //右上角弹出消息
                                $.niftyNoty({
                                    type: 'success',                //类型
                                    icon : 'pli-like-2 icon-2x',    //图标
                                    message : '删除成功',           //显示的内容
                                    container : 'floating',         //不管他，就这样写
                                    timer : 2000                    //时间，单位ms(毫秒),此处是5秒中后自动消失
                                });
                                $("#data_table").bootstrapTable('refresh',{url : queryPageUrl});
                            }else if(res.code == 400){
                                window.location.href='../../page-404.html';
                            }
                            else if(res.code == 505){
                                window.location.href='../../page-500.html';
                            }else{  //删除失败，res.msg是失败信息
                                $.niftyNoty({
                                    type: 'danger',
                                    icon : 'pli-cross icon-2x',
                                    message : res.msg,
                                    container : 'floating',
                                    timer : 1000
                                });
                            }
                        },
                        error:function(XMLHttpRequest, textStatus, errorThrown) {//请求失败回调函数

                        }
                    });
                }else{  //取消
                    $.niftyNoty({
                        type: 'danger',
                        icon : 'pli-cross icon-2x',
                        message : '您取消了删除',
                        container : 'floating',
                        timer : 1000
                    });
                };
            }
        });
    }
}
//查看详情
function check(id) {
    init_info();
    $.ajax({
        url:baseUrl+'/rattanSpec/findId/'+id,		//请求路径
        type:'GET',			                    //请求方式
        dataType:"JSON",		                //返回数据类型
        contentType: 'application/json',        //数据类型
        success:function(res){	                //请求成功回调函数
            //res.code=400;
            if(res.code===200){
                $('#specNameCh-info').html(res.data.specNameCh).attr('data-original-title',res.data.specNameCh);
                $('#specNameEn-info').html(res.data.specNameEn).attr('data-original-title',res.data.specNameEn);
                $('#specNameLd-info').html(res.data.specNameLd).attr('data-original-title',res.data.specNameLd);
                $('#specNameOth-info').html(res.data.specNameOth).attr('data-original-title',res.data.specNameOth);
                $('#specCode-info').html(res.data.specCode).attr('data-original-title',res.data.specCode);
                $('#specBarCode-info').html(res.data.specBarCode).attr('data-original-title',res.data.specBarCode);
                $('#specDna-info').html(res.data.specDna).attr('data-original-title',res.data.specDna);

                $('#specDomestic-info').html(res.data.specDomestic).attr('data-original-title',res.data.specDomestic);
                $('#specForeign-info').html(res.data.specForeign).attr('data-original-title',res.data.specForeign);
                $('#specVidio-info').html(res.data.specVidio).attr('data-original-title',res.data.specVidio);
                $('#specImgs-info').html(res.data.specImgs).attr('data-original-title',res.data.specImgs);
                //$('#demo-summernote-info').summernote('code',res.data.specDesc);
                $('#specDesc-info').html(res.data.specDesc);
                if(res.data.rattanGenus!=null) {
                    $('#genus-info').html(res.data.rattanGenus.genusNameCh).attr('data-original-title', res.data.rattanGenus.genusNameCh);
                }
                $('#exampleModal-info').modal('show');
            }else if(res.code == 400){
                window.location.href='../../page-404.html';
            }
            else if(res.code == 505){
                window.location.href='../../page-500.html';
            }
            else{
                $.niftyNoty({
                    type: 'danger',
                    icon: 'pli-cross icon-2x',
                    message: res.msg,
                    container: 'floating',
                    timer: 1000
                });
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown) {//请求失败回调函数

        }
    });
}
//初始化表单元素的值
function init_form(){
    $('#rattanGenus').val("");
    $('#specId').val("");
    $('#genusId').val("");
    $('#specNameCh').val("");
    $('#specNameEn').val("");
    $('#specNameLd').val("");
    $('#specNameOth').val("");
    $('#specCode').val("");
    $('#specBarCode').val("");
    $('#specDna').val("");
    $('#specDomestic').val("");
    $('#specForeign').val("");
    $('#specVidio').val("");
    $('#specImgs').val("");
    $('#specDesc').val("");
    $('#specSortNum').val("");
    $('#demo-summernote').summernote('code',"");
    // $('#specSortNum').val("");
    $('#registrationForm').data('bootstrapValidator').resetForm();
    clear_file();
}
//初始化详情元素值
function init_info(){

    $('#specNameCh-info').val("").attr('data-original-title',"");
    $('#specNameEn-info').val("").attr('data-original-title',"");
    $('#specNameLd-info').val("").attr('data-original-title',"");
    $('#specNameOth-info').val("").attr('data-original-title',"");
    $('#specCode-info').val("").attr('data-original-title',"");
    $('#specBarCode-info').val("").attr('data-original-title',"");
    $('#specDna-info').val("").attr('data-original-title',"");
    $('#specDomestic-info').val("").attr('data-original-title',"");
    $('#specForeign-info').val("").attr('data-original-title',"");
    $('#specVidio-info').val("").attr('data-original-title',"");
    $('#specImgs-info').val("").attr('data-original-title',"");
    $('#specDesc-info').val("").attr('data-original-title',"");

}
//修改密码富文本的高度
function init_sunmmernote(){
    $('#demo-summernote').summernote({
        height: 244,                 // set editor height
        minHeight: null,             // set minimum height of editor
        maxHeight: null,             // set maximum height of editor
        focus: true                  // set focus to editable area after initializing summernote
    });
    $('#demo-summernote-info').summernote({
        height: 244,                 // set editor height
        minHeight: null,             // set minimum height of editor
        maxHeight: null,             // set maximum height of editor
        focus: true                 // set focus to editable area after initializing summernot
    })
    $('#demo-summernote-info').summernote('disable');
}
//修改密码文件上传
function init_file_upload(){
    var previewNode = document.querySelector("#dz-template");
    previewNode.id = "";
    var previewTemplate = previewNode.parentNode.innerHTML;
    previewNode.parentNode.removeChild(previewNode);

    var uplodaBtn = $('#dz-upload-btn');
    var removeBtn = $('#dz-remove-btn');
    myDropzone = new Dropzone( uplodaBtn.parent().parent().parent()[0],{//document.body, { // Make the whole body a dropzone
        url: baseUrl+'/rattanspec/upload', // Set the url
        thumbnailWidth: 50,
        thumbnailHeight: 50,
        parallelUploads: 20,
        paramName:'bambooFile',
        //acceptedFiles:'video/*,audio/*',
        //acceptedFiles:'flv-application/octet-stream,video/mp4,video/quicktime,audio/x-pn-realaudio,video/x-msvideo,application/x-shockwave-flash',
        //audio/x-pn-realaudio:.rm,.rmvb ; flash的后缀是.swf
        acceptedFiles:'.flv,.mp4,.mov,.rm,.rmvb,.avi,.swf',
        previewTemplate: previewTemplate,
        maxFilesize:100,
        autoQueue: false, // Make sure the files aren't queued until manually added
        previewsContainer: "#dz-previews", // Define the container to display the previews
        clickable: ".fileinput-button" // Define the element that should be used as click trigger to select files.
    });


    myDropzone.on("addedfile", function (file) {
        // Hookup the button
        uplodaBtn.prop('disabled', false);
        removeBtn.prop('disabled', false);
    });

    // Update the total progress bar
    myDropzone.on("totaluploadprogress", function (progress) {
        $("#dz-total-progress .progress-bar").css({'width': progress + "%"});
    });

    myDropzone.on("sending", function (file) {
        // Show the total progress bar when upload starts
        document.querySelector("#dz-total-progress").style.opacity = "1";
    });

    // Hide the total progress bar when nothing's uploading anymore
    myDropzone.on("queuecomplete", function (progress) {
        document.querySelector("#dz-total-progress").style.opacity = "0";
    });

    myDropzone.on('success',function (file,data) {
        alert(data);
    });


    // Setup the buttons for all transfers
    uplodaBtn.on('click', function () {
        //Upload all files
        myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));
    });

    removeBtn.on('click', function () {
        myDropzone.removeAllFiles(true);
        uplodaBtn.prop('disabled', true);
        removeBtn.prop('disabled', true);
    });

    //往上是上传视频
    // =================================================================

    // =================================================================
    //往下是上传图片

    // DROPZONE.JS WITH BOOTSTRAP'S THEME
    // =================================================================
    // Require Dropzone
    // http://www.dropzonejs.com/
    // =================================================================
    // Get the template HTML and remove it from the doumenthe template HTML and remove it from the doument
    var previewNodeImg = document.querySelector("#dz-template-img");
    previewNodeImg.id = "";
    var previewTemplateImg = previewNodeImg.parentNode.innerHTML;
    previewNodeImg.parentNode.removeChild(previewNodeImg);

    var uplodaImgBtn = $('#dz-upload-img-btn');
    var removeImgBtn = $('#dz-remove-img-btn');
    myDropzoneImg = new Dropzone(uplodaImgBtn.parent().parent().parent()[0], { // Make the whole body a dropzone
        url: baseUrl+'/spec/upload', // Set the url
        thumbnailWidth: 50,
        thumbnailHeight: 50,
        parallelUploads: 20,
        /*accept: function(file, done) {
            if(file.type.toLowerCase().indexOf('image')==-1)
               return false;
        },*/
        // acceptedFiles:'image/*',//所有图片类型
        paramName:'bambooFile',
        //image/jpeg:jpe,jpeg,jpg ;
        //acceptedFiles:'image/jpeg,image/gif,image/png,image/bmp',
        acceptedFiles:'.jpg,.jpeg,.gif,.png,.bmp',
        previewTemplate: previewTemplateImg,
        autoQueue: false, // Make sure the files aren't queued until manually added
        previewsContainer: "#dz-previews-img", // Define the container to display the previews
        clickable: ".fileinput-button-img" // Define the element that should be used as click trigger to select files.
    });


    myDropzoneImg.on("addedfile", function (file) {
        // Hookup the button
        uplodaImgBtn.prop('disabled', false);
        removeImgBtn.prop('disabled', false);
    });

    // Update the total progress bar
    myDropzoneImg.on("totaluploadprogress", function (progress) {
        $("#dz-total-progress-img .progress-bar").css({'width': progress + "%"});
    });

    myDropzoneImg.on("sending", function (file) {
        // Show the total progress bar when upload starts
        document.querySelector("#dz-total-progress-img").style.opacity = "1";
    });

    // Hide the total progress bar when nothing's uploading anymore
    myDropzoneImg.on("queuecomplete", function (progress) {
        document.querySelector("#dz-total-progress-img").style.opacity = "0";
    });

    myDropzoneImg.on('success',function (file,data) {
        alert(data);
    });

    // Setup the buttons for all transfers
    uplodaImgBtn.on('click', function () {
        //Upload all files
        myDropzoneImg.enqueueFiles(myDropzoneImg.getFilesWithStatus(Dropzone.ADDED));
    });

    removeImgBtn.on('click', function () {
        myDropzoneImg.removeAllFiles(true);
        uplodaImgBtn.prop('disabled', true);
        removeImgBtn.prop('disabled', true);
    });
}
//清除上传选中的文件
function clear_file(){
    //清除视频的选择
    $('#dz-remove-btn').click();
    //清除图片的选择
    $('#dz-remove-img-btn').click();
}

//选择属
function selectedGenus(){
    //选中的数据
    var selectedSpecItems=$("#genus_table").bootstrapTable('getSelections');
    if (selectedSpecItems.length==1){
        $("#rattanGenus").val(selectedSpecItems[0].genusNameCh);
        $("#genusId").val(selectedSpecItems[0].genusId);
        $('#genusModal').modal('hide');
    }
}
