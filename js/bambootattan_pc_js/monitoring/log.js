var queryPageUrl='';
$(function(){
    $('.username').html('欢迎您，'+ $.cookie('BAM_USERNAME'));
    queryPageUrl = baseUrl+'/log/findDateQuery';
    init_page();
    //初始化表格
    init_table();
     $('#btn_query').on('click',query);
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
        sortable:false,//排序设置
        sortOrder:'asc',//排序类型，asc正序，desc倒序初始化加載第一頁
        pageList:[5, 10, 20,100,2000,'ALL'],//每页数量组
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
                search:params.search,               //模糊搜索
                startTime: $('#startTime').val(),         //查询时间上限
                endTime:$('#endTime').val()              //查询时间下限
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
                // order:'asc',
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },
            // {
            //     field:'beginOptTime',//数据列
            //     title:'操作时间（查询上限）',//数据列名称
            //     visible:false,
            //     sortable:true,//可排序
            //     align:'center',//水平居中
            //     valign:'middle',//垂直居中
            //     cellStyle:function(value,row,index,field) {
            //         return {css: {'min-width': '80px'}};
            //     }
            // },
            // {
            //     field:'endOptTime',//数据列
            //     title:'操作时间（查询下限）',//数据列名称
            //     sortable:true,//可排序
            //     visible:false,
            //     align:'center',//水平居中
            //     valign:'middle',//垂直居中
            //     cellStyle:function(value,row,index,field) {
            //         return {css: {'min-width': '80px'}};
            //     }
            // },

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
            // {
            //     field:'requestParam',//数据列
            //     title:' 请求参数',//数据列名称
            //     sortable:true,//可排序
            //     align:'center',//水平居中
            //     valign:'middle',//垂直居中
            //     cellStyle:function(value,row,index,field) {
            //         return {css: {'min-width': '80px'}};
            //     }
            // },
            //
            // {
            //     field:'classMethod',//数据列
            //     title:'类方法',//数据列名称
            //     sortable:true,//可排序
            //     align:'center',//水平居中
            //     valign:'middle',//垂直居中
            //     cellStyle:function(value,row,index,field) {
            //         return {css: {'min-width': '80px'}};
            //     }
            // },

            {
                field:'optUrl',//数据列
                title:' 操作地址',//数据列名称
                sortable:true,//可排序
                align:'center',//水平居中
                valign:'middle',//垂直居中
                cellStyle:function(value,row,index,field) {
                    return {css: {'min-width': '80px'}};
                }
            },

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
        clearBtn:true              //清除按钮
    });
}
//按照时间查询
function query(){
   $("#data_table").bootstrapTable('selectPage',1 );
}