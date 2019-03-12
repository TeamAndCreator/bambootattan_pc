$(function(){
    $('.username').html('欢迎您，'+ $.cookie('BAM_USERNAME'));
});
//退出
// function logout() {
//     $.ajax({
//         url: baseUrl + '/user/logout/',		//请求路径
//         type: 'POST',			                    //请求方式
//         dataType: "JSON",		                //返回数据类型
//         contentType: 'application/json',
//         success: function (res) {
//             if (res.code === 200) {
//                 $.niftyNoty({
//                     type: 'success',
//                     icon: 'pli-like-2 icon-2x',
//                     message: '退出成功',
//                     container: 'floating',
//                     timer: 2000
//                 });
//                 $("#data_table").bootstrapTable('refresh', {url: queryPageUrl});
//                 $('#exampleModal').modal('hide');
//             } else if (res.code == 400) {
//                 window.location.href = '../../page-404.html';
//             }
//             else if (res.code == 505) {
//                 window.location.href = '../../page-500.html';
//             }
//             else {
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