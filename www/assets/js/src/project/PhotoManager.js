define([],
		function(){

			function PhotoManager(imageManager)
			{
				console.log("PhotoManager initialised");

				this.imageManager = imageManager;
				this.updatePhotoBound = this.updatePhoto.bind(this);

				// hammer on main image
				this.hammertime = new Hammer($(".photos-harness")[0]); // middle one (main photo)
				this.hammertime.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL, velocity:0.1,  });
				this.hammertime.get('pinch').set({ enable: true });
				this.hammertime.on("swipeleft swiperight panstart panend panleft panright panmove pinch pinchstart pinchend tap", this.handleHammer.bind(this));

				// vars
				this.pinchScale = 1;
				this.lastDelta = {x:0, y:0};
				this.tapPerc = .25;
				this.spinnerUrl = window.data.baseUrl + "assets/img/spinner.gif";
				this.spinnerSize = "64px";
				this.$photoSolo = $(".photo-solo.middle");
				this.allowTaps = true;
				this.transformPos = {x:0, y:0};
				this.transformOrigin = {x:0, y:0};

				// markers
				this.$markerTransformOrigin = $(".marker-transform-origin");
				this.$markerPosition = $(".marker-position");

				// load prev & next at start
				this.loadMainPhoto();
			}

			var p = PhotoManager.prototype;


			p.loadMainPhoto = function()
			{
				$(".photo-solo.middle").eq(0).css("background-image", this.spinnerUrl);
				$(".photo-solo.middle").eq(0).css("background-size", this.spinnerSize);

				$(".photo-solo.middle").eq(0).attr("data-id", window.data.main.id);
				$(".photo-solo.middle").eq(0).attr("data-ratio", window.data.main.ratio);
				this.imageManager.checkImageSize( $(".photo-solo.middle").eq(0), this.loadPrevNext.bind(this) );

				$(".photo-solo.prev").eq(0).css("background-image", this.spinnerUrl);
				$(".photo-solo.prev").eq(0).css("background-size", this.spinnerSize);

				$(".photo-solo.next").eq(0).css("background-image", this.spinnerUrl);
				$(".photo-solo.next").eq(0).css("background-size", this.spinnerSize);

				this.resetSharing();
			}

			p.resetSharing = function()
			{
				this.twitterText = "Here's a photo @palmerama took. I quite like it.";
				this.shareUrl = window.data.baseUrl + "photo/" + window.data.albumTitle + "/" + window.data.main.id;

				// FACEBOOK
				$(".share.fb").attr("href", "https://www.facebook.com/sharer.php?u=" + encodeURIComponent(this.shareUrl) + "&app_id=824024137711328&display=popup");

				// TWITTER
				$(".share.twitter").attr("href", "https://twitter.com/intent/tweet?&url=" + this.shareUrl + "&text=" + encodeURIComponent(this.twitterText));
			}

			p.loadPrevNext = function()
			{
				// console.log("loadPrevNext");

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

				var xTarget = null;
				console.log(e.type);

				switch(e.type)
				{
					case 'tap':

						if (this.allowTaps == true)
						{
							var tapWidth = window.innerWidth * this.tapPerc;

							if (e.center.x < tapWidth && this.prevAvailable())
							{
								xTarget = window.innerWidth;
								nextId = $(".photo-solo.prev").attr("data-id");
							}
							else if (e.center.x > window.innerWidth-tapWidth && this.nextAvailable()) {
								xTarget = -window.innerWidth;
								nextId = $(".photo-solo.next").attr("data-id");
							}
						}

						break;

					case 'panmove':
						if (this.pinchScale > 1) // move around when zoomed
						{
							console.log("panmove:", e);
							this.setPosition(this.lastDelta.x + e.deltaX, this.lastDelta.y + e.deltaY);
						}
						break;

					case 'pinchstart':

						console.log("pinchstart:", e);

						// find top left
						console.log("=========> transformOrigin:", this.transformOrigin);
						console.log("=========> transformPos:", this.transformPos);

						var offset = this.$photoSolo.offset();
						var topLeft = { x:offset.left, y:offset.top };
						var reverseScale = 1/this.pinchScale;

						console.log("=========> topLeft:", topLeft);

						this.setTransformOrigin({x:(e.center.x-topLeft.x)*reverseScale, y:(e.center.y-topLeft.y)*reverseScale});
						this.setPosition(e.center.x, e.center.y);

						this.pinchScaleStart = this.pinchScale;
						this.allowTaps = false;
						break;

					case 'pinch':
						console.log("pinch:", e);
						var maxScale = 4;
						this.pinchScale = Math.max(1, Math.min(this.pinchScaleStart*e.scale, maxScale));

						TweenMax.set(".photo-solo.middle", { scale: this.pinchScale });

						//if (this.pinchScale > 1) this.setPosition(this.lastDelta.x + e.deltaX, this.lastDelta.y + e.deltaY);

						if (this.pinchScale > 1) this.setPosition(
								e.center.x - this.transformOrigin.x,
								e.center.y - this.transformOrigin.y
						);

						break;

					case 'pinchend':

						console.log("PINCH END!", this.pinchScale);

						$(this).trigger("check_pinched_image_size", [
							this.$photoSolo,
							this.$photoSolo.innerWidth()*this.pinchScale*window.devicePixelRatio,
							this.$photoSolo.innerHeight()*this.pinchScale*window.devicePixelRatio
						]);

						if (this.pinchScale == 1) this.resetTransform();

						break;

					case 'swiperight':
						if (this.prevAvailable())
						{
							this.photoHarnessXStart = null;
							xTarget = window.innerWidth;
							nextId = $(".photo-solo.prev").attr("data-id");
						}
						break;

					case 'swipeleft':
						if (this.nextAvailable())
						{
							this.photoHarnessXStart = null;
							xTarget = -window.innerWidth;
							nextId = $(".photo-solo.next").attr("data-id");
						}
						break;

					case 'panstart':
						this.photoHarnessXStart = $(".photos-harness").css("left");
						break;

					case 'panend':

						if (this.photoHarnessXStart != null)
						{
							this.photoHarnessXStart = null;
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

						if (this.pinchScale > 1) this.lastDelta = {x:this.lastDelta.x + e.deltaX, y:this.lastDelta.y + e.deltaY};

						break;

					case 'panright':
						if (this.prevAvailable()) this.setPan(e.deltaX);
						break;

					case 'panleft':
						if (this.nextAvailable()) this.setPan(e.deltaX);
						break;
				}

				if (xTarget != null && this.pinchScale == 1)
				{
					var params = {x:xTarget, ease:Sine.easeOut}; //{css:{left:xTarget}, ease:Sine.easeOut};

					if (nextId != null)
					{
						params.onComplete = this.updatePhotoBound;
						params.onCompleteParams = [nextId];
					}

					TweenMax.to(".photos-harness", .2, params);

					this.allowTaps = false;
				}
			}

			p.setPosition = function(x, y)
			{
				console.log("setting position:", x, y);
				this.transformPos = {x:x, y:y};

				TweenMax.set(this.$markerPosition, {x:this.transformPos.x, y:this.transformPos.y});
				TweenMax.set(".photo-solo.middle", {x:this.transformPos.x, y:this.transformPos.y});
			}

			p.setTransformOrigin = function(obj)
			{
				this.transformOrigin = obj;
				console.log("setting transformOrigin:", this.transformOrigin);

				TweenMax.set(this.$markerTransformOrigin, {x:this.transformOrigin.x, y:this.transformOrigin.y});
				this.applyTransformOrigin();
			}

			p.applyTransformOrigin = function()
			{
				var transformOrigin = this.transformOrigin.x + "px " + this.transformOrigin.y + "px";
				console.log("applying transformOrigin:", transformOrigin);
				TweenMax.set(".photo-solo.middle", {transformOrigin: transformOrigin});
			}

			p.setPan = function(deltaX)
			{
				if (this.photoHarnessXStart != null && this.pinchScale == 1)
				{
					TweenMax.set(".photos-harness", {
						//css:{top:0, left:parseInt(this.photoHarnessXStart) + deltaX}
						y:0, x:parseInt(this.photoHarnessXStart) + deltaX
					});
				}
			}

			p.prevAvailable = function()
			{
				return window.data.main.position > 0;
			}

			p.nextAvailable = function()
			{
				return window.data.main.position < window.data.main.count-1;
			}

			p.resetTransform = function()
			{
				this.transformOrigin = {x:0, y:0};
				this.lastDelta = {x:0, y:0};

				TweenMax.to(".photo-solo.middle", .3, {x:0, y:0, transformOrigin:"50% 50%", ease:Sine.easeIn,
					onComplete: this.setPosition.bind(this),
					onCompleteParams: [0, 0]
				});

				this.allowTaps = true;
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
				window.data.main = {id: data.photo.id, ratio: data.photo.ratio, position:data.photo.position, count:data.count};
				if (data.previous) window.data.prev = {id: data.previous.photo_id, ratio: data.previous.ratio};
				if (data.next) window.data.next = {id: data.next.photo_id, ratio: data.next.ratio};

				this.pinchScale = 1;
				this.loadMainPhoto();

				$(".nav-bar .album .position").text("(" + (parseInt(data.photo.position)+1) + "/" + data.count + ")");
				TweenMax.set(".photos-harness", { x:0 }); //css:{left:"0px"} });

				this.allowTaps = true;
			}

			// Return the base class constructor.
			return( PhotoManager );
		}
);