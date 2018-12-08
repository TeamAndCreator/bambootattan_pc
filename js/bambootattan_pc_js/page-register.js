//
// // Form-Validation.js
// // ====================================================================
// // This file should not be included in your project.
// // This is just a sample how to initialize plugins or components.
// //
// // - ThemeOn.net -
//
//
// $(document).ready(function() {
//
//
//     // FORM VALIDATION
//     // =================================================================
//     // Require Bootstrap Validator
//     // http://bootstrapvalidator.com/
//     // =================================================================
//
//
//     // FORM VALIDATION FEEDBACK ICONS
//     // =================================================================
//     var faIcon = {
//         valid: 'fa fa-check-circle fa-lg text-success',
//         invalid: 'fa fa-times-circle fa-lg',
//         validating: 'fa fa-refresh'
//     }
//
//
//     // FORM VALIDATION ON TABS
//     // =================================================================
//     $('#form-register').bootstrapValidator({
//         excluded: [':disabled'],
//         feedbackIcons: faIcon,
//         fields: {
//             username: {
//                 validators: {
//                     notEmpty: {//检测非空,radio也可用
//                         message: '请输入用户名'
//                     },
//                     stringLength: {//检测长度
//                         min: 3,
//                         max: 10,
//                         message: '长度必须在3-10之间'
//                     },
//                     regexp: {//正则验证
//                         regexp: /^[a-zA-Z0-9_\.]+$/,
//                         message: '所输入的字符不符要求'
//                     },
//                 }
//             },
//             password: {
//                 validators: {
//                     notEmpty: {//检测非空
//                         message: '请输入密码'
//                     },
//                 }
//             },
//             repassword: {
//                 validators: {
//                     notEmpty: {//检测非空
//                         message: '请输入确认密码'
//                     },
//                     identical: {//与指定控件内容比较是否相同，比如两次密码不一致
//                         field: 'password',//指定控件name
//                         message: '两次输入的密码不同'
//                     },
//                 }
//             },
//             email: {
//                 validators: {
//                     emailAddress: {//验证email地址
//                         message: '不是正确的email地址'
//                     },
//                     notEmpty: {//检测非空
//                         message: '请输入邮箱'
//                     },
//                 }
//             }
//         }
//     }).on('status.field.bv', function (e, data) {
//         var $form = $(e.target),
//             validator = data.bv,
//             $tabPane = data.element.parents('.tab-pane'),
//             tabId = $tabPane.attr('id');
//
//         if (tabId) {
//             var $icon = $('a[href="#' + tabId + '"][data-toggle="tab"]').parent().find('i');
//
//             // Add custom class to tab containing the field
//             if (data.status == validator.STATUS_INVALID) {
//                 $icon.removeClass(faIcon.valid).addClass(faIcon.invalid);
//             } else if (data.status == validator.STATUS_VALID) {
//                 var isValidTab = validator.isValidContainer($tabPane);
//                 $icon.removeClass(faIcon.valid).addClass(isValidTab ? faIcon.valid : faIcon.invalid);
//             }
//         }
//     });
// });



$(function () {
    //此处为校验的核心代码
    $("#form-register").bootstrapValidator({
        submitHandler: function (valiadtor, loginForm, submitButton) {

            valiadtor.defaultSubmit();
        },
        fields: {
            userName: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        /*长度提示*/
                        min: 4,
                        max: 30,
                        message: '用户名长度必须在4到30之间'
                    }
                }
            },
            loginName:{
                 validators: {
                    emailAddress: {//验证email地址
                        message: '不是正确的email地址'
                     },
                     notEmpty: {//检测非空
                         message: '请输入邮箱'
                     },
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
            repassword: {
                message: '密码无效',
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
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