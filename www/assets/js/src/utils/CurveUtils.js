define([],

		// as per Adams fiddle http://jsfiddle.net/kkyvF/12/
		function( ){
			var CurveUtils = function () {

			};

			var p = CurveUtils.prototype;

			p.pointOnCurve = function(startPoint, controlPoint, endPoint, t)
			{
				//  P(t) = P0*(1-t)^2 + P1*2*(1-t)*t + P2*t^2

				var x = startPoint.x*Math.pow((1-t), 2) + controlPoint.x*2*(1-t)*t + endPoint.x*Math.pow(t, 2);
				var y = startPoint.y*Math.pow((1-t), 2) + controlPoint.y*2*(1-t)*t + endPoint.y*Math.pow(t, 2);

				return {x:x, y:y};
			}

			p.getPointsOnCurve = function(startPoint, controlPoint, endPoint, numPoints)
			{
				var step = 1/numPoints;
				var points = [];
				for (var i=0; i<numPoints; ++i)
				{
					var p = this.pointOnCurve(startPoint, controlPoint, endPoint, step*i);
					points.push(p);
				}

				return points;
			}

			return new CurveUtils();
		}
);