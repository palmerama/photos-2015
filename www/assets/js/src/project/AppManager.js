define(["project/ImageManager", "project/AdminManager", "project/AlbumManager", "project/PhotoManager"],
	function(ImageManager, AdminManager, AlbumManager, PhotoManager){

		function AppManager()
		{
			console.log("AppManager initialised");

			this.imageManager = new ImageManager();

			if (window.data.admin == true) this.adminManager = new AdminManager();
			else if (window.data.album == true) this.albumManager = new AlbumManager();
			else if (window.data.photo == true) {
				this.photoManager = new PhotoManager(this.imageManager);
				$(this.photoManager).on("check_pinched_image_size", this.checkPinchedImageSize.bind(this));
			}

			this.initResize();
		}

		var p = AppManager.prototype;


		p.initResize = function()
		{
			this.onResizeBound = this.onResize.bind(this);
			$(window).on("resize", this.onResizeBound);
			$(window).resize();

			$(window).on("scroll", this.onScroll.bind(this));
		}

		p.onResize = function(e)
		{
			$(".row").each(this.setRowHeight.bind(this));
			$(".best-fit").each(this.checkImageSize.bind(this));

			if (this.adminManager != null) this.adminManager.onResize(e);
		}

		p.onScroll = function(e)
		{
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
			$domEl = $(domEl);

			// allow for nav bar on solo photos
			if ($domEl.hasClass("photo-solo")) $domEl.height(window.innerHeight - 50);

			// now load correct image
			this.imageManager.checkImageSize($domEl);
		}

		p.checkPinchedImageSize = function(e, $domEl, w, h)
		{
			console.log("checkPinchedImageSize");
			this.imageManager.findCorrectImageSize($domEl, w, h);
		}

		// Return the base class constructor.
		return( AppManager );
	}
);