define([],
		function( ){

			function PressHoldButton($domEl){

				this.isDown = false;

				this.onPressBound = this.onPress.bind(this);
				this.onReleaseBound = this.onRelease.bind(this);

				$domEl.on("mousedown touchstart", this.onPressBound);

				return( this );

			}

			var p = PressHoldButton.prototype;

			p.onPress = function()
			{
				this.isDown = true;
				$(document).on("mouseup touchend", this.onReleaseBound);
			}

			p.onRelease = function()
			{
				this.isDown = false;
				$(document).off("mouseup touchend", this.onReleaseBound);
			}

			// Return the base class constructor.
			return( PressHoldButton );
		}
);