define([],
		function(){

			function AdminManager()
			{
				console.log("AdminManager initialised");

				$('a.shuffle-button').on("click", this.shuffle.bind(this));

				$('a.save-button').on("click", this.saveChanges.bind(this));
				$('a.photo').on("click", this.toggleUsed.bind(this));
			}

			var p = AdminManager.prototype;


			p.shuffle = function(e)
			{
				$.ajax({
					type: "GET",
					url: window.data.baseUrl + "data/reOrderAlbum/" + $(".nav-bar .album").text(),
					success: this.reloadPage.bind(this)
				});
			}

			p.reOrderAlbumNoShuffle = function(e)
			{
				$.ajax({
					type: "GET",
					url: window.data.baseUrl + "data/reOrderAlbum/" + $(".nav-bar .album").text() + "/0",
					success: this.reloadPage.bind(this)
				});
			}

			p.toggleUsed = function(e)
			{
				this.showSaveButton();

				$domEl = $(e.currentTarget).find(".cell");
;				$domEl.hasClass("selected") ? $domEl.removeClass("selected") : $domEl.addClass("selected");
			}

			p.showSaveButton = function()
			{
				$('.shuffle-button').css("display", "none");
				$('.save-button').css("display", "block");
			}

			p.saveChanges = function()
			{
				this.usedList = {
					used: [],
					unused: [],
					album_title: $(".nav-bar .album").text()
				};

				// main photos
				var $photos = $('.wrapper a.photo');
				$photos.each(this.buildUsedList.bind(this));

				// photos in unused admin bar
				var $unusedPhotos = $('.unused-photos a.photo');
				$unusedPhotos.each(this.buildUsedList.bind(this));

				$.ajax({
					type: "POST",
					data: this.usedList,
					url: window.data.baseUrl + "data/setPhotosActive",
					success: this.reOrderAlbumNoShuffle.bind(this)
				});
			}

			p.buildUsedList = function(i, html)
			{
				if ($(html).find(".cell").hasClass("selected")) this.usedList.unused.push($(html).data("id"));
				else this.usedList.used.push($(html).data("id"));
			}

			p.reloadPage = function()
			{
				window.location = window.data.baseUrl + "album/" + $(".nav-bar .album").text() + "/admin";
			}

			p.onResize = function(e)
			{
				$(".unused-photos .photo").each(this.setPhotoHeight.bind(this));
			}

			p.setPhotoHeight = function(i, html)
			{
				$(html).height( $(html).innerWidth()*$(html).data('ratio') );
			}

			// Return the base class constructor.
			return( AdminManager );
		}
);