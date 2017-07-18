// JavaScript Document
(function($) {
	"use strict";

	/* Hero carousel
	/* --------------------------------------------------- */
	$('.hero-carousel').owlCarousel({
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
		items: 1,
		smartSpeed: 450,
		autoplay: false,
		autoplayTimeout: 3000,
		loop: true,
		autoHeight: true,
		nav: false
	});

	/* Responsive Navigation
	/* --------------------------------------------------- */
	$(".site-header-nav-link > ul").clone(false).find("ul, li").removeAttr("id").remove(".sub-menu").appendTo($(".site-header-rwd-bottom .rwd-nav-link"));
	$(".site-header-nav-primary > ul").clone(false).find("ul,li").removeAttr("id").remove(".sub-menu").appendTo($(".rwd-navigation .mobile-nav"));
	$(".mobile-nav").on('show.bs.collapse', function(){
		$("body").on( 'click', function() {
			$(".mobile-nav").collapse("hide");
		});
	});


	/* Google-map configuration
	/* --------------------------------------------------- */
	$(window).on('load', function() {
		//google map load
        $('#map-canvas-one').gmap({
            'center': '37.840765, -122.251089',
            'zoom': 15,
            scrollwheel: false,
            'disableDefaultUI': false,
            'styles': [{
                stylers: [{
                    lightness: 7
                }, {
                    saturation: -300
                }]
            }],
            'callback': function() {
                var self = this;
                self.addMarker({
                        'position': this.get('map').getCenter(),
                        icon: 'assets/images/office-building.png',
                    });
            }
        });

        $('#map-canvas-two').gmap({
            'center': '37.891159, -122.287047',
            'zoom': 15,
            scrollwheel: false,
            'disableDefaultUI': false,
            'styles': [{
                stylers: [{
                    lightness: 7
                }, {
                    saturation: -300
                }]
            }],
            'callback': function() {
                var self = this;
                self.addMarker({
                        'position': this.get('map').getCenter(),
                        icon: 'assets/images/office-building.png',
                    });
            }
        });
	});
})(jQuery);