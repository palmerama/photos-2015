define([],
		function(){

			function AdminManager()
			{
				console.log("AdminManager initialised");

				$('a.shuffle-button').on("click", this.shuffle.bind(this));

				$('a.save-button').on("click", this.saveChanges.bind(this));
				$('.wrapper a.photo').on("click", this.toggleUsed.bind(this));
			}

			var p = AdminManager.prototype;


			p.shuffle = function(e)
			{
				$.ajax({
					type: "GET",
					url: window.data.baseUrl + "album/reOrderAlbum/" + $(".nav-bar .album").text(),
					success: this.onShuffle.bind(this)
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
				$('.save-button').css("display", "block");
			}

			p.saveChanges = function()
			{
				this.usedList = {
					used: [],
					unused: []
				};

				var $photos = $('.wrapper a.photo');
				$photos.each(this.rebuildUsedList.bind(this));

				$.ajax({
					type: "POST",
					data: this.usedList,
					url: window.data.baseUrl + "album/setPhotosActive"
				});
			}

			p.rebuildUsedList = function(i, html)
			{
				if ($(html).find(".cell").hasClass("selected")) this.usedList.unused.push($(html).data("id"));
				else this.usedList.used.push($(html).data("id"));
			}

			p.onShuffle = function()
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