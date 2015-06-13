define([],
		function(){

			function ImageManager()
			{
				console.log("ImageManager initialised");
				this.sizeStages = [300, 500, 1000, 2000, 3000, 4000];
			}

			var p = ImageManager.prototype;


			p.checkImageSize = function($domEl)
			{
				var w = $domEl.innerWidth()*window.devicePixelRatio;
				var h = $domEl.innerHeight()*window.devicePixelRatio;
				var size = this.sizeStages[0];

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

				var img = new Image();
				imgUrl = window.data.baseUrl + "assets/img/photos/" + size + "/" + $domEl.attr("data-id") + ".jpg";
				img.onload = this.showImage($domEl, imgUrl);
				img.src = imgUrl;
			}

			p.showImage = function($domEl, imgUrl)
			{
				$domEl.css("background-image", "url('" + imgUrl + "')");
				TweenMax.to($domEl,.5 + Math.random() *.5, {autoAlpha:1, ease:Sine.easeIn});
			}

			// Return the base class constructor.
			return( ImageManager );
		}
);