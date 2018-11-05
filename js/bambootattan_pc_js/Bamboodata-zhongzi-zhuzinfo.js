$(function(){
    $('#btn_add').on('click',function () {
        $('#exampleModal').modal('show');
    });
    $('#btn_delete').on('click',function(){
        alert("删除");
    });
    function init(){
        var dataSoure=[
            {'id':'1','ShuBZ':'ll','nameCH':'李雷','nameEN':'LiLei','nameLD':'LiLei','nameBN':'LiLei','ZhongleiBM':'2','ZhongleiDNA':'3','ZhongleiTXM':'4','GouneiFB':'5','GuowaiFB':'6','Radio':'7','Photo':'8','Miaoshu':'23','Num':'韩梅梅'},
            {'id':'2','ShuBZ':'ll','nameCH':'韩梅梅','nameEN':'HanMeiMei','nameLD':'HanMeiMei','nameBN':'HanMeiMei','ZhongleiBM':'2','ZhongleiDNA':'3','ZhongleiTXM':'4','GouneiFB':'5','GuowaiFB':'6','Radio':'7','Photo':'8','Miaoshu':'21','Num':'李雷'},
            {'id':'3','ShuBZ':'ll','nameCH':'韩梅梅','nameEN':'HanMeiMei','nameLD':'HanMeiMei','nameBN':'HanMeiMei','ZhongleiBM':'2','ZhongleiDNA':'3','ZhongleiTXM':'4','GouneiFB':'5','GuowaiFB':'6','Radio':'7','Photo':'8','Miaoshu':'21','Num':'李雷'},
            {'id':'1','ShuBZ':'ll','nameCH':'李雷','nameEN':'LiLei','nameLD':'LiLei','nameBN':'LiLei','ZhongleiBM':'2','ZhongleiDNA':'3','ZhongleiTXM':'4','GouneiFB':'5','GuowaiFB':'6','Radio':'7','Photo':'8','Miaoshu':'23','Num':'韩梅梅'},
            {'id':'2','ShuBZ':'ll','nameCH':'韩梅梅','nameEN':'HanMeiMei','nameLD':'HanMeiMei','nameBN':'HanMeiMei','ZhongleiBM':'2','ZhongleiDNA':'3','ZhongleiTXM':'4','GouneiFB':'5','GuowaiFB':'6','Radio':'7','Photo':'8','Miaoshu':'21','Num':'李雷'},
            {'id':'3','ShuBZ':'ll','nameCH':'韩梅梅','nameEN':'HanMeiMei','nameLD':'HanMeiMei','nameBN':'HanMeiMei','ZhongleiBM':'2','ZhongleiDNA':'3','ZhongleiTXM':'4','GouneiFB':'5','GuowaiFB':'6','Radio':'7','Photo':'8','Miaoshu':'21','Num':'李雷'},
            {'id':'1','ShuBZ':'ll','nameCH':'李雷','nameEN':'LiLei','nameLD':'LiLei','nameBN':'LiLei','ZhongleiBM':'2','ZhongleiDNA':'3','ZhongleiTXM':'4','GouneiFB':'5','GuowaiFB':'6','Radio':'7','Photo':'8','Miaoshu':'23','Num':'韩梅梅'},
            {'id':'2','ShuBZ':'ll','nameCH':'韩梅梅','nameEN':'HanMeiMei','nameLD':'HanMeiMei','nameBN':'HanMeiMei','ZhongleiBM':'2','ZhongleiDNA':'3','ZhongleiTXM':'4','GouneiFB':'5','GuowaiFB':'6','Radio':'7','Photo':'8','Miaoshu':'21','Num':'李雷'},
            {'id':'3','ShuBZ':'ll','nameCH':'韩梅梅','nameEN':'HanMeiMei','nameLD':'HanMeiMei','nameBN':'HanMeiMei','ZhongleiBM':'2','ZhongleiDNA':'3','ZhongleiTXM':'4','GouneiFB':'5','GuowaiFB':'6','Radio':'7','Photo':'8','Miaoshu':'21','Num':'李雷'}
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
                    }
                },
                {
                    field:'nameCH',//数据列
                    title:'中文名',//数据列名称
                    sortable:true,//可排序
                    align:'center'//水平居中
                },
                {
                    field:'nameEN',//数据列
                    title:'英文名',//数据列名称
                    sortable:true,//可排序
                    align:'center'//水平居中
                },
                {
                    field:'nameLD',//数据列
                    title:'拉丁名',//数据列名称
                    sortable:true,//可排序
                    align:'center'//水平居中
                },
                {
                    field:'nameBN',//数据列
                    title:'别名',//数据列名称
                    sortable:true,//可排序
                    align:'center'//水平居中
                },
                {
                    field:'ZhongleiBM',//数据列
                    title:'种类编码',//数据列名称
                    sortable:true,//可排序
                    align:'center'//水平居中
                },
                {
                    field:'ZhongleiDNA',//数据列
                    title:'种类DNA码',//数据列名称
                    sortable:true,//可排序
                    align:'center'//水平居中
                },
                {
                    field:'ZhongleiTXM',//数据列
                    title:'种类条形码',//数据列名称
                    sortable:true,//可排序
                    align:'center'//水平居中
                },
                {
                    field:'GouneiFB',//数据列
                    title:'国内分布',//数据列名称
                    sortable:true,//可排序
                    align:'center'//水平居中
                },
                {
                    field:'GuowaiFB',//数据列
                    title:'国外分布',//数据列名称
                    sortable:true,//可排序
                    align:'center'//水平居中
                },
                {
                    field:'Radio',//数据列
                    title:'视频',//数据列名称
                    sortable:true,//可排序
                    align:'center'//水平居中
                },
                {
                    field:'Photo',//数据列
                    title:'图片',//数据列名称
                    sortable:true,//可排序
                    align:'center'//水平居中
                },
                {
                    field:'Miaoshu',//数据列
                    title:'描述',//数据列名称
                    sortable:true,//可排序
                    align:'center'//水平居中
                },
                {
                    field:'Num',//数据列
                    title:'序号',//数据列名称
                    sortable:true,//可排序
                    align:'center'//水平居中
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