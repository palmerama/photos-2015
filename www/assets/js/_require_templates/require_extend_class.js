define([],
		function(){

			function Platform3D(){

				THREE.Object3D.call(this);


				return( this );

			}

			Platform3D.prototype = Object.create( THREE.Object3D.prototype );
			var p = Platform3D.prototype;

			p.init = function() {
			}

			// Return the base class constructor.
			return( Platform3D );
		}
);