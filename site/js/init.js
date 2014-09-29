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
		

		//Define images . Do not include folder only image names
		var sources = {
			disc1: 'square.png',
			disc2: 'square2.png'
		};
		//Load above images
		loadImages(sources, initStage);

		//load array of images on page load    
		function loadImages(sources, callback) {
			var assetDir = 'images/';
			var images = {};
			var loadedImages = 0;
			var numImages = 0;

			// Load all images from folder in loop
			for (var src in sources) {
				numImages++;
			}
			for (var src in sources) {
				images[src] = new Image();
				images[src].onload = function() {
					if (++loadedImages >= numImages) {
						callback(images);
					}
				};
				images[src].src = assetDir + sources[src];
			}
		}

		// Create stage   
		function initStage(images) {
			var stage = new Kinetic.Stage({
				container: 'discarea',
				width: 1000,
				height: 500
			});

			// Define properties of the Disc
			var disc1 = new Kinetic.Image({
				image: images.disc1,
				x: 0, //horizontal axis of disc1
				y: 0, //vertical axis of disc1
				width: 400,
				height: 400
			});
			var disc2 = new Kinetic.Image({
				image: images.disc2,
				x: 0, //horizontal axis of disc2
				y: 0, //vertical axis of disc2
				width: 400,
				height: 400
			});

			// Create layer object    
			var layer = new Kinetic.Layer();
			layer.add(disc1);
			layer.add(disc2);
			stage.add(layer);

			var factor = 500,
				timeFactor = 750,
				yFactor = 1100,
				opacityFactor = 100,
				xFactor = 300,
				centerX = 50,
				currentShape = 1,
				previousShape;

			var anim = new Kinetic.Animation(function(frame) {
				if (currentShape == 1) {
					disc1.setX(xFactor * Math.sin(frame.time / factor) + centerX);
					disc1.setY(Math.sin(frame.time / yFactor) * factor);
					disc1.setOpacity(opacityFactor / frame.time);
					if (frame.time > timeFactor) {
						disc1.destroy();
						previousShape = currentShape;
						currentShape = 99;
					}
				} else if (currentShape == 2) {
					disc2.setX(xFactor * Math.sin(frame.time / factor) + centerX);
					disc2.setY(Math.sin(frame.time / yFactor) * factor);
					disc2.setOpacity(opacityFactor / frame.time);
					if (frame.time > timeFactor) {
						disc2.destroy();
						previousShape = currentShape;
						currentShape = 99;
					}
				} else {
					if (frame.time > timeFactor * 2) {
						frame.time = 0;
						currentShape = previousShape + 1;
					}
				}
				
			}, layer);

			setTimeout( function () {
				anim.start();
			}, 1000);
		};






		var	$window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$banner = $('#banner');

		// Forms (IE<10).
			var $form = $('form');
			if ($form.length > 0) {
				
				$form.find('.form-button-submit')
					.on('click', function() {
						$(this).parents('form').submit();
						return false;
					});
		
				if (skel.vars.IEVersion < 10) {
					$.fn.n33_formerize=function(){var _fakes=new Array(),_form = $(this);_form.find('input[type=text],textarea').each(function() { var e = $(this); if (e.val() == '' || e.val() == e.attr('placeholder')) { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).blur(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).focus(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); _form.find('input[type=password]').each(function() { var e = $(this); var x = $($('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text')); if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield'); if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield'); x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e); if (e.val() == '') e.hide(); else x.hide(); e.blur(function(event) { event.preventDefault(); var e = $(this); var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } }); x.focus(function(event) { event.preventDefault(); var x = $(this); var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']'); x.hide(); e.show().focus(); }); x.keypress(function(event) { event.preventDefault(); x.val(''); }); });  _form.submit(function() { $(this).find('input[type=text],input[type=password],textarea').each(function(event) { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', ''); if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); }).bind("reset", function(event) { event.preventDefault(); $(this).find('select').val($('option:first').val()); $(this).find('input,textarea').each(function() { var e = $(this); var x; e.removeClass('formerize-placeholder'); switch (this.type) { case 'submit': case 'reset': break; case 'password': e.val(e.attr('defaultValue')); x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } else { e.show(); x.hide(); } break; case 'checkbox': case 'radio': e.attr('checked', e.attr('defaultValue')); break; case 'text': case 'textarea': e.val(e.attr('defaultValue')); if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } break; default: e.val(e.attr('defaultValue')); break; } }); window.setTimeout(function() { for (x in _fakes) _fakes[x].trigger('formerize_sync'); }, 10); }); return _form; };
					$form.n33_formerize();
				}

			}
		
		// Dropdowns.
			$('#nav > ul').dropotron({
				alignment: 'right'
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