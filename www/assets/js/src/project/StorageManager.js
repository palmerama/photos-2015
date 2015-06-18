define([],
		function(){

			function StorageManager()
			{
				console.log("StorageManager initialised");

				// init storage
				if (sessionStorage.adam_palmer_photos == null)
				{
					sessionStorage.adam_palmer_photos = [];
				}
			}

			var p = StorageManager.prototype;


			p. = function(e)
			{
				// store scroll position
				if (sessionStorage.adam_palmer_photos == null) sessionStorage.adam_palmer_photos

				// change page
				window.location = window.data.baseUrl + "photo/" + $(".nav-bar .album").text() + "/" + $(e.currentTarget).attr("data-id");
			}

			// Return the base class constructor.
			return( StorageManager );
		}
);