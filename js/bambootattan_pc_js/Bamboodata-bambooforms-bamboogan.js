$(function(){
    $('#btn_add').on('click',function () {
        $('#exampleModal').modal('show');//点击增加按钮，弹出增加模态框
    });
    $('#btn_delete').on('click',function(){
        alert("删除");
    });
    function init(){
        var dataSoure=[
            {'id':'1','Zhong':'李雷','GanHigh':'LiLei','GanZJ':'kk','GanColor':'LiLei','GanST':'23','GanXT':'韩梅梅','JieHigh':'23','JieXT':'23','JieYWQSG':'23','JieBM':'23','JieGBH':'23','YouGanBM':'23','YouGanBF':'23','GanSFLQ':'55'},
            {'id':'2','Zhong':'李雷','GanHigh':'LiLei','GanZJ':'kk','GanColor':'LiLei','GanST':'23','GanXT':'韩梅梅','JieHigh':'23','JieXT':'23','JieYWQSG':'23','JieBM':'23','JieGBH':'23','YouGanBM':'23','YouGanBF':'23','GanSFLQ':'55'},
            {'id':'3','Zhong':'李雷','GanHigh':'LiLei','GanZJ':'kk','GanColor':'LiLei','GanST':'23','GanXT':'韩梅梅','JieHigh':'23','JieXT':'23','JieYWQSG':'23','JieBM':'23','JieGBH':'23','YouGanBM':'23','YouGanBF':'23','GanSFLQ':'55'},
            {'id':'4','Zhong':'李雷','GanHigh':'LiLei','GanZJ':'kk','GanColor':'LiLei','GanST':'23','GanXT':'韩梅梅','JieHigh':'23','JieXT':'23','JieYWQSG':'23','JieBM':'23','JieGBH':'23','YouGanBM':'23','YouGanBF':'23','GanSFLQ':'55'},
            {'id':'5','Zhong':'李雷','GanHigh':'LiLei','GanZJ':'kk','GanColor':'LiLei','GanST':'23','GanXT':'韩梅梅','JieHigh':'23','JieXT':'23','JieYWQSG':'23','JieBM':'23','JieGBH':'23','YouGanBM':'23','YouGanBF':'23','GanSFLQ':'55'},
            {'id':'6','Zhong':'李雷','GanHigh':'LiLei','GanZJ':'kk','GanColor':'LiLei','GanST':'23','GanXT':'韩梅梅','JieHigh':'23','JieXT':'23','JieYWQSG':'23','JieBM':'23','JieGBH':'23','YouGanBM':'23','YouGanBF':'23','GanSFLQ':'55'},
            {'id':'7','Zhong':'李雷','GanHigh':'LiLei','GanZJ':'kk','GanColor':'LiLei','GanST':'23','GanXT':'韩梅梅','JieHigh':'23','JieXT':'23','JieYWQSG':'23','JieBM':'23','JieGBH':'23','YouGanBM':'23','YouGanBF':'23','GanSFLQ':'55'},
            {'id':'8','Zhong':'李雷','GanHigh':'LiLei','GanZJ':'kk','GanColor':'LiLei','GanST':'23','GanXT':'韩梅梅','JieHigh':'23','JieXT':'23','JieYWQSG':'23','JieBM':'23','JieGBH':'23','YouGanBM':'23','YouGanBF':'23','GanSFLQ':'55'},
            {'id':'9','Zhong':'李雷','GanHigh':'LiLei','GanZJ':'kk','GanColor':'LiLei','GanST':'23','GanXT':'韩梅梅','JieHigh':'23','JieXT':'23','JieYWQSG':'23','JieBM':'23','JieGBH':'23','YouGanBM':'23','YouGanBF':'23','GanSFLQ':'55hjkdfahdjfkadjfdfjadfadjfkadfadjfdjfdjfhuehefjdfdkjfadfjadfdhafjhdjfhjdfhajfhjadfhajh'}
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
            // classes:'table',
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
                    valign:'middle',//垂直居中
                    formatter:function(value,row,index){//格式化，自定义内容
                        var _html = '<button onclick="edit(\''+row.id+'\')" class="btn btn-info btn-xs" data-toggle="tooltip" data-placement="bottom" title="修改"><i class="demo-psi-pen-5"></i></button>';
                        _html += '<button  onclick="dele(\''+row.id+'\')"class="btn btn-danger btn-xs" data-toggle="tooltip" data-placement="bottom" title="删除"><i class="demo-pli-cross"></i></button>'
                        return _html;
                    },
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'80px'
                            }
                        };
                    }
                },
                {
                    field:'Zhong',//数据列
                    title:'种',//数据列名称
                    sortable:true,//可排序
                    align:'center',//水平居中
                    width:'80px',
                    valign:'middle',//垂直居中
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'80px'
                            }
                        };
                    }
                },
                {
                    field:'GanHigh',//数据列
                    title:'竿高度',//数据列名称
                    sortable:true,//可排序
                    width:'80px',
                    align:'center',//水平居中
                    valign:'middle',//垂直居中
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'80px'
                            }
                        };
                    }
                },
                {
                    field:'GanZJ',//数据列
                    title:'竿直径',//数据列名称
                    sortable:true,//可排序
                    width:'80px',
                    align:'center',//水平居中
                    valign:'middle',//垂直居中
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'80px'
                            }
                        };
                    }
                },
                {
                    field:'GanColor',//数据列
                    title:'竿颜色',//数据列名称
                    sortable:true,//可排序
                    width:'80px',
                    align:'center',//水平居中
                    valign:'middle',//垂直居中
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'80px'
                            }
                        };
                    }
                },
                {
                    field:'GanST',//数据列
                    title:'竿梢头',//数据列名称
                    sortable:true,//可排序
                    align:'center',//水平居中
                    valign:'middle',//垂直居中
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'80px'
                            }
                        };
                    }
                },
                {
                    field:'GanXT',//数据列
                    title:'竿身形态',//数据列名称
                    sortable:true,//可排序
                    width:'80px',
                    align:'center',//水平居中
                    valign:'middle',//垂直居中
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'80px'
                            }
                        };
                    }
                },
                {
                    field:'JieHigh',//数据列
                    title:'节间长度',//数据列名称
                    sortable:true,//可排序
                    width:'80px',
                    align:'center',//水平居中
                    valign:'middle',//垂直居中
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'80px'
                            }
                        };
                    }
                },
                {
                    field:'JieXT',//数据列
                    title:'节间形态',//数据列名称
                    sortable:true,//可排序
                    align:'center',//水平居中
                    valign:'middle',//垂直居中
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'80px'
                            }
                        };
                    }
                },
                {
                    field:'JieYWQSG',//数据列
                    title:'节间有无气生根',//数据列名称
                    sortable:true,//可排序
                    width:'80px',
                    align:'center',//水平居中
                    valign:'middle',//垂直居中
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'80px'
                            }
                        };
                    }
                },
                {
                    field:'JieBM',//数据列
                    title:'节间被毛',//数据列名称
                    sortable:true,//可排序
                    align:'center',//水平居中
                    valign:'middle',//垂直居中
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'80px'
                            }
                        };
                    }
                },
                {
                    field:'JieGBH',//数据列
                    title:'节间竿壁厚',//数据列名称
                    sortable:true,//可排序
                    width:'80px',
                    align:'center',//水平居中
                    valign:'middle',//垂直居中
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'80px'
                            }
                        };
                    }
                },
                {
                    field:'YouGanBM',//数据列
                    title:'幼时竿被毛',//数据列名称
                    sortable:true,//可排序
                    align:'center',//水平居中
                    valign:'middle',//垂直居中
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'80px'
                            }
                        };
                    }
                },
                {
                    field:'YouGanBF',//数据列
                    title:'幼时竿被粉',//数据列名称
                    sortable:true,//可排序
                    width:'80px',
                    align:'center',//水平居中
                    valign:'middle',//垂直居中
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'80px'
                            }
                        };
                    }
                },
                {
                    field:'GanSFLQ',//数据列
                    title:'竿环是否隆起',//数据列名称
                    sortable:true,//可排序
                    width:'80px',
                    align:'center',//水平居中
                    valign:'middle',//垂直居中
                    cellStyle:function(value,row,index,field){
                        return {
                            css:{
                                'min-width':'80px',
                                'max-width':'150px',
                                'word-break': 'break-all'
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
    $('#exampleModal').modal('show');//修改是弹出修改的模态框
}
function dele(id){
    alert("删除")
}