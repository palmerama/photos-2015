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

				if (topInView || bottomInView)
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
				console.log("loading image:", imgUrl);

				img.$domEl = $domEl;
				img.callback = callback;
				img.onload = this.showImage;
				img.src = imgUrl;

				img.doFadeIn = $domEl.attr("data-fade-in") == "true";
				$domEl.attr("data-fade-in", "false");
			}

			p.showImage = function()
			{
				var img = this;

				img.$domEl.css("background-image", "url('" + img.src + "')");
				img.$domEl.css("background-size", img.$domEl.hasClass("photo-solo") ? "contain" : "cover");

				if (img.doFadeIn == true) TweenMax.set(img.$domEl, {autoAlpha:0});
				TweenMax.to(img.$domEl,.2 + Math.random() *.2, {autoAlpha:1, ease:Sine.easeIn});

				if (img.callback != null) img.callback();
			}

			// Return the base class constructor.
			return( ImageManager );
		}
);