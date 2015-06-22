define([],
		function(){

			function PhotoManager()
			{
				console.log("PhotoManager initialised");

				this.hammertime = new Hammer($(".photos-harness")[0]); // middle one (main photo)
				this.hammertime.on("panstart panend panleft panright", this.handleHammer.bind(this));
			}

			var p = PhotoManager.prototype;


			p.handleHammer = function(e)
			{
				// disable browser scrolling
				e.preventDefault();

				switch(e.type)
				{
					case 'panstart':
						this.xStart = $(".photos-harness").css("left");
						console.log("this.xStart:", parseInt(this.xStart));
						break;

					case 'panend':

						this.xStart = null;
						var xTarget = 0;

						var left = parseInt($(".photos-harness").css("left"));
						var nextId = null;

						if (left > window.innerWidth/2)
						{
							xTarget = window.innerWidth;
							nextId = $(".photo-solo.prev").attr("data-id");
						}
						else if (left < -window.innerWidth/2)
						{
							xTarget = -window.innerWidth;
							nextId = $(".photo-solo.next").attr("data-id");
						}

						var params = {css:{left:xTarget}, ease:Sine.easeOut};
						console.log("NEXT ID:", nextId);

						if (nextId != null)
						{
							params.onComplete = this.gotoNextPage.bind(this);
							params.onCompleteParams = [nextId];
						}
						TweenMax.to(".photos-harness", .3, params);

						break;

					case 'panright':
					case 'panleft':
						if (this.xStart != null) $(".photos-harness").css("left", parseInt(this.xStart) + e.deltaX);
						break;
				}
			}

			p.gotoNextPage = function(id)
			{
				window.location = window.data.baseUrl + "photo/" + window.data.albumTitle + "/" + id;
			}

			// Return the base class constructor.
			return( PhotoManager );
		}
);