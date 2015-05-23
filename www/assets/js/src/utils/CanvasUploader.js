define(["utils/JPEGEncoderBasic"],
		function( JPEGEncoderBasic ){

			function CanvasUploader(baseUrl){

				this.baseUrl = baseUrl;

				this.init();

				return( this );

			}

			var p = CanvasUploader.prototype;
			p.uploader = null;
			p.initialied = false;

			p.init = function()
			{
				this.uploaderInitialied = false;
				console.log(this + " initialising.");
				this.initUploader();
			}

			p.initUploader = function() {

				if(!this.initialised) {
					this.uploader = new plupload.Uploader({

						runtimes : 'html5, html4',
						browse_button :  'fake-upload', // you can pass in id...
						container: document.getElementById('image-uploader'),

						url : this.baseUrl+'upload/plupload',
						unique_names : true,
						multi_selection:false,

						multipart_params : {
							final : "true"
						},

						init : {

							BeforeUpload: function() {
								console.log("BeforeUpload !!!");
							},

							PostInit: function(r) {
								console.log(this + " initialised.");
								this.uploaderInitialied = true;
								$(this).trigger("UPLOADER_READY");
							}.bind(this),

							FilesAdded: function() {
								console.log("file added.");
								this.uploader.start();
							}.bind(this),

							UploadProgress: function(up, file) {

							},

							Error: function(up, err) {
								console.log("Upload error.");
							},

							FileUploaded: function(up, file, info) {
								console.log("Final image uploaded to server.");
								//try {
									var response = JSON.parse(info.response);
									$(this).trigger("IMAGE_UPLOADED", {url:response.result, post_process_result:response.post_process_result});
								/*} catch(e) {
									console.log("problem with upload? ", JSON.parse(info.response));
								}*/

							}.bind(this)
						}
					});

					this.uploader.init();
					this.initialised = true;
				}
			}

			p.uploadBase64 = function(base64, params)
			{
				window.CanvasUploader = this;
				this.uploadImageData(base64, params);
			}

			p.uploadBase64FromImage = function(img, params)
			{
				window.CanvasUploader = this;
				this.uploadImageData(img.src, params);
			}

			p.uploadImageData = function(imgData, params)
			{
				window.CanvasUploader = this;

				console.log("UPLOADING IMAGE");

				if(window.FileReader && window.File) {

					var file = new o.File(null, imgData);
					file.name = "canvas.jpg"; // you need to give it a name here (required)
					console.log(this + " >> uploading final image...");

					this.uploader.settings.multipart_params.upload_params = encodeURI(JSON.stringify(params));
					//this.uploader.settings.multipart_params.mobile = $.browser.mobile;
					this.uploader.addFile(file);
				} else {
					//alert("ie upload");
					this.uploadIE(imgData, encodeURI(JSON.stringify(params)));
				}
			}

			p.uploadImageFromCanvas = function(canvas, quality, params)
			{
				window.CanvasUploader = this;

				// http://web.archive.org/web/20120830003356/http://www.bytestrom.eu/blog/2009/1120a_jpeg_encoder_for_javascript
				var ctx = canvas.getContext('2d');
				var encoder = new JPEGEncoderBasic(quality);

				console.log(ctx);
				console.log(canvas.width, canvas.height);

				var imgData = encoder.encode(ctx.getImageData(0,0,canvas.width, canvas.height));
				this.uploadImageData(imgData, params);

			}

			p.uploadIE = function(imgData, params) {

				console.log("params", params);

				$("#ieUploader").remove();
				var ifrm = document.createElement("IFRAME");
				ifrm.setAttribute("id", "ieUploader");
				ifrm.setAttribute("src", this.baseUrl+"upload/html4?upload_params="+params);
				$("body").append($(ifrm));

				uploadingToIFrame = true;

				ifrm.onload = function() {

					if(!uploadingToIFrame) return;

					var data = imgData;
					var dataLen = data.length;
					var chunkSize = 10000;
					var idx = 0;

					function sendChunks() {

						if(idx+chunkSize > dataLen) {
							chunkSize = dataLen - idx;
						}
						var nextChunk = data.substr(idx, chunkSize);

						ifrm.contentWindow.addChunk(nextChunk);

						idx += chunkSize;
						if(idx >= dataLen) {
							uploadingToIFrame = false;
							ifrm.contentWindow.transferComplete();
						} else {
							sendChunks();
						}
					}

					sendChunks();
				};
			}

			p.uploadComplete = function(url, post_process_result) {
				$("#ieUploader").remove();
				$(this).trigger("IMAGE_UPLOADED", {url:url, post_process_result:post_process_result});
			}

			// Return the base class constructor.
			return( CanvasUploader );
		}
);