/**
 * jCarouselLite - jQuery plugin to navigate images/any content in a carousel style widget.
 * @requires jQuery v1.2 or above
 *
 * http://gmarwaha.com/jquery/jcarousellite/
 *
 * Copyright (c) 2007 Ganeshji Marwaha (gmarwaha.com)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Version: 1.0.1
 * Note: Requires jquery 1.2 or above from version 1.0.1
 */

(function($) {                                          // Compliant with jquery.noConflict()
$.fn.jCarouselLite = function(o) {
    o = $.extend({
        btnPrev: null,
        btnNext: null,
        btnGo: null,
        mouseWheel: false,
        auto: null,
        hoverPause: false,

        speed: 200,
        easing: null,

        vertical: false,
        circular: true,
        visible: 1,
        start: 0,
        scroll: 1,

        beforeStart: null,
        afterEnd: null
    }, o || {});

    return this.each(function() {                           // Returns the element collection. Chainable.

        var running = false, animCss=o.vertical?"top":"left", sizeCss=o.vertical?"height":"width";
        var $this = $(this), div = $this.find('.items-wrapper');
        var ul = $("div.items", div), tLi = ul.children(), tl = tLi.length, v = o.visible;

        if(o.circular) {
            $.each(tLi, function(index){
                $(this).data('jCarouselLitePage', Math.floor(index / o.scroll));
            });
            ul.prepend(tLi.slice(tl-v+1).clone(true, true))
              .append(tLi.slice(0,o.scroll).clone(true, true));
            o.start += v-1;
        } else {
            if (o.btnPrev) {
                o.btnPrev.addClass("disabled");
            };
            if ((tl-o.visible)%o.scroll > 0) {
                for (var i=0; i < (o.scroll - (tl-o.visible)%o.scroll); i++) {
                    ul.append($('<div class="empty"></div>'));
                };
            };
            $.each(tLi, function(index){
                $(this).data('jCarouselLitePage', Math.floor(index / o.scroll));
            });
        };

        var li = ul.children();
        li.css('width', o.itemWidth).css('height', o.itemHeight).css('overflow', 'hidden');
        var itemLength = li.size(), curr = o.start;
        div.css("visibility", "visible");

        li.css({overflow: "hidden", "float": o.vertical ? "none" : "left"});
        ul.css({margin: "0", padding: "0", position: "relative", "list-style-type": "none", "z-index": "1"});
        div.css({overflow: "hidden", position: "relative", "z-index": "2", left: "0px"});

        var liSize = o.vertical ? height(li) : width(li);   // Full li size(incl margin)-Used for animation
        var ulSize = liSize * itemLength;                   // size of full ul(total length, not just for the visible items)
        var divSize = liSize * v;                           // size of entire div(total length for just the visible items)

        li.css({width: li.width(), height: li.height()});
        ul.css(sizeCss, ulSize+"px").css(animCss, -(curr*liSize));

        div.css(sizeCss, divSize+"px");                     // Width of the DIV. length of visible images

        if(o.btnPrev) {
            $(o.btnPrev).click(function() {
                return go(curr-o.scroll);
            });
            if(o.hoverPause) {
                $(o.btnPrev).hover(function(){stopAuto();}, function(){startAuto();});
            };
        };


        if(o.btnNext) {
            $(o.btnNext).click(function() {
                return go(curr+o.scroll);
            });
            if(o.hoverPause) {
                $(o.btnNext).hover(function(){stopAuto();}, function(){startAuto();});
            };
        };

        if(o.btnGo)
            $.each(o.btnGo, function(i, val) {
                $(val).click(function() {
                    return go(o.circular ? o.visible+i-1 : i);
                });
            });

        if(o.mouseWheel && div.mousewheel)
            div.mousewheel(function(e, d) {
                return d>0 ? go(curr-o.scroll) : go(curr+o.scroll);
            });

        var autoInterval;

        function startAuto() {
            if (o.auto) {
                stopAuto();
                autoInterval = setInterval(function() {
                        go(curr+o.scroll);
                    }, o.auto+o.speed);
            };
        };

        function stopAuto() {
            if (o.auto) {
                clearInterval(autoInterval);
            };
        };

        if(o.auto) {
            if(o.hoverPause) {
                div.hover(function(){stopAuto();}, function(){startAuto();});
            };
            startAuto();
        };

        function vis() {
            return li.slice(curr).slice(0,v);
        };

        function go(to) {
            if(!running) {

                if(o.beforeStart)
                    o.beforeStart.call(this, vis());

                if(o.circular) {            // If circular we are in first or last, then goto the other end
                    if(to<0) {           // If before range, then go around
                        ul.css(animCss, -( (curr + tl) * liSize)+"px");
                        curr = to + tl;
                    } else if(to>itemLength-v) { // If beyond range, then come around
                        ul.css(animCss, -( (curr - tl) * liSize ) + "px" );
                        curr = to - tl;
                    } else curr = to;
                } else {                    // If non-circular and to points to first or last, we just return.
                    if(to<0 || to>itemLength-v) return;
                    else curr = to;
                };                          // If neither overrides it, the curr will still be "to" and we can proceed.

                running = true;

                ul.animate(
                    animCss == "left" ? {left: -(curr*liSize)} : {top: -(curr*liSize)} , o.speed, o.easing,
                    function() {
                        if(o.afterEnd)
                            o.afterEnd.call(this, vis());
                        running = false;

                        if (o.btnGo) {
                            var $pagerItems = $this.find('.pager-item');
                            $pagerItems.removeClass('current');
                            var page = 0;
                            if (o.circular) {
                                page = $(li[curr]).data('jCarouselLitePage');
                            } else {
                                page = $(tLi[to]).data('jCarouselLitePage');
                            };
                            if ($pagerItems.length <= page) {
                                page = 0;
                            };
                            $($pagerItems.get(page)).addClass('current');
                        };
                    }
                );
                // Disable buttons when the carousel reaches the last/first, and enable when not
                if(!o.circular) {
                    o.btnPrev.removeClass("disabled");
                    o.btnNext.removeClass("disabled");
                    $( (curr-o.scroll<0 && o.btnPrev)
                        ||
                       (curr+o.scroll > itemLength-v && o.btnNext)
                        ||
                       []
                     ).addClass("disabled");
                };

            };
            return false;
        };
    });
};

function css(el, prop) {
    return parseInt($.css(el[0], prop)) || 0;
};
function width(el) {
    return  el[0].offsetWidth + css(el, 'marginLeft') + css(el, 'marginRight');
};
function height(el) {
    return el[0].offsetHeight + css(el, 'marginTop') + css(el, 'marginBottom');
};

})(jQuery);
