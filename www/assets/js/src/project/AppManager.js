define([],
	function(){

		function AppManager()
		{
			console.log("AppManager initialised");
			this.initResize();

			switch (window.appInit)
			{
				case "main":
					break;

				case "personality":
					break;
			}

			return( this );
		}

		var p = AppManager.prototype;


		p.initResize = function()
		{
			this.onResizeBound = this.onResize.bind(this);
			$(window).on("resize", this.onResizeBound);
			$(window).resize();
		}

		p.onResize = function(e)
		{
			//
		}

		// Return the base class constructor.
		return( AppManager );
	}
);