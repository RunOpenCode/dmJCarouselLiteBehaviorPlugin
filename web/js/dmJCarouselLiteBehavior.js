(function($) {    
    
    var methods = {        
        init: function(behavior) {                       
            var $this = $(this), data = $this.data('dmJCarouselLiteBehavior');
            if (data && behavior.dm_behavior_id != data.dm_behavior_id) { 
                alert('You can not attach jCarousel light behavior to same content'); 
            };
            $this.data('dmJCarouselLiteBehavior', behavior);
        },
        
        start: function(behavior) {  
            var $this = $(this);
            var $copy = $this.children().clone(true, true);
            $this.data('dmJCarouselLiteBehaviorPreviousDOM', $this.children().detach());                    
            $this.empty();
            
            // First, read the settings and prepare vars for jCarouselLite
            // Navigation will be added later on in structure...
            var settings = {
                mouseWheel: behavior.mouse_wheel,
                speed: behavior.speed,
                easing: behavior.easing,
                vertical: behavior.is_vertical,
                circular: behavior.is_circular,
                visible: behavior.visible,
                scroll: behavior.scroll
            };
            if (behavior.auto_scroll) {
                settings.auto = behavior.auto_scroll_period;
            } else {
                settings.auto = null;
            };
            if (behavior.start > $copy.length) {
                settings.start = $copy.length - 1;
            } else {
                settings.start = behavior.start - 1;
            };
            
            // Now - prepare HTML structure
            var $jCarouselLiteWrapper = $('<div class="dmJCarouselLiteBehavior"></div>')
            .addClass(behavior.theme)
            .addClass(((behavior.is_vertical) ? 'vertical' : 'horizontal')),            
            $itemsWrapper = $('<div class="items-wrapper"></div>'),
            $items = $('<div class="items"></div>').append($copy);
            
            $itemsWrapper.append($items);
            
            $jCarouselLiteWrapper.append($itemsWrapper);
            
            // Lets see where pager is going...
            var $topPager = null, $bottomPager = null, $pager = null;
            if (behavior.pager != 'none') {                
                $pager = $('<div class="pager"></div>');
                settings.btnGo = [];
                var noOfPages = Math.ceil($copy.length / behavior.scroll);
                for (var i=0; i<noOfPages; i++) {                    
                    var $pagerItem = $('<div class="pager-item"><span class="enumeration">' + (i+1).toString() + '</span></div>');
                    $pager.append($pagerItem);
                    if (i+1 == behavior.start) {
                        $pagerItem.addClass('current');
                    };
                    // Add to navigation pager buttons
                    settings.btnGo.push($pagerItem);
                    if (behavior.visible > 1) {
                        for (var j=0; j<behavior.visible-1; j++) {
                            settings.btnGo.push(null);
                        };
                    };
                };
            };            
            if (behavior.pager == 'top') {
                $topPager = $('<div class="pager-wrapper top"></div>').append($pager);
                $jCarouselLiteWrapper.prepend($topPager);
            };
            if (behavior.pager == 'bottom') {
                $bottomPager = $('<div class="pager-wrapper bottom"></div>').append($pager);
                $jCarouselLiteWrapper.append($bottomPager);
            };
            // Lets see where navigation goes
            var $pagerNavigationPrevious = null;
            var $pagerNavigationNext = null;
            if (behavior.navigation != 'none') {
                $pagerNavigationPrevious = $('<div class="navigation navigation-previous"></div>');
                $pagerNavigationNext = $('<div class="navigation navigation-next"></div>');
                // Add to settings navigation buttons
                settings.btnPrev = $pagerNavigationPrevious;
                settings.btnNext = $pagerNavigationNext;
            };
            switch(behavior.navigation) {
                case 'top': {
                        if ($topPager == null) {
                            $topPager = $('<div class="pager-wrapper top"></div>');
                            $jCarouselLiteWrapper.prepend($topPager);
                        };
                        $topPager.prepend($pagerNavigationPrevious);
                        $topPager.append($pagerNavigationNext);
                } break;
                case 'bottom': {
                        if ($bottomPager == null) {
                            $bottomPager = $('<div class="pager-wrapper bottom"></div>');
                            $jCarouselLiteWrapper.append($bottomPager);
                        };
                        $bottomPager.prepend($pagerNavigationPrevious);
                        $bottomPager.append($pagerNavigationNext);
                } break;
                case 'side': {
                        $itemsWrapper.before($pagerNavigationPrevious);
                        $itemsWrapper.after($pagerNavigationNext);
                        if (behavior.is_vertical) {
                            $pagerNavigationPrevious.css('width', behavior.item_width.toString() + 'px');
                            $pagerNavigationNext.css('width', behavior.item_width.toString() + 'px');
                        } else {
                            $pagerNavigationPrevious.css('min-height', behavior.item_height.toString() + 'px');
                            $pagerNavigationNext.css('min-height', behavior.item_height.toString() + 'px');
                        };
                } break;
            };
            
            $this.append($jCarouselLiteWrapper);
            $copy
            .css('width', behavior.item_width.toString() + 'px')
            .css('height', behavior.item_height.toString() + 'px')
            $jCarouselLiteWrapper.jCarouselLite(settings);
            
            // Now, lets help pager to render nicely...
            if (behavior.pager != 'none' && !behavior.is_vertical) {
                var addPixels = 0;
                if (behavior.navigation == 'side') {
                    addPixels = $pagerNavigationNext.outerWidth(true) + $pagerNavigationPrevious.outerWidth(true);
                };
                $jCarouselLiteWrapper.find('.pager-wrapper').css('width', ($itemsWrapper.outerWidth(true) + addPixels).toString() + 'px');
            };
            if (behavior.pager != 'none' && behavior.is_vertical) {
                $jCarouselLiteWrapper.find('.pager-wrapper').css('width', behavior.item_width.toString() + 'px');
            };
        },
        stop: function(behavior) {
            var $this = $(this);
            $this.empty();
            $this.append($this.data('dmJCarouselLiteBehaviorPreviousDOM'));
        },
        destroy: function(behavior) {            
            var $this = $(this);
            $this.data('dmJCarouselLiteBehavior', null);
            $this.data('dmJCarouselLiteBehaviorPreviousDOM', null)
        }
    };
    
    $.fn.dmJCarouselLiteBehavior = function(method, behavior){
        
        return this.each(function() {
            if ( methods[method] ) {
                return methods[ method ].apply( this, [behavior]);
            } else if ( typeof method === 'object' || ! method ) {
                return methods.init.apply( this, [method] );
            } else {
                $.error( 'Method ' +  method + ' does not exist on jQuery.dmJCarouselLiteBehavior' );
            };  
        });
    };

    $.extend($.dm.behaviors, {        
        dmJCarouselLiteBehavior: {
            init: function(behavior) {
                $($.dm.behaviorsManager.getCssXPath(behavior, true) + ' ' + behavior.inner_target).dmJCarouselLiteBehavior('init', behavior);
            },
            start: function(behavior) {
                $($.dm.behaviorsManager.getCssXPath(behavior, true) + ' ' + behavior.inner_target).dmJCarouselLiteBehavior('start', behavior);
            },
            stop: function(behavior) {
                $($.dm.behaviorsManager.getCssXPath(behavior, true) + ' ' + behavior.inner_target).dmJCarouselLiteBehavior('stop', behavior);
            },
            destroy: function(behavior) {
                $($.dm.behaviorsManager.getCssXPath(behavior, true) + ' ' + behavior.inner_target).dmJCarouselLiteBehavior('destroy', behavior);
            }
        }
    });
    
})(jQuery);