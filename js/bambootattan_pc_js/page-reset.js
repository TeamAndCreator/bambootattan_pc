$(function () {
    init_page();
    //此处为校验的核心代码
     $('#changePassword').on('click',changePassword);

    $("#form-reset").bootstrapValidator({
        // submitHandler: function (valiadtor, loginForm, submitButton) {
        //
        //     valiadtor.defaultSubmit();
        // },
        fields: {
            old_password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        /*长度提示*/
                        min: 6,
                        max: 30,
                        message: '密码长度必须在6到30之间'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '密码由数字字母下划线和.组成'
                    }
                }
            },
            new_Password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        /*长度提示*/
                        min: 6,
                        max: 30,
                        message: '密码长度必须在6到30之间'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '密码由数字字母下划线和.组成'
                    }
                }
            },
            renew_Password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        /*长度提示*/
                        min: 6,
                        max: 30,
                        message: '密码长度必须在6到30之间'
                    },
                    identical: {//不相同
                        field: 'new_Password',//需要进行比较的input name值
                        message: '两次密码不一致'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '密码由数字字母下划线和.组成'
                    }
                }
            }
        }
    });
});
function init_page(){
    $('#userName').val( $.cookie('BAM_USERNAME'));//赋值  取cookie里保存的用户名给userName
}
function changePassword(){
    // var userId = $('#userId').val();
    var userName=$('#userName').val();
    var old_password = $('#old_password').val();
    var new_Password=$('#new_Password').val();
    var formData={
        // "userId ": userId,
        "userName":userName,
        "old_password":old_password,
        "new_Password":new_Password
    }
    $.ajax({
        url:baseUrl+'/user/changePassword',
        type:"POST",
        //data: JSON.stringify(formData),	    //数据
        data: formData,	                    //数据
        //contentType: 'application/json',
        success:function(res){
            if(res.code == 200){
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: '修改密码成功',
                    container: 'floating',
                    timer: 2000
                });
                window.location.href = "page-login.html";
            }
            else if(res.code == 400){
                window.location.href='../../page-404.html';
            }
            else if(res.code == 505){
                window.location.href='../../page-500.html';
            }
            else{
                $.niftyNoty({
                    type: 'danger',
                    icon: 'pli-cross icon-2x',
                    message: res.msg,
                    container: 'floating',
                    timer: 1000
                });
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown) {//请求失败回调函数
        }
    });
}



