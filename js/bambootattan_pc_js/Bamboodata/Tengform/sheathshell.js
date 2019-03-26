var queryPageUrl='';
var querySpecPageUrl='';
$(function(){
    $('.username').html('欢迎您，'+ $.cookie('BAM_USERNAME'));
    queryPageUrl = baseUrl+'/sheathshell/findAllQuery';
    querySpecPageUrl = baseUrl+'/spec/findAllQuery';
    //新增点击事件
    $('#btn_add').on('click',function () {
        init_form();//初始化表单
        $('#exampleModal').modal('show');//表单模态框
    });
    //批量删除点击事件
    $('#btn_delete').on('click',deles);
    //保存点击事件
    $('#btn_save').on('click',save);
    //
    $('#btn_select_spec').on('click',function () {
        $('#specModal').modal('show');
        $('#spec_table').bootstrapTable('refresh',querySpecPageUrl);
    });
    //打开弹出框，去掉验证信息显示
    $('#exampleModal').on('shown.bs.modal',function () {
        $('#sheathshellForm').data('bootstrapValidator').resetForm();
    });
    //确认选择的种
    $('#btn_spec_ok').on('click',selectedSpec);

    //关闭选择种的模态框
    $("#specModal").on('hidden.bs.modal',openModalClass);
    checkForm();
    //表单验证
    $('#sheathshellForm').bootstrapValidator();
    //初始化表格
    init_table();
    init_spec_table();
    init_info();
    // //表单验证
    // $('#registrationForm').bootstrapValidator();
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
        sortable:false,//排序设置
        sortOrder:'asc',//排序类型，asc正序，desc倒序初始化加載第一頁
        pageList:[5, 10, 20],//每页数量组
        pageSize:5,//默认每页数量
        pagination:true,//可以分页
        showPaginationSwitch:false,//
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
        cache:false,//是否使用緩存
        columns:[//列数据

            {
                checkbox:true,//有复选框
                field:'checkbox'//数据列
            },
            {
                field:'',//数据列
                title:'操作',//数据列名称
                width:'90px',
                align:'center',//水平居中
                valign:'middle',//垂直居中
                formatter:function(value,row,index){//格式化，自定义内容
                    var _html = '<button onclick="edit(\''+row.sheShellId+'\')" class="btn btn-info btn-xs" data-toggle="tooltip" data-placement="bottom" title="修改"><i class="demo-psi-pen-5"></i></button>';
                    _html += '<button  onclick="dele(\''+row.sheShellId+'\')"class="btn btn-danger btn-xs" data-toggle="tooltip" data-placement="bottom" title="删除"><i class="demo-pli-cross"></i></button>';
                    _html += '<button  onclick="check(\''+row.sheShellId+'\')"class="btn btn-primary btn-xs" data-toggle="tooltip" data-placement="top" title="查看"><i class="fa fa-search"></i></button>'
                    return _html;
                },
                cellStyle:function(value,row,index,field){
                    return{css:{'min-width':'100px'}};
                }
            },
            {
                field:'spec"',//数据列
                title:'种名',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                },
                formatter:function(value,row,index){
                    return row.spec.specNameCh;
                }
            },
            {
                field:'sheathShellShape',//数据列
                title:'箨片形状',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            {
                field:'sheathShellColor',//数据列
                title:'箨片颜色',//数据列名称
                sortable:true,//可排序
                // visible:false,
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            {
                field:'sheathShellFall',//数据列
                title:'箨片是否易脱落',//数据列名称
                sortable:true,//可排序
                visible:false,
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            {
                field:'sheathShellTopShape',//数据列
                title:'箨片先端形状',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            {
                field:'sheathShellBaseShape',//数据列
                title:'箨片基部形态',//数据列名称
                sortable:true,//可排序
                visible:false,
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            {
                field:'sheathShellMargin',//数据列
                title:'箨片边缘形态',//数据列名称
                sortable:true,//可排序
                visible:false,
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            {
                field:'sheathShellBackPowder',//数据列
                title:'箨片背面被毛被粉',//数据列名称
                sortable:true,//可排序
                visible:false,
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            {
                field:'sheathRatioOf',//数据列
                title:'箨片基部与箨鞘宽度之比',//数据列名称
                sortable:true,//可排序
                visible:false,
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            /*
            {
                field:'underStemId',//数据列
                title:'序号',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field){
                    return{css:{'min-width':'80px'}};
                }
            },*/
            // { field:'sheShellId',title:'sheShellId',visible:false }//隐藏不显示
        ]
    });
}

//初始化种表格
function init_spec_table(){
    $('#spec_table').bootstrapTable({
        url:querySpecPageUrl,//数据源，请求后台的路径
        search:true,//可以搜索
        showRefresh:true,//可以刷新
        showToggle:true,//可以视图切换
        showColumns:true,//可以选择列
        sortName:'id',//排序字段
        sortable:false,//排序设置
        sortOrder:'asc',//排序类型，asc正序，desc倒序初始化加載第一頁
        pageList:[5, 10, 20],//每页数量组
        pageSize:10,//默认每页数量
        pagination:true,//可以分页
        showPaginationSwitch:false,//
        sidePagination:'server',//服務器端分頁
        clickToSelect:true,
        onDblClickRow:function(row, $element){
            // $("#spec").val(row.specNameCh);
            // $("#specId").val(row.specId);
            // $("#genusId").val(row.genus.genusId);
            // $('#specModal').modal('hide');
            checkGenusAfterSelected(row.specNameCh,row.specId);
        },
        /*
        onClickRow:function(row, $element){
            $("#spec").val(row.specNameCh);
            $("#specId").val(row.specId);
        },*/
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
                field:'radio',//数据列
            },
            {
                field:'genus',//数据列
                title:'属名',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                },
                formatter:function(value,row,index){
                    //return row.genus.genusNameCh;
                    return row.genus == null ? '' : row.genus.genusNameCh;
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
                visible:false,
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
                visible:false,
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
            // {
            //     field:'specVidio',//数据列
            //     title:'上传视频',//数据列名称
            //     sortable:true,//可排序
            //     align:'center',//水平居中
            //     valign:'middle',//垂直居中
            //     cellStyle:function(value,row,index,field){
            //         return{css:{'min-width':'80px'} };
            //     }
            // },
            // {
            //     field:'specImgs',//数据列
            //     title:'上传图片',//数据列名称
            //     sortable:true,//可排序
            //     align:'center',//水平居中
            //     valign:'middle',//垂直居中
            //     cellStyle:function(value,row,index,field){
            //         return{css:{'min-width':'80px'} };
            //     }
            // },
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
            // {
            //     field:'specDesc',//数据列
            //     title:'描述',//数据列名称
            //     sortable:true,//可排序
            //     align:'center',//水平居中
            //     valign:'middle',//垂直居中
            //     cellStyle:function(value,row,index,field){
            //         return{css:{'min-width':'80px','max-width':'150px','word-break': 'break-all'}};
            //     }
            // },
            // { field:'specId',title:'specId',visible:false }//隐藏不显示
        ]
    });
}

//保存
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

                var validateForm = $('#sheathshellForm').data('bootstrapValidator');
                //手动触发验证
                validateForm.validate();
                //表单验证不通过，直接return，不往下执行
                if(!validateForm.isValid()){
                    return;
                }

                var specId = $('#specId').val();
                var sheShellId=$('#sheShellId').val();
                var sheathShellShape = $('#sheathShellShape').val();
                var sheathRatioOf = $('#sheathRatioOf').val();
                var sheathShellColor = $('#sheathShellColor').val();
                var sheathShellFall = $('#sheathShellFall').val();
                var sheathShellTopShape=$('#sheathShellTopShape').val();
                var sheathShellBaseShape = $('#sheathShellBaseShape').val();
                var sheathShellMargin = $('#sheathShellMargin').val();
                var sheathShellBackPowder = $('#sheathShellBackPowder').val();
                var genusId=$('#genusId').val();
                var formData = {
                    "sheShellId":sheShellId,
                    "spec":{
                        'specId':specId,
                        'genus':{
                            'genusId':genusId
                        }
                    },
                    "sheathShellShape":sheathShellShape,
                    "sheathRatioOf":sheathRatioOf,
                    "sheathShellColor":sheathShellColor,
                    "sheathShellFall":sheathShellFall,
                    "sheathShellTopShape": sheathShellTopShape,
                    "sheathShellBaseShape":sheathShellBaseShape,
                    "sheathShellMargin": sheathShellMargin,
                    "sheathShellBackPowder": sheathShellBackPowder
                };
                if (sheShellId == "") {//新增
                    formData.specId = 0;
                    $.ajax({
                        url: baseUrl + '/sheathshell/save',		//请求路径
                        type: 'POST',			            //请求方式
                        data: JSON.stringify(formData),	    //数据
                        contentType: 'application/json',    //数据类型
                        success: function (res) {	        //请求成功回调函数
                            if (res.code == 200) {
                                $.niftyNoty({
                                    type: 'success',
                                    icon: 'pli-like-2 icon-2x',
                                    message: '新增成功',
                                    container: 'floating',
                                    timer: 2000
                                });
                                $("#data_table").bootstrapTable('refresh', {url: queryPageUrl});
                                $('#exampleModal').modal('hide');
                            }else if(res.code == 400){
                                window.location.href='../../../../page-404.html';
                            }
                            else if(res.code == 505){
                                window.location.href='../../../../page-500.html';
                            } else {
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
                        url: baseUrl + '/sheathshell/update',	    //请求路径
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
                            }else if(res.code == 400){
                                window.location.href='../../../../page-404.html';
                            }
                            else if(res.code == 505){
                                window.location.href='../../../../page-500.html';
                            } else {
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
        url:baseUrl+'/sheathshell/findId/'+id,		//请求路径
        type:'GET',			                    //请求方式
        dataType:"JSON",		                //返回数据类型
        contentType: 'application/json',        //数据类型
        success:function(res){	                //请求成功回调函数
            if(res.code==200){
                $('#sheShellId').val(res.data.sheShellId);
                $('#sheathShellShape').val(res.data.sheathShellShape);
                $('#sheathRatioOf').val(res.data.sheathRatioOf);
                $('#sheathShellColor').val(res.data.sheathShellColor);
                $('#sheathShellFall').val(res.data.sheathShellFall);
                $('#sheathShellTopShape').val(res.data.sheathShellTopShape);
                $('#sheathShellBaseShape').val(res.data.sheathShellBaseShape);
                $('#sheathShellMargin').val(res.data.sheathShellMargin);
                $('#sheathShellBackPowder').val(res.data.sheathShellBackPowder);
                $('#spec').val(res.data.spec.specNameCh);
                $('#specId').val(res.data.spec.specId);
                $('#exampleModal .modal-title').html("修改");
                $('#exampleModal').modal('show');
            }else if(res.code == 400){
                window.location.href='../../../../page-404.html';
            }
            else if(res.code == 505){
                window.location.href='../../../../page-500.html';
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
                    url:baseUrl+'/sheathshell/delete/'+gid,   //请求路径,单个删除
                    type:'DELETE',				        //请求方式
                    contentType: 'application/json',    //数据类型
                    success:function(res){	            //请求成功回调函数
                        if(res.code==200){
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
                            window.location.href='../../../../page-404.html';
                        }
                        else if(res.code == 505){
                            window.location.href='../../../../page-500.html';
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
    if(selectedItems.length==0){    //没有选中任何数据
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
                        ids.push(selectedItems[i].sheShellId);
                    }
                    $.ajax({    //批量删除
                        //现将数据每个元素用‘,(逗号)’分隔拼接成字符串，再用encodeURI进行编码，最后拼接到url的后面
                        url: baseUrl+'/sheathshell/deleteByIds?ids='+encodeURI(ids.join(',')),
                        type:'DELETE',
                        contentType: 'application/json',//数据类型
                        success:function(res){	        //请求成功回调函数
                            if(res.code==200){  //删除成功
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
                                window.location.href='../../../../page-404.html';
                            }
                            else if(res.code == 505){
                                window.location.href='../../../../page-500.html';
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
        url:baseUrl+'/sheathshell/findId/'+id,		//请求路径
        type:'GET',			                    //请求方式
        dataType:"JSON",		                //返回数据类型
        contentType: 'application/json',        //数据类型
        success:function(res){	                //请求成功回调函数
            if(res.code==200){
                $('#sheathShellShape-info').html(res.data.sheathShellShape).attr('data-original-title',res.data.sheathShellShape);
                $('#sheathRatioOf-info').html(res.data.sheathRatioOf).attr('data-original-title',res.data.sheathRatioOf);
                $('#sheathShellColor-info').html(res.data.sheathShellColor).attr('data-original-title',res.data.sheathShellColor);
                $('#sheathShellFall-info').html(res.data.sheathShellFall).attr('data-original-title',res.data.sheathShellFall);
                $('#sheathShellTopShape-info').html(res.data.sheathShellTopShape).attr('data-original-title',res.data.sheathShellTopShape);
                $('#sheathShellBaseShape-info').html(res.data.sheathShellBaseShape).attr('data-original-title',res.data.sheathShellBaseShape);
                $('#sheathShellMargin-info').html(res.data.sheathShellMargin).attr('data-original-title',res.data.sheathShellMargin);
                $('#sheathShellBackPowder-info').html(res.data.sheathShellBackPowder).attr('data-original-title',res.data.sheathShellBackPowder);

                $('#spec-info').html(res.data.spec.specNameCh).attr('data-original-title',res.data.specNameCh);
                $('#exampleModal-info').modal('show');
            }else if(res.code == 400){
                window.location.href='../../../../page-404.html';
            }
            else if(res.code == 505){
                window.location.href='../../../../page-500.html';
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
//选中种
function selectedSpec() {
    //选中的数据
    var selectedSpecItems=$("#spec_table").bootstrapTable('getSelections');
    if (selectedSpecItems.length==1){
        $("#spec").val(selectedSpecItems[0].specNameCh);
        $("#specId").val(selectedSpecItems[0].specId);
        $("#genusId").val(selectedSpecItems[0].genus.genusId);
        $("#specModal").modal('hide');
    }
}
//初始化表单元素的值
function init_form(){
    $('#spec').val("");
    $('#sheShellId').val("");
    $('#specId').val("");
    $('#genusId').val("");
    $('#sheathShellShape').val("");
    $('#sheathRatioOf').val("");
    $('#sheathShellColor').val("");
    $('#sheathShellFall').val("");
    $('#sheathShellTopShape').val("");
    $('#sheathShellBaseShape').val("");
    $('#sheathShellMargin').val("");
    $('#sheathShellBackPowder').val("");
    $('#sheathshellForm').data('bootstrapValidator').resetForm();
}
//初始化详情元素的值
function init_info(){
    $('#spec-info').val("").attr('data-original-title',"");//清除鼠标停留显示的内容，就是提示内容
    $('#sheathShellShape-info').val("").attr('data-original-title',"");
    $('#sheathRatioOf-info').val("").attr('data-original-title',"");
    $('#sheathShellColor-info').val("").attr('data-original-title',"");
    $('#sheathShellFall-info').val("").attr('data-original-title',"");
    $('#culmStem-info').val("").attr('data-original-title',"");
    $('#sheathShellTopShape-info').val("").attr('data-original-title',"");
    $('#sheathShellBaseShape-info').val("").attr('data-original-title',"");
    $('#sheathShellMargin-info').val("").attr('data-original-title',"");
    $('#sheathShellBackPowder-info').val("").attr('data-original-title',"");
}
//校验表单
function checkForm(){
    $("#sheathshellForm").bootstrapValidator({
        //submitHandler: function (valiadtor, loginForm, submitButton) {
        //    valiadtor.defaultSubmit();
        //},
        group: 'div[class*="col-sm"]',//显示消息的位置元素，追加在最后
        fields: {
            spec: {
                validators: {
                    notEmpty: {
                        message: '种不能为空'
                    }
                }
            }
        }
    });
}
function checkGenusAfterSelected(text,id){
    $("#spec").val(text);
    var validateForm = $('#sheathshellForm').data('bootstrapValidator');
    validateForm.resetField('spec');
    validateForm.validateField("spec");
    $("#specId").val(id);
    $('#specModal').modal('hide');
}