; (function ($) {
    function uImgFull_init() {
        if ($('.img_full').length === 0) {
            $('body').append('<div class="img_full" style="display: none;position: fixed;background: black;top: 0;left:0;z-index: 99999;"></div>');
			//$('html,body').addClass('overflow-hidden');
        }
        $('.img_full').unbind('click').bind('click', function () {
            $(this).css('display', 'none');
			$('html,body').removeClass('overflow-hidden');
        });
    }
    function uImgFull_show_selecctor(selector) {
        var _imgs = $(selector);
        if(_imgs.length===0){
            return false;
        }
        uImgFull_show($(_imgs[0]));
    }
    function uImgFull_show(imgObj) {
        var _img = imgObj;
        if (_img.is('img')) {
            //获取图片的宽和搞
            var _img_width = _img.context.naturalWidth
            var _img_height = _img.context.naturalHeight;
            //计算图片的宽高比
            var imgWH = _img_width / (_img_height * 1.0);

            //获取窗口的宽和高
            var _width = window.innerWidth;
            var _height = window.innerHeight;
            //计算窗口的宽高比
            var wh = _width / (_height * 1.0);

            //创建img对象
            var image = $('<img/>');
            //将当前图片地址赋值给img对象
            image.attr('src', _img.attr('src'));
            //图片的宽高比大于窗口的宽和高，则设置img对象的宽为100%，并设置上外边距的距离
            if (imgWH > wh) {
                image.attr('width', '100%').css('margin-top', Math.abs(_height - _img_height * (_width / _img_width)) / 2 + 'px');
            }
            //图片的宽高比不大于窗口的宽和高，则设置img对象的高为100%，并设置左外边距的距离
            else {
                image.attr('height', '100%').css('margin-left', Math.abs(_width - _img_width * (_height / _img_height)) / 2 + 'px');
            }
            //清除图片放大中的内容，将img对象追加进去，设置宽和高，显示图片
            $('.img_full').html('').append(image).width(_width).height(_height).css('display', 'block');
			$('html,body').addClass('overflow-hidden');
        }
    }
    //jquery宽展方法
    $.extend({
        uImgFull: function (option) {
            if (typeof option === 'string') {
                switch (option) {
                    case 'init': uImgFull_init(); break;
                    default: uImgFull_show_selecctor(option); break;
                }
            } else if (option.is('img')) {
                uImgFull_show(option);
            }
        }
    });
})(jQuery);