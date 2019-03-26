$(function(){
    $('#btn_add').on('click',function () {
        $('#exampleModal').modal('show');
    });
    $('#btn_delete').on('click',function(){
        alert("删除");
    });
    function init(){
        var dataSoure=[
            {'id':'1','Unit_English':'李雷','Unit_Symbol':'LiLei','Unit_Symbol_other':'LiLei','Num':'1'},
            {'id':'2','Unit_English':'李雷','Unit_Symbol':'LiLei','Unit_Symbol_other':'LiLei','Num':'2'},
            {'id':'3','Unit_English':'李雷','Unit_Symbol':'LiLei','Unit_Symbol_other':'LiLei','Num':'3'},
            {'id':'4','Unit_English':'李雷','Unit_Symbol':'LiLei','Unit_Symbol_other':'VCMIDU 是单位英文翻译后缀：个/mm²','Num':'4'},
            {'id':'5','Unit_English':'李雷','Unit_Symbol':'LiLei','Unit_Symbol_other':'LiLei','Num':'5'},
            {'id':'6','Unit_English':'李雷','Unit_Symbol':'LiLei','Unit_Symbol_other':'LiLei','Num':'6'},
            {'id':'7','Unit_English':'李雷','Unit_Symbol':'LiLei','Unit_Symbol_other':'LiLei','Num':'7'},
            {'id':'8','Unit_English':'李雷','Unit_Symbol':'LiLei','Unit_Symbol_other':'LiLei','Num':'8'},
            {'id':'9','Unit_English':'李雷','Unit_Symbol':'LiLei','Unit_Symbol_other':'LiLei','Num':'9'}
        ];
        // $('#data_table').bootstrapTable({
        //     //url:'',//数据源，请求后台的路径
        //     data:dataSoure,//数据源，json数据
        //     toolbar:'#btn_area',//按钮组
        //     search:true,//可以搜索
        //     showRefresh:true,//可以刷新
        //     showToggle:true,//可以视图切换
        //     showColumns:true,//可以选择列
        //     sortName:'id',//排序字段
        //     sortOrder:'asc',//排序类型，asc正序，desc倒序
        //     pageList:[5, 10, 20],//每页数量组
        //     pageSize:5,//默认每页数量
        //     pagination:true,//可以分页
        //     showPaginationSwitch:true,//
        //     columns:[//列数据
        //         {
        //             checkbox:true,//有复选框
        //             valign:'middle',//垂直居中
        //             cellStyle:function(value,row,index,field){
        //                 return{
        //                     css:{
        //                         'min-width':'36px'
        //                     }
        //                 };
        //             }
        //         },
        //         {
        //             field:'',//数据列
        //             title:'操作',//数据列名称
        //             width:'80px',
        //             align:'center',//水平居中
        //             valign:'middle',//垂直居中
        //             formatter:function(value,row,index){//格式化，自定义内容
        //                 var _html = '<button onclick="edit(\''+row.id+'\')" class="btn btn-info btn-xs" data-toggle="tooltip" data-placement="bottom" title="修改"><i class="demo-psi-pen-5"></i></button>';
        //                 _html += '<button  onclick="dele(\''+row.id+'\')"class="btn btn-danger btn-xs" data-toggle="tooltip" data-placement="bottom" title="删除"><i class="demo-pli-cross"></i></button>'
        //                 return _html;
        //             },
        //             cellStyle:function(value,row,index,field){
        //                 return{
        //                     css:{
        //                         'min-width':'80px'
        //                     }
        //                 };
        //             }
        //         },
        //         {
        //             field:'Unit_English',//数据列
        //             title:'英文名',//数据列名称
        //             sortable:true,//可排序
        //             align:'center',//水平居中
        //             valign:'middle',//垂直居中
        //             cellStyle:function(value,row,index,field){
        //                 return{
        //                     css:{
        //                         'min-width':'80px'
        //                     }
        //                 };
        //             }
        //         },
        //         {
        //             field:'Unit_Symbol',//数据列
        //             title:'显示名称',//数据列名称
        //             sortable:true,//可排序
        //             align:'center',//水平居中
        //             valign:'middle',//垂直居中
        //             cellStyle:function(value,row,index,field){
        //                 return{
        //                     css:{
        //                         'min-width':'80px'
        //                     }
        //                 };
        //             }
        //         },
        //         {
        //             field:'Unit_Symbol_other',//数据列
        //             title:'备注',//数据列名称
        //             sortable:true,//可排序
        //             align:'center',//水平居中
        //             valign:'middle',//垂直居中
        //             cellStyle:function(value,row,index,field){
        //                 return{
        //                     css:{
        //                         'min-width':'80px',
        //                         'max-width':'150px',
        //                         'word-break': 'break-all'
        //                     }
        //                 };
        //             }
        //         },
        //         {
        //             field:'Num',//数据列
        //             title:'序号',//数据列名称
        //             sortable:true,//可排序
        //             align:'center',//水平居中
        //             valign:'middle',//垂直居中
        //             cellStyle:function(value,row,index,field){
        //                 return{
        //                     css:{
        //                         'min-width':'80px'
        //                     }
        //                 };
        //             }
        //         }
        //
        //     ]
        // });



        $('#data_table').bootstrapTable({
            //url:queryPageUrl,//数据源，请求后台的路径
            data:dataSoure,//数据源，json数据
            toolbar:'#btn_area',//按钮组 这里必须绑定工具栏，不然布局会错乱
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
            // responseHandler:function(res){//后台返回数据进行修改，修改成bootstrap-table能够使用的数据格式
            //     return {
            //         "total": res.data.totalElements,//总记录数
            //         "rows": res.data.content        //数据
            //     };
            // },
            // queryParams:function(params){//请求参数，向后台传的数据，修改成后台可以接收的数据格式
            //     return {
            //         page:params.offset/params.limit,    //页码，就是第几页
            //         size:params.limit,                   //每页数量
            //         search:params.search
            //     }
            // },
            // onColumnSwitch:function(filed,checked){
            //     $('#data_table').bootstrapTable('resetView');
            // },
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
                    width:'90px',
                    align:'center',//水平居中
                    valign:'middle',//垂直居中
                    formatter:function(value,row,index){//格式化，自定义内容
                        var _html = '<button onclick="edit(\''+row.id+'\')" class="btn btn-info btn-xs" data-toggle="tooltip" data-placement="bottom" title="修改"><i class="demo-psi-pen-5"></i></button>';
                        _html += '<button  onclick="dele(\''+row.id+'\')"class="btn btn-danger btn-xs" data-toggle="tooltip" data-placement="bottom" title="删除"><i class="demo-pli-cross"></i></button>'
                        _html += '<button  onclick="check(\''+row.id+'\')"class="btn btn-primary btn-xs" data-toggle="tooltip" data-placement="bottom" title="查看"><i class="fa fa-search"></i></button>'
                        return _html;
                    },
                    cellStyle:function(value,row,index,field){
                        return{css:{'min-width':'100px'}};
                    }
                },
                {
                    field:'Unit_English',//数据列
                    title:'英文名',//数据列名称
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
                    field:'Unit_Symbol',//数据列
                    title:'显示名称',//数据列名称
                    sortable:true,//可排序
                    align:'center',//水平居中
                    valign:'middle',//垂直居中
                    cellStyle:function(value,row,index,field){
                        return{css:{'min-width':'80px'} };
                    }
                },
                {
                    field:'Unit_Symbol_other',//数据列
                    title:'备注',//数据列名称
                    sortable:true,//可排序
                    align:'center',//水平居中
                    valign:'middle',//垂直居中
                    cellStyle:function(value,row,index,field){
                        return{css:{'min-width':'80px'} };
                    }
                }
                // { field:'genusId',title:'genusId',visible:false }//隐藏不显示
            ]
        });


    }
    init();
});
function edit(id) {
    $('#exampleModal').modal('show');
}
function dele(id){
    alert("删除")
}