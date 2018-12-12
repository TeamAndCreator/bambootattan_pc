;(function ($) {
	/*item={
		url:'',
		downloadUrl:'',
		name:'',
		description:''
	};*/
	//默认参数
    var defaluts = {
        classes:'col-sm-2',
		countColumns:6,
		showDownload:true,
		showPlus:true,
		modalId:'',
		isInModal:true,
		download:null,
		downloadAll:'',
		items:[]
    };
    $.fn.extend({
        "imgs": function (options) {
            var opts = $.extend({}, defaluts, options); //使用jQuery.extend 覆盖插件默认参数
			
            this.each(function () {  //这里的this 就是 jQuery对象
                var $this = $(this); //获取当前dom 的 jQuery对象，这里的this是当前循环的dom
				if(!$this.hasClass('pad-top')){
					$this.addClass('pad-top')
				}
				if(!$this.hasClass('bord-top')){
					$this.addClass('bord-top')
				}
				if(opts.items.length<=0)
					return $this;
				var countRow=Math.ceil(opts.items.length/opts.countColumns);
				var _html='';
				
				for(var i=0;i<countRow;i++){
					var index=i*opts.countColumns;
					_html += '<div class="rows">';
					for(;index<opts.items.length;index++){
						item=opts.items[index]
						_html += '<div class="'+opts.classes+' mar-btm-sm">';
						_html += '	<div class="media">';
						_html += '		<div class="media-left bord-lft bord-ver">';
						_html += '			<img style="width:50px;height:50px;" src="'+item.url+'">';
						_html += '		</div>';
						_html += '		<div class="media-body media-middle bord-ver">';
						_html += '		</div>';
						_html += '		<div class="media-left media-middle pad-lft-sm pad-rgt-sm bord-rgt bord-ver">'
						if(opts.showDownload || opts.showPlus){
							_html += '		<div class="btn-group-vertical" role="group" aria-label="...">';
							if(opts.showDownload)
								_html += '		<button data-url="'+item.url+'" data-index="'+index+'" class="btn btn-xs btn-primary btn-download"><i class="fa fa-cloud-download"></i></button>';
							if(opts.showPlus)
								_html += '		<button data-url="'+item.url+'" data-index="'+index+'" class="btn btn-xs btn-default btn-Plus"><i class="fa fa-search-plus"></i></button>';
							_html += '		</div>';
						}
						_html += '		</div>';
						_html += '	</div>';
						_html += '</div>';
					}
					_html += '</div>';
				}
				$this.html(_html);
				
				_html='';
				if(opts.showPlus&&opts.modalId!=''&&opts.modalId!=null){
					_html += '<div id="'+opts.modalId+'" class="modal fade mar-all-sm" tabindex="-1" role="dialog" data-backdrop="static">';
					_html += '	<div class="modal-dialog modal-full-screen mar-no pad-no"  role="document">';
					_html += '		<div class="modal-content">';
					_html += '			<div class="modal-header">';
					_html += '				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="pci-cross pci-circle"></i></button>';
					_html += '				<h4 class="modal-title">&nbsp;</h4>';
					_html += '			</div>';
					_html += '			<div class="modal-body" style="height:'+($(window).height()-52-53-2-10)+'px">';
					_html += '				<div class="img-carouse carousel slide" data-ride="carousel" style="height:100%;">';
					_html += '					<ol class="carousel-indicators">';
					for(var index=0;index<opts.items.length;index++){
						item=opts.items[index]
						_html += '					<li data-target=".img-carouse" data-slide-to="'+index+'" class="active"></li>';
					}
					_html += '		  			</ol>';
					_html += '		  			<div class="carousel-inner" role="listbox">';
					for(var index=0;index<opts.items.length;index++){
						item=opts.items[index]
						_html += '					<div data-index="'+index+'" class="item active" align="center">';
						_html += '		  				<img src="'+item.url+'" alt="...">';
						_html += '		  				<div class="carousel-caption">';
						_html += '		  				</div>';
						_html += '					</div>';
					}
					_html += '		  			</div>';
					_html += '		  			<a class="left carousel-control" href=".img-carouse" role="button" data-slide="prev">';
					_html += '						<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>';
					_html += '						<span class="sr-only">Previous</span>';
					_html += '		  			</a>';
					_html += '		  			<a class="right carousel-control" href=".img-carouse" role="button" data-slide="next">';
					_html += '						<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>';
					_html += '						<span class="sr-only">Next</span>';
					_html += '		  			</a>';
					_html += '				</div>';
					_html += '			</div>';
					_html += '			<div class="modal-footer">';
					_html += '				<button type="button" class="btn btn-primary btn-download"><i class="fa fa-cloud-download"></i>下载</button>';
					_html += '				<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>';
					_html += '			</div>';
					_html += '		</div>';
					_html += '	</div>';
					_html += '</div>';
				}
				$this.parents('body').append(_html);
				$this.find('.btn-download').unbind().bind('click',function(){
					var item=opts.items[$(this).attr('data-index')];
					window.open((undefined==item.downloadUrl||item.downloadUrl==null||item.downloadUrl=='')?item.url:item.downloadUrl);
				});
				$('#'+opts.modalId).find('.btn-download').unbind().bind('click',function(){
					var item=opts.items[$('#'+opts.modalId).find('.carousel-inner .active').attr('data-index')];
					window.open((undefined==item.downloadUrl||item.downloadUrl==null||item.downloadUrl=='')?item.url:item.downloadUrl);
				});
				$this.find('.btn-Plus').unbind().bind('click',function(){
					var index=$(this).attr('data-index');
					var $modal=$('#'+opts.modalId)
					//var url=$(e).attr('data-url');
					$modal.find('[data-slide-to="'+index+'"]').addClass('active').siblings().removeClass('active');
					$modal.find('[data-index="'+index+'"]').addClass('active').siblings().removeClass('active');
					$modal.modal('show');
				});
				if(opts.modalId!=''&&opts.modalId!=null&&opts.isInModal){
					$('#'+opts.modalId).on('hidden.bs.modal',function () {
						if(!$('body').hasClass('modal-open'))
							$('body').addClass('modal-open');
					});
				}
				if(opts.downloadAll!=''&&opts.downloadAll!=null){
					$(opts.downloadAll).on('click',function(){
						$.each(opts.items,function(index,item){
							window.open((undefined==item.downloadUrl||item.downloadUrl==null||item.downloadUrl=='')?item.url:item.downloadUrl);
						})
					});
				}
				
				_html = '';
            });
        }
    });
   
})(jQuery);
;(function ($) {
	/*item={
		url:'',
		downloadUrl:'',
		name:'',
		description:''
	};*/
	//默认参数
    var defaluts = {
        classes:'col-sm-2',
		countColumns:6,
		showDownload:true,
		showPlus:true,
		modalId:'',
		isInModal:true,
		download:null,
		downloadAll:'',
		items:[]
    };
    $.fn.extend({
        "videos": function (options) {
            var opts = $.extend({}, defaluts, options); //使用jQuery.extend 覆盖插件默认参数
            this.each(function () {  //这里的this 就是 jQuery对象
                var $this = $(this); //获取当前dom 的 jQuery对象，这里的this是当前循环的dom
				if(!$this.hasClass('pad-top')){
					$this.addClass('pad-top')
				}
				if(!$this.hasClass('bord-top')){
					$this.addClass('bord-top')
				}
				if(opts.items.length<=0)
					return $this;
				var countRow=Math.ceil(opts.items.length/opts.countColumns);
				var _html='';
				
				for(var i=0;i<countRow;i++){
					var index=i*opts.countColumns;
					_html += '<div class="rows">';
					for(;index<opts.items.length;index++){
						item=opts.items[index]
						_html += '<div class="'+opts.classes+' mar-btm-sm">';
						_html += '	<div class="media">';
						_html += '		<div class="media-left bord-lft bord-ver">';
						_html += '			<video style="width:50px;height:50px;" src="'+item.url+'"></video>';
						_html += '		</div>';
						_html += '		<div class="media-body media-middle bord-ver">';
						_html += '		</div>';
						_html += '		<div class="media-left media-middle pad-lft-sm pad-rgt-sm bord-rgt bord-ver">'
						if(opts.showDownload || opts.showPlus){
							_html += '		<div class="btn-group-vertical" role="group" aria-label="...">';
							if(opts.showDownload)
								_html += '		<button data-url="'+item.url+'" data-index="'+index+'" class="btn btn-xs btn-primary btn-download"><i class="fa fa-cloud-download"></i></button>';
							if(opts.showPlus)
								_html += '		<button data-url="'+item.url+'" data-index="'+index+'" class="btn btn-xs btn-default btn-Plus"><i class="fa fa-search-plus"></i></button>';
							_html += '		</div>';
						}
						_html += '		</div>';
						_html += '	</div>';
						_html += '</div>';
					}
					_html += '</div>';
				}
				$this.html(_html);
				
				_html='';
				if(opts.showPlus&&opts.modalId!=''&&opts.modalId!=null){
					_html += '<div id="'+opts.modalId+'" class="modal fade mar-all-sm" tabindex="-1" role="dialog" data-backdrop="static">';
					_html += '	<div class="modal-dialog modal-full-screen mar-no pad-no"  role="document">';
					_html += '		<div class="modal-content">';
					_html += '			<div class="modal-header">';
					_html += '				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="pci-cross pci-circle"></i></button>';
					_html += '				<h4 class="modal-title">&nbsp;</h4>';
					_html += '			</div>';
					_html += '			<div class="modal-body" align="center" style="height:'+($(window).height()-52-53-2-10)+'px">';
					_html += '				<video style="height:100%;" src="" controls="controls"></video>';
					_html += '		  		<a class="left carousel-control" href=".img-carouse" role="button" data-slide="prev">';
					_html += '					<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>';
					_html += '					<span class="sr-only">Previous</span>';
					_html += '		  		</a>';
					_html += '		  		<a class="right carousel-control" href=".img-carouse" role="button" data-slide="next">';
					_html += '					<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>';
					_html += '					<span class="sr-only">Next</span>';
					_html += '		  		</a>';
					_html += '			</div>';
					_html += '			<div class="modal-footer">';
					_html += '				<button type="button" class="btn btn-primary btn-download"><i class="fa fa-cloud-download"></i>下载</button>';
					_html += '				<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>';
					_html += '			</div>';
					_html += '		</div>';
					_html += '	</div>';
					_html += '</div>';
				}
				$this.parents('body').append(_html);
				$this.find('.btn-download').unbind().bind('click',function(){
					var item=opts.items[$(this).attr('data-index')];
					window.open((undefined==item.downloadUrl||item.downloadUrl==null||item.downloadUrl=='')?item.url:item.downloadUrl);
				});
				$('#'+opts.modalId).find('.btn-download').unbind().bind('click',function(){
					var item=opts.items[opts.playIndex];
					window.open((undefined==item.downloadUrl||item.downloadUrl==null||item.downloadUrl=='')?item.url:item.downloadUrl);
				});
				$this.find('.btn-Plus').unbind().bind('click',function(){
					var index=$(this).attr('data-index');
					opts.playIndex=index;
					var $modal=$('#'+opts.modalId);
					$modal.find('video').attr('src',opts.items[index].url);
					$modal.modal('show');
				});
				if(opts.modalId!=''&&opts.modalId!=null&&opts.isInModal){
					$('#'+opts.modalId).on('hidden.bs.modal',function () {
						if(!$('body').hasClass('modal-open'))
							$('body').addClass('modal-open');
					});
				}
				$('#'+opts.modalId).find('.left,.right').on('click',function(){
					
					if($(this).hasClass('left')){
						if(opts.playIndex>0){
							opts.playIndex--;
						}
						else{
							opts.playIndex=opts.items.length-1;
						}	
					}
					else if($(this).hasClass('right')){
						if(opts.playIndex<(opts.items.length-1)){
							opts.playIndex++;
						}
						else{
							opts.playIndex=0;
						}
					}	
					var $modal=$('#'+opts.modalId);
					$modal.find('video').attr('src',opts.items[opts.playIndex].url);
					$modal.find('video')[0].play()
				});
				if(opts.downloadAll!=''&&opts.downloadAll!=null){
					$(opts.downloadAll).on('click',function(){
						$.each(opts.items,function(index,item){
							window.open((undefined==item.downloadUrl||item.downloadUrl==null||item.downloadUrl=='')?item.url:item.downloadUrl);
						})
					});
				}
				_html = '';
            });
        }
    });
   
})(window.jQuery);