"use strict";

/*
	Alpha by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.init({
		reset: 'full',
		breakpoints: {
			global:		{ range: '*', href: 'css/style.css', containers: '60em', grid: { gutters: { vertical: '2em', horizontal: 0 } } },
			wide:		{ range: '-1680', href: 'css/style-wide.css' },
			normal:		{ range: '-1280', href: 'css/style-normal.css', grid: { gutters: { vertical: '1.5em' } }, viewport: { scalable: false } },
			narrow:		{ range: '-980', href: 'css/style-narrow.css', containers: '90%' },
			narrower:	{ range: '-840', href: 'css/style-narrower.css', grid: { collapse: 1 } },
			mobile:		{ range: '-736', href: 'css/style-mobile.css', containers: '100%', grid: { gutters: { vertical: '1em' } } },
			mobilep:	{ range: '-480', href: 'css/style-mobilep.css', grid: { collapse: 2 } }
		},
		plugins: {
			layers: {
			
				// Config.
					config: {
						transformTest: function() { return skel.vars.isMobile; }
					},
				
				// Navigation Panel.
					navPanel: {
						animation: 'pushX',
						breakpoints: 'narrower',
						clickToClose: true,
						height: '100%',
						hidden: true,
						html: '<div data-action="navList" data-args="nav"></div>',
						orientation: 'vertical',
						position: 'top-left',
						side: 'left',
						width: 250
					},

				// Navigation Button.
					navButton: {
						breakpoints: 'narrower',
						height: '4em',
						html: '<span class="toggle" data-action="toggleLayer" data-args="navPanel"></span>',
						position: 'top-left',
						side: 'top',
						width: '6em'
					}

			}
		}
	});

	$(function() {
		var	$window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$banner = $('#banner');
		
		$("#signup, #signupButton").click(function(e){
			$("html, body").animate({ scrollTop: $('#cta').offset().top - 35 }, 1000);
		});

		$("#learnmore").click(function(e){
			$("html, body").animate({ scrollTop: $('#main').offset().top }, 1000);
		});

		$("#home").click(function(e){
			$("html, body").animate({ scrollTop: 0 }, 1000);
		});

		// Header.
		// If the header is using "alt" styling and #banner is present, use scrollwatch
		// to revert it back to normal styling once the user scrolls past the banner.
		// Note: This is disabled on mobile devices.
		if (!skel.vars.isMobile
		&&	$header.hasClass('alt')
		&&	$banner.length > 0) {
			$window.on('load', function() {

				$banner.scrollwatch({
					delay:		0,
					range:		0.5,
					anchor:		'top',
					on:			function() { $header.addClass('alt reveal'); },
					off:		function() { $header.removeClass('alt'); }
				});
			});	
		}
	});

})(jQuery);