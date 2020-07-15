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
        el = document.querySelector(_opt.target);
        listCont = el.nextElementSibling;
        list = listCont.children;
        slideDuration = _opt.duration;
        slideEase = _opt.ease;

        active  = false;

        el.addEventListener('click', function(e){
            e.preventDefault();
            e.stopPropagation();

            // 버튼 비활성화 : button data-state="disabled"
            if( el.hasAttribute('data-state') == 'disabled') return false;

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
        el.classList.add('open');
        _slideDown();
        listCont.setAttribute('data-state', 'open');

        _clickAnotherPlace();

        active = true;
    }

    function close () {
        el.classList.remove('open');
        _slideUp();
        listCont.setAttribute('data-state', 'close');

        active = false;
    }

    function _clickAnotherPlace () {
        if (!_opt.clickOther) return false;

        document.addEventListener('click', function(e){
            if(!e.target.classList.contains('open')){
                close();
            }
        });
    }

    function _getListHeight () {
        var _listHeight = 0;

        for (var i = 0; i < list.length; i ++) {
            _listHeight += list[i].offsetHeight;
        }

        return _listHeight;
    }

    function _slideDown () {
        listCont.style.display = 'block';

        var _listHeight = _getListHeight();
        var _currentHeight = !_currentHeight == 0 ? _currentHeight = listCont.offsetHeight : _currentHeight = 0;

        var _openAnimation = [
            { height : _currentHeight + 'px' },
            { height : _listHeight + 'px' },
        ];

        listCont.animate( _openAnimation, {
              duration: slideDuration,
              easing: slideEase
            }
        );

        listCont.style.cssText = 'display: block; overflow: hidden;';
    }

    function _slideUp () {
        var _currentHeight = listCont.offsetHeight;

        var _closeAnimation = [
            { height : _currentHeight + 'px' },
            { height : 0 + 'px' },
        ];

        listCont.animate( _closeAnimation, {
              duration: slideDuration,
              easing: slideEase
            }
        );

        listCont.style.cssText = 'display: block; overflow: hidden; height: 0px;';
    }

    // Select box List Events
    function setListEvents (){
        list = listCont.children; // reset 대비 list 초기화

        for (var _i = 0; _i < list.length; _i ++) {
            (function (_i) {
                _setAttrOfList(_i);

                list[_i].addEventListener('click', function(e){
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

        list[_i].setAttribute('data-index', _i);
        list[_i].setAttribute('data-value', list[_i].children[0].innerText);
    }

    // change value on select box text
    function _setCurrentValue (_i){
        return el.children[0].innerHTML = list[_i].getAttribute('data-value');
    };

    // reset
    function resetList(){
        close();
        setListEvents();

        el.children[0].innerHTML = el.getAttribute('data-default');
    };

    return {
        open : open,
        close : close,
        resetList : resetList
    }
};









    // function _slideDown () {
    //     listCont.style.removeProperty('display');

    //     var display = window.getComputedStyle(listCont).display;
    //     if (display === 'none') display = 'block';
    //     listCont.style.display = display;

    //     var height = listCont.offsetHeight;
    //     listCont.style.overflow = 'hidden';
    //     listCont.style.height = 0;
    //     listCont.style.paddingTop = 0;
    //     listCont.style.paddingBottom = 0;
    //     listCont.style.marginTop = 0;
    //     listCont.style.marginBottom = 0;
    //     listCont.offsetHeight;
    //     listCont.style.boxSizing = 'border-box';
    //     listCont.style.transitionProperty = "height, margin, padding";
    //     listCont.style.transitionDuration = slideDuration + 'ms';
    //     listCont.style.height = height + 'px';
    //     listCont.style.removeProperty('padding-top');
    //     listCont.style.removeProperty('padding-bottom');
    //     listCont.style.removeProperty('margin-top');
    //     listCont.style.removeProperty('margin-bottom');

    //     window.setTimeout(function () {
    //         listCont.style.removeProperty('height');
    //         listCont.style.removeProperty('overflow');
    //         listCont.style.removeProperty('transition-duration');
    //         listCont.style.removeProperty('transition-property');
    //         listCont.style.removeProperty('box-sizing');
    //     }, slideDuration);
    // }

    // function _slideUp () {
    //     listCont.style.transitionProperty = 'height, margin, padding';
    //     listCont.style.transitionDuration = slideDuration + 'ms';
    //     listCont.style.boxSizing = 'border-box';
    //     listCont.style.height = listCont.offsetHeight + 'px';
    //     listCont.offsetHeight;
    //     listCont.style.overflow = 'hidden';
    //     listCont.style.height = 0;
    //     listCont.style.paddingTop = 0;
    //     listCont.style.paddingBottom = 0;
    //     listCont.style.marginTop = 0;
    //     listCont.style.marginBottom = 0;

    //     window.setTimeout( function () {
    //         listCont.style.display = 'none';
    //         listCont.style.removeProperty('height');
    //         listCont.style.removeProperty('padding-top');
    //         listCont.style.removeProperty('padding-bottom');
    //         listCont.style.removeProperty('margin-top');
    //         listCont.style.removeProperty('margin-bottom');
    //         listCont.style.removeProperty('overflow');
    //         listCont.style.removeProperty('transition-duration');
    //         listCont.style.removeProperty('transition-property');
    //     }, slideDuration);
    // }
