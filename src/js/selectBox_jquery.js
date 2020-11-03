// require('../css/selectBox.css');

/**
 * @param _opt {
 *  target : select box 적용 및 클릭할 요소 (object)
 *  duration : 슬라이드 모션 속도 (number)
 *  clickOther : 다른 위치 클릭 시 close (bool)
 * }
 */
export function SelectBox (_opt){
    var el, listCont, list, slideDuration, slideEase;
    var height, active, index;

    (function init () {
        el = $(_opt.target);
        listCont = el.next();
        list = listCont.children();

        slideDuration = _opt.duration;
        slideEase = _opt.ease;

        active  = false;

        el.on('click', function(e){
            e.preventDefault();
            e.stopPropagation();

            // 버튼 비활성화 : button data-state="disabled"
            if( el.attr('data-state') == 'disabled') return false;

            // toggle
            if (!active) {
                open();
            } else if (active) {
                close();
            }
        });

        setListEvents(); // events of select box list
    })();

    function open () {
        el.addClass('open');
        listCont.slideDown();
        listCont.attr('data-state', 'open');

        _clickAnotherPlace();

        active = true;
    }

    function close () {
        el.removeClass('open');
        listCont.slideUp();
        listCont.attr('data-state', 'close');

        active = false;
    }

    function _clickAnotherPlace () {
        if (!_opt.clickOther) return false;

        $('document').on('click', function(e){
            if(!$(e.target).hasClass('open')){
                close();
            }
        });
    }

    // Select box List Events
    function setListEvents (){
        list = listCont.children(); // reset 대비 list 초기화

        for (var _i = 0; _i < list.length; _i ++) {
            (function (_i) {
                _setAttrOfList(_i);

                list.eq(_i).on('click', function(e){
                    e.preventDefault();

                    _setCurrentValue(_i);
                    close();
                });
            })(_i);
        }
    }

    // set attribute list
    function _setAttrOfList (listIndex) {
        var _i = listIndex;

        list.eq(_i).attr('data-index', _i);
        list.eq(_i).attr('data-value', list.eq(_i).text());
    }

    // change value on select box text
    function _setCurrentValue (_i){
        return el.children[0].innerHTML = list.eq(_i).attr('data-value');
    };

    // reset
    function resetList(){
        close();
        setListEvents();

        el.innerHTML = el.attr('data-default');
    };

    return {
        open : open,
        close : close,
        resetList : resetList
    }
};