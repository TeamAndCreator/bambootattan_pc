!function(s){
	var $this=s(this);
	s.fn.ssdVerticalNavigation=function(a){
		function t(s){
			s.toggleClass(l.classActive).siblings().removeClass(l.classActive)
		}
		function c(s,a,c){
			s.hasClass(l.classMaster)&&!a.hasClass(l.classClickable)&&(c.preventDefault(),c.stopPropagation(),t(a))
		}
		var l=s.extend({
			classMaster:"master",
			classActive:"active",
			classClickable:"clickable"
			},a);
		return this.each(function(){
			s(this).addClass(l.classMaster).on("click","li a",function(a){
				try{
					var t=s(this),l=t.parent("li"),e=l.parent("ul");
					c(e,l,a)
				}
				catch(i){
					console.log(i)
				}
				var rightIcon=s(this).find('i:eq(1)')
				if(!rightIcon){
					return;
				}	
				var $rightIcon=$(rightIcon);
				if(!rightIcon.hasClass('right-icon')){
					return;
				}
				s(this).parents('ul').find('.right-icon').not(s(this).find('.right-icon')).removeClass('glyphicon-minus').addClass('glyphicon-plus');
				if(rightIcon.hasClass('glyphicon-plus')){
					rightIcon.removeClass('glyphicon-plus').addClass('glyphicon-minus')
				}
				else if(rightIcon.hasClass('glyphicon-minus')){
					rightIcon.removeClass('glyphicon-minus').addClass('glyphicon-plus')
				}
					
			})
		})
	}
}(jQuery);