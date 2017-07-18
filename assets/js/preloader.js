(function($) {
	"use strict";

	// preloader
	$(window).load(function() { // makes sure the whole site is loaded
		$("#status").delay(350).fadeOut(); // makes sure the whole site is loaded
		$("#preloader").delay(450).fadeOut("slow"); // will fadeout the white DIV that covers the website

	});
})(jQuery);