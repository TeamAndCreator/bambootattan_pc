// $(function(){
// 	$('.menu button').unbind('click').click(function(){
// 		$(this).siblings().removeClass('menu-active');
// 		$(this).addClass('menu-active');
// 	});
// });
// 
// 
// $(".btn-group-sm . btn1").click(function(){
//     $(this).next(".content").slideToggle();//实现二级菜单的展开收缩功能
//     $(this).find("span").toggleClass("glyphicon glyphicon-chevron-down");//实现菜单点击时图标的转换效果
//     $(this).find("span").toggleClass("glyphicon glyphicon-chevron-right");
// })
// 
// 
// 


$(function(){
	$('#leftNavigation').ssdVerticalNavigation();
	$('#contentLeft .btn-nav').unbind('click').click(function(){
		if($('#contentLeft').css('left')=='0px'){
			$('#contentLeft').css('left','-200px');
			$(this).find('i').removeClass('glyphicon-triangle-left').addClass('glyphicon-triangle-right');
			$('.main-body .container-fluid').css('padding-left','15px');
			return;
		}
		$('#contentLeft').css('left','0px');
		$(this).find('i').removeClass('glyphicon-triangle-right"').addClass('glyphicon-triangle-left');
		$('.main-body .container-fluid').css('padding-left','216px');
	});
	$('.menu button').unbind('click').click(function(){
		$(this).siblings().removeClass('menu-active');
		$(this).addClass('menu-active');
	});
	$('.theme-skin ul a').unbind('click').click(function(){
		var theme=$(this).attr('theme');
		var dropdown=$('.theme-skin .dropdown-toggle span:eq(0)');
		var currentTheme=dropdown.attr('theme');
		dropdown.removeClass(currentTheme).addClass(theme).attr('theme',theme);
		$('.foot,#contentLeft,#contentLeft .btn-nav').removeClass(currentTheme).addClass(theme);
	});
});