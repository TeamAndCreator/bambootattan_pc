var queryPageUrl='';
var querySpecPageUrl='';
$(function(){
    $('.username').html('欢迎您，'+ $.cookie('BAM_USERNAME'));
    queryPageUrl = baseUrl+'/culm/findAllQuery';
    querySpecPageUrl = baseUrl+'/spec/findAllQuery';
    // //
    // $('#btn_delete').on('click',deles);
    //初始化表格
    init_table();

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
                field:' private String optUrl',//数据列
                title:' 操作人地址',//数据列名称
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
                field:'private String optUser',//数据列
                title:'操作人登录名',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            {
                field:'private String optTime',//数据列
                title:'操作时间',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            {
                field:' private String beginOptTime',//数据列
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
                field:' private String endOptTime',//数据列
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
                field:'private String optIp',//数据列
                title:'操作IP地址',//数据列名称
                sortable:true,//可排序
                visible:false,
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },

            {
                field:'private String optDesc',//数据列
                title:'操作描述',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            {
                field:'private String requestParam',//数据列
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
            // { field:'culmId',title:'culmId',visible:false }//隐藏不显示
        ]
    });

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
}
$('.form_date').datetimepicker({
    language:  'CN',
    weekStart: 1,
    todayBtn:  1,   //今日日期按钮
    autoclose: 1,   //自动关闭
    todayHighlight: 1,   //高亮今日日期
    startView: 2,       //从日期视图开始
    minView: 2,
    forceParse: 0
});
