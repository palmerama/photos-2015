define(["project/ImageManager", "project/AdminManager"],
	function(ImageManager, AdminManager){

		function AppManager()
		{
			console.log("AppManager initialised");

			if (window.data.admin == true) this.admin = new AdminManager();
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
			$(".row").each(this.setRowHeight.bind(this));
			$(".best-fit").each(this.checkImageSize.bind(this));

			if (this.admin != null) this.admin.onResize(e);
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