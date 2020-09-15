( function( $ ) {
	/**
 	 * @param $scope The Widget wrapper element as a jQuery element
	 * @param $ The jQuery alias
	 */ 
	 
	/* Typing Text Handler */
	var WidgetAnimateTextHandler = function( $scope, $ ) {
		$scope.find('.typing-text').each(function( index ) {
			egovernsAnimatedTextSettings( this, index );
		});
	};
	
	/* Isotope Handler */
	var WidgetIsotopeHandler = function( $scope, $ ) {
		$scope.find('.isotope').each(function() {
			egovernsIsotopeLayout( this );
		});
	};
	
	/* Owl Carousel Handler */
	var WidgetOwlCarouselHandler = function( $scope, $ ) {
		$scope.find('.owl-carousel').each(function() {
			egovernsOwlSettings( this );
		});		
	};
	
	/* Circle Progress Handler */
	var WidgetCircleProgressHandler = function( $scope, $ ) {
		if( $scope.find('.circle-progress-circle').length ){
			var circle_ele = $scope.find('.circle-progress-circle');
			egovernsCircleProgresSettings(circle_ele);
		}		
	};
	
	/* Counter Handler */
	var WidgetCounterUpHandler = function( $scope, $ ) {
		if( $scope.find('.counter-up').length ){
			var counter_ele = $scope.find('.counter-up');
			egovernsCounterUpSettings(counter_ele);
		}		
	};
	
	/* Day Counter Handler */
	var WidgetDayCounterHandler = function( $scope, $ ) {
		$scope.find('.day-counter').each(function() {
			egovernsDayCounterSettings( this );
		});		
	};
	
	/* Chart Handler */
	var WidgetChartHandler = function( $scope, $ ) {
		$scope.find('.pie-chart').each(function() {
			egovernsPieChartSettings( this );
		});		
		$scope.find('.line-chart').each(function() {
			egovernsLineChartSettings( this );
		});		
	};
	
	/* Chart Handler */
	var WidgetRoundTabHandler = function( $scope, $ ) {
		$scope.find('.round-tab-wrapper').each(function() {
			egovernsRoundTabSettings( this );
		});		
	};
	
	/* Modal Popup Handler */
	var WidgetModalPopupHandler = function( $scope, $ ) {
		if( $scope.find('.modal-popup-wrapper.page-load-modal').length ){
			var modal_id = $scope.find('.modal-popup-wrapper.page-load-modal .white-popup-block').attr("id");
			$.magnificPopup.open({
			items: {
					src: '#'+modal_id
				},
				type: 'inline'
			});
		}
	};

	/* Agon Handler */
	var WidgetAgonHandler = function( $scope, $ ) {
		if( $scope.find(".canvas_agon").length ){
			$scope.find( '.canvas_agon' ).each(function() {
				egovernsAgon( this );
			});
		}
	};
	
	/* Timeline Slider Handler */
	var WidgetTimelineSliderHandler = function( $scope, $ ) {
		if( $scope.find('.cd-horizontal-timeline').length ){
			//var cur_ele = $scope.find('.cd-horizontal-timeline');
			var line_dist = $scope.find('.cd-horizontal-timeline').data("distance") ? $scope.find('.cd-horizontal-timeline').data("distance") : 60;
			$scope.find('.cd-horizontal-timeline').zozotimeline({
				distance: line_dist
			});
		}
	};
	
	/* Recent/Popular Toggle Handler */
	var WidgetRecentPopularToggleHandler = function( $scope, $ ) {
		if( $scope.find(".egoverns-toggle-post-trigger").length ){
			$scope.find(".egoverns-toggle-post-trigger .switch-checkbox").change(function(){
				egovernsSwitchTabToggle( this );
			});
		}
	};
	
	/* Rain Drops and Parallax Handler */
	var SectionCustomOptionsHandler = function( $scope, $ ) {
		
		if ( $scope.is('section' ) ){
			if ( $scope.is('section[data-egoverns-float]' ) ){
				egovernsSectionFloatParallax( $scope );
			}
			if ( $scope.is('section[data-egoverns-raindrops]' ) ){
				egovernsSectionRainDrops( $scope );
			}
			if ( $scope.is('section[data-egoverns-parallax-data]' ) ){
				egovernsSectionParallax( $scope );
			}
		}
	};
	
	/* Content Slider Handler */
	var ColumnCustomOptionsHandler = function( $scope, $ ) {
		if ( $scope.is('.elementor-element.elementor-column' ) ){
			if ( $scope.is('.elementor-element.elementor-column[data-egoverns-slide]' ) ){
				egovernsContentSlider( $scope );
			}
		}
	};
	
	/* Popup Gallery Handler */
	var WidgetZoomGalleryHandler = function( $scope, $ ) {
		if( $scope.find(".popup-portfolio-gallery").length ){
			$scope.find('.popup-portfolio-gallery').each(function( index ) {
				egovernsPopupGallery( this );
			});
		}
	};
	
	/* Toggle Content Handler */
	var WidgetToggleContentHandler = function( $scope, $ ) {
		if( $scope.find(".toggle-content-wrapper").length ){
			$scope.find('.toggle-content-wrapper').each(function( index ) {
				egovernsToggleContent( this );
			});
		}
	};
	
	// Make sure you run this code under Elementor.
	$( window ).on( 'elementor/frontend/init', function() {
														
		elementorFrontend.hooks.addAction( 'frontend/element_ready/togglecontent.default', WidgetToggleContentHandler );
		elementorFrontend.hooks.addAction( 'frontend/element_ready/animtext.default', WidgetAnimateTextHandler );
		
		elementorFrontend.hooks.addAction( 'frontend/element_ready/egovernscircleprogress.default', WidgetCircleProgressHandler );
		elementorFrontend.hooks.addAction( 'frontend/element_ready/egovernscounter.default', WidgetCounterUpHandler );
		elementorFrontend.hooks.addAction( 'frontend/element_ready/egovernsdaycounter.default', WidgetDayCounterHandler );
		elementorFrontend.hooks.addAction( 'frontend/element_ready/egovernsimagegrid.default', WidgetOwlCarouselHandler );
		elementorFrontend.hooks.addAction( 'frontend/element_ready/egovernsmodalpopup.default', WidgetModalPopupHandler );
		elementorFrontend.hooks.addAction( 'frontend/element_ready/egovernstimeline.default', WidgetAgonHandler );
		elementorFrontend.hooks.addAction( 'frontend/element_ready/egovernstimelineslide.default', WidgetTimelineSliderHandler );
		elementorFrontend.hooks.addAction( 'frontend/element_ready/egovernschart.default', WidgetChartHandler );
		elementorFrontend.hooks.addAction( 'frontend/element_ready/roundtab.default', WidgetRoundTabHandler );
		
		elementorFrontend.hooks.addAction( 'frontend/element_ready/section', SectionCustomOptionsHandler );
		elementorFrontend.hooks.addAction( 'frontend/element_ready/column', ColumnCustomOptionsHandler );
		
		elementorFrontend.hooks.addAction( 'frontend/element_ready/egovernsblog.default', WidgetIsotopeHandler );
		elementorFrontend.hooks.addAction( 'frontend/element_ready/egovernsblog.default', WidgetOwlCarouselHandler );
		elementorFrontend.hooks.addAction( 'frontend/element_ready/egovernsrecentpopular.default', WidgetRecentPopularToggleHandler );
		elementorFrontend.hooks.addAction( 'frontend/element_ready/egovernsteam.default', WidgetOwlCarouselHandler );
		elementorFrontend.hooks.addAction( 'frontend/element_ready/egovernsevent.default', WidgetOwlCarouselHandler );
		elementorFrontend.hooks.addAction( 'frontend/element_ready/egovernsservice.default', WidgetOwlCarouselHandler );
		elementorFrontend.hooks.addAction( 'frontend/element_ready/egovernstestimonial.default', WidgetOwlCarouselHandler );
		elementorFrontend.hooks.addAction( 'frontend/element_ready/egovernsportfolio.default', WidgetIsotopeHandler );
		elementorFrontend.hooks.addAction( 'frontend/element_ready/egovernsportfolio.default', WidgetOwlCarouselHandler );
		elementorFrontend.hooks.addAction( 'frontend/element_ready/egovernsportfolio.default', WidgetZoomGalleryHandler );
		
		// For a widget without a skin (skin = default)
		elementorFrontend.hooks.addAction( 'frontend/element_ready/egovernsproducts.default', function( $scope ) {
			console.log("egoverns products ready");
			
			setTimeout(function(){
				var iframe = $("#elementor-preview-iframe");
				$(iframe).attr("src", $(iframe).attr("src"));
			}, 3000);

			//if ( $scope.find( 'a' ) ){
				//$scope.find( 'a' ).lightbox();
			//}
		} );
		
	} );
	
	$( window ).on( 'load', function() {
		if( $(".page-loader").length ){
			$(".page-loader").fadeOut("slow");
		}else if( $("body.opacity-zero").length ){
			$("body").removeClass("opacity-zero");
			$("body").addClass("opacity-one");
		}
		
	} );
	
	function egoverns_scroll_animation( c_elem ){
		setTimeout( function() {
			var anim_time = 300;
			$(c_elem).find('.egoverns-animate:not(.run-animate)').each( function() {
				
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
		}, 300 );
	}

	function egovernszozotimeline( cur_ele ){
		var cur_ele = $(cur_ele);
		var line_dist = cur_ele.data("distance") ? cur_ele.data("distance") : 60;
		cur_ele.zozotimeline({
			distance: line_dist
		});
	}
	
	function egovernsToggleContent( toggle_ele ){
		var toggle_ele = $(toggle_ele).find(".toggle-content");	
		var org_hgt = $(toggle_ele).height();
		var toggle_hgt = $(toggle_ele).data("height");
		$(toggle_ele).css('max-height', toggle_hgt);
		$(toggle_ele).addClass("toggle-content-shown");
		var btn_txt_wrap = $(toggle_ele).parents(".toggle-content-inner").find( ".toggle-btn-txt" );
		var btn_org_txt = $(btn_txt_wrap).text();
		var btn_atl_txt = $(toggle_ele).parents(".toggle-content-inner").find( ".toggle-content-trigger" ).data("less");
		$(toggle_ele).parents(".toggle-content-inner").find( ".toggle-content-trigger" ).on( "click", function(e){
			
			event.preventDefault();
			$(toggle_ele).toggleClass("height-expandable");
			if( $(toggle_ele).hasClass("height-expandable") ){
				$(toggle_ele).css('max-height', org_hgt);
				$(btn_txt_wrap).text(btn_atl_txt);
			}else{
				$(toggle_ele).css('max-height', toggle_hgt);
				$(btn_txt_wrap).text(btn_org_txt);
			}
			
		});
	}
	
	function egovernsPopupGallery( popup_ele ){
		var popup_ele = $(popup_ele);	
		popup_ele.magnificPopup({
			delegate: 'a.popup-img',
			type: 'image',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1]
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function(item) {
					return item.el.attr('title');
				}
			}
		});
	}
	
	function egovernsRoundTabSettings( tab_ele ){
		var tab_ele = $(tab_ele);
		tab_ele.find( ".round-tab-head" ).on( 'click', function() {
			$(this).parents(".round-tab-wrapper").children(".round-tab-item").removeClass("active");
			$(this).parent(".round-tab-item").addClass("active");
		});
	}
	
	function egovernsSectionRainDrops( rd_ele ){
		rd_ele.addClass("section-raindrops-actived");
		var rd_json = JSON.parse(decodeURIComponent(rd_ele.attr("data-egoverns-raindrops")));
		rd_ele.append('<div class="egoverns-raindrops-wrap"></div>');
		
		var rd_color = rd_json.rd_color;
		var rd_height = rd_json.rd_height;
		var rd_speed = rd_json.rd_speed;
		var rd_freq = rd_json.rd_freq;
		var rd_density = rd_json.rd_density;
		var rd_id = rd_json.id;
		var rd_pos = rd_json.rd_pos;
		
		if( rd_pos == "top" ){
			rd_ele.find(".egoverns-raindrops-wrap").css({"top" : "-"+ rd_height +"px"});
		}else{
			rd_ele.find(".egoverns-raindrops-wrap").css({"bottom" : "0"});
		}
		
		rd_ele.find(".egoverns-raindrops-wrap").css("height", rd_height + "px");
		
		var rain_ele = rd_ele.find(".egoverns-raindrops-wrap").raindrops({
			color: rd_color,
			canvasHeight: rd_height,
			rippleSpeed: rd_speed,
			frequency: rd_freq,
			density: rd_density,
			positionBottom: '0'
		});
	}
	
	function egovernsContentSlider( slide_ele ){
		var slide_ele = $(slide_ele);
		var slide_json = JSON.parse(decodeURIComponent(slide_ele.attr("data-egoverns-slide")));
		console.log(slide_json);
		var children_ele = slide_ele.children(".elementor-column-wrap").children(".elementor-widget-wrap");
		$(children_ele).addClass("owl-carousel");
		egovernsOwlJsonSettings(children_ele, slide_json);
	}
	
	function egovernsSectionParallax( pr_ele ){
		
		var pr_ele = $(pr_ele);
		var pr_json = JSON.parse(decodeURIComponent(pr_ele.attr("data-egoverns-parallax-data")));
		
		var parallax_ratio = pr_json.parallax_ratio;
		var parallax_img = pr_json.parallax_image;

		pr_ele.prepend('<div class="egoverns-parallax" data-egoverns-parallax data-speed="'+ parallax_ratio +'" style="background-image:url('+ parallax_img +')"></div>');
		
		// create variables
		var $fwindow = $(window);
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		// on window scroll event
		$fwindow.on('scroll resize', function() {
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		}); 

		// for each of background parallax element
		$(pr_ele).find('.egoverns-parallax').each(function(){
			var $backgroundObj = $(this);
			var bgOffset = parseInt($backgroundObj.offset().top);
			var yPos;
			var coords;
			var speed = ($backgroundObj.data('speed') || 0 );

			$fwindow.on('scroll resize', function() {
				yPos = - ((scrollTop - bgOffset) / speed); 
				coords = '10% '+ yPos + 'px';

				$backgroundObj.css({ backgroundPosition: coords });
			}); 
		}); 

		// triggers winodw scroll for refresh
		$fwindow.trigger('scroll');
		
	}
	
	function egovernsSectionFloatParallax( pr_ele ){
		
		var pr_ele = $(pr_ele);
		var pr_json = JSON.parse(decodeURIComponent(pr_ele.attr("data-egoverns-float")));
		var fload_id = 1;

		$.each( pr_json, function(idx, obj) {
			
			var float_title = obj.float_title;
			var float_img = obj.float_img;
			var float_left = obj.float_left;
			var float_top = obj.float_top;
			var float_distance = obj.float_distance;
			var float_animation = obj.float_animation;
			var float_mouse = obj.float_mouse;
			var float_width = obj.float_width;
			
			var classname = float_animation != '0' ? ' floating-animate-model-' + float_animation : '';
			
			pr_ele.prepend('<div id="float-parallax-'+ fload_id +'" class="float-parallax'+  classname  +'" data-mouse="'+  float_mouse  +'" data-left="'+  float_left  +'" data-top="'+  float_top  +'" data-distance="'+  float_distance  +'"><img alt="'+  float_title  +'" src="'+ float_img  +'" /></div>');

			$("#float-parallax-"+fload_id).egovernsparallax({
				t_top: float_top,
				t_left: float_left,
				x_level: float_distance,
				mouse_animation: float_mouse,
				ele_width: float_width
			});

			fload_id++;
		}); // each end
		
	}
		
	function egovernsSwitchTabToggle( toggle_ele ){
		if( toggle_ele.checked ) {
			var toggle_ele = $(toggle_ele);
            toggle_ele.parents(".egoverns-toggle-post-wrap").addClass("egoverns-active-post");
        }else{
			var toggle_ele = $(toggle_ele);
			toggle_ele.parents(".egoverns-toggle-post-wrap").removeClass("egoverns-active-post");
		}
	}
		
	function egovernsAgon( canvas_ele ){
		var canvas_ele = $(canvas_ele);
		var canvas = canvas_ele[0];
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
	
	function egovernsCounterUpSettings( counterup ){
		counterup.appear(function() {
			var $this = $(this),
			countTo = $this.attr( "data-count" ),
			duration = $this.attr( "data-duration" );
			$({ countNum: $this.text()}).animate({
					countNum: countTo
				},
				{
				duration: parseInt( duration ),
				easing: 'swing',
				step: function() {
					$this.text( Math.floor( this.countNum ) );
				},
				complete: function() {
					$this.text( this.countNum );
				}
			});  
		});
	}
	
	function egovernsDayCounterSettings( day_counter ){
		var day_counter = $( day_counter );
		var c_date = day_counter.attr('data-date');
		day_counter.countdown( c_date, function(event) {
			if( day_counter.find('.counter-day').length ){
				day_counter.find('.counter-day h3').text( event.strftime('%D') );
			}
			if( day_counter.find('.counter-hour').length ){
				day_counter.find('.counter-hour h3').text( event.strftime('%H') );
			}
			if( day_counter.find('.counter-min').length ){
				day_counter.find('.counter-min h3').text( event.strftime('%M') );
			}
			if( day_counter.find('.counter-sec').length ){
				day_counter.find('.counter-sec h3').text( event.strftime('%S') );
			}
			if( day_counter.find('.counter-week').length ){
				day_counter.find('.counter-week h3').text( event.strftime('%w') );
			}
		});
	}
	
	function egovernsPieChartSettings( chart_ele ){
		var chart_ele = $( chart_ele );
		var c_chart = $('#' + chart_ele.attr("id") );
		var chart_labels = c_chart.attr("data-labels");
		var chart_values = c_chart.attr("data-values");
		var chart_bgs = c_chart.attr("data-backgrounds");
		var chart_responsive = c_chart.attr("data-responsive");
		var chart_legend = c_chart.attr("data-legend-position");
		var chart_type = c_chart.attr("data-type");
		var chart_zorobegining = c_chart.attr("data-yaxes-zorobegining");
		
		chart_labels = chart_labels ? chart_labels.split(",") : [];
		chart_values = chart_values ? chart_values.split(",") : [];
		chart_bgs = chart_bgs ? chart_bgs.split(",") : [];
		chart_responsive = chart_responsive ? chart_responsive : 1;
		chart_legend = chart_legend ? chart_legend : 'none';
		chart_type = chart_type ? chart_type : 'doughnut';
		
		if( chart_zorobegining ){
			chart_zorobegining = {
				yAxes: [{
					ticks: {
						beginAtZero: parseInt( chart_zorobegining )
					}
				}]
			}
		}
		
		var ctx = c_chart[0].getContext('2d');
		var myChart = new Chart(ctx, {
			type: chart_type,
			data: {
				labels: chart_labels,
				datasets: [{
					label: '# of Votes',
					data: chart_values,
					backgroundColor: chart_bgs,
					borderWidth: 1
				}]
			},
			options: {
				scales: chart_zorobegining,
				responsive: parseInt( chart_responsive ),
				legend: {
					position: chart_legend,
				}
			}
		});
	}
	
	function egovernsLineChartSettings( chart_ele ){
		var chart_ele = $( chart_ele );
		var c_chart = $('#' + chart_ele.attr("id") );
		var chart_labels = c_chart.attr("data-labels");
		var chart_values = c_chart.attr("data-values");
		var chart_bg = c_chart.attr("data-background");
		var chart_border = c_chart.attr("data-border");
		var chart_fill = c_chart.attr("data-fill");
		var chart_zorobegining = c_chart.attr("data-yaxes-zorobegining");
		var chart_title = c_chart.attr("data-title-display");
		var chart_responsive = c_chart.attr("data-responsive");
		var chart_legend = c_chart.attr("data-legend-position");
		
		chart_labels = chart_labels ? chart_labels.split(",") : [];
		chart_values = chart_values ? chart_values.split(",") : [];
		chart_bg = chart_bg ? chart_bg : '';
		chart_border = chart_border ? chart_border : '';
		chart_fill = chart_fill ? chart_fill : 0;
		
		chart_zorobegining = chart_zorobegining ? chart_zorobegining : 1;
		chart_title = chart_title ? chart_title : 1;
		chart_responsive = chart_responsive ? chart_responsive : 1;
		chart_legend = chart_legend ? chart_legend : 'none';
		
		var ctx = c_chart[0].getContext('2d');
		var myChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: chart_labels,
				datasets: [{
					label: '# of Votes',
					data: chart_values,
					fill: parseInt( chart_fill ),
					backgroundColor: chart_bg,
					borderColor: chart_border,
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: parseInt( chart_zorobegining )
						}
					}]
				},
				responsive: parseInt( chart_responsive ),
				legend: {
					position: chart_legend,
				},
				title: {
					display: parseInt( chart_title ),
				}
			}
		});
	}
	
	function egovernsAnimatedTextSettings( cur_ele, index ){
		var cur_ele = $(cur_ele);
		var typing_text = cur_ele.attr("data-typing") ? cur_ele.attr("data-typing") : [];
		if( typing_text ){
			typing_text = typing_text.split(",");
			
			var type_speed = cur_ele.data("typespeed") ? cur_ele.data("typespeed") : 100;
			var back_speed = cur_ele.data("backspeed") ? cur_ele.data("backspeed") : 100;
			var back_delay = cur_ele.data("backdelay") ? cur_ele.data("backdelay") : 1000;
			var start_delay = cur_ele.data("startdelay") ? cur_ele.data("startdelay") : 1000;
			var cur_char = cur_ele.data("char") ? cur_ele.data("char") : '|';
			var loop = cur_ele.data("loop") ? cur_ele.data("loop") : false;

			var typed = new Typed(cur_ele[index], {
				typeSpeed: type_speed,
				backSpeed: back_speed,
				backDelay: back_delay,
				startDelay: start_delay,
				strings: typing_text,
				loop: loop,
				cursorChar: cur_char
			});

		}
	}
	
	function egovernsCircleProgresSettings( circle_ele ){
		circle_ele.appear(function() {						  
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
	
	function egovernsIsotopeLayout( c_elem ){
		var c_elem = $(c_elem);
		var parent_width = c_elem.width();
		var gutter_size = c_elem.data( "gutter" );
		var grid_cols = c_elem.data( "cols" );
		var filter = '';

		var layoutmode = c_elem.is('[data-layout]') ? c_elem.data( "layout" ) : '';
		var lazyload = c_elem.is('[data-lazyload]') ? c_elem.data( "lazyload" ) : '';
		layoutmode = layoutmode ? layoutmode : 'masonry';
		lazyload = lazyload ? '0s' : '0.4s';
		
		if( $(window).width() < 768 ) grid_cols = 1;
		
		var net_width = Math.floor( ( parent_width - ( gutter_size * ( grid_cols - 1 ) ) ) / grid_cols );
		c_elem.find( ".isotope-item" ).css({'width':net_width+'px', 'margin-bottom':gutter_size+'px'});
		
		var cur_isotope;
		
		
		/* Call isotope after image loaded */
		c_elem.imagesLoaded( function(){
			cur_isotope = c_elem.isotope({
				itemSelector: '.isotope-item',
				layoutMode: layoutmode,
				filter: filter,
				transitionDuration: lazyload,
				masonry: {
					gutter: gutter_size
				},
				fitRows: {
				  gutter: gutter_size
				}
			});
		});

		/* Isotope filter item */
		$(c_elem).prev(".isotope-filter").find( ".isotope-filter-item" ).on( 'click', function() {
			$( this ).parents("ul.nav").find("li").removeClass("active");
			$( this ).parent("li").addClass("active");
			filter = $( this ).attr( "data-filter" );
			if( c_elem.find( ".isotope-item" + filter ).hasClass( "egoverns-animate" ) ){
				if( filter ){
					c_elem.find( ".isotope-item" + filter ).removeClass("run-animate");
				}else{
					c_elem.find( ".isotope-item" ).removeClass("run-animate");
				}
				egoverns_scroll_animation(c_elem);
			}
			cur_isotope.isotope({ 
				filter: filter
			});
			
			return false;
		});
		
		//Animate isotope items
		if( c_elem.find( ".isotope-item" ).hasClass( "egoverns-animate" ) ){
			egoverns_scroll_animation(c_elem);
			$(window).on('scroll', function(){
				egoverns_scroll_animation(c_elem);
			});
		}
		
		/* Isotope infinite */
		if( c_elem.data( "infinite" ) == 1 && $("ul.post-pagination").length ){
		
			var loadmsg = c_elem.data( "loadmsg" );
			var loadend = c_elem.data( "loadend" );
			var loadimg = c_elem.data( "loadimg" );
			
			c_elem.infinitescroll({
				navSelector  : '.post-pagination',//'#page_nav',    // selector for the paged navigation 
				nextSelector : 'a.next-page',//'#page_nav a',  // selector for the NEXT link (to page 2)
				itemSelector : '.isotope-item',     // selector for all items you'll retrieve
				loading: {
					msgText : loadmsg,
					finishedMsg: loadend,
					img: loadimg //'https://cdn.dribbble.com/users/968568/screenshots/3339151/loader.gif'
				}
			},
			// call Isotope as a callback
			function( newElements ) {
				var elems = $(newElements);
				var net_width = Math.floor( ( parent_width - ( gutter_size * ( grid_cols - 1 ) ) ) / grid_cols );
				c_elem.find( ".isotope-item" ).css({'width':net_width+'px', 'margin-bottom':gutter_size+'px'});
				elems.imagesLoaded( function(){
					c_elem.isotope( 'appended', elems );
				});
				
				//Animate isotope items
				if( c_elem.find( ".isotope-item" ).hasClass( "egoverns-animate" ) ){
					egoverns_scroll_animation(c_elem);
				}
			});
		}

		/* Isotope resize */
		$( window ).resize(function() {
			setTimeout(function(){ 
				grid_cols = c_elem.data( "cols" );
				if( $(window).width() < 768 ) grid_cols = 1;
				
				var parent_width = c_elem.width();
				net_width = Math.floor( ( parent_width - ( gutter_size * ( grid_cols - 1 ) ) ) / grid_cols );
				c_elem.find( ".isotope-item" ).css({'width':net_width+'px'});
				c_elem.imagesLoaded( function(){
					var $isot = c_elem.isotope({
						itemSelector: '.isotope-item',
						masonry: {
							gutter: gutter_size
						}
					});
				});
				
			}, 200);			
		});

	}

	function egovernsOwlSettings(c_owlCarousel){
		var c_owlCarousel = $(c_owlCarousel);
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
			}
		});	
	}
	
	function egovernsOwlJsonSettings(c_owlCarousel, data_json){
		var c_owlCarousel = $(c_owlCarousel);
		// Data Properties
		var loop = data_json.loop == '1' ? true : false;
		var margin = parseInt( data_json.margin );
		var center = data_json.center == '1' ? true : false;
		var nav = data_json.navigation == '1' ? true : false;
		var dots_ = data_json.pagination == '1' ? true : false;
		var items = parseInt( data_json.items );
		var items_tab = parseInt( data_json.tab_items );
		var items_mob = parseInt( data_json.mobile_items );
		var duration = parseInt( data_json.duration );
		var smartspeed = parseInt( data_json.smart_speed );
		var scrollby = parseInt( data_json.scrollby );
		var autoheight = data_json.auto_height == '1' ? true : false;
		var autoplay = data_json.autoplay == '1' ? true : false;
		var rtl = $( "body.rtl" ).length ? true : false;
		
		console.log(duration);
		//return;

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
			}
		});	
	}
	
	jQuery.fn.redraw = function() {
		return this.hide(0, function() {
			$(this).show();
		});
	};
	
} )( jQuery );

