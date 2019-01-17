var htmlspecialchars = function (string) {
    string = string.replace(/\//g, '%2F').replace(/\s/g, '+').replace(/:/g, '%3A');
    return string;
};



jQuery(document).ready(function($) {

    var CSSLoad = function(file) {
        // $('link[rel=stylesheet]').remove(); // del CSS
        var link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", file);
        document.getElementsByTagName("head")[0].appendChild(link);
    };

    var showRecomendation = function() {

        CSSLoad('/css/touch.css');

        $('.social-text').click(function() {
            $(this).hide();
            $('.social-btns').find('a').show();
            return false;
        });
    };


    if (Modernizr.touch) {
        showRecomendation();
    }

    // http://highlightjs.org/
    hljs.initHighlightingOnLoad();
    hljs.configure({
        tabReplace: '    '
    });
    $('.doc').each(function(i, e) {
        hljs.highlightBlock(e);
    });


    $('.a-vk').attr('href', 'http://vkontakte.ru/share.php?url=' + htmlspecialchars(window.location.href));
    $('.a-fb').attr('href', 'http://www.facebook.com/sharer.php?u=' + htmlspecialchars(window.location.href));
    $('.a-tw').attr('href', 'http://twitter.com/home?status=' + htmlspecialchars(window.location.href +"\n"+ $('title').text()));



});