$(function () {
    $(".select-content input").focus(function () { 
        oScroll();
     });
    // window.onload = function () { 
    //     oScroll();
    // }
    $(".login .privacy-btn").click(function(){
        $(".privacy-pop").show();
        oScroll();
    })
    function oScroll (){
        var oDevice = 'ontouchstart' in window,
            startEvent = oDevice ? 'touchstart' : 'mousedown',
            moveEvent = oDevice ? 'touchmove' : 'mousemove',
            endEvent = oDevice ? 'touchend' : 'mouseup',
            nScrollBarH = 0,
            barSize = 32,
            oDomScrollContent = $(".scroll-content"),
            nDivHeight = oDomScrollContent.height(),
            nScrollHeight = oDomScrollContent[0].scrollHeight,
            maxH = nDivHeight - barSize,
            oTouchScrollContent;

        oDomScrollContent.scroll(function(){
            var nScrollTop = $(this)[0].scrollTop;
            nScrollBarH = nScrollTop * ((nDivHeight - barSize) / (nScrollHeight - nDivHeight))
            $(this).next().find(".active-bar").height(nScrollBarH)
        });

        var startpoint = {}, _nScrollBarH = 0;
        var fnTouchstart = function (e) {
            oTouchScrollContent = $(this).parent().parent().prev();
            if (e.originalEvent.changedTouches) {
                var e = e.originalEvent.changedTouches[0]
            }
            _nScrollBarH = nScrollBarH
            startpoint.y = e.clientY
            $(document).bind(moveEvent, fnTouchmove)
            $(document).bind(endEvent, fnTouchend)
        }
        var fnTouchmove = function (e) {
            if (e.originalEvent.changedTouches) {
                var e = e.originalEvent.changedTouches[0]
            }
            var moveY = e.clientY - startpoint.y
            var nTempScrollBarH = _nScrollBarH + moveY

            if (nTempScrollBarH > maxH) {
            nTempScrollBarH = maxH
            } else if (nTempScrollBarH < 0) {
                nTempScrollBarH = 0
            }
            nScrollTop = nTempScrollBarH / ((nDivHeight - barSize) / (nScrollHeight - nDivHeight))
            oTouchScrollContent.scrollTop(nScrollTop);
        }
        var fnTouchend = function (e) {
            $(document).unbind(moveEvent, fnTouchmove)
            $(document).unbind(endEvent, fnTouchend)
        }
        $(".bar").bind(startEvent, fnTouchstart);
    }
})