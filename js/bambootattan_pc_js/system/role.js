var queryPageUrl='';
$(function(){
    queryPageUrl = baseUrl+'/role/findAllQuery';
    //新增点击事件
    $('#btn_add').on('click',function () {
        init_form();//初始化表单
        for(var i=0;i<dataSoure.length;i++) {
            dataSoure[i].auth_view = 0;
            dataSoure[i].auth_create = 0;
            dataSoure[i].auth_edit = 0;
            dataSoure[i].auth_delete = 0;
        }
        load_auth_table(dataSoure);
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
    //初始化表格
    init_table();

    init_auth_table();
    init_auth_info_table();
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
        sortable:false,//排序设置
        sortOrder:'asc',//排序类型，asc正序，desc倒序初始化加載第一頁
        pageList:[5, 10, 20,100,1000,'ALL'],//每页数量组
        pageSize:5,//默认每页数量
        pagination:true,//可以分页
        showPaginationSwitch:false,
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
                page:params.offset/params.limit,    //页码，就是第几
                size:params.limit,                //每页数量
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
                    var _html = '<button onclick="edit(\''+row.roleId+'\')" class="btn btn-info btn-xs" data-toggle="tooltip" data-placement="bottom" title="修改"><i class="demo-psi-pen-5"></i></button>';
                    _html += '<button  onclick="dele(\''+row.roleId+'\')"class="btn btn-danger btn-xs" data-toggle="tooltip" data-placement="bottom" title="删除"><i class="demo-pli-cross"></i></button>';
                    _html += '<button  onclick="check(\''+row.roleId+'\')"class="btn btn-primary btn-xs" data-toggle="tooltip" data-placement="bottom" title="查看"><i class="fa fa-search"></i></button>'
                    return _html;
                },
                cellStyle:function(value,row,index,field){
                    return{css:{'min-width':'100px'}};
                }
            },
            {
                field:'roleName',//数据列
                title:'角色名',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field){
                    return{ css:{'min-width':'80px'}};
                }
            },
            {
                field:'remark',//数据列
                title:'备注',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field){
                    return{css:{'min-width':'80px'}};
                }
            },
            // {
            //     field:'sortNum',//数据列
            //     title:'序号',//数据列名称
            //     sortable:true,//可排序
            //     align:'center',//水平居中
            //     valign:'middle',//垂直居中
            //     cellStyle:function(value,row,index,field){
            //         return{css:{'min-width':'80px'}};
            //     }
            // },
            {
                field:'canDel',//数据列
                title:'是否能删除',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field){
                    return{css:{'min-width':'80px'}};
                },
                formatter:state
            },
            // {
            //     field:'creattime',//数据列
            //     title:'创建时间',//数据列名称
            //     sortable:true,//可排序
            //     align:'center',//水平居中
            //     valign:'middle',//垂直居中
            //     cellStyle:function(value,row,index,field){
            //         return{css:{'min-width':'80px'}};
            //     }
            // },

            // {
            //     field:'activeFlag',//数据列
            //     title:'状态',//数据列名称
            //     sortable:true,//可排序
            //     align:'center',//水平居中
            //     valign:'middle',//垂直居中
            //     cellStyle:function(value,row,index,field){
            //         return{css:{'min-width':'80px','max-width':'150px','word-break': 'break-all'}};
            //     }
            // },
            // { field:'roleId',title:'roleId',visible:false}//隐藏不显示
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
                var validateForm = $('#registrationForm').data('bootstrapValidator');
                //手动触发验证
                validateForm.validate();
                //表单验证不通过，直接return，不往下执行
                if(!validateForm.isValid()){
                    return;
                }
                //var genusDesc=$('#demo-summernote').summernote('code');
                var roleId = $('#roleId').val();
                var roleName = $('#roleName').val();
                var remark = $('#remark').val();
                var canDel = $('#canDel').val();
                var sortNum = $('#sortNum').val();
                var authorities=[];
                for(var i=0;i<dataSoure.length;i++){
                    var name=dataSoure[i].auth_name;
                    var _authView= $('#auth_table input[data-name="'+name+'"][data-auth="auth_view"]').prop('checked');
                    var _authEdit= $('#auth_table input[data-name="'+name+'"][data-auth="auth_edit"]').prop('checked');
                    var _authCreate= $('#auth_table input[data-name="'+name+'"][data-auth="auth_create"]').prop('checked');
                    var _authDelete= $('#auth_table input[data-name="'+name+'"][data-auth="auth_delete"]').prop('checked');

                    authorities.push({
                        "authCreate":  (_authCreate?1:0),
                        "authDelete":  (_authDelete?1:0),
                        "authEdit": (_authEdit?1:0),
                        "authId":  0,
                        "role":{roleId:(roleId === ""?0:roleId)},
                        "authName": name,
                        "authView":(_authView?1:0)
                    });
                }
                // var genusDesc = $('#genusDesc').val();
                //将取得值放在formData里
                var formData={
                    "roleId": roleId,
                    "roleName": roleName,
                    "remark": remark,
                    "canDel": canDel,
                    "sortNum": sortNum,
                    "authorities":authorities
                };
                if (roleId === "") {//新增
                    formData.userId = 0;
                    $.ajax({
                        url: baseUrl + '/role/save',		//请求路径
                        type: 'POST',			            //请求方式
                        data: JSON.stringify(formData),	    //数据   对象转json字符串
                        contentType: 'application/json',    //数据类型
                        success: function (res) {	        //请求成功回调函数
                            //res.code=404;
                            if (res.code === 200) {
                                $.niftyNoty({
                                    type: 'success',
                                    icon: 'pli-like-2 icon-2x',
                                    message: '新增成功',
                                    container: 'floating',
                                    timer: 2000
                                });
                                $("#data_table").bootstrapTable('refresh', {url: queryPageUrl});
                                $('#exampleModal').modal('hide');
                            }else if(res.code === 404){
                                window.location.href='../../page-404.html';
                            }
                            else if(res.code === 505){
                                window.location.href='../../page-500.html';
                            } else {
                                $.niftyNoty({
                                    type: 'danger',
                                    icon: 'pli-cross icon-2x',
                                    message: res.msg,
                                    container: 'floating',
                                    timer: 2000*6
                                });
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {		//请求失败回调函数
                        }
                    });
                } else {//修改
                    $.ajax({
                        url: baseUrl + '/role/update',	    //请求路径
                        type: 'PUT',				        //请求方式
                        data: JSON.stringify(formData),	    //数据
                        contentType: 'application/json',    //数据类型
                        success: function (res) {	        //请求成功回调函数
                            if (res.code === 200) {
                                $.niftyNoty({
                                    type: 'success',
                                    icon: 'pli-like-2 icon-2x',
                                    message: '修改成功',
                                    container: 'floating',
                                    timer: 2000*6
                                });
                                $("#data_table").bootstrapTable('refresh', {url: queryPageUrl});
                                $('#exampleModal').modal('hide');
                            } else if(res.code === 404){
                                window.location.href='../../page-404.html';
                            }
                            else if(res.code === 505){
                                window.location.href='../../page-500.html';
                            } else {
                                $.niftyNoty({
                                    type: 'danger',
                                    icon: 'pli-cross icon-2x',
                                    message: res.msg,
                                    container: 'floating',
                                    timer: 2000*6
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
//修改
function edit(id) {
    init_form();
    load_auth_table(dataSoure);
    $.ajax({
        url:baseUrl+'/role/findId/'+id,		//请求路径
        type:'GET',			                    //请求方式
        dataType:"JSON",		                //返回数据类型
        contentType: 'application/json',        //数据类型
        success:function(res){	                //请求成功回调函数
            if(res.code===200){
                //赋值
                $('#roleId').val(res.data.roleId);
                $('#roleName').val(res.data.roleName);
                $('#remark').val(res.data.remark);
                $('#canDel').val(res.data.canDel);
                $('#sortNum').val(res.data.sortNum);
                $('#exampleModal .modal-title').html("修改");
                var authorities=res.data.authorities;
                var data=[];
                for(var i=0;i<dataSoure.length;i++){
                    var auth=dataSoure[i];
                    auth.auth_view=0;
                    auth.auth_create=0;
                    auth.auth_edit=0;
                    auth.auth_delete=0;
                    for(var j=0;j<authorities.length;j++){
                        if(dataSoure[i].auth_name==authorities[j].authName){
                            auth.auth_view=authorities[j].authView;
                            auth.auth_create=authorities[j].authCreate;
                            auth.auth_edit=authorities[j].authEdit;
                            auth.auth_delete=authorities[j].authDelete;
                            break;
                        }
                    }
                    data.push(auth);
                }
                load_auth_table(data);
                $('#exampleModal').modal('show');
            }else if(res.code === 404){
                window.location.href='../../page-404.html';
            }
            else if(res.code === 505){
                window.location.href='../../page-500.html';
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
                    url:baseUrl+'/role/delete/'+gid,   //请求路径,单个删除
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
                            window.location.href='../../page-404.html';
                        }
                        else if(res.code === 505){
                            window.location.href='../../page-500.html';
                        }
                        else{
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
                    var ids=[]; //选中数据的roleId数组
                    for(var i=0;i<selectedItems.length;i++){
                        //循环遍历选中的数据并将roleId放入到ids数组中
                        ids.push(selectedItems[i].roleId);
                    }
                    $.ajax({    //批量删除
                        //现将数据每个元素用‘,(逗号)’分隔拼接成字符串，再用encodeURI进行编码，最后拼接到url的后面
                        url: baseUrl+'/role/deleteByIds?ids='+encodeURI(ids.join(',')),
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
                                window.location.href='../../page-404.html';
                            }
                            else if(res.code === 505){
                                window.location.href='../../page-500.html';
                            } else{  //删除失败，res.msg是失败信息
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
                }
                else{  //取消
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
        url:baseUrl+'/role/findId/'+id,		//请求路径
        type:'GET',			                    //请求方式
        dataType:"JSON",		                //返回数据类型
        contentType: 'application/json',        //数据类型
        success:function(res){	                //请求成功回调函数
            if(res.code===200){
                $('#roleName-info').html(res.data.roleName).attr('data-original-title',res.data.roleName);
                $('#remark-info').html(res.data.remark).attr('data-original-title',res.data.remark);
                $('#canDel-info').html((res.data.canDel==1?'否':'是')).attr('data-original-title',res.data.canDel);
                $('#sortNum-info').html(res.data.sortNum).attr('data-original-title',res.data.sortNum);
                var authorities=res.data.authorities;
                var data=[];
                for(var i=0;i<dataSoure.length;i++){
                    var auth=dataSoure[i];
                    auth.auth_view=0;
                    auth.auth_create=0;
                    auth.auth_edit=0;
                    auth.auth_delete=0;
                    for(var j=0;j<authorities.length;j++){
                        if(dataSoure[i].auth_name==authorities[j].authName){
                            auth.auth_view=authorities[j].authView;
                            auth.auth_create=authorities[j].authCreate;
                            auth.auth_edit=authorities[j].authEdit;
                            auth.auth_delete=authorities[j].authDelete;
                            break;
                        }
                    }
                    data.push(auth);
                }
                load_auth_info_table(data);
                $('#exampleModal-info').modal('show');
            }else if(res.code === 404){
                window.location.href='../../page-404.html';
            }
            else if(res.code === 505){
                window.location.href='../../page-500.html';
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
//设置状态
function state(value, row,index) {
    if (value == 1) {
        return "<div class='label label-table label-danger'>不能删除</div>"
    }else {
        return "<div class='label label-table label-success'><a onclick='updateState(" + row.id + ")' data-toggle=\"modal\" data-target=\"#updateState\" style='color: white; cursor:default'>能删除</a></div>"
    }
}
//初始化表单元素的值
function init_form(){
    $('#roleName').val("");
    $('#remark').val("");
    $('#canDEl').val("");
    $('#sortNum').val("");
    $('#roleId').val("");
}
//初始化详情元素值
function init_info(){
    $('#roleId').val("").attr('data-original-title',"");
    $('#roleName-info').val("").attr('data-original-title',"");
    $('#remark-info').val("").attr('data-original-title',"");
    $('#canDel-info').val("").attr('data-original-title',"");
    $('#sortNum-info').val("").attr('data-original-title',"");
}

//auth_name不能重复
var dataSoure=[
    {auth_page:'竹 - 属',auth_name:'genus',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'竹 - 种',auth_name:'spec',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'竹 - 地下茎',auth_name:'understem',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'竹 - 竹竿',auth_name:'culm',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'竹 - 箨环',auth_name:'sheathnode',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'竹 - 箨鞘',auth_name:'sheath',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'竹 - 箨耳',auth_name:'sheathear',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'竹 - 箨舌',auth_name:'sheathtongue',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'竹 - 箨片',auth_name:'sheathshell',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'竹 - 竹叶',auth_name:'leaf',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'竹 - 花果形态',auth_name:'fruit',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'竹 - 物理性质',auth_name:'physical',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'竹 - 化学成分',auth_name:'chemistry',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'竹 - 结构特征',auth_name:'structure',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'竹 - 力学性质',auth_name:'mechanics',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'竹 - 组织比量',auth_name:'tissueproportion',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'竹 - 纤维形态特征',auth_name:'fibermorphology',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'竹 - 导管形态特征',auth_name:'cathermorphology',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'竹 - 维管束形态特征',auth_name:'vascularbundelmorphology',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'藤 - 属',auth_name:'rattangenus',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'藤 - 种',auth_name:'rattanspec',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'藤 - 地下茎',auth_name:'rattanunderstem',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'藤 - 竹竿',auth_name:'rattanculm',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'藤 - 箨环',auth_name:'rattansheathnode',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'藤 - 箨鞘',auth_name:'rattansheath',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'藤 - 箨耳',auth_name:'rattansheathear',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'藤 - 箨舌',auth_name:'rattansheathtongue',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'藤 - 箨片',auth_name:'rattansheathshell',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'藤 - 藤叶',auth_name:'rattanleaf',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'藤 - 花果形态',auth_name:'rattanfruit',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'藤 - 化学成分',auth_name:'rattanchemistry',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'藤 - 物理性质',auth_name:'rattanphysical',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'藤 - 结构特征',auth_name:'rattanstructure',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'藤 - 力学性质',auth_name:'rattanmechanics',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'藤 - 组织比量',auth_name:'rattantissueproportion',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'藤 - 纤维形态特征',auth_name:'rattanfibermorphology',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'藤 - 导管形态特征',auth_name:'rattancathermorphology',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'藤 - 维管束形态特征',auth_name:'rattanvascularbundelmorphology',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'单位',auth_name:'unittable',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},

    {auth_page:'属种占比分析',auth_name:'charts',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'属种统计',auth_name:'count',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},

    {auth_page:'用户',auth_name:'user',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'角色',auth_name:'role',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
    {auth_page:'系统日志',auth_name:'log',auth_view:0,auth_create:0,auth_edit:0,auth_delete:0},
];
function init_auth_table() {
    $('#auth_table').bootstrapTable({
        data:dataSoure,//数据源，json数据
        pagination:false,//可以分页
        cache:false,//是否使用緩存
        columns:[//列数据
            {
                field:'auth_page',//数据列
                title:'页面',//数据列名称
                align:'left',//水平居中
                valign:'middle',//垂直居中
                width:200
            },
            {
                field:'auth_view',//数据列
                title:'查看',//数据列名称
                align:'center',//水平居中
                valign:'middle',//垂直居中
                formatter:function (value,row,index) {
                    return '<input type="checkbox" data-auth="auth_view" data-name="'+row.auth_name+'" '+(value=='1'?'checked':'')+'/>'
                }
            },
            {
                field:'auth_create',//数据列
                title:'新增',//数据列名称
                align:'center',//水平居中
                valign:'middle',//垂直居中
                formatter:function (value,row,index) {
                    return '<input type="checkbox" data-auth="auth_create" data-name="'+row.auth_name+'" '+(value=='1'?'checked':'')+'/>'
                }
            },
            {
                field:'auth_edit',//数据列
                title:'修改',//数据列名称
                align:'center',//水平居中
                valign:'middle',//垂直居中
                formatter:function (value,row,index) {
                    return '<input type="checkbox" data-auth="auth_edit" data-name="'+row.auth_name+'" '+(value=='1'?'checked':'')+'/>'
                }
            },
            {
                field:'auth_delete',//数据列
                title:'删除',//数据列名称
                align:'center',//水平居中
                valign:'middle',//垂直居中
                formatter:function (value,row,index) {
                    return '<input type="checkbox" data-auth="auth_delete" data-name="'+row.auth_name+'" '+(value=='1'?'checked':'')+'/>'
                }
            }
        ]
    });
    $('#auth_table').parents('.fixed-table-container').css('padding-bottom','42px');
}
function load_auth_table(data) {
    if(typeof data!="undefined"&&data!=null){
        $('#auth_table').bootstrapTable('load',data);
        $('#auth_table').parents('.fixed-table-container').css('padding-bottom','42px');
    }

}
function init_auth_info_table() {
    $('#auth_table_info').bootstrapTable({
        data:dataSoure,//数据源，json数据
        pagination:false,//可以分页
        cache:false,//是否使用緩存
        columns:[//列数据
            {
                field:'auth_page',//数据列
                title:'页面',//数据列名称
                align:'left',//水平居中
                valign:'middle',//垂直居中
                width:200
            },
            {
                field:'auth_view',//数据列
                title:'查看',//数据列名称
                align:'center',//水平居中
                valign:'middle',//垂直居中
                formatter:function (value,row,index) {
                    return '<input disabled="disabled" type="checkbox" data-auth="auth_view" data-name="'+row.auth_name+'" '+(value=='1'?'checked':'')+'/>'
                }
            },
            {
                field:'auth_create',//数据列
                title:'新增',//数据列名称
                align:'center',//水平居中
                valign:'middle',//垂直居中
                formatter:function (value,row,index) {
                    return '<input disabled="disabled" type="checkbox" data-auth="auth_create" data-name="'+row.auth_name+'" '+(value=='1'?'checked':'')+'/>'
                }
            },
            {
                field:'auth_edit',//数据列
                title:'修改',//数据列名称
                align:'center',//水平居中
                valign:'middle',//垂直居中
                formatter:function (value,row,index) {
                    return '<input disabled="disabled" type="checkbox" data-auth="auth_edit" data-name="'+row.auth_name+'" '+(value=='1'?'checked':'')+'/>'
                }
            },
            {
                field:'auth_delete',//数据列
                title:'删除',//数据列名称
                align:'center',//水平居中
                valign:'middle',//垂直居中
                formatter:function (value,row,index) {
                    return '<input disabled="disabled" type="checkbox" data-auth="auth_delete" data-name="'+row.auth_name+'" '+(value=='1'?'checked':'')+'/>'
                }
            }
        ]
    });
    $('#auth_table_info').parents('.fixed-table-container').css('padding-bottom','42px');
}
function load_auth_info_table(data) {
    if(typeof data!="undefined"&&data!=null){
        $('#auth_table_info').bootstrapTable('load',data);
        $('#auth_table_info').parents('.fixed-table-container').css('padding-bottom','42px');
    }

}