define([],
		function(){

			function PhotoManager(imageManager)
			{
				console.log("PhotoManager initialised");

				this.imageManager = imageManager;

				// hammer on main image
				this.hammertime = new Hammer($(".photos-harness")[0]); // middle one (main photo)
				this.hammertime.on("panstart panend panleft panright tap", this.handleHammer.bind(this));

				this.jumpDelta = 30;
				this.tapPerc = .25;

				// load prev & next at start
				this.loadMainPhoto();
			}

			var p = PhotoManager.prototype;


			p.loadMainPhoto = function()
			{
				$(".photo-solo.middle").eq(0).attr("data-id", window.data.main.id);
				$(".photo-solo.middle").eq(0).attr("data-ratio", window.data.main.ratio);
				this.imageManager.checkImageSize( $(".photo-solo.middle").eq(0), this.loadPrevNext.bind(this) );
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
						xTarget = window.innerWidth;
						nextId = $(".photo-solo.prev").attr("data-id");

						var params = {css:{left:xTarget}, ease:Sine.easeOut};
						//console.log("NEXT ID:", nextId);

						if (nextId != null)
						{
							params.onComplete = this.updatePhoto.bind(this);
							params.onCompleteParams = [nextId];
						}
						TweenMax.to(".photos-harness", .3, params);
						break;

					case 'swipeleft':
						xTarget = -window.innerWidth;
						nextId = $(".photo-solo.next").attr("data-id");

						var params = {css:{left:xTarget}, ease:Sine.easeOut};
						//console.log("NEXT ID:", nextId);

						if (nextId != null)
						{
							params.onComplete = this.updatePhoto.bind(this);
							params.onCompleteParams = [nextId];
						}
						TweenMax.to(".photos-harness", .3, params);
						break;

					case 'panstart':
						this.xStart = $(".photos-harness").css("left");
						//console.log("this.xStart:", parseInt(this.xStart));
						break;

					case 'panend':
						// console.log(e.velocity, e.deltaX);

						this.xStart = null;
						var xTarget = null;

						var left = parseInt($(".photos-harness").css("left"));
						var nextId = null;

						if (left > window.innerWidth/3 || e.deltaX >= this.jumpDelta)
						{
							xTarget = window.innerWidth;
							nextId = $(".photo-solo.prev").attr("data-id");
						}
						else if (left < -window.innerWidth/3 || e.deltaX <= -this.jumpDelta)
						{
							xTarget = -window.innerWidth;
							nextId = $(".photo-solo.next").attr("data-id");
						}

						break;

					case 'panright':
					case 'panleft':
						if (this.xStart != null) TweenMax.set(".photos-harness", { css:{left:parseInt(this.xStart) + e.deltaX} });
						// $(".photos-harness").css("left", parseInt(this.xStart) + e.deltaX);
						break;
				}

				if (xTarget != null)
				{
					var params = {css:{left:xTarget}, ease:Sine.easeOut};

					if (nextId != null)
					{
						params.onComplete = this.updatePhoto.bind(this);
						params.onCompleteParams = [nextId];
					}

					TweenMax.to(".photos-harness", .3, params);
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