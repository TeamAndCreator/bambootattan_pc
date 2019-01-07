
$(function () {
    //此处为校验的核心代码
    $('#submit').on('click',submit);
    $("#form-register").bootstrapValidator({
        // submitHandler: function (valiadtor, loginForm, submitButton) {
        //
        //     valiadtor.defaultSubmit();
        // },
        fields: {
            userAcct: {
                validators: {
                    notEmpty: {
                        message: '登录账户不能为空'
                    },
                    stringLength: {
                        /*长度提示*/
                        min: 2,
                        max: 10,
                        message: '用户名长度必须在2到10之间'
                    }
                }
            },
            userName: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        /*长度提示*/
                        min: 2,
                        max: 10,
                        message: '用户名长度必须在2到10之间'
                    }
                }
            },
            eMail:{
                 validators: {
                    emailAddress: {//验证email地址
                        message: '不是正确的email地址'
                     },
                     notEmpty: {//检测非空
                         message: '请输入邮箱'
                     }
                 }
             },
            userPwd: {
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
            userRepwd: {
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
    var userName = $("#userName").val();    // 获取id为username的<input>框数据
    var userPwd = $("#userPwd").val();    // 获取id为password的<input>框数据
    var jpushRegId=$("jpushRegId").val();
    var eMail=$("eMail").val();
    var orgPhone=$("orgPhone").val();
    var formData={
        "userName": userName,
        "userPwd": userPwd,
        "jpushRegId":jpushRegId,
        "eMail":eMail,
        "orgPhone":orgPhone
    }
    $.ajax({
        url: baseUrl + '/user/login',	    //请求路径
        type: 'POST',				        //请求方式
        //data: JSON.stringify(formData),	    //数据
        data: formData,	                    //数据
        //contentType: 'application/json',
        success: function (res) {    // 请求成功后的回调函数，其中的参数data为controller返回的map,也就是说,@ResponseBody将返回的map转化为JSON格式的数据，然后通过data这个参数取JSON数据中的值
            //res.code=400;
            if (res.code == 200) {
                saveInfo();
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: '注册成功',
                    container: 'floating',
                    timer: 2000
                });
                window.location.href = "page-login.html";
            }else if(res.code == 400){
                window.location.href='page-404.html';
            }
            else if(res.code == 505){
                window.location.href='page-500.html';
            } else{
                //alert("账号或密码错误");
                $.niftyNoty({
                    type: 'danger',
                    icon: 'pli-cross icon-2x',
                    message: res.msg,
                    container: 'floating',
                    timer: 2000
                });
            }

        }
    });
}