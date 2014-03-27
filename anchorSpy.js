/**
anchorSpy 0.1
https://github.com/avil13/jQuery-anchorSpy.js
*/
(function($) {
    $.fn.anchorSpy = function(options) {

        if (this === undefined) {
            return ("error");
        }

        $this = this;

        var settings = $.extend({
            margin: 50,
            speed: 1000
        }, options);


        var nowActive = '';

        var reActive = function(name) {
            if (name === nowActive) return false;

            console.log('reActive');

            $this.find('a').parent().removeClass('active');
            $this.find('a[href=#' + name + ']').parent().addClass('active');
            nowActive = name;
        };


        this.reload = function() {
            console.log('Yes RELOAD');

            var $a_list = $this.find('a');
            var a_list_checked = [];
            var blocks = {};

            // собираем список локальных ссылок
            $.each($a_list, function(i, j) {
                var $a = $(j);
                var $aName = [];
                var href = $a.attr('href');
                var name = href.substr(1);

                if (href.substr(0, 1) === '#') {
                    $aName = $('a[name=' + name + ']');

                    if ($aName.length) {
                        blocks[name] = {
                            top: $aName.offset().top,
                            bottom: $aName.offset().top + $aName.parent().height() + settings.margin
                        };
                        a_list_checked.push(j);
                    }
                }
            });


            // если локальные ссылки есть, то работаем
            if (Object.keys(blocks).length > 0) {
                $(window).scroll(function() {
                    var wst = $(window).scrollTop() + settings.margin;

                    $.each(blocks, function(n, v) {
                        if (v.top <= wst && v.bottom > wst) {
                            reActive(n);
                        }
                    });
                });

                // обрабатываем нажатие локальных ссылок
                $(a_list_checked).off('click').click(function() {
                    var name = $(this).attr('href');
                    name = name.substr(1);

                    if (blocks[name]) {
                        $('html, body').stop().animate({
                            scrollTop: blocks[name].top - settings.margin
                        }, settings.speed);

                        return false;
                    }
                });

            } // end if

        }; // End reload

        this.reload();

        return this;
    };
})(jQuery);