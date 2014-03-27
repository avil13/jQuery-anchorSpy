(function($) {
    $.fn.anchorSpy = function(options) {

        if (this === undefined) {
            return ("error");
        }

        $this = this;

        var settings = $.extend({
            margin: 50
        }, options);


        var $a_list = $this.find('a');

        var link = [];
        var blocks = {};
        var nowActive = '';

        var reActive = function(name) {
            if (name === nowActive) return false;

            $this.find('a').parent().removeClass('active');
            $this.find('a[href=#' + name + ']').parent().addClass('active');
            nowActive = name;
        };


        // собираем список локальных ссылок
        $.each($a_list, function(i, j) {
            var href = $(j).attr('href');

            if (href.substr(0, 1) === '#')
                link.push(href.substr(1));
        });


        // если локальные ссылки есть, то работаем
        if (link.length) {
            $.each(link, function(i, n) {
                var $a = $('a[name=' + n + ']');

                blocks[n] = {
                    top: $a.offset().top,
                    bottom: $a.offset().top + $a.parent().height()
                };
            });


            $(window).scroll(function() {
                var wst = $(window).scrollTop() + settings.margin;

                $.each(blocks, function(n, v) {
                    if (v.top <= wst && v.bottom > wst) {
                        reActive(n);
                    }
                });
            });


            // обрабатываем нажатие локальных ссылок
            $a_list.off('click').click(function() {
                var name = $(this).attr('href');
                name = name.substr(1);

                if (blocks[name]) {
                    $('html, body').stop().animate({
                        scrollTop: blocks[name].top - settings.margin
                    }, 1000);

                    return false;
                }
            });

        } else {
            console.log('correct links not found');
        } // end if
    };
})(jQuery);
