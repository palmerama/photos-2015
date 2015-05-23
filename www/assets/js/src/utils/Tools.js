define({
	getParameterByName: function(name) {
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");

		var regexS = "[\\?&]" + name + "=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec(window.location.search);

		if(results == null)
			return "";
		else
			return decodeURIComponent(results[1].replace(/\+/g, " "));
	},

	getCoords: function(e) {

		var x = e.clientX || e.pageX;
		var y = e.clientY || e.pageY;

		if(e.changedTouches) {
			x = (e.changedTouches[0].clientX || e.changedTouches[0].pageX);
			y = (e.changedTouches[0].clientY || e.changedTouches[0].pageY);
		}

		newX = x;
		newY = y;

		return {x:newX, y:newY, event:e};
	},

	mapRange: function(x, in_min, in_max, out_min, out_max)
	{
		return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
	},

	getPercentageAtValueBetween: function(min, max, value)
	{
		return (value-min)/(max - min);
	},

	rectangle: function(x, y, width, height)
	{
		return {x:x, y: y, width:width, height:height, top:y, left:x, bottom:y+height, right:x+width, center:{x:x+(width/2), y:y+(height/2)}};
	},

	calculatePointArrayBoundingBox: function(points)
	{
		var r = null;

		for(var i=0; i < points.length; i++)
		{
			var p = points[i];

			if(i == 0) {
				r = {x:p.x, y: p.y, width:0, height:0, top:p.x, left:p.y, bottom:p.y, right:p.x, center:{x:p.x, y:p.y}};
			} else {
				if(p.x < r.x) r.x = p.x;
				if(p.y < r.y) r.y = p.y;

				if(p.y < r.top) r.top = p.y;
				if(p.x > r.right) r.right = p.x;
				if(p.y > r.bottom) r.bottom = p.y;
				if(p.x < r.left) r.left = p.x;
			}
		}

		r.width = r.right - r.x;
		r.height = r.bottom - r.y;

		r.center.x = r.x + (r.width/2);
		r.center.y = r.y + (r.height/2);

		return r;
	},

	seperatePointsIntoCornerRegions: function(points, splitPosition)
	{
		var z = splitPosition;
		var sets = [[],[],[],[]]; // TL, TR, BL, BR

		for(var i = 0; i < points.length; ++i)
		{
			var p = points[i];
			if(p.x <= z.x && p.y <= z.y) sets[0].push(p);
			if(p.x >= z.x && p.y <= z.y) sets[1].push(p);
			if(p.x <= z.x && p.y >= z.y) sets[2].push(p);
			if(p.x >= z.x && p.y >= z.y) sets[3].push(p);
		}

		// sort sets
		for(var i=0; i < sets.length; ++i)
		{
			sets[i].sort(function(a, b) {
				return a.y-b.y;
			});
		}

		return sets;
	},

	seperatePointsIntoSideRegions: function(points, splitPosition)
	{

	},

	/**
	 * Convert percent to an absolute pixel value
	 * @param val
	 * @param mapTo
	 * @returns {number}
	 */
	percentToPixels: function(val, mapTo)
	{
		return ((val/100)*mapTo);
	},


	/**
	 * Calculates an array containing points representing a cardinal spline through given point array.
	 * Points must be arranged as: [x1, y1, x2, y2, ..., xn, yn].
	 *
	 * The points for the cardinal spline are returned as a new array.
	 *
	 * @param {Array} points - point array
	 * @param {Number} [tension=0.5] - tension. Typically between [0.0, 1.0] but can be exceeded
	 * @param {Number} [numOfSeg=20] - number of segments between two points (line resolution)
	 * @param {Boolean} [close=false] - Close the ends making the line continuous
	 * @returns {Float32Array} New array with the calculated points that was added to the path
	 *
	 * https://github.com/epistemex/cardinal-spline-js/blob/master/src/curve_calc.js
	 */
	getCurvePoints: function(points, tension, numOfSeg, close) {

		'use strict';

		// options or defaults
		tension = (typeof tension === 'number') ? tension : 0.5;
		numOfSeg = numOfSeg ? numOfSeg : 25;

		var pts,									// for cloning point array
				i = 1,
				l = points.length,
				rPos = 0,
				rLen = (l-2) * numOfSeg + 2 + (close ? 2 * numOfSeg: 0),
				res = new Float32Array(rLen),
				cache = new Float32Array((numOfSeg + 2) * 4),
				cachePtr = 4;

		pts = points.slice(0);

		if (close) {
			pts.unshift(points[l - 1]);				// insert end point as first point
			pts.unshift(points[l - 2]);
			pts.push(points[0], points[1]); 		// first point as last point
		}
		else {
			pts.unshift(points[1]);					// copy 1. point and insert at beginning
			pts.unshift(points[0]);
			pts.push(points[l - 2], points[l - 1]);	// duplicate end-points
		}

		// cache inner-loop calculations as they are based on t alone
		cache[0] = 1;								// 1,0,0,0

		for (; i < numOfSeg; i++) {

			var st = i / numOfSeg,
					st2 = st * st,
					st3 = st2 * st,
					st23 = st3 * 2,
					st32 = st2 * 3;

			cache[cachePtr++] =	st23 - st32 + 1;	// c1
			cache[cachePtr++] =	st32 - st23;		// c2
			cache[cachePtr++] =	st3 - 2 * st2 + st;	// c3
			cache[cachePtr++] =	st3 - st2;			// c4
		}

		cache[++cachePtr] = 1;						// 0,1,0,0

		// calc. points
		parse(pts, cache, l);

		if (close) {
			//l = points.length;
			pts = [];
			pts.push(points[l - 4], points[l - 3], points[l - 2], points[l - 1]); // second last and last
			pts.push(points[0], points[1], points[2], points[3]); // first and second
			parse(pts, cache, 4);
		}

		function parse(pts, cache, l) {

			for (var i = 2, t; i < l; i += 2) {

				var pt1 = pts[i],
						pt2 = pts[i+1],
						pt3 = pts[i+2],
						pt4 = pts[i+3],

						t1x = (pt3 - pts[i-2]) * tension,
						t1y = (pt4 - pts[i-1]) * tension,
						t2x = (pts[i+4] - pt1) * tension,
						t2y = (pts[i+5] - pt2) * tension;

				for (t = 0; t < numOfSeg; t++) {

					var c = t << 2, //t * 4;

							c1 = cache[c],
							c2 = cache[c+1],
							c3 = cache[c+2],
							c4 = cache[c+3];

					res[rPos++] = c1 * pt1 + c2 * pt3 + c3 * t1x + c4 * t2x;
					res[rPos++] = c1 * pt2 + c2 * pt4 + c3 * t1y + c4 * t2y;
				}
			}
		}

		// add last point
		l = close ? 0 : points.length - 2;
		res[rPos++] = points[l];
		res[rPos] = points[l+1];

		return res;
	},


	getAverageRGB: function(c) {

		var blockSize = 5, // only visit every 5 pixels
				defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
				canvas = c,
				context = canvas.getContext('2d'),
				data, width, height,
				i = -4,
				length,
				rgb = {r:0,g:0,b:0},
				count = 0;

		if (!context) {
			return defaultRGB;
		}

		height = canvas.height;
		width = canvas.width;

		try {
			data = context.getImageData(0, 0, width, height);
		} catch(e) {
			/* security error, img on diff domain */
			console.log("ERROR", e);
			return defaultRGB;
		}

		length = data.data.length;

		while ( (i += blockSize * 4) < length ) {
			++count;
			rgb.r += data.data[i];
			rgb.g += data.data[i+1];
			rgb.b += data.data[i+2];
		}

		// ~~ used to floor values
		rgb.r = ~~(rgb.r/count);
		rgb.g = ~~(rgb.g/count);
		rgb.b = ~~(rgb.b/count);

		return rgb;

	},

	getAverageRGBImgData: function(imgData) {

		var blockSize = 5, // only visit every 5 pixels
				defaultRGB = {r:0,g:0,b:0},
				i = -4,
				length,
				rgb = {r:0,g:0,b:0},
				count = 0;

		var data = imgData;

		length = data.data.length;

		while ( (i += blockSize * 4) < length ) {
			++count;
			rgb.r += data.data[i];
			rgb.g += data.data[i+1];
			rgb.b += data.data[i+2];
		}

		// ~~ used to floor values
		rgb.r = ~~(rgb.r/count);
		rgb.g = ~~(rgb.g/count);
		rgb.b = ~~(rgb.b/count);

		return rgb;

	},

	rgb2hex: function(r, g, b){
		return "#" +
				("0" + parseInt(r,10).toString(16)).slice(-2) +
				("0" + parseInt(g,10).toString(16)).slice(-2) +
				("0" + parseInt(b,10).toString(16)).slice(-2);
	}
});