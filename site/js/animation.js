"use strict";

//Define images . Do not include folder only image names
var sources = {
	disc1: 'square.png',
	disc2: 'square2.png',
	disc3: 'square.png',
	heart: 'heart.png',
	redx: 'redx.png'
};
//Load above images
loadImages(sources, initStage);

//load array of images on page load    
function loadImages(sources, callback) {
	var assetDir = 'images/',
		images = {},
		loadedImages = 0,
		numImages = 0,
		src;

	// Load all images from folder in loop
	for (src in sources) {
		numImages++;
	}
	for (src in sources) {
		images[src] = new Image();
		images[src].onload = function () {
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
			width: 2000,
			height: 1000
		}),

		disc1 = new Kinetic.Image({
			image: images.disc1,
			x: 300, //horizontal axis of disc1
			y: 0, //vertical axis of disc1
			width: 400,
			height: 400
		}),

		disc2 = new Kinetic.Image({
			image: images.disc2,
			x: 300, //horizontal axis of disc2
			y: 0, //vertical axis of disc2
			width: 400,
			height: 400
		}),

		disc3 = new Kinetic.Image({
			image: images.disc3,
			x: 300, //horizontal axis of disc2
			y: 0, //vertical axis of disc2
			width: 400,
			height: 400
		}),

		heart = new Kinetic.Image({
			image: images.heart,
			x: 600, //horizontal axis of disc2
			y: 450, //vertical axis of disc2
			width: 100,
			height: 100
		}),

		redx = new Kinetic.Image({
			image: images.redx,
			x: 305, //horizontal axis of disc2
			y: 450, //vertical axis of disc2
			width: 100,
			height: 100
		}),

		layer = new Kinetic.Layer(),
		factor = 500,
		timeFactor = 730,
		yFactor = 1100,
		opacityFactor = 100,
		xFactor = 300,
		centerX = 300,
		currentShape = 1,
		ySlow = 0.25,
		previousShape,
		anim;

	layer.add(disc3);
	layer.add(disc2);
	layer.add(disc1);

	layer.add(heart);
	layer.add(redx);
	stage.add(layer);

	anim = new Kinetic.Animation(function (frame) {
		if (currentShape == 1) {
			disc1.setX(xFactor * Math.sin(frame.time / factor) + centerX);
			disc1.setY(Math.sin(frame.time / yFactor) * factor * ySlow);
			disc1.setOpacity(opacityFactor / frame.time);
			heart.setOpacity(opacityFactor / frame.time);
			if (frame.time > timeFactor) {
				disc1.destroy();
				heart.setOpacity(1);
				previousShape = currentShape;
				currentShape = 99;
			}
		} else if (currentShape == 2) {
			disc2.setX(xFactor * Math.sin(frame.time / factor) + centerX);
			disc2.setY(Math.sin(frame.time / yFactor) * factor * ySlow);
			disc2.setOpacity(opacityFactor / frame.time);
			heart.setOpacity(opacityFactor / frame.time);
			if (frame.time > timeFactor) {
				disc2.destroy();
				heart.setOpacity(1);
				previousShape = currentShape;
				currentShape = 99;
			}
		} else if (currentShape == 3) {
			disc3.setX(centerX - xFactor * Math.sin(frame.time / factor));
			disc3.setY(Math.sin(frame.time / yFactor) * factor * ySlow);
			disc3.setOpacity(opacityFactor / frame.time);
			redx.setOpacity(opacityFactor / frame.time);
			if (frame.time > timeFactor) {
				disc3.destroy();
				redx.setOpacity(1);
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

	setTimeout(function () {
		anim.start();
	}, 1500);
};