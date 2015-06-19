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
				sessionStorage["ap_" + window.data.albumTitle] = $(window).scrollTop();

				// change page
				window.location = window.data.baseUrl + "photo/" + window.data.albumTitle + "/" + $(e.currentTarget).attr("data-id");
			}

			p.prepStorage = function()
			{
				if (sessionStorage["ap_" + window.data.albumTitle] != undefined)
				{
					console.log("BOOM!", parseInt(sessionStorage["ap_" + window.data.albumTitle]));
					setTimeout(function() { $(window).scrollTop(parseInt(sessionStorage["ap_" + window.data.albumTitle])); }, 10);
				}
			}

			// Return the base class constructor.
			return( AlbumManager );
		}
);