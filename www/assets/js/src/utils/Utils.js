define([],
		function( ){
			var Utils = function () {

				this.csvToArray = function(csv) {
					//console.log("csv Before: ", csv);
					csv = csv.replace("\n", ",");
					csv = csv.replace(/\r?\n|\r/g,',');
					csv = csv.replace(/\s/g, ',');

					var split = csv.split(",");
					var withContent = [];

					for(var i=0; i < split.length; ++i)
						if(split[i] != "") withContent.push(split[i]);

					//console.log("csv After: ", csv);
					//console.log(withContent);
					return withContent;
				}

				this.n2br = function(inStr) {
					return inStr.replace(/\n/g, "<br />");
				}

				this.convertImageToCanvas = function(img)
				{
					var cnv = document.createElement("canvas");
					var ctx = cnv.getContext('2d');
					cnv.width = img.width;
					cnv.height = img.height;
					ctx.drawImage(img, 0,0);

					return cnv;
				}

				this.convertImageToBase64 = function(img)
				{
					var cnv = document.createElement("canvas");
					var ctx = cnv.getContext('2d');
					cnv.width = img.width;
					cnv.height = img.height;
					ctx.drawImage(img, 0,0);
					return cnv.toDataURL('image/png');
				}

				this.stripSpaces = function(inStr) {
					return inStr.replace(/\s/g, '');
				}

				this.getImageNameFromItemId = function(current_object, item_id, img_suffix) {

					var suffix = img_suffix || "";

					// search for obj_name
					//console.log("Searching for", current_object, "in", item_id);
					var removeObj = item_id.replace(current_object,'');
					var noUnderScores = removeObj.split("_");

					var reBuild = [];

					for(var i=0; i < noUnderScores.length; ++i)
					{
						if(noUnderScores[i].length > 0) {
							reBuild.push(noUnderScores[i]);
						}
					}

					var joined = reBuild.join("_")+suffix;

					//console.log("Search result: ", joined);


					return joined;
				}
			};

			return new Utils();
		}
);