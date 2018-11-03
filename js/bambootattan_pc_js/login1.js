function login(){
    //var txt_user_name=document.getElementById("txt_user_name").value;//js
    //var txt_password=document.getElementById("txt_password").value;//js
    var account_l=$('#account_l').val();//jquery
    var password_1=$('#password_1').val();//jquery
    if(account_l=="w" && password_1=="1"){
        // alert("登入成功");
        window.location="index.html";
        // window.event.returnValue=false;
        //window.location.href="main.html";
        // window.open("index.html");
    }else{
        alert("用户名或密码错误");
    }
}
//jquery
$(function () {
    $('.submit').on('click',function () {
        login();
    });
});


