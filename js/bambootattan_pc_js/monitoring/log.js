var queryPageUrl='';
$(function(){
    $('.username').html('欢迎您，'+ $.cookie('BAM_USERNAME'));
    queryPageUrl = baseUrl+'/log/findAllQuery';
    init_page();
    //初始化表格
    init_table();
    // $('#btn_query').on('click',query);
});
//初始化表格
function init_table(){
    $('#data_table').bootstrapTable({
        url:queryPageUrl,//数据源，请求后台的路径
        //data:dataSoure,//数据源，json数据
        toolbar:'#btn_area',//按钮组
        search:false,//不可以显示搜索
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
        // fixedNumber:3,//固定前四列
        columns:[//列数据

            {
                checkbox:true,//有复选框
                field:'checkbox'//数据列
            },

            {
                field:'optUrl',//数据列
                title:' 操作人地址',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            {
                field:'optUser',//数据列
                title:'操作人登录名',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            {
                field:'optTime',//数据列
                title:'操作时间',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            {
                field:'beginOptTime',//数据列
                title:'操作时间（查询上限）',//数据列名称
                visible:false,
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            {
                field:'endOptTime',//数据列
                title:'操作时间（查询下限）',//数据列名称
                sortable:true,//可排序
                visible:false,
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },


            {
                field:'optIp',//数据列
                title:'操作IP地址',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },

            // {
            //     field:'private String optDesc',//数据列
            //     title:'操作描述',//数据列名称
            //     sortable:true,//可排序
            //     align:'center',//水平居中
            //     valign:'middle',//垂直居中
            //     cellStyle:function(value,row,index,field) {
            //         return {css: {'min-width': '80px'}};
            //     }
            // },
            {
                field:'requestParam',//数据列
                title:' 请求参数',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },

            {
                field:'private String classMethod',//数据列
                title:'类方法',//数据列名称
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
        ]
    });
}

function init_page(){
    $('#datepicker input').datepicker({
        format:"yyyy-mm-dd",        //日期格式
        language:  'zh-CN',         //语言
        todayBtn:  true,           //今日日期按钮
        autoclose: true,           //自动关闭
        todayHighlight: true,      //高亮今日日期
        maxViewMode: 2,             //最大日期视图
        minViewMode: 0,             //最小日期视图
        startView: 0,               //开始日期视图
        forceParse: 0,
        clearBtn:true,              //清除按钮
    });
}
// //时间查询
// function query(){
//     var beginOptTime=$('#beginOptTime').val();
//     var endOptTime=$('#endOptTime').val();
//     var formData={
//         "beginOptTime":beginOptTime,
//         "endOptTime":endOptTime,
//     }
//     $.ajax({
//         url: baseUrl + '/log/save',		//请求路径
//         type: 'POST',			            //请求方式
//         data: JSON.stringify(formData),	    //数据   对象转json字符串
//         contentType: 'application/json',    //数据类型
//         success: function (res) {	        //请求成功回调函数
//             //res.code=400;
//             if (res.code === 200) {
//                 $.niftyNoty({
//                     type: 'success',
//                     icon: 'pli-like-2 icon-2x',
//                     message: '查询成功',
//                     container: 'floating',
//                     timer: 2000
//                 });
//                 $("#data_table").bootstrapTable('refresh', {url: queryPageUrl});
//             }else if(res.code == 400){
//                 window.location.href='../../page-404.html';
//             }
//             else if(res.code == 505){
//                 window.location.href='../../page-500.html';
//             } else {
//                 $.niftyNoty({
//                     type: 'danger',
//                     icon: 'pli-cross icon-2x',
//                     message: res.msg,
//                     container: 'floating',
//                     timer: 1000
//                 });
//             }
//         },
//         error: function (XMLHttpRequest, textStatus, errorThrown) {		//请求失败回调函数
//         }
//     });
// }