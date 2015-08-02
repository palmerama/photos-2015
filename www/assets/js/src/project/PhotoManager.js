define([],
		function(){

			function PhotoManager(imageManager)
			{
				console.log("PhotoManager initialised");

				this.imageManager = imageManager;
				this.updatePhotoBound = this.updatePhoto.bind(this);

				// hammer on main image
				this.hammertime = new Hammer($(".photos-harness")[0]); // middle one (main photo)
				this.hammertime.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL, velocity:0.1 });
				this.hammertime.on("swipeleft swiperight panstart panend panleft panright tap", this.handleHammer.bind(this));

				// vars
				this.tapPerc = .25;
				this.spinnerUrl = window.data.baseUrl + "assets/img/spinner.gif";

				// load prev & next at start
				this.loadMainPhoto();
			}

			var p = PhotoManager.prototype;


			p.loadMainPhoto = function()
			{
				$(".photo-solo.middle").eq(0).attr("data-id", window.data.main.id);
				$(".photo-solo.middle").eq(0).attr("data-ratio", window.data.main.ratio);
				this.imageManager.checkImageSize( $(".photo-solo.middle").eq(0), this.loadPrevNext.bind(this) );

				$(".photo-solo.prev").eq(0).css("background-image", this.spinnerUrl);
				$(".photo-solo.prev").eq(0).css("background-size", "32px");

				$(".photo-solo.next").eq(0).css("background-image", this.spinnerUrl);
				$(".photo-solo.next").eq(0).css("background-size", "32px");
			}

			p.loadPrevNext = function()
			{
				if (window.data.prev != null)
				{
					$(".photo-solo.prev").eq(0).attr("data-id", window.data.prev.id);
					$(".photo-solo.prev").eq(0).attr("data-ratio", window.data.prev.ratio);
					this.imageManager.checkImageSize( $(".photo-solo.prev").eq(0) );
				}

				if (window.data.next != null)
				{
					$(".photo-solo.next").eq(0).attr("data-id", window.data.next.id);
					$(".photo-solo.next").eq(0).attr("data-ratio", window.data.next.ratio);
					this.imageManager.checkImageSize( $(".photo-solo.next").eq(0) );
				}
			}

			p.handleHammer = function(e)
			{
				// disable browser scrolling
				e.preventDefault();

				//console.log(e.type);

				switch(e.type)
				{
					case 'tap':

						var tapWidth = window.innerWidth * this.tapPerc;

						if (e.center.x < tapWidth)
						{
							xTarget = window.innerWidth;
							nextId = $(".photo-solo.prev").attr("data-id");
						}
						else if (e.center.x > window.innerWidth-tapWidth) {
							xTarget = -window.innerWidth;
							nextId = $(".photo-solo.next").attr("data-id");
						}

						break;

					case 'swiperight':
						this.xStart = null;
						xTarget = window.innerWidth;
						nextId = $(".photo-solo.prev").attr("data-id");
						break;

					case 'swipeleft':
						this.xStart = null;
						xTarget = -window.innerWidth;
						nextId = $(".photo-solo.next").attr("data-id");
						break;

					case 'panstart':
						this.xStart = $(".photos-harness").css("left");
						break;

					case 'panend':

						if (this.xStart != null)
						{
							this.xStart = null;
							var xTarget = null;

							var left = parseInt($(".photos-harness").css("left"));
							var nextId = null;

							if (left < -window.innerWidth/2)
							{
								xTarget = -window.innerWidth;
								nextId = $(".photo-solo.next").attr("data-id");
							}
							else if (left > window.innerWidth/2)
							{
								xTarget = window.innerWidth;
								nextId = $(".photo-solo.prev").attr("data-id");
							}
							else {
								xTarget = 0;
							}
						}

						break;

					case 'panright':
					case 'panleft':
						if (this.xStart != null) TweenMax.set(".photos-harness", { css:{top:0, left:parseInt(this.xStart) + e.deltaX} });
						break;
				}

				/*
				var direction =

				var allowNext = (
					xTarget != null
					&&
					&& window.data.prev != null
					&& $(".photo-solo.middle").eq(0).attr("data-id"
				);
				*/

				if (xTarget != null)
				{
					var params = {css:{left:xTarget}, ease:Sine.easeOut};

					if (nextId != null)
					{
						params.onComplete = this.updatePhotoBound;
						params.onCompleteParams = [nextId];
					}

					TweenMax.to(".photos-harness", .2, params);
				}
			}

			p.updatePhoto = function(id)
			{
				// change URL
				history.replaceState( {}, '', window.data.baseUrl + "photo/" + window.data.albumTitle + "/" + id );

				// get new prev & next
				$.ajax({
					type: "GET",
					url: window.data.baseUrl + "album/getPhotoDetails/" + window.data.albumTitle + "/" + id,
					success: this.resetData.bind(this)
				});
			}

			p.resetData = function(data)
			{
				window.data.main = {id: data.photo.id, ratio: data.photo.ratio};
				if (data.previous) window.data.prev = {id: data.previous.photo_id, ratio: data.previous.ratio};
				if (data.next) window.data.next = {id: data.next.photo_id, ratio: data.next.ratio};

				this.loadMainPhoto();

				$(".nav-bar .album .position").eq(1).text("(" + (parseInt(data.photo.position)+1) + "/" + data.count + ")");
				TweenMax.set(".photos-harness", { css:{left:"0px"} });
			}

			// Return the base class constructor.
			return( PhotoManager );
		}
);