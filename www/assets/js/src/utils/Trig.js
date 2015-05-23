define([],
		function( ){
			var Trig = function () {

			};

			var p = Trig.prototype;

			/**
			 *	Get Distance
			 */
			p.getDistance = function(p1, p2) {
				var x_cord = p2.x-p1.x;
				var y_cord = p2.y-p1.y;

				return Math.sqrt(x_cord*x_cord + y_cord*y_cord);
			}

			/**
			 *	Radians to degrees
			 */
			p.getDegrees = function(radians) {
				return radians*180/Math.PI;
			}

			/**
			 *	Radians to radians
			 */
			p.getRadians = function(degrees) {
				return degrees/180*Math.PI;
			}

			/**
			 *	Get Point on Hypoteneuse
			 */
			p.getPointOnHypoteneuse = function(point1, angle, hypoLength) {
				// find length of other 2 sides
				var a = Math.sin(angle)*hypoLength;
				var b = Math.sqrt((hypoLength*hypoLength) - (a*a));

				// work out point
				var point = {x:0, y:0};

				if (angle > 1.5 || angle < -1.5)
				{
					point.x = point1.x + b;
					point.y = point1.y - a;
				}
				else {
					point.x = point1.x - b;
					point.y = point1.y - a;
				}
				return point;
			}

			/**
			 * Get Angle
			 */
			p.getAngle = function(point1, point2, returnDegrees) {
				if(returnDegrees === undefined) returnDegrees = true;

				var radians = Math.atan2((point1.y-point2.y), (point1.x-point2.x));

				if(returnDegrees) {
					return radians*180/Math.PI;
				} else {
					return radians;
				}
			}

			p.transformPointAround = function(point, around, radians)
			{
				var newX = around.x + (point.x-around.x)*Math.cos(radians) - (point.y-around.y)*Math.sin(radians);
				var newY = around.y + (point.x-around.x)*Math.sin(radians) + (point.y-around.y)*Math.cos(radians);
				return {x:newX, y:newY};
			}


			// http://wikicode.wikidot.com/get-angle-of-line-between-two-points
			p.angleOfLine = function(p1, p2)
			{
				var xDiff = p2.x - p1.x
				var yDiff = p2.y - p1.y;
				return Math.atan2(yDiff, xDiff);
			}

			p.midPoint = function(p1, p2)
			{
				var x = (p1.x + p2.x) / 2;
				var y = (p1.y + p2.y) / 2;

				return {x:x, y:y};
			}


			return new Trig();
		}
);

