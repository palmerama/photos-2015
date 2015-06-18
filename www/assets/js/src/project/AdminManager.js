define([],
		function(){

			function AdminManager()
			{
				console.log("AdminManager initialised");

				$('a.shuffle-button').on("click", this.shuffle.bind(this));

				$('a.save-button').on("click", this.saveChanges.bind(this));
				$('body.admin a.photo').on("click", this.onPhotoClicked.bind(this));
			}

			var p = AdminManager.prototype;


			p.shuffle = function(e)
			{
				$.ajax({
					type: "GET",
					url: window.data.baseUrl + "data/reOrderAlbum/" + window.data.albumTitle,
					success: this.reloadPage.bind(this)
				});
			}

			p.reOrderAlbumNoShuffle = function(e)
			{
				$.ajax({
					type: "GET",
					url: window.data.baseUrl + "data/reOrderAlbum/" + window.data.albumTitle + "/0",
					success: this.reloadPage.bind(this)
				});
			}

			p.onPhotoClicked = function(e)
			{
				this.showSaveButton();

				// allow full button (div) inside main photo button
				if ($(e.target).hasClass("full-width")) this.toggleFullWidth(e);
				else this.toggleUsed(e);
			}

			p.toggleFullWidth = function(e)
			{
				$domEl = $(e.currentTarget).find(".full-width");
				$domEl.hasClass("selected") ? $domEl.removeClass("selected") : $domEl.addClass("selected");
			}

			p.toggleUsed = function(e)
			{
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
				this.saveData = {
					used: [],
					unused: [],
					full_width: [],
					not_full_width: [],
					album_title: $(".nav-bar .album").text()
				};

				console.log(this.saveData);

				// main photos used/unused
				var $photos = $('.wrapper a.photo');
				$photos.each(this.buildUsedList.bind(this));

				// main photos full width
				$photos.each(this.buildFullWidthList.bind(this));

				// photos in unused admin bar
				$unusedPhotos = $('.unused-photos a.photo');
				$unusedPhotos.each(this.buildUsedList.bind(this));

				// send used to db
				$.ajax({
					type: "POST",
					data: this.saveData,
					url: window.data.baseUrl + "data/setPhotos",
					success: this.reOrderAlbumNoShuffle.bind(this)
				});
			}

			p.buildFullWidthList = function(i, html)
			{
				if ($(html).find(".full-width").hasClass("selected")) this.saveData.full_width.push($(html).data("id"));
				else this.saveData.not_full_width.push($(html).data("id"));
			}

			p.buildUsedList = function(i, html)
			{
				if ($(html).find(".cell").hasClass("selected")) this.saveData.unused.push($(html).data("id"));
				else this.saveData.used.push($(html).data("id"));
			}

			p.reloadPage = function()
			{
				window.location = window.data.baseUrl + "album/" + window.data.albumTitle + "/admin";
			}

			p.onResize = function(e)
			{
				$(".unused-photos .photo").each(this.setPhotoHeight.bind(this));
				$(".unused-photos").height( $(".admin-bar").innerHeight() - $(".unused-photos").offset().top - $(".controls").outerHeight() - $(".nav-bar").innerHeight());
			}

			p.setPhotoHeight = function(i, html)
			{
				$(html).height( $(html).innerWidth()*$(html).data('ratio') );
			}

			// Return the base class constructor.
			return( AdminManager );
		}
);