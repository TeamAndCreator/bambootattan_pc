var queryPageUrl='';
var querySpecPageUrl='';
$(function(){
    queryPageUrl = baseUrl+'/tCulm/findAllQuery';
    querySpecPageUrl = baseUrl+'/rattanSpec/findAllQuery';
    inti_page();
    //新增点击事件
    $('#btn_add').on('click',function () {
        init_form();//初始化表单
        $('#exampleModal').modal('show');//表单模态框
    });
    //打开弹出框，去掉验证信息显示
    $('#exampleModal').on('shown.bs.modal',function () {
        $('#culmForm').data('bootstrapValidator').resetForm();
    });
    //批量删除点击事件
    $('#btn_delete').on('click',deles);
    //保存点击事件
    $('#btn_save').on('click',save);

    $('#btn_select_spec').on('click',function () {
        $('#specModal').modal('show');
        $('#spec_table').bootstrapTable('refresh',querySpecPageUrl);
    });
    //确认选择的种
    $('#btn_spec_ok').on('click',selectedSpec);

    //关闭选择种的模态框
    $("#specModal").on('hidden.bs.modal',openModalClass);
    checkForm();
    //表单验证
    $('#culmForm').bootstrapValidator();
    //初始化表格
    init_table();
    init_spec_table();
    init_info();
    // //表单验证
    // $('#registrationForm').bootstrapValidator();
});
//根据权限初始化页面
function  inti_page() {
    if(hasAuthority('rattanculm','auth_create')){
        $('#btn_add').removeClass('hide');
    }else{
        $('#btn_add').addClass('hide');
    }
    if(hasAuthority('rattanculm','auth_delete')){
        $('#btn_delete').removeClass('hide');
    }else{
        $('#btn_delete').addClass('hide');
    }
}
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
        pageList:[5, 10, 20,100,1000,'ALL'],//每页数量组
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
        onColumnSwitch:function(filed,checked){
            $('#data_table').bootstrapTable('resetView');
        },
        cache:false,//是否使用緩存
        // fixedColumns: true,//固定列
        // fixedNumber:3,//固定前四列
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
                    var _html='';
                    if(hasAuthority('rattanculm','auth_edit')){
                        _html = '<button onclick="edit(\''+row.floFruitId+'\')" class="btn btn-info btn-xs" data-toggle="tooltip" data-placement="bottom" title="修改"><i class="demo-psi-pen-5"></i></button>';
                    }
                    if(hasAuthority('rattanculm','auth_delete')){
                        _html += '<button  onclick="dele(\''+row.floFruitId+'\')"class="btn btn-danger btn-xs" data-toggle="tooltip" data-placement="bottom" title="删除"><i class="demo-pli-cross"></i></button>';
                    }
                    if(hasAuthority('rattanculm','auth_view')){
                        _html += '<button  onclick="check(\''+row.floFruitId+'\')"class="btn btn-primary btn-xs" data-toggle="tooltip" data-placement="bottom" title="查看"><i class="fa fa-search"></i></button>'
                    }
                    return _html;
                },
                cellStyle:function(value,row,index,field){
                    return{css:{'min-width':'100px'}};
                }
            },
            {
                field:'spec',//数据列
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
                field:'culmHeight',//数据列
                title:'竿高度',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            {
                field:'culmDiameter',//数据列
                title:'竿直径',//数据列名称
                sortable:true,//可排序
                visible:false,
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            {
                field:'culmColor',//数据列
                title:'竿颜色',//数据列名称
                visible:false,
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            {
                field:'culmTop',//数据列
                title:'竿稍头',//数据列名称
                sortable:true,//可排序
                 visible:false,
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            {
                field:'culmStem',//数据列
                title:'竿身形态',//数据列名称
                sortable:true,//可排序
                visible:false,
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            {
                field:'internodeLength',//数据列
                title:'节间长度',//数据列名称
                sortable:true,//可排序
                 visible:false,
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            {
                field:'internodeShape',//数据列
                title:'节间形态',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            {
                field:'internodeAerialRoot',//数据列
                title:'节间有无气生根',//数据列名称
                sortable:true,//可排序
                 visible:false,
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            {
                field:'internodeBack',//数据列
                title:'节间被毛',//数据列名称
                sortable:true,//可排序
                 visible:false,
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            {
                field:'internodeCulmWall',//数据列
                title:'节间竿壁厚',//数据列名称
                sortable:true,//可排序
                 visible:false,
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            {
                field:'youngStemBack',//数据列
                title:'幼时竿被毛',//数据列名称
                sortable:true,//可排序
                visible:false,
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            {
                field:'youngStemPowder',//数据列
                title:'幼时竿被粉',//数据列名称
                sortable:true,//可排序
                 visible:false,
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            {
                field:'culmNode',//数据列
                title:'竿环是否隆起',//数据列名称
                sortable:true,//可排序
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
            // { field:'culmId',title:'culmId',visible:false }//隐藏不显示
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

                var validateForm = $('#culmForm').data('bootstrapValidator');
                //手动触发验证
                validateForm.validate();
                //表单验证不通过，直接return，不往下执行
                if(!validateForm.isValid()){
                    return;
                }

                var specId = $('#specId').val();
                var culmId=$('#culmId').val();
                var culmHeight = $('#culmHeight').val();
                var culmDiameter = $('#culmDiameter').val();
                var culmColor = $('#culmColor').val();
                var culmTop = $('#culmTop').val();
                var culmStem=$('#culmStem').val();
                var internodeLength = $('#internodeLength').val();
                var internodeShape = $('#internodeShape').val();
                var internodeAerialRoot = $('#internodeAerialRoot').val();

                var internodeBack = $('#internodeBack').val();
                var internodeCulmWall=$('#internodeCulmWall').val();
                var youngStemBack = $('#youngStemBack').val();
                var youngStemPowder = $('#youngStemPowder').val();
                var culmNode = $('#culmNode').val();
                var genusId=$('#genusId').val();
                var formData = {
                    "culmId":culmId,
                    "spec":{
                        'specId':specId,
                        'genus':{
                            'genusId':genusId
                        }
                    },
                    "culmHeight":culmHeight,
                    "culmDiameter":culmDiameter,
                    "culmColor":culmColor,
                    "culmTop":culmTop,
                    "culmStem": culmStem,
                    "internodeLength":internodeLength,
                    "internodeShape": internodeShape,
                    "internodeAerialRoot": internodeAerialRoot,

                    "internodeBack": internodeBack,
                    "internodeCulmWall":internodeCulmWall,
                    "youngStemBack":youngStemBack,
                    "youngStemPowder": youngStemPowder,
                    "culmNode":culmNode

                };
                if (culmId == "") {//新增
                    formData.specId = 0;
                    $.ajax({
                        url: baseUrl + '/culm/save',		//请求路径
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
                            } else if(res.code == 404){
                                window.location.href='../../../../page-404.html';
                            }
                            else if(res.code == 505){
                                window.location.href='../../../../page-500.html';
                            }else {
                                $.niftyNoty({
                                    type: 'danger',
                                    icon: 'pli-cross icon-2x',
                                    message: res.msg,
                                    container: 'floating',
                                    timer: 2000
                                });
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {		//请求失败回调函数
                        }
                    });
                } else {//修改
                    $.ajax({
                        url: baseUrl + '/culm/update',	    //请求路径
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
                            } else if(res.code == 404){
                                window.location.href='../../../../page-404.html';
                            }
                            else if(res.code == 505){
                                window.location.href='../../../../page-500.html';
                            }else {
                                $.niftyNoty({
                                    type: 'danger',
                                    icon: 'pli-cross icon-2x',
                                    message: res.msg,
                                    container: 'floating',
                                    timer: 2000
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
                    timer: 2000
                });
            }
        }
    });
}

//修改,填充表单元素的数据
function edit(id) {
    init_form();
    $.ajax({
        url:baseUrl+'/tCulm/findId/'+id,		//请求路径
        type:'GET',			                    //请求方式
        dataType:"JSON",		                //返回数据类型
        contentType: 'application/json',        //数据类型
        success:function(res){	                //请求成功回调函数
            if(res.code==200){
                $('#culmId').val(res.data.culmId);
                $('#culmHeight').val(res.data.culmHeight);
                $('#culmDiameter').val(res.data.culmDiameter);
                $('#culmColor').val(res.data.culmColor);
                $('#culmTop').val(res.data.culmTop);
                $('#culmStem').val(res.data.culmStem);
                $('#internodeLength').val(res.data.internodeLength);
                $('#internodeShape').val(res.data.internodeShape);
                $('#internodeAerialRoot').val(res.data.internodeAerialRoot);
                $('#internodeBack').val(res.data.internodeBack);
                $('#internodeCulmWall').val(res.data.internodeCulmWall);
                $('#youngStemBack').val(res.data.youngStemBack);
                $('#youngStemPowder').val(res.data.youngStemPowder);
                $('#culmNode').val(res.data.culmNode);

                $('#spec').val(res.data.spec.specNameCh);
                $('#specId').val(res.data.spec.specId);
                $('#exampleModal .modal-title').html("修改");
                $('#exampleModal').modal('show');
            }else if(res.code === 404){
                window.location.href='../../../../page-404.html';
            }
            else if(res.code === 505){
                window.location.href='../../../../page-500.html';
            }
            else{
                $.niftyNoty({
                    type: 'danger',
                    icon: 'pli-cross icon-2x',
                    message: res.msg,
                    container: 'floating',
                    timer: 2000
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
                    url:baseUrl+'/tCulm/delete/'+gid,   //请求路径,单个删除
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
                        }else if(res.code === 404){
                            window.location.href='../../../../page-404.html';
                        }
                        else if(res.code === 505){
                            window.location.href='../../../../page-500.html';
                        }else{
                            $.niftyNoty({
                                type: 'danger',
                                icon : 'pli-cross icon-2x',
                                message : res.msg,
                                container : 'floating',
                                timer : 2000
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
                    timer : 2000
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
                        ids.push(selectedItems[i].culmId);
                    }
                    $.ajax({    //批量删除
                        //现将数据每个元素用‘,(逗号)’分隔拼接成字符串，再用encodeURI进行编码，最后拼接到url的后面
                        url: baseUrl+'/tCulm/deleteByIds?ids='+encodeURI(ids.join(',')),
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
                            }else if(res.code === 404){
                                window.location.href='../../../../page-404.html';
                            }
                            else if(res.code === 505){
                                window.location.href='../../../../page-500.html';
                            }else{  //删除失败，res.msg是失败信息
                                $.niftyNoty({
                                    type: 'danger',
                                    icon : 'pli-cross icon-2x',
                                    message : res.msg,
                                    container : 'floating',
                                    timer : 2000
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
                        timer : 2000
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
        url:baseUrl+'/tCulm/findId/'+id,		//请求路径
        type:'GET',			                    //请求方式
        dataType:"JSON",		                //返回数据类型
        contentType: 'application/json',        //数据类型
        success:function(res){	                //请求成功回调函数
            if(res.code===200){
                $('#culmHeight-check').html(res.data.culmHeight).attr('data-original-title',res.data.culmHeight);
                $('#culmDiameter-check').html(res.data.culmDiameter).attr('data-original-title',res.data.culmDiameter);
                $('#culmColor-check').html(res.data.culmColor).attr('data-original-title',res.data.culmColor);
                $('#culmTop-check').html(res.data.culmTop).attr('data-original-title',res.data.culmTop);
                $('#culmStem-check').html(res.data.culmStem).attr('data-original-title',res.data.culmStem);
                $('#internodeLength-check').html(res.data.internodeLength).attr('data-original-title',res.data.internodeLength);
                $('#internodeShape-check').html(res.data.internodeShape).attr('data-original-title',res.data.internodeShape);
                $('#internodeAerialRoot-check').html(res.data.internodeAerialRoot).attr('data-original-title',res.data.internodeAerialRoot);

                $('#internodeBack-check').html(res.data.internodeBack).attr('data-original-title',res.data.internodeBack);
                $('#internodeCulmWall-check').html(res.data.internodeCulmWall).attr('data-original-title',res.data.internodeCulmWall);
                $('#youngStemBack-check').html(res.data.youngStemBack).attr('data-original-title',res.data.youngStemBack);
                $('#youngStemPowder-check').html(res.data.youngStemPowder).attr('data-original-title',res.data.youngStemPowder);
                $('#culmNode-check').html(res.data.culmNode).attr('data-original-title',res.data.culmNode);

                $('#spec-check').html(res.data.spec.specNameCh).attr('data-original-title',res.data.specNameCh);
                $('#exampleModal-check').modal('show');
            }else if(res.code === 404){
                window.location.href='../../../../page-404.html';
            }
            else if(res.code === 505){
                window.location.href='../../../../page-500.html';
            }
            else{
                $.niftyNoty({
                    type: 'danger',
                    icon: 'pli-cross icon-2x',
                    message: res.msg,
                    container: 'floating',
                    timer: 2000
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
    if (selectedSpecItems.length===1){
        $("#spec").val(selectedSpecItems[0].specNameCh);
        $("#specId").val(selectedSpecItems[0].specId);
        $("#genusId").val(selectedSpecItems[0].genus.genusId);
        $("#specModal").modal('hide');
    }
}
//初始化表单元素的值
function init_form(){
    $('#spec').val("");
    $('#culmId').val("");
    $('#specId').val("");
    $('#genusId').val("");
    $('#culmHeight').val("");
    $('#culmDiameter').val("");
    $('#culmColor').val("");
    $('#culmTop').val("");
    $('#culmStem').val("");
    $('#internodeLength').val("");
    $('#internodeShape').val("");
    $('#internodeAerialRoot').val("");
    $('#internodeBack').val("");
    $('#internodeCulmWall').val("");
    $('#youngStemBack').val("");
    $('#youngStemPowder').val("");
    $('#culmNode').val("");
    $('#culmForm').data('bootstrapValidator').resetForm();
}
//初始化详情元素的值
function init_info(){
    $('#spec-check').val("").attr('data-original-title',"");//清除鼠标停留显示的内容，就是提示内容
    $('#culmHeight-check').val("").attr('data-original-title',"");
    $('#culmDiameter-check').val("").attr('data-original-title',"");
    $('#culmColor-check').val("").attr('data-original-title',"");
    $('#culmTop-check').val("").attr('data-original-title',"");
    $('#culmStem-check').val("").attr('data-original-title',"");
    $('#internodeLength-check').val("").attr('data-original-title',"");
    $('#internodeShape-check').val("").attr('data-original-title',"");
    $('#internodeAerialRoot-check').val("").attr('data-original-title',"");
    $('#internodeBack-check').val("").attr('data-original-title',"");
    $('#internodeCulmWall-check').val("").attr('data-original-title',"");
    $('#youngStemBack-check').val("").attr('data-original-title',"");
    $('#youngStemPowder-check').val("").attr('data-original-title',"");
    $('#culmNode-check').val("").attr('data-original-title',"");
}
//校验表单
function checkForm(){
    $("#culmForm").bootstrapValidator({
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
    var validateForm = $('#culmForm').data('bootstrapValidator');
    validateForm.resetField('spec');
    validateForm.validateField("spec");
    $("#specId").val(id);
    $('#specModal').modal('hide');
}