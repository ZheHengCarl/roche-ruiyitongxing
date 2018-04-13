/**
 * @author carl.xu
 * @date 2018-04-05
 */
    $(".privacy-btn").click(function () {
        $(".cover, .privacy-pop").show();
        Scrollbar();
    });
    function Scrollbar (){
        var oBox = document.querySelector(".pop-box");
        var oContent = document.querySelector(".pop-content");
        var oScroll = document.querySelector(".scroll");
        var oBar = oScroll.children[0];
        var oActScroll = oScroll.children[1];
        if ( oContent.clientHeight > oBox.clientHeight ){
            var conTopMax = oContent.clientHeight - oBox.clientHeight;
            var conTopMin = 0;
            var barTopMax = oScroll.clientHeight - oBar.clientHeight;
            var barTopMin = 0;
            var prop = barTopMax / conTopMax;
            addWheelEvent(oBox , function (e , d) {
                d *= 15;
                changeTop(-prop*d);
                return false;
            });
            oBar.onmousedown = function (ev) {
                ev = ev || window.event;
                var sY = ev.clientY;
                document.onmousemove = function (ev) {
                    var nY = ev.clientY;
                    changeTop(nY - sY);
                    sY = ev.clientY;
                };
            };
            document.onmouseup = function () {
                this.onmousemove = null;
            };
            oScroll.onclick = function (e) {
                e = e || window.event;
                var sY = e.clientY;
                var barT = getOffsetTop(oBar) - document.documentElement.scrollTop || document.body.scrollTop;
                changeTop(sY - (barT + oBar.clientHeight / 2));
            };
            oBar.onclick = function (e) {
                e.stopPropagation();
            };
        }else{
            oBox.removeChild(oScroll);
        }
        function getOffsetTop(obj){
            var t = 0;
            while ( obj !== document.body ){
                t += obj.offsetTop;
                obj = obj.parentNode;
            }
            return t;
        }
        function changeTop( x ){
            var sT = oBar.offsetTop + x;
            sT = Math.min(barTopMax , sT);
            sT = Math.max(sT , 0);
            oBar.style.top = sT + 'px';
            oActScroll.style.height = sT + 15 + 'px';
            var cT = oContent.offsetTop - x / prop;
            cT = Math.min(0 , cT);
            cT = Math.max(-conTopMax , cT);
            oContent.style.top = cT + 'px';
        }

        function addWheelEvent( obj , eFn ){
            document.addEventListener?obj.addEventListener(document.createElement("div").onmousewheel===null?"mousewheel":"DOMMouseScroll",fn,false):obj.attachEvent("onmousewheel",fn);
            function fn(e){
                if ( eFn.call(obj , e = e || window.event , e.wheelDelta / 120 || -e.detail / 3) === false ){
                    e.preventDefault && e.preventDefault();
                    return false;
                }
            }
        }
    }