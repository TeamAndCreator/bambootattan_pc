$(document).ready(function () {

    // //日历
    // $('#demo-dp-component .input-group.date').datepicker({autoclose: true});


//判断用户角色，添加添加、删除按钮
    if (rolesId.indexOf(3) != -1 || rolesId.indexOf(4) != -1) {
        $('#demo-delete-row').html('<button id="demo-add-row" class="btn btn-success" data-toggle="modal"\n' +
            '                                    data-target="#demo-lg-modal"><i class="demo-pli-plus"></i>添加\n' +
            '                            </button>\n' +
            '                            <button onclick="delete1()" data-toggle="modal" data-target="#delete_modal" class="btn btn-danger"><i class="demo-pli-cross"></i>删除\n' +
            '                            </button>')
        $("input[ name = 'system']").val(sessionStorage.getItem("systemName"));
    }
    var labs;
//获取数据
    $.ajax({
        crossDomain: true,
        url: ipValue + "/laboratory/findAll1",
        dataType: "json",
        data: {"systemId": sessionStorage.getItem("systemId")},
        type: "get",
        async: false,
        success: function (result) {
            labs = result.data.laboratories;
            for (var i = 0; i < labs.length; i++) {
                labs[i].laboratory.zr=labs[i].zr[0];
                labs[i]=labs[i].laboratory
            }
        }
    });
//设置表格每列标题
    $('#demo-custom-toolbar').bootstrapTable({
        idField: 'id',
        data: labs,
        columns: [{
            checkbox: true
        }, {
            field: 'ChineseNam',
            align: 'center',
            title: '中文名',
            sortable:'true',
            formatter:function (value, row, index) {
                return value.systemName
            }
        }, {
            field: 'EnglishNam',
            align: 'center',
            title: '英文名',
            sortable:'true',

        }, {
            field: 'LadingNam',
            align: 'center',
            sortable:'true',
            title: '拉丁名'
        }, {
            field: 'BieNam',
            align: 'center',
            sortable:'true',
            title: '别名'
        }, {
            field: 'state',
            align: 'center',
            title: '属描述',

        }, {
            field: 'Num',
            align: 'center',
            title: '序号',

        }
        ]
    });

//获取并发送添加数据
    $('#demo-add-row').click(function () {
        var laboratory = {
            "ChineseName": "",
            "company": "",
            "system.id": "",
            "content": ""
        };
        laboratory.labName = $("input[ name = 'labName']").val();
        if (laboratory.labName == "") {
            alert("研究室名称不能为空")
        } else {
            laboratory.company = $("input[ name = 'company']").val();
            laboratory["system.id"] = sessionStorage.getItem('systemId');
            laboratory.content = $('#content').val();
            $.ajax({
                type: 'POST',
                dataType: 'JSON',
                url: ipValue + '/laboratory/save',
                data: laboratory,
                async: false,
                traditional: true,
                success: function () {
                    window.location.reload();
                }
            });
        }
    });
//发送删除数据
    $('#demo-delete-row').click(function () {
        if ($("#demo-custom-toolbar").bootstrapTable('getSelections').length == 0) {
            $("#delete_modal").modal('hide');
        } else {
            var a = $("#demo-custom-toolbar").bootstrapTable('getSelections');
            var idList = [];
            for (var i = 0; i < a.length; i++) {
                idList[i] = a[i].id;
            }
            $.ajax({
                type: 'post',
                dataType: 'JSON',
                url: ipValue + '/laboratory/deleteByIds',
                data: {_method: "DELETE", "idList": idList},
                async: false,
                traditional: true,
                success: function () {
                    window.location.reload();
                }
            })
        }
    })
});



// function updateState(id) {
//     $('#updateState_btn').click(function () {
//         $.ajax({
//             type: 'post',
//             dataType: 'JSON',
//             url: ipValue + '/laboratory/updateState',
//             data: {_method: "put", "labId": id},
//             async: false,
//             success: function (data) {
//                 window.location.reload();
//             },
//             error: function () {
//             }
//         });
//
//     });
// }

//跳转详情页
function detail(value, row) {
    return '<a href="laboratory_detail.html?labId=' + row.id + '">' + value + '</a>'
}

//判断有没有选中需删除的项
function delete1() {
    if ($("#demo-custom-toolbar").bootstrapTable('getSelections').length == 0) {
        $("#delete_h3").text("请至少选择一条");
    } else {
        $("#delete_h3").text("是否删除");
    }
}