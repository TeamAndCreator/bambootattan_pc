$(function () {
    //此处为校验的核心代码
     $('#submit').on('click',submit);
    $("#form-reset").bootstrapValidator({
        // submitHandler: function (valiadtor, loginForm, submitButton) {
        //
        //     valiadtor.defaultSubmit();
        // },
        fields: {
            newuserPwd: {
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
                    different: {//不能和用户名相同
                        field: 'loginName',//需要进行比较的input name值
                        message: '不能和用户名相同'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '密码由数字字母下划线和.组成'
                    }
                }
            },
            newuserRepwd: {
                message: '密码无效',
                validators: {
                    notEmpty: {
                        message: '确认密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: '用户名长度必须在6到30之间'
                    },
                    identical: {//相同
                        field: 'password',
                        message: '两次密码不一致'
                    },
                    different: {//不能和用户名相同
                        field: 'loginName',
                        message: '不能和用户名相同'
                    },
                    regexp: {//匹配规则
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '密码由数字字母下划线和.组成'
                    }
                }
            }
        }
    });
});
function submit(){

    var userId = $('#userId').val();
    var newuserPwd = $('#newuserPwd').val();
    var newuserRepwd=$('#newuserRepwd').val();
    var formData={
        "userId ": userId,
        "newuserPwd":newuserPwd,
        "newuserRepwd":newuserRepwd
    }
    $.ajax({
        type:"POST",
        url:"user/modifyPwd",
        dataType:"json",
        contentType:"application/json",
        data:JSON.stringify(formData),
        success:function(res){
            if(res.code == 200){
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: '修改成功',
                    container: 'floating',
                    timer: 2000
                });
                window.location.href = "home.html";
            }
        }
    });

}