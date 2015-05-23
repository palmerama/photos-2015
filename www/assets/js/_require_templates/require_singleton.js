define([],
		function( ){
			var Singleton = function () {

				this.VAR_NAME = "keydown";

				// Return the base class constructor.
				this.getVar = function() {
					return this.VAR_NAME;
				}
			};

			console.log("Singleton");

			return new Singleton();
		}
);