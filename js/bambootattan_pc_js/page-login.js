var code;
$(function () {
    $('#login').on('click',login);
    getVerify();
    $("#imgVerify").on('click',getVerify);
    //判断用户名密码是否为空
    $("#form-login").bootstrapValidator({
        //submitHandler: function (valiadtor, loginForm, submitButton) {
        //    valiadtor.defaultSubmit();
        //},
        fields: {
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
            password: {
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
            verify_input: {
                validators: {
                    notEmpty: {
                        message: '验证码不能为空'
                    },
                    stringLength: {
                        /*长度提示*/
                        min: 4,
                        max: 4,
                        message: '验证码长度必须4'
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

function validate() {
    var inputCode = document.getElementById("yzm").value.toUpperCase();
    if(inputCode !== code ){
        alert("验证码错误！");
    }else{
        login();
    }
}
//登录
function login(){

    var validateForm = $('#form-login').data('bootstrapValidator');
    //手动触发验证
    validateForm.validate();
    //表单验证不通过，直接return，不往下执行
    if(!validateForm.isValid()){
        return;
    }

    var userName = $("#userName").val();    // 获取id为username的<input>框数据
    var password = $("#password").val();    // 获取id为password的<input>框数据
    var formData={
        "userName": userName,
        "password": password
    }
    $.ajax({
        url: baseUrl + '/user/login',	    //请求路径
        type: 'POST',				        //请求方式
        //data: JSON.stringify(formData),	    //数据
        data: formData,	                    //数据
        //contentType: 'application/json',
        success: function (res) {    // 请求成功后的回调函数，其中的参数data为controller返回的map,也就是说,@ResponseBody将返回的map转化为JSON格式的数据，然后通过data这个参数取JSON数据中的值
            if (res.code === 200) {
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: '登录成功',
                    container: 'floating',
                    timer: 2000
                });
                window.location.href = "home.html";
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

//获取验证码
function getVerify(){
    $("#imgVerify").attr("src",baseUrl  + "/user/getVerify?ran="+Math.random());
}


