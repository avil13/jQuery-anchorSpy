/**
anchorSpy 0.5
https://github.com/avil13/jQuery-anchorSpy
*/
(function($) {
    $.fn.anchorSpy = function(options) {

        if (this === undefined) {
            return ("error");
        }

        var $this = this;

        var settings = $.extend({
            margin: 50,
            speed: 1000,
            next: false,
            prev: false,
            active_class: 'active',
            active_parent: true
        }, options);


        var nowActive = '';

        var reActive = function(name) {
            if (name === nowActive || name === undefined) return false;

            if (settings.active_parent) {
                $this.find('a').parent().removeClass(settings.active_class);
                $this.find('a[href=#' + name + ']').parent().addClass(settings.active_class);
            } else {
                $this.find('a').removeClass(settings.active_class);
                $this.find('a[href=#' + name + ']').addClass(settings.active_class);
            }
            nowActive = name;
        };

        $this.reload = function() {
            var $a_list = $this.find('a'),
                a_list_checked = [],
                blocks = {};


            // собираем список локальных ссылок
            $.each($a_list, function(i, j) {
                var $a = $(j),
                    $aName = [],
                    href = $a.attr('href'),
                    name = href.substr(1);

                if (href.substr(0, 1) === '#') {
                    $aName = $('a[name=' + name + '], #' + name);

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

                var ScrollTo = function(name) {
                    if (name === undefined)
                        return false;

                    $('html, body').stop().animate({
                        scrollTop: blocks[name].top - settings.margin
                    }, settings.speed);
                };



                // кнопки Next
                $this.next = function() {
                    var last = nowActive;

                    var keys = Object.keys(blocks),
                        i = (last === '') ? -1 : keys.indexOf(last);

                    if (i !== -1 || last === '') {
                        var name = keys[i + 1];
                        reActive(name);
                        ScrollTo(name);
                    }

                    return false;
                };



                // кнопки Prev
                $this.prev = function() {
                    var last = nowActive;
                    if (last === '') return false;

                    var keys = Object.keys(blocks),
                        i = keys.indexOf(last);

                    if (i !== -1 && i > 0) {
                        var name = keys[i - 1];
                        reActive(name);
                        ScrollTo(name);
                    }

                    return false;
                };



                if (settings.prev) {
                    var $prev = $(settings.prev);
                    if (Object.keys($prev).length > 0) {
                        $prev.off('click').on('click', $this.prev);
                    }
                }



                if (settings.next) {
                    var $next = $(settings.next);
                    if (Object.keys($next).length > 0) {
                        $next.off('click').on('click', $this.next);
                    }
                }


                var actionOnScroll = function() {
                    var wst = $(window).scrollTop() + settings.margin + 1;

                    $.each(blocks, function(n, v) {
                        if (v.top <= wst && v.bottom > wst) {
                            reActive(n);
                        }
                    });
                };


                $(document).scroll(actionOnScroll);
                $(document).on({
                    'touchmove': actionOnScroll()
                });


                // обрабатываем нажатие локальных ссылок
                $(a_list_checked).off('click').click(function() {
                    var name = $(this).attr('href');
                    name = name.substr(1);

                    if (blocks[name]) {
                        ScrollTo(name);
                        return false;
                    }
                });

            } // end if

        }; // End reload

        $this.reload();

        $(window).resize(function() {
            $this.reload();
        });


        return $this;
    };
})(jQuery);