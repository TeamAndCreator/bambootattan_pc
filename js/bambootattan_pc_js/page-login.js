function login(){
    //var txt_user_name=document.getElementById("txt_user_name").value;//js
    //var txt_password=document.getElementById("txt_password").value;//js
    var account=$('#account').val();//jquery
    var password=$('#password').val();//jquery
    if(account=="w" && password=="1"){
        // alert("登入成功");
        window.location="home.html";
        // window.event.returnValue=false;
        //window.location.href="main.html";
        // window.open("home.html");
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


