dmJCarouselLiteBehaviorPlugin for Diem Extended 
===============================

Author: [TheCelavi](http://www.runopencode.com/about/thecelavi)  
Version: 1.0.0  
Stability: Stable  
Date: December 15th, 2012  
Courtesy of [Run Open Code](http://www.runopencode.com)   
License: [Free for all](http://www.runopencode.com/terms-and-conditions/free-for-all)

dmJCarouselLiteBehaviorPlugin for Diem Extended is adaptation of 
[jCarouselLite](http://www.gmarwaha.com/jquery/jcarousellite) jQuery plugin.

Note that site is marked as recently marked as mallware. Also note that this can not
be upgraded without modifications and adjustments in order for jQuery plugin to work as
behavior.

Usage
-------------
The simplest and most easiest way to use this carousel is to add widgets
into zone, and attach dmJCarouselLiteBehaviorPlugin to the zone. The behavior 
will make every widget into carousel element.

However, it can work with any HTML element with following structure:

	<container>
		<carousel-element></carousel-element>
		<carousel-element></carousel-element>
		<carousel-element></carousel-element>
		<carousel-element></carousel-element>
		.....
	</container>

In order to achieve that, you have to specify the `Inner target` selector
for `<container>` tag so carousel can identify its elements.

Note that in this example tags such as `container` and `carousel-element`
are just examples, of course, any HTML structure will work, like using `DIV` or 
perhaps `UL` and `LI`.

HTML output
---------------
The behavior will not change structure whatsoever. It will add navigation and pager
if it is set to do so.

Configuration and theming
---------------
In `dmJCarouselLiteBehaviorPlugin/config/dm/config.yml` are configuration parameters 
for this behavior.

	default:
	  dmJCarouselLiteBehavior:
	    defaults: # Default settings for behavior
	      inner_target: ''
	      theme: default
	      item_width: 100
	      item_height: 100
	      mouse_wheel: true
	      auto_scroll: false
	      auto_scroll_period: 500
	      hover_pause: true
	      speed: 500
	      easing: jswing
	      is_vertical: false
	      is_circular: true
	      visible: 1
	      start: 1
	      scroll: 1
	      pager: bottom
	      navigation: bottom
	    labels:
	      auto_scroll_period: Auto scroll interval
	      speed: Scroll speed
	      start: Start from
	      hover_pause: Pause on hover
	    helps:
	      auto_scroll: Auto scroll items
	      auto_scroll_period: Interval in ms between two auto scrolling
	      mouse_wheel: Enable/disable mouse wheel for scrolling
	      speed: Speed of scrolling animation in ms
	      start: The order number of first visible item
	      scroll: Number of items to scroll at once
	      hover_pause: Mouse hover pause scrolling when auto scroll is set to true
	      visible: Number of visible items
	    themes:
	      default: 'dmJCarouselLiteBehaviorPlugin.default' # From assets.yml - U can use a path instead

If you have download the behavior via Github, you can modify this file. If you have installed
it via Composer, then you have to use Symfony config cascade to override this settings.

Section `defaults` contains default settings for behavior, which behavior form initially
displays. If you want some other settings to be shown as default, this is the place for
change.

Section `labels` contains labels for form settings field for behavior, section `helps` contains
helps for form fields.

Section `themes` is for theme, and it gets configured as `theme_key: path_to_css_file`. 
If user in behavior form selects a `default` theme, the accordiong view HTML structure will be:

	<div class="dmJCarouselLiteBehaviorPlugin default">
    	.... other HTML content
	</div>

Note that a `default` class is added, that is, the theme key. Of course, the theme CSS file
will be loaded as well. So, for you is just to theme it.

Default theme
---------------
With this behavior, the LESS file is provided with default theme. LESS file provides the
insight of structure and it ought to help you with theming. 

Important note
---------------
The behavior have a BUG with paging, that is, marking of current page displayed when using
circular carousel. It will be fixed soon as I figure out how.
	
	
	
	
	
	
	
	
	