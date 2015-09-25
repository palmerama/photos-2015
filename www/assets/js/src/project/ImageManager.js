define([],
		function(){

			function ImageManager()
			{
				console.log("ImageManager initialised");
				this.sizeStages = [300, 500, 1000, 2000, 3000, 4000];
			}

			var p = ImageManager.prototype;


			p.checkImageSize = function($domEl, callback)
			{
				//console.log("checkImageSize:", $domEl.attr("data-id"));
				callback = callback || null;

				var scrollTop = $(window).scrollTop();
				var top = $domEl.offset().top;
				var bottom = $domEl.offset().top + $domEl.innerHeight();

				var topInView = top >= scrollTop && top < scrollTop + window.innerHeight;
				var bottomInView = bottom > scrollTop && bottom < scrollTop + window.innerHeight;

				if (topInView || bottomInView || window.data.album == true)
				{
					if ($domEl.attr("data-id") != "" && $domEl.attr("data-ratio") != "")
					{
						var w = $domEl.innerWidth()*window.devicePixelRatio;
						var h = $domEl.innerHeight()*window.devicePixelRatio;
						var size = this.sizeStages[0];

						this.findCorrectImageSize($domEl, w, h, callback);
					}
				}
			}

			p.findCorrectImageSize = function($domEl, w, h, callback)
			{
				//console.log("findCorrectImageSize", $domEl, w, h, callback);

				var size, imgUrl;

				if (w > this.sizeStages[this.sizeStages.length-1] || h > this.sizeStages[this.sizeStages.length-1])
				{
					size = this.sizeStages[this.sizeStages.length-1];
				}
				else {
					for (var i=0; i<this.sizeStages.length; ++i)
					{
						if (parseFloat($domEl.attr("data-ratio")) <= 1)
						{
							if (w <= this.sizeStages[i])
							{
								size = this.sizeStages[i];
								//console.log($domEl.attr("data-id") + ":", w, "x", h, "LANDSCAPE:", this.sizeStages[i]);
								break;
							}
						}
						else {
							if (h <= this.sizeStages[i])
							{
								size = this.sizeStages[i];
								//console.log($domEl.attr("data-id") + ":", w, "x", h, "PORTRAIT:", this.sizeStages[i]);
								break;
							}
						}
					}
				}

				imgUrl = window.data.baseUrl + "assets/img/photos/" + size + "/" + $domEl.attr("data-id") + ".jpg";

				//if ("url(" + imgUrl + ")" != $domEl.css("background-image"))
				this.loadImage($domEl, imgUrl, callback);
			}

			p.loadImage = function($domEl, imgUrl, callback)
			{
				var img = new Image();
				img.$domEl = $domEl;
				img.callback = callback;
				img.onload = this.showImage;
				img.src = imgUrl;
				img.id = $domEl.attr("data-id");

				img.doFadeIn = $domEl.attr("data-fade-in") == "true";
				$domEl.attr("data-fade-in", "false");
			}

			p.showImage = function()
			{
				var img = this;

				if (img.$domEl.attr("data-id") == img.id)
				{
					img.$domEl.css("background-image", "url('" + img.src + "')");
					img.$domEl.css("background-size", img.$domEl.hasClass("photo-solo") ? "contain" : "cover");

					var params = {autoAlpha:1, ease:Sine.easeIn};
					if (img.doFadeIn == true)
					{
						TweenMax.set(img.$domEl, {
							autoAlpha:0,
							scale:img.$domEl.hasClass("photo-solo") ? .97 : 1
						});

						params.scale = 1;
					}
					TweenMax.to(img.$domEl, img.$domEl.hasClass("photo-solo") ? .4 : .2, params);

					if (img.callback != null) img.callback();
				}
				else console.log("image loaded but changed in page!");
			}

			// Return the base class constructor.
			return( ImageManager );
		}
);