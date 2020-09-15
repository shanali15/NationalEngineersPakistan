/*
 * Egoverns Addons for Elementor Scripts
 * Description: Classic addons plugin have 20+ massive widgets for Elementor page builder.
 * Version: 1.0
 * Author: zozothemes
 */
 
(function( $ ) {
	
	"use strict";
	
	$( document ).ready(function() {
	
		/* Shortcode CSS Append */
		var css_out = '';
		$( ".egoverns-inline-css" ).each(function() {
			var shortcode = $( this );
			var shortcode_css = shortcode.attr("data-css");		
			css_out += ($).parseJSON( shortcode_css );
			shortcode.removeAttr("data-css");
		});
		if( css_out != '' ){
			$('head').append( '<style id="egoverns-shortcode-styles">'+ css_out +'</style>' );
		}
		
		//Horizontal slider
		if( $(".zozo-horizontal-slider").length ){
			$(".zozo-horizontal-slider").each(function() {
				
				var cur_ele = $(this);
				var duration = cur_ele.data("duration");
				duration = duration != '' ? duration : 300;
				
				$(cur_ele).jConveyorTicker({
					anim_duration: duration
				});
			});
		}
		
	}); // document ready end
			
})( jQuery );

