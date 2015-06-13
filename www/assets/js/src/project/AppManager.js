define(["project/ImageManager"],
	function(ImageManager){

		function AppManager()
		{
			console.log("AppManager initialised");
			this.initResize();
		}

		var p = AppManager.prototype;


		p.initResize = function()
		{
			this.imageManager = new ImageManager();

			this.onResizeBound = this.onResize.bind(this);
			$(window).on("resize", this.onResizeBound);
			$(window).resize();
		}

		p.onResize = function(e)
		{
			//$("#wrapper").height( window.innerHeight - $("#nav-bar").innerHeight() );

			$(".row").each(this.setRowHeight.bind(this));
			$(".best-fit").each(this.checkImageSize.bind(this));
		}

		p.setRowHeight = function(i, domEl)
		{
			$domEl = $(domEl);

			// get first photo
			var $photo = $domEl.find(".photo").eq(0);

			// set row height
			$domEl.height( Math.floor($photo.innerWidth()*$photo.attr("data-ratio")) );
		}

		p.checkImageSize = function(i, domEl)
		{
			this.imageManager.checkImageSize($(domEl));
		}

		// Return the base class constructor.
		return( AppManager );
	}
);