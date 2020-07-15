export function Accordion (opt) {
    var el, button, content, slideDuration;

    (function init () {
        el = $(opt.target);
        button = el.children('.accordion-button');
        content = el.children('.accordion-content');
        slideDuration = opt.duration;

        button.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            // 버튼 비활성화 : button data-state="disabled"
            if(button.attr('data-state') == 'disabled') return false;

            // toggle
            if (content.attr('data-active') == 'open') {
                close();

            } else {
                if (opt.openOnlyOne) $('.accordion-content').slideUp(slideDuration).attr('data-active', 'close');

                open();
            }
        })
    })();

    function open () {
        content.slideDown(slideDuration);
        content.addClass('open');
        content.attr('data-active', 'open');
    }

    function close () {
        content.slideUp(slideDuration);
        content.removeClass('open');
        content.attr('data-active', 'close');
    }

    function reset () {

    }
}

