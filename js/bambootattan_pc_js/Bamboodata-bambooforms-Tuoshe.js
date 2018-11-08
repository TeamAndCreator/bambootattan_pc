$(function(){
    $('#btn_add').on('click',function () {
        $('#exampleModal').modal('show');
    });
    $('#btn_delete').on('click',function(){
        alert("删除");
    });
    function init(){
        var dataSoure=[
            {'id':'1','zhong':'李雷','Tuoshecolor':'LiLei','Tuoshehigh':'LiLei','TuosheBYXZ':'LiLei','TuosheBMBF':'23'},
            {'id':'1','zhong':'李雷','Tuoshecolor':'LiLei','Tuoshehigh':'LiLei','TuosheBYXZ':'LiLei','TuosheBMBF':'23'},
            {'id':'1','zhong':'李雷','Tuoshecolor':'LiLei','Tuoshehigh':'LiLei','TuosheBYXZ':'LiLei','TuosheBMBF':'23'},
            {'id':'1','zhong':'李雷','Tuoshecolor':'LiLei','Tuoshehigh':'LiLei','TuosheBYXZ':'LiLei','TuosheBMBF':'23'},
            {'id':'1','zhong':'李雷','Tuoshecolor':'LiLei','Tuoshehigh':'LiLei','TuosheBYXZ':'LiLei','TuosheBMBF':'23'},
            {'id':'1','zhong':'李雷','Tuoshecolor':'LiLei','Tuoshehigh':'LiLei','TuosheBYXZ':'LiLei','TuosheBMBF':'23'},
            {'id':'1','zhong':'李雷','Tuoshecolor':'LiLei','Tuoshehigh':'LiLei','TuosheBYXZ':'LiLei','TuosheBMBF':'23'},
            {'id':'1','zhong':'李雷','Tuoshecolor':'LiLei','Tuoshehigh':'LiLei','TuosheBYXZ':'LiLei','TuosheBMBF':'23'},
        ];
        $('#data_table').bootstrapTable({
            //url:'',//数据源，请求后台的路径
            data:dataSoure,//数据源，json数据
            toolbar:'#btn_area',//按钮组
            search:true,//可以搜索
            showRefresh:true,//可以刷新
            showToggle:true,//可以视图切换
            showColumns:true,//可以选择列
            sortName:'id',//排序字段
            sortOrder:'asc',//排序类型，asc正序，desc倒序
            pageList:[5, 10, 20],//每页数量组
            pageSize:5,//默认每页数量
            pagination:true,//可以分页
            showPaginationSwitch:true,//
            columns:[//列数据
                {
                    checkbox:true,//有复选框
                    valign:'middle',//垂直居中
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'36px'
                            }
                        };
                    }
                },
                {
                    field:'',//数据列
                    title:'操作',//数据列名称
                    width:'80px',
                    align:'center',//水平居中
                    formatter:function(value,row,index){//格式化，自定义内容
                        var _html = '<button onclick="edit(\''+row.id+'\')" class="btn btn-info btn-xs" data-toggle="tooltip" data-placement="bottom" title="修改"><i class="demo-psi-pen-5"></i></button>';
                        _html += '<button  onclick="dele(\''+row.id+'\')"class="btn btn-danger btn-xs" data-toggle="tooltip" data-placement="bottom" title="删除"><i class="demo-pli-cross"></i></button>'
                        return _html;
                    }
                },
                {
                    field:'zhong',//数据列
                    title:'种标志',//数据列名称
                    sortable:true,//可排序
                    align:'center',//水平居中
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'80px'
                            }
                        };
                    }

                },
                {
                    field:'Tuoshecolor',//数据列
                    title:'箨舌颜色',//数据列名称
                    sortable:true,//可排序
                    align:'center',//水平居中
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'80px'
                            }
                        };
                    }
                },
                {
                    field:'Tuoshehigh',//数据列
                    title:'箨舌高度',//数据列名称
                    sortable:true,//可排序
                    align:'center',//水平居中
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'80px'
                            }
                        };
                    }
                },

                {
                    field:'TuosheBMBF',//数据列
                    title:'箨舌被毛被粉',//数据列名称
                    sortable:true,//可排序
                    align:'center',//水平居中
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'80px'
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
    $('#exampleModal').modal('show');
}
function dele(id){
    alert("删除")
}