; (function ($) {
    function uVideoFull_init() {
        if ($('.video_full').length === 0) {
            $('body').append('<div class="video_full" style="display: none;position: fixed;top: 0;background: black;left:0;z-index: 99999;">\
                <video controls autoplay style="width:100%;height:100%;"></video>\
            </div>');
        }
        $('.video_full').unbind('click').bind('click', function () {
            $(this).css('display', 'none');
			$('html,body').removeClass('overflow-hidden');
        });
    }
    function uVideoFull_show(url) {
        var _width = window.innerWidth;
        var _height = window.innerHeight;
        $('.video_full video').attr('src', url);
        $('.video_full').width(_width).height(_height).css('display', 'block');
		$('html,body').addClass('overflow-hidden');
    }
    //jquery宽展方法
    $.extend({
        uVideoFull: function (option) {
            if (typeof option === 'string') {
                switch (option) {
                    case 'init': uVideoFull_init(); break;
                    default: uVideoFull_show(option); break;
                }
            } 
        }
    });
})(jQuery);