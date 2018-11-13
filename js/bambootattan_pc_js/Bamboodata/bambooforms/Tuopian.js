$(function(){
    $('#btn_add').on('click',function () {
        $('#exampleModal').modal('show');
    });
    $('#btn_delete').on('click',function(){
        alert("删除");
    });
    function init(){
        var dataSoure=[
            {'id':'1','ZhongBZ':'李雷','TuopianXT':'LiLei','TuopianColor':'LiLei','TuopianSFYTL':'LiLei','TuopianXDXZ':'23','TuopianJBXT':'韩梅梅','TuopianBYXT':'LiLei','TuopianBMBF':'23','TuopianJBTQKD':'韩梅梅'},
            {'id':'2','ZhongBZ':'李雷','TuopianXT':'LiLei','TuopianColor':'LiLei','TuopianSFYTL':'LiLei','TuopianXDXZ':'23','TuopianJBXT':'韩梅梅','TuopianBYXT':'LiLei','TuopianBMBF':'23','TuopianJBTQKD':'韩梅梅'},
            {'id':'3','ZhongBZ':'李雷','TuopianXT':'LiLei','TuopianColor':'LiLei','TuopianSFYTL':'LiLei','TuopianXDXZ':'23','TuopianJBXT':'韩梅梅','TuopianBYXT':'LiLei','TuopianBMBF':'23','TuopianJBTQKD':'韩梅梅'},
            {'id':'4','ZhongBZ':'李雷','TuopianXT':'LiLei','TuopianColor':'LiLei','TuopianSFYTL':'LiLei','TuopianXDXZ':'23','TuopianJBXT':'韩梅梅','TuopianBYXT':'LiLei','TuopianBMBF':'23','TuopianJBTQKD':'韩梅梅'},
            {'id':'5','ZhongBZ':'李雷','TuopianXT':'LiLei','TuopianColor':'LiLei','TuopianSFYTL':'LiLei','TuopianXDXZ':'23','TuopianJBXT':'韩梅梅','TuopianBYXT':'LiLei','TuopianBMBF':'23','TuopianJBTQKD':'韩梅梅'},
            {'id':'6','ZhongBZ':'李雷','TuopianXT':'LiLei','TuopianColor':'LiLei','TuopianSFYTL':'LiLei','TuopianXDXZ':'23','TuopianJBXT':'韩梅梅','TuopianBYXT':'LiLei','TuopianBMBF':'23','TuopianJBTQKD':'韩梅梅'},
            {'id':'7','ZhongBZ':'李雷','TuopianXT':'LiLei','TuopianColor':'LiLei','TuopianSFYTL':'LiLei','TuopianXDXZ':'23','TuopianJBXT':'韩梅梅','TuopianBYXT':'LiLei','TuopianBMBF':'23','TuopianJBTQKD':'韩梅梅'},
            {'id':'8','ZhongBZ':'李雷','TuopianXT':'LiLei','TuopianColor':'LiLei','TuopianSFYTL':'LiLei','TuopianXDXZ':'23','TuopianJBXT':'韩梅梅','TuopianBYXT':'LiLei','TuopianBMBF':'23','TuopianJBTQKD':'韩梅梅'},
            {'id':'9','ZhongBZ':'李雷','TuopianXT':'LiLei','TuopianColor':'LiLei','TuopianSFYTL':'LiLei','TuopianXDXZ':'23','TuopianJBXT':'韩梅梅','TuopianBYXT':'LiLei','TuopianBMBF':'23','TuopianJBTQKD':'韩梅梅'},
            {'id':'4','ZhongBZ':'李雷','TuopianXT':'LiLei','TuopianColor':'LiLei','TuopianSFYTL':'LiLei','TuopianXDXZ':'23','TuopianJBXT':'韩梅梅','TuopianBYXT':'LiLei','TuopianBMBF':'23','TuopianJBTQKD':'韩梅梅'},
            {'id':'5','ZhongBZ':'李雷','TuopianXT':'LiLei','TuopianColor':'LiLei','TuopianSFYTL':'LiLei','TuopianXDXZ':'23','TuopianJBXT':'韩梅梅','TuopianBYXT':'LiLei','TuopianBMBF':'23','TuopianJBTQKD':'韩梅梅'},
            {'id':'6','ZhongBZ':'李雷','TuopianXT':'LiLei','TuopianColor':'LiLei','TuopianSFYTL':'LiLei','TuopianXDXZ':'23','TuopianJBXT':'韩梅梅','TuopianBYXT':'LiLei','TuopianBMBF':'23','TuopianJBTQKD':'韩梅梅'},
            {'id':'7','ZhongBZ':'李雷','TuopianXT':'LiLei','TuopianColor':'LiLei','TuopianSFYTL':'LiLei','TuopianXDXZ':'23','TuopianJBXT':'韩梅梅','TuopianBYXT':'LiLei','TuopianBMBF':'23','TuopianJBTQKD':'韩梅梅'},
            {'id':'8','ZhongBZ':'李雷','TuopianXT':'LiLei','TuopianColor':'LiLei','TuopianSFYTL':'LiLei','TuopianXDXZ':'23','TuopianJBXT':'韩梅梅','TuopianBYXT':'LiLei','TuopianBMBF':'23','TuopianJBTQKD':'韩梅梅'},
            {'id':'9','ZhongBZ':'李雷','TuopianXT':'LiLei','TuopianColor':'LiLei','TuopianSFYTL':'LiLei','TuopianXDXZ':'23','TuopianJBXT':'韩梅梅','TuopianBYXT':'LiLei','TuopianBMBF':'23','TuopianJBTQKD':'韩梅梅'}

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
            pageSize:10,//默认每页数量
            pagination:true,//可以分页
            showPaginationSwitch:true,//
            columns:[//列数据
                {
                    checkbox:true//有复选框
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
                    },
                    cellStyle:function(value,row,index,field){
                        return{
                            css:{
                                'min-width':'80px'
                            }
                        };
                    }
                },
                {
                    field:'ZhongBZ',//数据列
                    title:'种标志',//数据列名称
                    sortable:true,//可排序
                    align:'center',//水平居中
                    valign:'middle',
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'80px'
                            }
                        };
                    }
                },
                {
                    field:'TuopianXT',//数据列
                    title:'箨片形态',//数据列名称
                    sortable:true,//可排序
                    align:'center',//水平居中
                    valign:'middle',
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'80px'
                            }
                        };
                    }
                },
                {
                    field:'TuopianColor',//数据列
                    title:'箨片颜色',//数据列名称
                    sortable:true,//可排序
                    align:'center',//水平居中
                    valign:'middle',
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'80px'
                            }
                        };
                    }
                },
                {
                    field:'TuopianSFYTL',//数据列
                    title:'箨片是否易脱落',//数据列名称
                    sortable:true,//可排序
                    align:'center',//水平居中
                    valign:'middle',
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'80px'
                            }
                        };
                    }
                },
                {
                    field:'TuopianXDXZ',//数据列
                    title:'箨片先端形状',//数据列名称
                    sortable:true,//可排序
                    align:'center',//水平居中
                    valign:'middle',
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'80px'
                            }
                        };
                    }
                },
                {
                    field:'TuopianJBXT',//数据列
                    title:'箨片基部形态',//数据列名称
                    sortable:true,//可排序
                    align:'center',//水平居中
                    valign:'middle',
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'80px'
                            }
                        };
                    }
                },
                {
                    field:'TuopianBYXT',//数据列
                    title:'箨片边缘形态',//数据列名称
                    sortable:true,//可排序
                    align:'center',//水平居中
                    valign:'middle',
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'80px'
                            }
                        };
                    }
                },
                {
                    field:'TuopianBMBF',//数据列
                    title:'箨片背面被毛被粉',//数据列名称
                    sortable:true,//可排序
                    align:'center',//水平居中
                    valign:'middle',
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'80px'
                            }
                        };
                    }
                },
                {
                    field:'TuopianJBTQKD',//数据列
                    title:'箨片基部与箨鞘宽度之比',//数据列名称
                    sortable:true,//可排序
                    align:'center',//水平居中
                    valign:'middle',
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