var queryPageUrl='';
$(function(){
    queryPageUrl = baseUrl+'/role/findAllQuery';
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
    //初始化表格
    init_table();
    init_sunmmernote();
    //表单验证
    $('#registrationForm').bootstrapValidator();
    $('#demo-summernote').summernote();
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
        showPaginationSwitch:true,
        sidePagination:'server',//服務器端分頁
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
                width:'80px',
                align:'center',//水平居中
                valign:'middle',//垂直居中
                formatter:function(value,row,index){//格式化，自定义内容
                    var _html = '<button onclick="edit(\''+row.genusId+'\')" class="btn btn-info btn-xs" data-toggle="tooltip" data-placement="bottom" title="修改"><i class="demo-psi-pen-5"></i></button>';
                    _html += '<button  onclick="dele(\''+row.genusId+'\')"class="btn btn-danger btn-xs" data-toggle="tooltip" data-placement="bottom" title="删除"><i class="demo-pli-cross"></i></button>';
                    _html += '<button  onclick="check(\''+row.genusId+'\')"class="btn btn-primary btn-xs" data-toggle="tooltip" data-placement="bottom" title="查看"><i class="fa fa-search"></i></button>'
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
                field:'creatpeopple',//数据列
                title:'创建人',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field){
                    return{css:{'min-width':'80px'}};
                }
            },
            {
                field:'creattime',//数据列
                title:'创建时间',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field){
                    return{css:{'min-width':'80px'}};
                }
            },

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
            { field:'roleId',title:'roleId',visible:false}//隐藏不显示
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
                var userId = $('#userId').val();
                var userName = $('#userName').val();
                var eMail = $('#eMail').val();
                var orgName = $('#orgName').val();
                var orgPhone = $('#orgPhone').val();
                var sortNum = $('#sortNum').val();
                // var genusDesc = $('#genusDesc').val();
                var formData={
                    "userId": userId,
                    "genusId": genusId,
                    "userName": userName,
                    "eMail": eMail,
                    "orgName": orgName,
                    "orgPhone": orgPhone,
                    "sortNum": sortNum
                };
                if (userId === "") {//新增
                    formData.userId = 0;
                    $.ajax({
                        url: baseUrl + '/user/save',		//请求路径
                        type: 'POST',			            //请求方式
                        data: JSON.stringify(formData),	    //数据   对象转json字符串
                        contentType: 'application/json',    //数据类型
                        success: function (res) {	        //请求成功回调函数
                            //res.code=400;
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
                            }else if(res.code == 400){
                                window.location.href='../../page-404.html';
                            }
                            else if(res.code == 505){
                                window.location.href='../../page-500.html';
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
                        url: baseUrl + '/genus/update',	    //请求路径
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
                                    timer: 2000
                                });
                                $("#data_table").bootstrapTable('refresh', {url: queryPageUrl});
                                $('#exampleModal').modal('hide');
                            } else if(res.code == 400){
                                window.location.href='../../page-404.html';
                            }
                            else if(res.code == 505){
                                window.location.href='../../page-500.html';
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

//修改
function edit(id) {
    init_form();
    $.ajax({
        url:baseUrl+'/genus/findId/'+id,		//请求路径
        type:'GET',			                    //请求方式
        dataType:"JSON",		                //返回数据类型
        contentType: 'application/json',        //数据类型
        success:function(res){	                //请求成功回调函数
            if(res.code===200){
                //赋值
                $('#demo-summernote').summernote('code',res.data.genusDesc);
                $('#genusId').val(res.data.genusId);
                $('#genusNameCh').val(res.data.genusNameCh);
                $('#genusNameEn').val(res.data.genusNameEn);
                $('#genusNameLd').val(res.data.genusNameLd);
                $('#genusNameOth').val(res.data.genusNameOth);
                $('#sortNum').val(res.data.sortNum);
                $('#genusDesc').val(res.data.genusDesc);
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
                    url:baseUrl+'/genus/delete/'+gid,   //请求路径,单个删除
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
                        }
                        else{
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
                        ids.push(selectedItems[i].genusId);
                    }
                    $.ajax({    //批量删除
                        //现将数据每个元素用‘,(逗号)’分隔拼接成字符串，再用encodeURI进行编码，最后拼接到url的后面
                        url: baseUrl+'/genus/deleteByIds?ids='+encodeURI(ids.join(',')),
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
                            } else{  //删除失败，res.msg是失败信息
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
                }
                else{  //取消
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
        url:baseUrl+'/genus/findId/'+id,		//请求路径
        type:'GET',			                    //请求方式
        dataType:"JSON",		                //返回数据类型
        contentType: 'application/json',        //数据类型
        success:function(res){	                //请求成功回调函数
            if(res.code===200){
                $('#genusNameCh-info').html(res.data.genusNameCh).attr('data-original-title',res.data.genusNameCh);
                $('#genusNameEn-info').html(res.data.genusNameEn).attr('data-original-title',res.data.genusNameEn);
                $('#genusNameLd-info').html(res.data.genusNameLd).attr('data-original-title',res.data.genusNameLd);
                $('#genusNameOth-info').html(res.data.genusNameOth).attr('data-original-title',res.data.genusNameOth);
                $('#sortNum-info').html(res.data.sortNum).attr('data-original-title',res.data.sortNum);
                //$('#demo-summernote-info').summernote('code',res.data.genusDesc);
                $('#genusDesc-info').html(res.data.genusDesc);
                // $('#genusDesc-info').html(res.data.genusDesc).attr('data-original-title',res.data.genusDesc);
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
//设置状态
function state(value, row) {
    if (value == 1) {
        return "<div class='label label-table label-success'>已激活</div>"
    }else {
        return "<div class='label label-table label-warning'><a onclick='updateState(" + row.id + ")' data-toggle=\"modal\" data-target=\"#updateState\" style='color: white; cursor:default'>未激活</a></div>"
    }
}
//激活账号
function updateState(userId) {
    $('#updateState_btn').click(function () {
        $.ajax({
            type: 'post',
            dataType: 'JSON',
            url: baseUrl + '/user/updateState',
            data: {_method: "put", "userId": userId},
            async: false,
            success: function () {
                window.location.reload()
            }
        });
    })
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
    $('#demo-summernote').summernote('code',"");

}

//初始化详情元素值
function init_info(){

    $('#genusId').val("").attr('data-original-title',"");
    $('#genusNameCh-info').val("").attr('data-original-title',"");
    $('#genusNameEn-info').val("").attr('data-original-title',"");
    $('#genusNameLd-info').val("").attr('data-original-title',"");
    $('#genusNameOth-info').val("").attr('data-original-title',"");
    $('#sortNum-info').val("").attr('data-original-title',"");
    $('#genusDesc-info').val("").attr('data-original-title',"");


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