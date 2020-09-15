/*
 * Egoverns Theme Js 
 */ 

(function( $ ) {

	"use strict";
	
	var egoverns_body_atts = $("body").data("egoverns");
	var responsive_width = egoverns_body_atts && egoverns_body_atts.res_width ? egoverns_body_atts.res_width : 360;
	
	/* Page Loader */
	$( window ).load(function() {
		
		/* Header Bar Center Item Margin Fun */
		setTimeout( egovernsCenterMenuMargin, 300 );
		
		/* Set Sticky Height for Menu Bars */
		egovernsSetStickyOuterHeight();
		
		/* Sticky Menu */
		if($('.header-inner .sticky-head').length){
			egovernsStickyPart( '.header-inner' );
		}
		
		/* Scroll Sticky */
		if($('.header-inner .sticky-scroll').length){
			egovernsStickyScrollUpPart( '.header-inner', 'header' );
		}
		
		/* Mobile Header Sticky Menu */
		if($('.mobile-header-inner .sticky-head').length){
			egovernsStickyPart( '.mobile-header-inner' );
		}
		
		/* Mobile Header Scroll Sticky */
		if($('.mobile-header-inner .sticky-scroll').length){
			egovernsStickyScrollUpPart( '.mobile-header-inner', '.mobile-header' );
		}

		if( $(".page-loader").length ){
			$(".page-loader").fadeOut("slow");
		}else if( $("body.opacity-zero").length ){
			$("body").removeClass("opacity-zero");
			$("body").addClass("opacity-one");
		}
		
	});
		  
	$( document ).ready(function() {
	
		/* Set Header Height */
		var $window = $(window);
		var $header_cont = $('.portfolio-single-wrapper .portfolio-single-slide .item');
		$header_cont.height( $window.height() );
		$window.resize(function() {
			$header_cont.height( $window.height() );
		});
		
		/* Shortcode CSS Append */
		var css_out = '';
		$( ".egoverns-inline-css" ).each(function() {
			var shortcode = $( this );
			var shortcode_css = shortcode.attr("data-css");		
			css_out += ($).parseJSON( shortcode_css );
			shortcode.removeAttr("data-css");
		});
		
		/* VC Row Custom Style */
		$( ".egoverns-vc-row" ).each(function() {
			var shortcode = $( this );
			var row_class = shortcode.attr("data-class");
			if( shortcode.attr("data-color") ){
				var row_color = shortcode.attr("data-color");		
				css_out += "." + row_class + "{ color:" + row_color + ";}"; 
				shortcode.removeAttr("data-color");
			}
			if( shortcode.attr("data-bg-overlay") ){
				var row_overlay = shortcode.attr("data-bg-overlay");
				css_out += "." + row_class + "{ position: relative; }";
				css_out += "." + row_class + " > span.row-overlay { background-color:" + row_overlay + ";}";
				shortcode.removeAttr("data-bg-overlay");				
			}
			shortcode.removeAttr("data-class");
		});
		if( css_out != '' ){
			$('head').append( '<style id="egoverns-shortcode-styles">'+ css_out +'</style>' );
		}		
		
		/* VC Fullwidth Row RTL */
		if( $("body.rtl").length ){
			// Fixes rows in RTL
			$(document).on('vc-full-width-row', function () {
				egoverns_fix_vc_full_width_row();
			});
			
			// Fixes rows in RTL
			jQuery(document).on('vc-full-width-row', function () {
				egoverns_fix_vc_full_width_row();
			});
			
			// Run one time because it was not firing in Mac/Firefox and Windows/Edge some times
			egoverns_fix_vc_full_width_row();
		}

		/* Secondary Toggle */
		$( document ).on( "click", ".secondary-space-toggle", function() {
			$('.secondary-space-toggle').toggleClass('active');
			$('body').toggleClass('secondary-active');
			var sec_width = $( ".secondary-menu-area" ).width();
			var sec_pos = $( ".secondary-menu-area" ).data('pos') ? $( ".secondary-menu-area" ).data('pos') : 'left';
			
			if( sec_pos == 'overlay' ){
				$( ".secondary-menu-area" ).fadeToggle(500);
			}else if( $('body').hasClass('secondary-active') ){
				if( sec_pos == 'left' ){
					if( $( ".secondary-menu-area" ).hasClass('left-overlay') ){
						$( ".secondary-menu-area" ).animate( { left : "0" }, { duration: 500, specialEasing: { left: "easeInOutExpo" } } );
					}else{
						$('body').toggleClass('secondary-push-actived');
						$( ".secondary-menu-area" ).animate( { left : "0" }, { duration: 500 } );
						$( "body" ).css('overflow','hidden');
						$( "body .egoverns-wrapper" ).animate( { left : sec_width +"px" }, 500 );
						if( $( ".sticky-outer" ).length ) {
							$( ".sticky-outer .header-sticky, .sticky-outer .show-menu" ).animate( { left : sec_width +"px", right: "-" + sec_width +"px" }, 500 );
						}
					}
				}else{
					if( $( ".secondary-menu-area" ).hasClass('right-overlay') ){
						$( ".secondary-menu-area" ).animate( { right : "0" }, { duration: 500, specialEasing: { right: "easeInOutExpo" } } );
					}else{
						$('body').toggleClass('secondary-push-actived');
						$( ".secondary-menu-area" ).animate( { right : "0" }, { duration: 500 } );
						$( "body" ).css('overflow','hidden');
						$( "body .egoverns-wrapper" ).animate( { right : sec_width +"px" }, 500 );
						if( $( ".sticky-outer" ).length ){
							$( ".sticky-outer .header-sticky, .sticky-outer .show-menu" ).animate( { right : sec_width +"px", left : "-" + sec_width +"px" }, 500 );
						}
					}
				}
			}else{
				if( sec_pos == 'left' ){
					if( $( ".secondary-menu-area" ).hasClass('left-overlay') ){
						$( ".secondary-menu-area" ).animate( { left : "-"+ sec_width +"px" }, { duration: 500, specialEasing: { left: "easeInOutExpo" } } );
					}else{
						$('body').toggleClass('secondary-push-actived');
						$( ".secondary-menu-area" ).animate( { left : "-"+ sec_width +"px" }, { duration: 500 } );
						$( "body .egoverns-wrapper" ).animate( { left : 0 }, 500, function(){ $( "body" ).css('overflow-y','scroll'); } );
						if( $( ".sticky-outer" ).length ){
							$( ".sticky-outer .header-sticky, .sticky-outer .show-menu" ).animate( { left : 0, right: 0 }, 500 );
						}
					}
				}else{
					if( $( ".secondary-menu-area" ).hasClass('right-overlay') ){
						$( ".secondary-menu-area" ).animate( { right : "-"+ sec_width +"px" }, { duration: 500, specialEasing: { right: "easeInOutExpo" } } );
					}else{
						$('body').toggleClass('secondary-push-actived');
						$( ".secondary-menu-area" ).animate( { right : "-"+ sec_width +"px" }, { duration: 500 } );
						$( "body .egoverns-wrapper" ).animate( { right : 0 }, 500, function(){ $( "body" ).css('overflow-y','scroll'); } );
						if( $( ".sticky-outer" ).length ){
							$( ".sticky-outer .header-sticky, .sticky-outer .show-menu" ).animate( { right: 0, left : 0 }, 500 );
						}
					}
				}
			}
			
			/* Slider Revolution Issue Fixed */
			if( $(".rev_slider_wrapper").length ){
				$(".rev_slider_wrapper").css("left" , "inherit");    
			}
			
			return false;
		});
			
		/* Sticky Header Space Menu to Modern Toggle Menu Convert */
		if( $('.sticky-header-space').length ){
			
			//Add toggle dropdown icon
			$( ".sticky-header-space .egoverns-main-menu" ).find('.menu-item-has-children').append( '<span class="zmm-dropdown-toggle ti-plus"></span>' );
			$( ".sticky-header-space .egoverns-main-menu" ).find('.sub-menu').slideToggle();
			
			//zmm dropdown toggle
			$( ".sticky-header-space .zmm-dropdown-toggle" ).on( "click", function() {
				var parent = $( this ).parent('li').children('.sub-menu');
				$( this ).parent('li').children('.sub-menu').slideToggle();
				$( this ).toggleClass('ti-minus');
				if( $( parent ).find('.sub-menu').length ){
					$( parent ).find('.sub-menu').slideUp();
					$( parent ).find('.zmm-dropdown-toggle').removeClass('ti-minus');
				}
			});
			
		}
		
		//Custom Responsive Width
		var win_width = $(window).width();
		if( responsive_width ){
			egovernsSetCustomHiddenElements( win_width, responsive_width );
		}
		
		/* Full Search Toggle */
		$( document ).on( "click", ".full-search-toggle", function() {
			$('.full-search-wrapper').toggleClass("search-wrapper-opened");
			$('.full-search-wrapper').fadeToggle(500);
			var search_in = $('.search-wrapper-opened').find("input.form-control");
			search_in.focus();			
			return false;
		});	
		
		/* Mobile Bar Animate Toggle */
		$( document ).on( "click", ".mobile-bar-toggle", function() {
			$( ".mobile-bar" ).toggleClass('active');
			$( "body" ).toggleClass('mobile-bar-active');
			if( $( ".mobile-bar" ).hasClass('animate-from-left') ){
				if( $( ".mobile-bar" ).hasClass('active') )
					$( ".mobile-bar" ).animate( { left : 0 }, { duration: 500, specialEasing: { left: "easeInOutExpo" } } );
				else
					$( ".mobile-bar" ).animate( { left : "-100%" }, { duration: 500, specialEasing: { left: "easeInOutExpo" } } );
			}
			if( $( ".mobile-bar" ).hasClass('animate-from-right') ){
				if( $( ".mobile-bar" ).hasClass('active') )
					$( ".mobile-bar" ).animate( { right : 0 }, { duration: 500, specialEasing: { right: "easeInOutExpo" } } );
				else
					$( ".mobile-bar" ).animate( { right : "-100%" }, { duration: 500, specialEasing: { right: "easeInOutExpo" } } );
			}
			if( $( ".mobile-bar" ).hasClass('animate-from-top') ){
				if( $( ".mobile-bar" ).hasClass('active') )
					$( ".mobile-bar" ).animate( { top : 0 }, { duration: 500, specialEasing: { top: "easeInOutExpo" } } );
				else
					$( ".mobile-bar" ).animate( { top : "-100%" }, { duration: 500, specialEasing: { top: "easeInOutExpo" } } );
			}
			if( $( ".mobile-bar" ).hasClass('animate-from-bottom') ){
				if( $( ".mobile-bar" ).hasClass('active') )
					$( ".mobile-bar" ).animate( { bottom : 0 }, { duration: 500, specialEasing: { bottom: "easeInOutExpo" } } );
				else
					$( ".mobile-bar" ).animate( { bottom : "-100%" }, { duration: 500, specialEasing: { bottom: "easeInOutExpo" } } );
			}
			return false;
		});
		
		/* Mobile Bar Menu to Modern Toggle Menu Convert */
		if( $('.mobile-bar').length ){
			
			if( $( ".egoverns-main-menu" ).length || $( ".secondary-menu-area-inner ul.menu" ).length ){
			
				var main_menu = ".egoverns-main-menu";
				if( !$( ".egoverns-main-menu" ).length ){
					$( ".secondary-menu-area-inner ul.menu" ).addClass( "egoverns-main-menu" );
				}
				
				var mobile_menu = ".mobile-bar .egoverns-mobile-main-menu";
				var find_classes = ".dropdown, .mega-dropdown, .dropdown-toggle, .dropdown-menu, .mega-dropdown-menu, .mega-child-heading, .mega-child-dropdown, .mega-child-dropdown-menu, .hidden-xs-up, .row, .mega-sub-dropdown, .mega-sub-dropdown-menu, .mega-sub-child, .mega-sub-child-inner, .left-side";
				var removable_classes = "dropdown mega-dropdown dropdown-toggle dropdown-menu mega-dropdown-menu mega-child-heading mega-child-dropdown mega-child-dropdown-menu hidden-xs-up row mega-sub-dropdown mega-sub-dropdown-menu mega-sub-child mega-sub-child-inner left-side";
				
				//Mobile menu copy from main menu
				if( $(mobile_menu).html() == '' ) $(main_menu).clone().appendTo( mobile_menu );
				
				//Add main class name
				$( mobile_menu + " " + main_menu ).addClass( "flex-column" );
				
				//Remove unwanted item from mobile menu
				$( mobile_menu + " .mega-child-widget" ).parent( "li.menu-item" ).remove();
				$( mobile_menu + " .mega-child-divider" ).remove();
				$( mobile_menu + " .menu-item-logo" ).remove();
				$( mobile_menu + " li.menu-item" ).removeClass (function (index, css) {
					return ( css.match (/\bcol-\S+/g) || [] ).join(' ');

				});
				$( mobile_menu + " li.menu-item" ).removeClass (function (index, css) {
					return ( css.match (/\bmax-col-\S+/g) || [] ).join(' ');
				});
				
				//Change class name
				$( mobile_menu ).find( ".dropdown-menu, .mega-child-dropdown-menu, .mega-sub-child-inner" ).toggleClass( "sub-menu" );
				
				//Content reform
				$( mobile_menu + " .mega-child-item-disabled" ).replaceWith( "<a class='nav-link' href='#'>" + $( mobile_menu + " .mega-child-item-disabled" ).html() + "</a>" );
				
				//Remove unwanted classes
				$( mobile_menu ).find( find_classes ).removeClass( removable_classes );
				
				//Remove Background
				$( mobile_menu + " .sub-menu" ).css('background','none');
				
				//Add toggle dropdown icon
				$( ".mobile-bar " + main_menu ).find('.menu-item-has-children').append( '<span class="zmm-dropdown-toggle ti-plus"></span>' );
				$( ".mobile-bar " + main_menu ).find('.sub-menu').slideToggle();
				
				$( ".mobile-bar " + main_menu ).removeClass('egoverns-main-menu').addClass('egoverns-mobile-menu');
				
				//dropdown toggle
				$( ".mobile-bar .zmm-dropdown-toggle" ).on( "click", function() {
					var parent = $( this ).parent('li').children('.sub-menu');
					$( this ).parent('li').children('.sub-menu').slideToggle();
					$( this ).toggleClass('ti-minus');
					if( $( parent ).find('.sub-menu').length ){
						$( parent ).find('.sub-menu').slideUp();
						$( parent ).find('.zmm-dropdown-toggle').removeClass('ti-minus');
					}
				});
			}// check page have main menu or not
			
		}
		
		/* Mobile Bar Menu to Modern Toggle Menu Convert */
		if( $('.secondary-menu-area-inner ul.menu').length ){
				
				var sec_menu = ".secondary-menu-area-inner ul.menu";
				//Add main class name
				$( sec_menu ).addClass( "flex-column" );
				
				//Add toggle dropdown icon
				$( sec_menu ).find('.menu-item-has-children').append( '<span class="zmm-dropdown-toggle ti-plus"></span>' );
				$( sec_menu ).find('.sub-menu').slideToggle();
				
				//dropdown toggle
				$( sec_menu + " .zmm-dropdown-toggle" ).on( "click", function() {
					var parent = $( this ).parent('li').children('.sub-menu');
					$( this ).parent('li').children('.sub-menu').slideToggle();
					$( this ).toggleClass('ti-minus');
					if( $( parent ).find('.sub-menu').length ){
						$( parent ).find('.sub-menu').slideUp();
						$( parent ).find('.zmm-dropdown-toggle').removeClass('ti-minus');
					}
				});
			
		}
		
		/* Twitter Widget Slider(newsticker) */
		if( $( ".twitter-slider" ).length ){
			$( ".twitter-slider" ).each(function() {
				var twit_slider = $(this);	
				var slide = twit_slider.attr( "data-show" );
				twit_slider.easyTicker({
					direction: 'up',
					visible: parseInt(slide),
					easing: 'swing',
					interval: 4000
				});
			});
		}
		
		/* Menu Scroll */
		var cur_offset = 0;
		
		var o_stat = 0; // One Page Menu Status
		$( '.egoverns-main-menu li.menu-item, .egoverns-mobile-menu li.menu-item' ).each(function( index ) {
			var cur_item = this;
			var target = $(cur_item).children("a").attr("href");
			if( target && target.indexOf("#section-") != -1 ){
				o_stat = 1;
				var res = target.split("#");
				if( res.length == 2 ){
					$(cur_item).children("a").attr("data-target", res[0]);
					$(cur_item).children("a").attr("href", "#"+res[1]);
				}	
			}
		});
		
		if( o_stat ){
		
			if( $('.egoverns-main-menu .menu-item').find('a[href="#section-top"]').length ){
				$("body").attr("id","section-top");
			}
			
			$( '.egoverns-main-menu li.menu-item, .egoverns-mobile-menu li.menu-item' ).removeClass("current-menu-item");
			
			$(window).on('scroll', function () {
				var minus_height = $("#wpadminbar").length ? $("#wpadminbar").outerHeight() : 0;
				minus_height += win_width >= egoverns_body_atts.res_width ? parseInt( egoverns_body_atts.menu_offset ) + 1 : parseInt( egoverns_body_atts.mobile_menu_offset );
				$('section.elementor-section[id*="section-"], body').each(function () {
					var anchored = $(this).attr("id"),
						targetOffset = $(this).offset().top - minus_height;
						
					if ($(window).scrollTop() > targetOffset) {
						$('.egoverns-main-menu .menu-item').find("a").removeClass("active");
						$('.egoverns-main-menu .menu-item').find('a[href="#'+ anchored +'"]').addClass("active");
						
						//Mobile menu scroll spy active
						$('.egoverns-mobile-menu .menu-item').find("a").removeClass("active");
						$('.egoverns-mobile-menu .menu-item').find('a[href="#'+ anchored +'"]').addClass("active");
					}
				});
			});
			
			$( '.egoverns-main-menu .menu-item > a[href^="#section-"], .egoverns-mobile-main-menu .menu-item > a[href^="#section-"]' ).on('click',function (e) {
				
				var cur_item = this;
				var target = $(cur_item).attr("href");
				
				if( $(cur_item).parents(".egoverns-mobile-main-menu").length ) {
					$(".mobile-bar-toggle.close").trigger( "click" );
				}
				if( $( ".secondary-menu-area" ) ){
					$( ".secondary-menu-area .secondary-space-toggle.active" ).trigger( "click" );
				}
				
				var target_id = target.slice( target.indexOf("#"), ( target.length ) );
				var cur_url = location.protocol + '//' + location.host + location.pathname; //window.location.href;
				var data_targ = $(cur_item).attr("data-target");
				var another_page = false;
				if( target_id == '#section-top' && data_targ != '' ){
					if( cur_url != data_targ ){
						another_page = true;
					}
				}

				if( $( target_id ).length && !another_page ){
					
					var minus_height = $("#wpadminbar").length ? $("#wpadminbar").outerHeight() : 0;
					minus_height += win_width >= egoverns_body_atts.res_width ? parseInt( egoverns_body_atts.menu_offset ) : parseInt( egoverns_body_atts.mobile_menu_offset );
					var offs = $(target_id).offset().top - minus_height;						
					var sec_ani_call = 1;
					if( target_id == '#section-top' ){
						sec_ani_call = 1;
						offs = 0;
					}
					$('html,body').animate({ 'scrollTop': offs }, 1000, 'easeInOutExpo' );
					
					return false;
				}else{
					
					if( target_id == '#section-top' && cur_url == data_targ ){
						$('html,body').animate({ 'scrollTop': 0 }, 1000, 'easeInOutExpo' );
						return false;
					}else{
						if( cur_url != data_targ && target_id != '#' ){
							window.location.href = data_targ + target;
						}else{
							window.location.href = target;
						}
					}

				}
			
			});	
			
		}
		
		/*Back to top*/
		if( $( ".back-to-top" ).length ){
			$( document ).on('click', '#back-to-top', function(){
				$('html,body').animate({ 'scrollTop': 0 }, 1000, 'easeInOutExpo' );
				return false;
			});
			$( document ).scroll(function() {
				var y = $( this ).scrollTop();
				if ( y > 300 )
					$( '#back-to-top' ).addClass("back-to-top-on");
				else
					$( '#back-to-top' ).removeClass("back-to-top-on");
			});
		}
				
		/* Top Sliding Bar */
		if( $( ".top-sliding-bar" ).length ){
			$( document ).on('click', '.top-sliding-toggle', function(){
				$( ".top-sliding-bar-inner" ).slideToggle();
				$( ".top-sliding-toggle" ).toggleClass( "fa-minus" );
				return false;
			});
		}
		
		/* Sticky Header Space */
		if( $('.sticky-header-space').length ){
			var elem_pos = $('.sticky-header-space').hasClass('left-sticky') ? 'left' : 'right';
			var elem_width = $('.sticky-header-space').outerWidth();
			
			egovernsStickyHeaderAdjust(elem_pos, elem_width);
			$( window ).resize(function() {
				egovernsStickyHeaderAdjust(elem_pos, elem_width);
			});
		}
		
		/* Toggle Search Modal Triggers */
		if( $( ".textbox-search-toggle" ).length ){
			$( document ).on('click', '.textbox-search-toggle', function(){
				$(this).parents('.search-toggle-wrap').toggleClass('active');
				return false;
			});
		}else if( $( ".full-bar-search-toggle" ).length ){
			$( document ).on('click', '.full-bar-search-toggle', function(){
				$('.full-bar-search-wrap').toggleClass('active');
				return false;
			});
		}else if( $( ".bottom-search-toggle" ).length ){
			$( document ).on('click', '.bottom-search-toggle', function(){
				$(this).parents('.search-toggle-wrap').toggleClass('active');
				return false;
			});
		}
		
		/* Sticky Footer */
		if( $( ".footer-fixed" ).length ){
			if( $( window ).width() > 1023 ){
				$( ".egoverns-wrapper" ).css({ 'margin-bottom' : $( ".footer-fixed" ).outerHeight() + 'px' });
			}else{
				$( ".egoverns-wrapper" ).css({ 'margin-bottom' : '0' });
			}
		}else if( $( ".footer-bottom-fixed" ).length ){
			if( $( window ).width() > 1023 ){
				$( ".egoverns-wrapper" ).css({ 'margin-bottom' : $( ".footer-bottom-fixed" ).outerHeight() + 'px' });
			}else{
				$( ".egoverns-wrapper" ).css({ 'margin-bottom' : '0' });
			}
		}
		$( window ).resize(function() {
			if( $( ".footer-fixed" ).length ){
				if( $( window ).width() > 1023 ){
					$( ".egoverns-wrapper" ).css({ 'margin-bottom' : $( ".footer-fixed" ).outerHeight() + 'px' });
				}else{
					$( ".egoverns-wrapper" ).css({ 'margin-bottom' : '0' });
				}
			}else if( $( ".footer-bottom-fixed" ).length ){
				if( $( window ).width() > 1023 ){
					$( ".egoverns-wrapper" ).css({ 'margin-bottom' : $( ".footer-bottom-fixed" ).outerHeight() + 'px' });
				}else{
					$( ".egoverns-wrapper" ).css({ 'margin-bottom' : '0' });
				}
			}
		});							
		
		/* Stellar Parallax */
		if( $(".parallax-item").length ){
			$.stellar({
				horizontalScrolling: false,
				verticalOffset: 40
			});
		}

		/* Post Like */
		$( document ).on( 'click', ".post-like, .post-dislike", function( event) {
	
			var current = $(this);
			var like_stat = current.data("stat");
			var post_id = current.data("id");
			var parent = current.parents('.post-like-wrap');

			//return false;
			if( like_stat != '' ){
				
				if( like_stat == '1' ){
					parent.find('.post-disliked').removeClass('fa-thumbs-down post-disliked').addClass('fa-thumbs-o-down post-dislike');
					current.removeClass('fa-thumbs-o-up post-like').addClass('fa-thumbs-up post-liked');
				}else{
					parent.find('.post-liked').removeClass('fa-thumbs-up post-liked').addClass('fa-thumbs-o-up post-like');
					current.removeClass('fa-thumbs-o-down post-dislike').addClass('fa-thumbs-down post-disliked');
				}
				
				// Ajax call
				$.ajax({
					type: "post",
					url: egoverns_ajax_var.admin_ajax_url,
					data: "action=post_like_act&nonce="+egoverns_ajax_var.like_nonce+"&like_stat="+like_stat+"&post_id="+post_id,
					success: function(res){
						$( parent ).html(res);
						$('body').tooltip({
							container: 'body',
							trigger: 'hover',
							html: true,
							animation: false,
							selector: '[data-toggle="tooltip"]'
						});
					},
					error: function (jqXHR, exception) {
						console.log(jqXHR);
					}
				});
			}
			return false;
		});
		$( document ).on( 'click', ".post-liked, .post-disliked, .post-fav-done", function( event) {
			return false;
		});															 
																		 
		
		/* Post Favourite */
		$( document ).on( 'click', ".post-favourite", function( event) {
	
			var current = $(this);
			var post_id = current.data("id");
			var parent = current.parents('.post-fav-wrap');

			if( post_id != '' ){
				// Ajax call
				$.ajax({
					type: "post",
					url: egoverns_ajax_var.admin_ajax_url,
					data: "action=post_fav_act&nonce="+egoverns_ajax_var.fav_nonce+"&post_id="+post_id,
					success: function(res){
						$( parent ).html(res);
						$('body').tooltip({
							container: 'body',
							trigger: 'hover',
							html: true,
							animation: false,
							selector: '[data-toggle="tooltip"]'
						});
					},
					error: function (jqXHR, exception) {
						console.log(jqXHR);
					}
				});
			}
			return false;
		});

		/* Magnific Zoom Gallery Code */
		if( $('.zoom-gallery').length ){
			$('.zoom-gallery').magnificPopup({
			  delegate: 'a',
			  type: 'image',
			  closeOnContentClick: false,
			  closeBtnInside: false,
			  mainClass: 'mfp-with-zoom mfp-img-mobile',
			  gallery: {
				enabled: true
			  },
			  zoom: {
				enabled: true,
				duration: 300, // don't foget to change the duration also in CSS
				opener: function(element) {
				  return element.find('img');
				}
			  }
			});
		}
		
		if( $('.image-gallery .image-gallery-link').length ){
			$('.image-gallery').magnificPopup({
				delegate: '.image-gallery-link',
				type: 'image',
				closeOnContentClick: false,
				closeBtnInside: false,
				mainClass: 'mfp-with-zoom mfp-img-mobile',
				gallery: {
					enabled: true
				},
			});
		}
		
		if( $('.popup-video-post').length ){	
			/* Magnific Popup Code */
			$('.popup-video-post').magnificPopup({
				disableOn: 700,
				type: 'iframe',
				mainClass: 'mfp-fade',
				removalDelay: 160,
				preloader: false,
				fixedContentPos: false
			});
		}
		
		if( $('.popup-with-zoom-anim').length ){	
			$('.popup-with-zoom-anim').magnificPopup({
				disableOn: 700,
				type: 'inline',
				mainClass: 'mfp-fade',
				removalDelay: 160,
				preloader: false,
				fixedContentPos: false,
				callbacks: {
					open: function() {
						// Play video on open:
						if( !$( this.content ).find('video').length ){
							var parent = $( this.content ).parent( "post-video-wrap" );
							var url = $( this.content ).find('span').data( "url" );
							var video = '<video width="100%" height="450" preload="true" style="max-width:100%;" autoplay="true"><source src="'+ url +'" type="video/mp4"></video>';
							$( this.content ).find('span').replaceWith( video );
						}else{
							$(this.content).find('video')[0].load();
						}
					},
					close: function() {
						// Reset video on close:
						$(this.content).find('video')[0].pause();
			
					}
				}
			});
		}
		
		//Modal popup
		if( $('.modal-popup-content').length ){	
			/* Magnific Popup Code */
			$('.modal-box-trigger').magnificPopup({
				type: 'inline',
				preloader: false,
				focus: '#username',
				modal: true,
				mainClass: 'mfp-fade',
				removalDelay: 300
			});
			$(document).on('click', '.popup-modal-dismiss', function (e) {
				e.preventDefault();
				$.magnificPopup.close();
			});
		}
		
		//Egoverns Popup
		if( $('.egoverns-popup-wrapper').length ){	
			$('.egoverns-popup-trigger').magnificPopup({
				type: 'inline',
				preloader: false,
				//focus: '#username',
				modal: true,
				mainClass: 'mfp-fade',
				removalDelay: 300
			});
			$(document).on('click', '.egoverns-popup-dismiss', function (e) {
				e.preventDefault();
				$.magnificPopup.close();
			});
		}
		
		/* Set Blockquote Background */
		if( $( ".post-quote-wrap, .post-link-wrap" ).length ){
			$( ".post-quote-wrap, .post-link-wrap" ).each(function() {
				var img_url = $(this).data('url');
				if( img_url ){
					$(this).css( 'background-image','url('+ img_url +')' );	
				}
			});
		}
		
		/* Set Background Image */
		if( $( ".set-bg-img" ).length ){
			$( ".set-bg-img" ).each(function() {
				var img_url = $(this).data('src');
				if( img_url ){
					$(this).css( 'background-image','url('+ img_url +')' );	
				}
			});
		}
		
		/* Sticky Element */
		if( $( ".egoverns-sticky-wrapper" ).length ){
			$("a.egoverns-sticky-trigger").on( "click", function(e){
				$(this).parent(".egoverns-sticky-wrapper").toggleClass("active");
				return false;
			});
		}
		
		if( $('a.onclick-video-post').length ){
			$(document).on( "click", "a.onclick-video-post", function(){

				var parent = $(this).parent('.post-video-wrap');
				var frame = '<iframe src="'+ $(this).attr("href") +'?autoplay=1" width="100%" height="'+ parent.height() +'" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
				$(this).fadeOut(300);
				$(this).replaceWith( frame );
				return false;
			});
		}
		
		if( $('a.onclick-custom-video').length ){
			$(document).on( "click", ".onclick-custom-video", function(){
		
				var parent = $(this).parent('.post-video-wrap');
				var video = '<video width="100%" height="'+ parent.height() +'" preload="true" style="max-width:100%;" autoplay="true"><source src="'+ $(this).data("url") +'" type="video/mp4"></video>';
				$(this).fadeOut(300);
				$(this).replaceWith( video );
				return false;
			});
		}
		
		/* Page Title Background Video */
		if( $( "#page-title-bg .page-title-wrap-inner" ).length ){
			$( "#page-title-bg .page-title-wrap-inner" ).YTPlayer();
		}
		
		/* Comments Like/Dislike */
		if( $(".comment-like-wrapper").length ){
			$( document ).on( 'click', ".comment-like", function( event) {
		
				var cmt_cur = $(this);
				var cmt_meta = cmt_cur.data('id');
				var cmt_id = cmt_cur.data('cmt-id');
				var parent = cmt_cur.parents('.comment-like-wrapper');
				if( cmt_meta == '1' ){
					cmt_cur.parents('.list-inline').find('.comment-liked').removeClass('theme-color comment-liked').addClass('comment-like');
					cmt_cur.removeClass('comment-like').addClass('theme-color comment-liked');
				}else{
					cmt_cur.parents('.list-inline').find('.comment-liked').removeClass('theme-color comment-liked').addClass('comment-like');
					cmt_cur.removeClass('comment-like').addClass('theme-color comment-liked');	
				}
				
				if( cmt_id != '' && cmt_meta != '' ){
					// Ajax call
					(jQuery).ajax({
						type: "post",
						url: egoverns_ajax_var.admin_ajax_url,
						data: "action=comment_like&nonce="+egoverns_ajax_var.cmt_nonce+"&cmt_id="+cmt_id+"&cmt_meta="+cmt_meta,
						success: function(res){
							$( parent ).html(res);
						},
						error: function (jqXHR, exception) {
							console.log(jqXHR);
						}
					});
				}
				return false;
			});
		}
		
		/*Mailchimp Code*/
		if( $('.zozo-mc').length ){
			$('.zozo-mc').on( "click", function () {
				
				var c_btn = $(this);
				var mc_wrap = $( this ).parents('.mailchimp-wrapper');
				var mc_form = $( this ).parents('.zozo-mc-form');
				
				if( mc_form.find('input[name="zozo_mc_email"]').val() == '' ){
					mc_wrap.find('.mc-notice-msg').text( zoacres_ajax_var.must_fill );
				}else{
					c_btn.attr( "disabled", "disabled" );
					$.ajax({
						type: "POST",
						url: egoverns_ajax_var.admin_ajax_url,
						data: 'action=zozo-mc&nonce='+egoverns_ajax_var.mc_nounce+'&'+mc_form.serialize(),
						success: function (data) {
							//Success
							c_btn.removeAttr( "disabled" );
							if( data == 'success' ){
								mc_wrap.find('.mc-notice-msg').text( mc_wrap.find('.mc-notice-group').attr('data-success') );
							}else{
								mc_wrap.find('.mc-notice-msg').text( mc_wrap.find('.mc-notice-group').attr('data-fail') );
							}
						},error: function(xhr, status, error) {
							c_btn.removeAttr( "disabled" );
							mc_wrap.find('.mc-notice-msg').text( mc_wrap.find('.mc-notice-group').attr('data-fail') );
						}
					});
				}
			});
		} // if mailchimp exists
		
		/* Facbook Comment Width Resize */
		if( $( '.fb-comments-wrapper' ).length ){
			$( window ).resize(function() {
				setTimeout(function(){
					if($( window ).width() <= 768 ){
						$( ".fb-comments-wrapper iframe" ).width( $( ".content-area" ).width() );
					}else{
						$( ".fb-comments-wrapper iframe" ).width( $( ".content-area .fb-comments" ).data('width') );
					}
				}, 200);
			});
		}
	
		/*Timeline Slide*/
		/*if( $('.cd-horizontal-timeline').length ){
			$('.cd-horizontal-timeline').each(function( index ) {
				var cur_ele = $(this);
				var line_dist = cur_ele.data("distance");
				cur_ele.zozotimeline({
					distance: line_dist
				});
			});
		}*/
		
		if( $('.popover-wrapper .popover-trigger').length ){
			$(".popover-trigger").each(function( index ) {
				var evnt_name = $(this).attr("data-event") ? $(this).attr("data-event") : 'hover';
				$(this).on( evnt_name, function ( e ) {
					e.preventDefault();
					$(this).parents(".popover-wrapper").toggleClass("popover-active");
				});
			});
		}
		
		$(window).scroll(function(){
			egoverns_scroll_animation();
		});		

	}); // doc ready end
	
	
	$( window ).load(function() {
							  
		if( $( ".header-slider-wrapper" ).length ){
			$( ".header-slider-wrapper" ).css({ 'height' : 'auto' });
		}
		
		/* Grid Layout Set Width for Owl and Isotope */
		if( $( ".grid-layout.grid-normal" ).length ){
			
			$( ".grid-layout.grid-normal" ).each(function() {
			
				var c_elem = $( this );
				var parent_width = c_elem.width();
				var gutter_size = c_elem.data( "gutter" );
				var grid_cols = c_elem.data( "cols" );
				
				var net_width = Math.floor( ( parent_width - ( gutter_size * ( grid_cols - 1 ) ) ) / grid_cols );
				var gn_ele = 1; // grid normal element variable
				c_elem.children("article").each(function() {
					if( gn_ele % grid_cols == 0 ){
						$( this ).css({'width':net_width+'px', 'margin-right': '0', 'margin-bottom': gutter_size+'px'});
					}else{
						$( this ).css({'width':net_width+'px', 'margin-right': gutter_size+'px', 'margin-bottom': gutter_size+'px'});
					}
					gn_ele++;
				});		
				
				c_elem.children("article").addClass("grid-dyno-visible");

				$( window ).resize(function() {
					setTimeout(function(){ 
						parent_width = c_elem.width();
						var mgrid_cols = 1;
						if( $(window).width() < 768 ){
							mgrid_cols = 1;						
						}else{
							mgrid_cols = grid_cols;	
						}
						var net_width = Math.floor( ( parent_width - ( gutter_size * ( mgrid_cols - 1 ) ) ) / mgrid_cols );
						var gn_ele = 1; // grid normal element variable
						c_elem.children("article").each(function() {
							if( gn_ele % mgrid_cols == 0 ){
								$( this ).css({'width':net_width+'px', 'margin-right': '0', 'margin-bottom': gutter_size+'px'});
							}else{
								$( this ).css({'width':net_width+'px', 'margin-right': gutter_size+'px', 'margin-bottom': gutter_size+'px'});
							}
							gn_ele++;
						});									
					}, 200);					
				});	
				
				c_elem.find( ".top-standard-post article" ).css({'width':'auto'});
			
			});	// each end		
		} // .grid-layout
		
		/* Theme Owl Carousel Code */
		$( ".owl-carousel" ).each(function() {
			if( !$( this ).parents( ".isotope" ).length ){
				egovernsOwlSettings( $( this ) );
			}
		});
	
		/* Isotope Grid Layout */
		if( $( ".grid-layout > .isotope" ).length ){
			$( ".grid-layout > .isotope" ).each(function() {
			
				var c_elem = $( this );
				var parent_width = c_elem.width();
				var gutter_size = c_elem.data( "gutter" );
				var grid_cols = c_elem.data( "cols" );

				var layoutmode = c_elem.is('[data-layout]') ? c_elem.data( "layout" ) : '';
				
				layoutmode = layoutmode ? layoutmode : 'masonry';
				
				if( $(window).width() < 768 ) grid_cols = 1;
				
				var net_width = Math.floor( ( parent_width - ( gutter_size * ( grid_cols - 1 ) ) ) / grid_cols );
				c_elem.find( "article" ).css({'width':net_width+'px', 'margin-bottom':gutter_size+'px'});
				if( $( ".top-standard-post" ).length ){
					$( ".top-standard-post article" ).css({'margin-bottom':gutter_size+'px'});	
				}
				
				c_elem.find( ".owl-carousel" ).each(function() {
					egovernsOwlSettings( $( this ) );
				});
				
				c_elem.find( "video" ).each(function( index ) {
					$( this ).attr( "src", $( this ).find( "source" ).attr( "src" ) );
					$( this ).css({ 'height':'200px' });
				});
				
				var filter = "*";
				var isot_parent = c_elem.parent(".grid-layout");
				if( $( isot_parent ).attr("data-filter-stat") == 0 ){
					filter = $( isot_parent ).attr("data-first-cat") ? "." + $( isot_parent ).attr("data-first-cat") : '*';
				}
				
				c_elem.imagesLoaded( function(){
					c_elem.isotope({
						itemSelector: 'article',
						layoutMode: layoutmode,
						filter: filter,
						masonry: {
							gutter: gutter_size
						},
						fitRows: {
						  gutter: gutter_size
						}
					});
				});
				
				c_elem.children("article").addClass("grid-dyno-visible");
				
				/* Portfolio Filter Item */
				if( $(".portfolio-filter").length ){
					$( ".portfolio-filter-item" ).on( 'click', function() {
						$( this ).parents("ul.nav").find("li").removeClass("active");
						$( this ).parent("li").addClass("active");
						var filterValue = $( this ).attr( "data-filter" );
						c_elem = $( this ).parents( ".portfolio-wrapper" ).find( ".grid-layout .isotope" );
						c_elem.isotope({ 
							filter: filterValue
						});
						return false;
					});
				}

				$( window ).resize(function() {

					setTimeout(function(){ 
						grid_cols = c_elem.data( "cols" );
						if( $(window).width() < 768 ) grid_cols = 1;
						
						var parent_width = c_elem.width();
						net_width = Math.floor( ( parent_width - ( gutter_size * ( grid_cols - 1 ) ) ) / grid_cols );
						c_elem.find( "article" ).css({'width':net_width+'px'});
						c_elem.imagesLoaded( function(){
							var $isot = c_elem.isotope({
								itemSelector: 'article',
								masonry: {
									gutter: gutter_size
								}
							});
							$isot.on( 'arrangeComplete', isotopeArrange );
						});
						
					}, 200);
					
				});	
				
				// Isotope Grid Infinite
				if( c_elem.data( "infinite" ) == 1 && $(".post-pagination").length ){

					c_elem.infinitescroll({
						navSelector  : '.post-pagination',//'#page_nav',    // selector for the paged navigation 
						nextSelector : 'a.next-page',//'#page_nav a',  // selector for the NEXT link (to page 2)
						itemSelector : 'article',     // selector for all items you'll retrieve
						loading: {
							msgText : egoverns_ajax_var.load_posts,
							finishedMsg: egoverns_ajax_var.no_posts,
							img: egoverns_ajax_var.infinite_loader
						}
					},
					// call Isotope as a callback
					function( newElements ) {
						
						var elems = $(newElements);
						
						var net_width = Math.floor( ( parent_width - ( gutter_size * ( grid_cols - 1 ) ) ) / grid_cols );
						c_elem.find( "article" ).css({'width':net_width+'px', 'margin-bottom':gutter_size+'px'});
						if( $( ".top-standard-post" ).length ){
							$( ".top-standard-post article" ).css({'margin-bottom':gutter_size+'px'});	
						}
						
						c_elem.find( ".owl-carousel" ).each(function() {
							egovernsOwlSettings( $( this ) );
						});
						
						elems.find( "video" ).each(function( index ) {
							$( this ).attr( "src", $( this ).find( "source" ).attr( "src" ) );
							$( this ).css({ 'height':'200px' });
						});
						
						elems.imagesLoaded( function(){
							c_elem.isotope( 'appended', elems );
							elems.addClass("grid-dyno-visible");
						});
						
						if( c_elem.find( "article" ).hasClass( "egoverns-animate" ) ){
							egoverns_scroll_animation();
						}

					});
				}
			}); // each end
		}

		/* Related Slider Empty Post Image Height Set */
		if( $( ".related-slider .empty-post-image" ).length ){
			if( $( ".related-slider .item .wp-post-image" ).length ){
				$( ".related-slider .item .empty-post-image" ).height( $( ".related-slider .item .wp-post-image" ).height() );	
			}
		}
		
		/* Featured Slider Empty Post Image Height Set */
		if( $( ".featured-slider .empty-post-image" ).length ){
			if( $( ".featured-slider .item .wp-post-image" ).length ){
				$( ".featured-slider .item .empty-post-image" ).height( $( ".featured-slider .item .wp-post-image" ).height() );	
			}
		}
		
		/* Sticky Sidebar */
		if( $( ".egoverns-sticky-obj" ).length ){
			var $sticky_sidebars = $( ".egoverns-sticky-obj" );
			if( $( window ).width() > 767 ) {
				$sticky_sidebars.stick_in_parent();
			}
			$( window ).resize(function() {
				if( $( window ).width() > 767 ) {
					$sticky_sidebars.trigger( "sticky_kit:detach" );	
					$sticky_sidebars.stick_in_parent();
					$sticky_sidebars.trigger( "sticky_kit:recalc" );
				}else{
					$sticky_sidebars.trigger( "sticky_kit:detach" );
				}
			});
		}

		/* Circle Counter Shortcode Script */
		if( $( '.circle-progress-circle' ).length ){
			var circle = $( '.circle-progress-circle' );
			circle.appear(function() {
							  
				var c_circle = $( this );
				var c_value = c_circle.attr( "data-value" );
				var c_size = c_circle.attr( "data-size" );
				var c_thickness = c_circle.attr( "data-thickness" );
				var c_duration = c_circle.attr( "data-duration" );
				var c_empty = c_circle.attr( "data-empty" ) != '' ? c_circle.attr( "data-empty" ) : 'transparent';
				var c_scolor = c_circle.attr( "data-scolor" );
				var c_ecolor = c_circle.attr( "data-ecolor" ) != '' ? c_circle.attr( "data-ecolor" ) : c_scolor;
									
				c_circle.circleProgress({
					value: Math.floor( c_value ) / 100,
					size: Math.floor( c_size ),
					thickness: Math.floor( c_thickness ),
					emptyFill: c_empty,
					animation: {
						duration: Math.floor( c_duration )
					},
					lineCap: 'round',
					fill: {
						gradient: [c_scolor, c_ecolor]
					}
				}).on( 'circle-animation-progress', function( event, progress ) {
					$( this ).find( '.progress-value' ).html( Math.round( c_value * progress ) + '%' );
				});
			});
		}
		
		/* Day Counter Shortcode Script */
		if( $( '.day-counter' ).length ){
			$( '.day-counter' ).each(function() {
				var day_counter = $( this );
				var dprogress = $(day_counter).hasClass("day-counter-progress") ? true : false;
				var c_date = day_counter.attr('data-date');
				day_counter.countdown( c_date, function(event) {
					if( day_counter.find('.counter-day').length ){
						day_counter.find('.counter-day h3').text( event.strftime('%D') );
						if( dprogress ){
							var yr = parseInt( event.strftime('%D') );
							yr = yr ? parseInt( yr / 365 * 100 ) : 100;
							egovernsDayCircle( day_counter.find('.counter-day'), yr );
						}
					}
					if( day_counter.find('.counter-hour').length ){
						day_counter.find('.counter-hour h3').text( event.strftime('%H') );
						if( dprogress ){
							var hur = parseInt( event.strftime('%H') );
							hur = hur ? parseInt( hur / 24 * 100 ) : 100;
							egovernsDayCircle( day_counter.find('.counter-hour'), hur );
						}
					}
					if( day_counter.find('.counter-min').length ){
						day_counter.find('.counter-min h3').text( event.strftime('%M') );
						if( dprogress ){
							var mnth = parseInt( event.strftime('%M') );
							mnth = mnth ? parseInt( mnth / 60 * 100 ) : 100;
							egovernsDayCircle( day_counter.find('.counter-min'), mnth );
						}
					}
					if( day_counter.find('.counter-sec').length ){
						day_counter.find('.counter-sec h3').text( event.strftime('%S') );
						if( dprogress ){
							var tme = parseInt( event.strftime('%S') );
							tme = tme ? parseInt( tme / 60 * 100 ) : 100;
							egovernsDayCircle( day_counter.find('.counter-sec'), tme );
						}
					}
					if( day_counter.find('.counter-week').length ){
						day_counter.find('.counter-week h3').text( event.strftime('%w') );
						if( dprogress ){
							var wk = parseInt( event.strftime('%S') );
							wk = wk ? parseInt( wk / 60 * 100 ) : 100;
							egovernsDayCircle( day_counter.find('.counter-week'), wk );
						}
					}
				});
			});
		}

		/* Canvas Shapes */
		if( $(".canvas_agon").length ){
			$( '.canvas_agon' ).each(function() {
				egovernsAgon( $(this) );
			});
		}
		
		if( $(".vc_chart").length ){
			$(".vc_chart").trigger( "resize" );
		}

	});
	
	// Using window smartresize instead of resize function
	$( window ).smartresize(function() {
		
		/* Custom Responsive Width */
		var win_width = $(window).width();		
		if( responsive_width ){
			egovernsSetCustomHiddenElements( win_width, responsive_width );
		}
		
		/* Mobile Bar Toggle  */
		setTimeout( function(){ $(".mobile-bar.active").length ?  $( ".mobile-header .mobile-bar-toggle" ).trigger( "click" ) : ''; }, 100 ); 
				
		/* Pull Center Reset  */
		setTimeout( egovernsCenterMenuMargin, 300 );
		
		/* Sticky Menu */
		if($('.header-inner .sticky-head').length){
			setTimeout( egovernsStickyPart( '.header-inner' ), 100 ); 
		}
		
		/* Scroll Sticky */
		if($('.header-inner .sticky-scroll').length){
			setTimeout( egovernsStickyScrollUpPart( '.header-inner', 'header' ), 100 ); 
		}
		
		/* Mobile Header Sticky Menu */
		if($('.mobile-header-inner .sticky-head').length){
			setTimeout( egovernsStickyPart( '.mobile-header-inner' ), 100 ); 
		}
		
		/* Mobile Header Scroll Sticky */
		if($('.mobile-header-inner .sticky-scroll').length){
			setTimeout( egovernsStickyScrollUpPart( '.mobile-header-inner', '.mobile-header' ), 100 ); 
		}
		
		egoverns_scroll_animation();
		
	});
	
	$( window ).load(function() {
		if( $( ".egovernsgmap" ).length ){
			initEgovernsGmap();
		}
		
		egoverns_scroll_animation();
	});
	
	//Day Counter Progress
	function egovernsDayCircle( ele, value ){
		var c_circle = $( ele );
		var parent_ele = $( ele ).parent( ".day-counter-progress" );
		var c_value = value;
		var c_size = $( parent_ele ).attr("data-size") ? $( parent_ele ).attr("data-size") : 100;
		var c_thickness = $( parent_ele ).attr("data-thick") ? $( parent_ele ).attr("data-thick") : 10;
		var c_duration = 0;
		var c_empty = $( parent_ele ).attr("data-empty-color") ? $( parent_ele ).attr("data-empty-color") : '#eee';
		var c_scolor = $( parent_ele ).attr("data-fill-color") ? $( parent_ele ).attr("data-fill-color") : '#333';
		var c_ecolor = c_scolor;
							
		c_circle.circleProgress({
			value: Math.floor( c_value ) / 100,
			size: Math.floor( c_size ),
			thickness: Math.floor( c_thickness ),
			emptyFill: c_empty,
			animation: {
				duration: Math.floor( c_duration )
			},
			lineCap: 'round',
			fill: {
				gradient: [c_scolor, c_ecolor]
			}
		});
	}

	
	function egoverns_fix_vc_full_width_row(){
		var $elements = $('*[data-vc-full-width="true"]');
		($).each($elements, function () {
			var $el = $(this);
			if( $el.parent(".vc_section").length ){
				var $vc_sec_parent = $el.parent(".vc_section");
				var $row_right = $vc_sec_parent.css('right');
				var $row_padding_right = $vc_sec_parent.css('padding-right');
				var $row_padding_left = $vc_sec_parent.css('padding-left');
				$el.css({'right':$row_right, 'padding-right':$row_padding_right, 'padding-left':$row_padding_left, 'left':''});
			}else{
				$el.css('right', $el.css('left')).css({'left':''});
			}
		});
	}
	
	function isotopeArrange() {
		$( ".grid-layout > .isotope" ).find( "audio, video" ).each(function( index ) {
			$( this )[0].play();
			$( this )[0].pause();
		});
	}
	
	function egovernsSetCustomHiddenElements( win_width, responsive_width ){
		if( win_width > responsive_width ){
			$(".header-inner").show();
			$(".mobile-header-inner, .mobile-topbar-wrap").hide();
		}else{
			$(".header-inner").hide();
			$(".mobile-header-inner, .mobile-topbar-wrap").show();
		}
	}
	
	function egovernsStickyHeaderAdjust(elem_pos, elem_width){
		var win_width = $(window).width();
		var compare_wdth;
		if( $('.egoverns-header .header-inner.hidden-md-land-down' ).length ){
			compare_wdth = 1024;    
		}else{
			compare_wdth = 991; 
		}
		if( win_width <= compare_wdth ){
			if( elem_pos == 'left' ){
				$('.sticky-header-space').css( 'left', '-'+ elem_width +'px' );
				$('body, .top-sliding-bar').css( 'padding-left', '0' );
			}else{
				$('.sticky-header-space').css( 'right', '-'+ elem_width +'px' );
				$('body, .top-sliding-bar').css( 'padding-right', '0' );
			}
		}else{
			if( elem_pos == 'left' ){
				$('.sticky-header-space').css( 'left', 0 );
				$('body, .top-sliding-bar').css( 'padding-left', elem_width +'px' );
			}else{
				$('.sticky-header-space').css( 'right', 0 );
				$('body, .top-sliding-bar').css( 'padding-right', elem_width +'px' );
			}	
		}	
	}

	function egovernsCenterMenuMargin(){
		//Center item margin fixing
		$.each([ 'topbar', 'logobar', 'navbar', 'mobile-header', 'footer-bottom' ], function( index, margin_key ) {
			
			var left_width = 0,
				right_width = 0,
				center_width = 0,
				margin_left = 0,
				parent_width = 0;

			if( $('.'+ margin_key +' .'+ margin_key +'-inner').length ){
			
				if( margin_key == 'mobile-header' )
					parent_width = $('.'+ margin_key +' .'+ margin_key +'-inner .container').width();
				else
					parent_width = $('.'+ margin_key +' .'+ margin_key +'-inner').width();
				
				if( $('.'+ margin_key +' .'+ margin_key +'-inner .'+ margin_key +'-items.pull-left').length ){
					left_width = $('.'+ margin_key +' .'+ margin_key +'-inner .'+ margin_key +'-items.pull-left').width();
				}
				if( $('.'+ margin_key +' .'+ margin_key +'-inner .'+ margin_key +'-items.pull-right').length ){
					right_width = $('.'+ margin_key +' .'+ margin_key +'-inner .'+ margin_key +'-items.pull-right').width();
				}
				if( $('.'+ margin_key +' .'+ margin_key +'-inner .'+ margin_key +'-items.pull-center').length ){
					center_width = $('.'+ margin_key +' .'+ margin_key +'-inner .'+ margin_key +'-items.pull-center').width();
				}
					
				if( left_width + center_width + right_width ){
				
					if( margin_key == 'mobile-header' ){
						parent_width -= ( left_width + center_width + right_width );
						margin_left = parent_width / 2; 
					}else{
						parent_width = ( parent_width / 2 ) - ( center_width / 2 );
						margin_left = Math.floor( parent_width - left_width );
					}
					
					if( !$( "body.rtl" ).length ){
						$('.'+ margin_key +' .'+ margin_key +'-inner .'+ margin_key +'-items.pull-center').css( 'margin-left', margin_left+'px' );
					}else{
						$('.'+ margin_key +' .'+ margin_key +'-inner .'+ margin_key +'-items.pull-center').css( 'margin-right', margin_left+'px' );
					}
					
					$('.'+ margin_key +' .'+ margin_key +'-inner .'+ margin_key +'-items.pull-center').addClass("show-opacity");
					
				}
			}
		});
	}
		
	function egovernsStickyPart( main_class ){

		var outer_class = '.sticky-outer';	
		var lastScrollTop = 0;
		var header_top = 0;

		var t_header_h = $(main_class + ' ' + outer_class).data( "height" );
		$(main_class + ' ' + outer_class).css( 'height', t_header_h );
		header_top = $(main_class + ' ' + outer_class).offset().top;
		header_top += t_header_h;

		$(window).scroll(function(event){
			
			var st = $(this).scrollTop();
			if( st > header_top ){
				$(main_class + ' .sticky-head').addClass('header-sticky');
			}else{
				$(main_class + ' .sticky-head').removeClass('header-sticky');
			}
			
			if( st == 0 ){
				$(main_class + ' .sticky-head').removeClass('header-sticky');
			}
			
			lastScrollTop = st;
		});	
	}
	
	function egovernsStickyScrollUpPart( main_class, sticky_div ){
		
		var outer_class = '.sticky-outer';	
		var out_height = '';
		var lastScrollTop = 0;
		var header_top = 0;
	
		$(main_class + ' ' + outer_class).css( 'height', $(main_class + ' ' + outer_class).data( "height" ) );
		out_height = '-' + $(main_class + ' ' + outer_class).outerHeight() + 'px';
		header_top = $(main_class + ' ' + outer_class).offset().top;
		sticky_div = $(sticky_div).height();
		
		$(window).scroll(function(event){

			var st = $(this).scrollTop();
			
			if( st < lastScrollTop && header_top < lastScrollTop ){
				// upscroll code
				$(main_class + ' .sticky-scroll').addClass('show-menu');
				$(main_class + ' .sticky-scroll.show-menu').css({'transform': 'translate3d(0px, 0px, 0px)'});
			}else{
				// downscroll code
				if( st < sticky_div ){
					$(main_class + ' .sticky-scroll').css({'transform': ''});
					$(main_class + ' .sticky-scroll.show-menu').removeClass('show-menu');
				}else{
					$(main_class + ' .sticky-scroll').css({'transform': 'translate3d(0px, '+ out_height +', 0px)'});
				}
			}
			
			if( st == 0 ){
				$(main_class + ' .sticky-scroll').css({'transform': ''});
				$(main_class + ' .sticky-scroll.show-menu').removeClass('show-menu');
			}
			
			lastScrollTop = st;
		});
		
	}
	
	function egovernsSetStickyOuterHeight(){
		$( ".sticky-outer" ).each(function() {

			var class_name = '';
			var sticky_parent = $( this ).parent( "div" );
			
			if( $( sticky_parent ).is('[class*=hidden-]') ){
				class_name = $( sticky_parent ).attr("class");
				var t_stat = '';
				if( $( sticky_parent ).hasClass( "mobile-header-inner" ) ){
					class_name = class_name.replace( "mobile-header-inner", "" );
					t_stat = 'm';
				}
				if( $( sticky_parent ).hasClass( "header-inner" ) ){
					class_name = class_name.replace( "header-inner", "" );
					t_stat = 'd';
				}
				$( sticky_parent ).attr("class", "");
				if( t_stat == 'm' ){
					$( sticky_parent ).attr("class", "mobile-header-inner");
				}
				if( t_stat == 'd' ){
					$( sticky_parent ).attr("class", "header-inner");
				}
			}
			
			$( this ).css({ 'position':'absolute', 'visibility':'hidden', 'display':'block', 'height':'auto' });
			$( this ).attr( "data-height", $( this ).outerHeight() );

			if( class_name != '' ){
				$( sticky_parent ).addClass(class_name);
			}
			
			$( this ).css({ 'position':'', 'visibility':'', 'display':'', 'height': $( this ).data( "height" ) });
			
		});
	}
	
	function egovernsAgon( canvas_ele ){
		var canvas = document.getElementById("canvas_agon");
		var cxt = canvas.getContext("2d");
		var agon_size = canvas_ele.attr( "data-size" );
		var agon_side = canvas_ele.attr( "data-side" );
		var agon_color = canvas_ele.attr( "data-color" );
		var div_val = 1;

		switch( parseInt( agon_side ) ){
			case 3:
				div_val = 6;
			break;
			case 4:
				div_val = 4;
			break;
			case 5:
				div_val = 3.3;
			break;
			case 6:
				div_val = 3;
			break;
			case 7:
				div_val = 2.8;
			break;
			case 8:
				div_val = 2.7;
			break;
			case 9:
				div_val = 2.6;
			break;
			case 10:
				div_val = 2.5;
			break;
		}

		// hexagon
		var numberOfSides = parseInt( agon_side ),
			size = parseInt( agon_size ),
			Xcenter = parseInt( agon_size ),
			Ycenter = parseInt( agon_size ),
			step  = 2 * Math.PI / numberOfSides,//Precalculate step value
			shift = (Math.PI / div_val);//(Math.PI / 180.0);// * 44;//Quick fix ;)

		cxt.beginPath();

		for (var i = 0; i <= numberOfSides;i++) {
			var curStep = i * step + shift;
		   cxt.lineTo (Xcenter + size * Math.cos(curStep), Ycenter + size * Math.sin(curStep));
		}

		/* Direct Output */
		cxt.fillStyle = agon_color;
		cxt.fill();
	}
	
	function egovernstesipagecallback(event){
		var current = event.item.index;
		$( event.target ).find(".owl-item.active").eq(0).addClass("current");
	}
	
	function egovernsOwlSettings(c_owlCarousel){
		
		var page_slide = false;
		var pagi_slide = false;
		if( c_owlCarousel.hasClass("egoverns-page-carousel") ){ page_slide = true; }
		if( c_owlCarousel.hasClass("egoverns-pagination-carousel") ){ pagi_slide = true; }
	
		// Data Properties
		var loop = c_owlCarousel.data( "loop" );
		var margin = c_owlCarousel.data( "margin" );
		var center = c_owlCarousel.data( "center" );
		var nav = c_owlCarousel.data( "nav" );
		var dots_ = c_owlCarousel.data( "dots" );
		var items = c_owlCarousel.data( "items" );
		var items_tab = c_owlCarousel.data( "items-tab" );
		var items_mob = c_owlCarousel.data( "items-mob" );
		var duration = c_owlCarousel.data( "duration" );
		var smartspeed = c_owlCarousel.data( "smartspeed" );
		var scrollby = c_owlCarousel.data( "scrollby" );
		var autoheight = c_owlCarousel.data( "autoheight" );
		var autoplay = c_owlCarousel.data( "autoplay" );
		var rtl = $( "body.rtl" ).length ? true : false;

		$( c_owlCarousel ).owlCarousel({
			rtl : rtl,
			loop	: loop,
			autoplayTimeout	: duration,
			smartSpeed	: smartspeed,
			center: center,
			margin	: margin,
			nav		: nav,
			dots	: dots_,
			autoplay	: autoplay,
			autoheight	: autoheight,
			slideBy		: scrollby,
			responsive:{
				0:{
					items: items_mob
				},
				544:{
					items: items_tab
				},
				992:{
					items: items
				}
			},
			onInitialized: pagi_slide ? egovernstesipagecallback : ''
		});	
		
		if( pagi_slide ){
			var cur_testi_slide = $( c_owlCarousel ).parent("div").children(".egoverns-page-carousel");
			var cur_pagination_slide = $( c_owlCarousel );
			$( c_owlCarousel ).on('click', '.owl-item', function(event) {
				var current = $(this).index();
				$(cur_testi_slide).trigger("to.owl.carousel", [current, 500]);
			});
			$( c_owlCarousel ).on('dragged.owl.carousel', function(event) {
				var current = event.item.index;
				$(cur_testi_slide).trigger("to.owl.carousel", [current, 500]);
				cur_pagination_slide.find(".owl-item.current").removeClass("current");
				cur_pagination_slide.find(".owl-item").eq(current).addClass("current");
			});
		}
		if( page_slide ){
			var cur_pagination_slide = $( c_owlCarousel ).parent("div").children(".egoverns-pagination-carousel");
			$( c_owlCarousel ).on('changed.owl.carousel', function(event) {
				var current = event.item.index;
				$(cur_pagination_slide).trigger("to.owl.carousel", [current, 500]);
				$(cur_pagination_slide).find(".owl-item.current").removeClass("current");
				$(cur_pagination_slide).find(".owl-item").eq(current).addClass("current");
			});			
		}
		
	}
	
	function convert_time(duration) {
		var a = duration.match(/\d+/g);
	
		if (duration.indexOf('M') >= 0 && duration.indexOf('H') == -1 && duration.indexOf('S') == -1) {
			a = [0, a[0], 0];
		}
	
		if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1) {
			a = [a[0], 0, a[1]];
		}
		if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1 && duration.indexOf('S') == -1) {
			a = [a[0], 0, 0];
		}
	
		duration = 0;
	
		if (a.length == 3) {
			duration = duration + parseInt(a[0]) * 3600;
			duration = duration + parseInt(a[1]) * 60;
			duration = duration + parseInt(a[2]);
		}
	
		if (a.length == 2) {
			duration = duration + parseInt(a[0]) * 60;
			duration = duration + parseInt(a[1]);
		}
	
		if (a.length == 1) {
			duration = duration + parseInt(a[0]);
		}
		var h = Math.floor(duration / 3600);
		var m = Math.floor(duration % 3600 / 60);
		var s = Math.floor(duration % 3600 % 60);
		return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
	}
	
	function egoverns_scroll_animation(){
		setTimeout( function() {
			var anim_time = 300;
			$('.egoverns-animate:not(.run-animate)').each( function() {
				
				var elem = $(this);
				var bottom_of_object = elem.offset().top;
				var bottom_of_window = $(window).scrollTop() + $(window).height();
				
				if( bottom_of_window > bottom_of_object ){
					setTimeout( function() {
						elem.addClass("run-animate");
					}, anim_time );
				}
				anim_time += 300;
				
			});
		}, 200 );
	}
	
	function initEgovernsGmap() {
		
		
		if( egoverns_ajax_var.gmap_stat == '0' ){
			return;
		}
		
		var map_styles = '{ "Aubergine" : [	{"elementType":"geometry","stylers":[{"color":"#1d2c4d"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#8ec3b9"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#1a3646"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"color":"#4b6878"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#64779e"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"color":"#4b6878"}]},{"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"color":"#334e87"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#023e58"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#283d6a"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#6f9ba5"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#023e58"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#3C7680"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#304a7d"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#98a5be"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#2c6675"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#255763"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#b0d5ce"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"color":"#023e58"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"color":"#98a5be"}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"transit.line","elementType":"geometry.fill","stylers":[{"color":"#283d6a"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#3a4762"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#0e1626"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#4e6d70"}]}], "Silver" : [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}], "Retro" : [{"elementType":"geometry","stylers":[{"color":"#ebe3cd"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#523735"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f1e6"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#c9b2a6"}]},{"featureType":"administrative.land_parcel","elementType":"geometry.stroke","stylers":[{"color":"#dcd2be"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#ae9e90"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#93817c"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#a5b076"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#447530"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#f5f1e6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#fdfcf8"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#f8c967"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#e9bc62"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#e98d58"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#db8555"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#806b63"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"transit.line","elementType":"labels.text.fill","stylers":[{"color":"#8f7d77"}]},{"featureType":"transit.line","elementType":"labels.text.stroke","stylers":[{"color":"#ebe3cd"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#b9d3c2"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#92998d"}]}], "Dark" : [{"elementType":"geometry","stylers":[{"color":"#212121"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#212121"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#757575"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"administrative.land_parcel","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#181818"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"poi.park","elementType":"labels.text.stroke","stylers":[{"color":"#1b1b1b"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#2c2c2c"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#8a8a8a"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#373737"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#3c3c3c"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#3d3d3d"}]}], "Night" : [{"elementType":"geometry","stylers":[{"color":"#242f3e"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#746855"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#242f3e"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#263c3f"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#6b9a76"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#38414e"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#212a37"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#9ca5b3"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#746855"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#1f2835"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#f3d19c"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#2f3948"}]},{"featureType":"transit.station","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#17263c"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#515c6d"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#17263c"}]}] }';
		
		var map_style_obj = JSON.parse(map_styles);
		
		var map_style_mode = [];
		var map_mode = '';
		var map_lang = '';
		var map_lat = '';
		var map_marker = '';
		var map_options = '';
		
		$( ".egovernsgmap" ).each(function( index ) {
			
			var gmap = this;

			if( $( gmap ).attr( "data-map-style" ) ){
				map_mode = $( gmap ).data("map-style");
				map_lang = $( gmap ).data("map-lang");
				map_lat = $( gmap ).data("map-lat");
				map_marker = $( gmap ).data("map-marker");
				if( map_mode === 'aubergine' )
					map_style_mode = map_style_obj.Aubergine;
				else if( map_mode === 'silver' )
					map_style_mode = map_style_obj.Silver;
				else if( map_mode === 'retro' )
					map_style_mode = map_style_obj.Retro;
				else if( map_mode === 'dark' )
					map_style_mode = map_style_obj.Dark;
				else if( map_mode === 'night' )
					map_style_mode = map_style_obj.Night;
				else if( map_mode === 'custom' ){
					var c_style = $( gmap ).attr( "data-custom-style" ) && $( gmap ).attr( "data-custom-style" ) != '' ? JSON.parse( $( gmap ).attr( "data-custom-style" ) ) : '[]';
					map_style_mode = c_style;
				}else{
					map_style_mode = "[]";
				}
			}
			
			if( $( gmap ).attr( "data-multi-map" ) && $( gmap ).attr( "data-multi-map" ) == 'true' ){
				
				var map_values = JSON.parse( $( gmap ).attr( "data-maps" ) );
				var map_wheel = $( gmap ).attr( "data-wheel" ) && $( gmap ).attr( "data-wheel" ) == 'true' ? true : false;
				var map_zoom = $( gmap ).attr( "data-zoom" ) && $( gmap ).attr( "data-zoom" ) != '' ? parseInt( $( gmap ).attr( "data-zoom" ) ) : 14;
				var map;

				var map_stat = 1;

				map_values.forEach( function( map_value ) {
					map_lat = map_value.map_latitude;
					map_lang = map_value.map_longitude;
					var LatLng = new google.maps.LatLng( map_lat, map_lang );
					var mapProp= {
						center: LatLng,
						scrollwheel: map_wheel,
						zoom: map_zoom,
						styles: map_style_mode
					};
					
					//Create Map
					if( map_stat ){
						var t_gmap = $( gmap );
						map = new google.maps.Map( t_gmap[0], mapProp );
						
						google.maps.event.addDomListener( window, 'resize', function() {
							var center = map.getCenter();
							google.maps.event.trigger( map, "resize" );
							map.setCenter( LatLng );
						});
						
						map_stat = 0;
					}
					
					//Map Marker
					var marker = new google.maps.Marker({
						position: LatLng,
						icon: map_value.map_marker,
						map: map
					});
					
					//Info Window
					if( map_value.map_info_opt == 'on' ) {
						var info_title = map_value.map_info_title;
						var info_addr = map_value.map_info_address;
						var contentString = '<div class="gmap-info-wrap"><h3>'+ info_title +'</h3><p>'+ info_addr +'</p></div>';
						var infowindow = new google.maps.InfoWindow({
						  content: contentString
						});
						marker.addListener( 'click', function() {
						  infowindow.open( map, marker );
						});
					}
				});
				
			}else{
			
				var LatLng = {lat: parseFloat(map_lat), lng: parseFloat(map_lang)};
				
				var map_wheel = $( gmap ).attr( "data-wheel" ) && $( gmap ).attr( "data-wheel" ) == 'true' ? true : false;
				var map_zoom = $( gmap ).attr( "data-zoom" ) && $( gmap ).attr( "data-zoom" ) != '' ? parseInt( $( gmap ).attr( "data-zoom" ) ) : 14;
				
				var mapProp= {
					center: LatLng,
					scrollwheel: map_wheel,
					zoom: map_zoom,
					styles: map_style_mode
				};
				var t_gmap = $( gmap );
				var map = new google.maps.Map( t_gmap[0], mapProp ); //document.getElementById("egovernsgmap")
				
				var marker = new google.maps.Marker({
				  position: LatLng,
				  icon: map_marker,
				  map: map
				});
				
				if( $( gmap ).attr( "data-info" ) == 1 ){
					var info_title = $( gmap ).attr( "data-info-title" ) ? $( gmap ).attr( "data-info-title" ) : '';
					var info_addr = $( gmap ).attr( "data-info-addr" ) ? $( gmap ).attr( "data-info-addr" ) : '';
					var contentString = '<div class="gmap-info-wrap"><h3>'+ info_title +'</h3><p>'+ info_addr +'</p></div>';
					var infowindow = new google.maps.InfoWindow({
					  content: contentString
					});
					marker.addListener( 'click', function() {
					  infowindow.open( map, marker );
					});
				}
				
				google.maps.event.addDomListener( window, 'resize', function() {
					var center = map.getCenter();
					google.maps.event.trigger(map, "resize");
					map.setCenter(LatLng);
				});
				
			}// data multi map false part end
			
		}); // end map each
		
	}

})( jQuery );