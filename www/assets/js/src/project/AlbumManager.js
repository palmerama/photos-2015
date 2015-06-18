define([],
		function(){

			function AlbumManager()
			{
				console.log("AlbumManager initialised");
				$('a.photo').on("click", this.onPhotoClicked.bind(this));

				this.prepStorage();
			}

			var p = AlbumManager.prototype;


			p.onPhotoClicked = function(e)
			{
				// store scroll position
				if (sessionStorage.adam_palmer_photos == null) sessionStorage.adam_palmer_photos

				// change page
				window.location = window.data.baseUrl + "photo/" + $(".nav-bar .album").text() + "/" + $(e.currentTarget).attr("data-id");
			}

			p.prepStorage = function()
			{
				if (sessionStorage.albums == null) sessionStorage.albums = {};
			}

			// Return the base class constructor.
			return( AlbumManager );
		}
);