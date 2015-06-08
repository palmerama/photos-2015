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

				console.log("checking image id:", $domEl.attr("data-id"));

				for (var i=0; i<this.sizeStages.length; ++i)
				{
					console.log("\tchecking size:", this.sizeStages[i]);

					if (parseFloat($domEl.attr("data-ratio")) <= 1)
					{
						console.log("\t\tLANDSCAPE...");

						if (w <= this.sizeStages[i])
						{
							size = this.sizeStages[i];
							console.log("\t\twidth ("+ w +") >= " + this.sizeStages[i]);
							break;
						}
						else console.log("\t\twidth ("+ w +") < " + this.sizeStages[i]);
					}
					else {
						console.log("\t\tPORTRAIT...");

						if (h <= this.sizeStages[i])
						{
							size = this.sizeStages[i];
							console.log("\t\theight ("+ h +") >= " + this.sizeStages[i]);
							break;
						}
						else console.log("\t\theight ("+ h +") < " + this.sizeStages[i]);
					}
				}

				console.log("\t\t\tso size should be:", size);

				//var img = new Image();
				//img.src = $domEl.background

				$domEl.css("background-image", "url('" + window.data.baseUrl + "assets/img/photos/" + size + "/" + $domEl.attr("data-id") + ".jpg')");
			}

			// Return the base class constructor.
			return( ImageManager );
		}
);