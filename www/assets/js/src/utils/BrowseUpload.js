define([],
		function( ){

			function BrowseUpload(baseUrl, container, button, params){

				console.log("Browse upload initialied");

				console.log(baseUrl+'upload/html5');

				this.uploader = new plupload.Uploader({

					runtimes : 'html5, html4',
					browse_button :  document.getElementById(button), // you can pass in id...
					container: document.getElementById(container),

					url : baseUrl+'upload/plupload',
					unique_names : true,
					multi_selection:false,

					multipart_params : {
						final : "true"
					},

					init : {

						BeforeUpload: function() {

							$("#start-btn, #browse-upload").hide();
							$("#upload-prompt").show();

							console.log("uploading...")
						},

						PostInit: function(r) {
							//console.log(this + " initialised.");
						}.bind(this),

						FilesAdded: function() {
							console.log("file added.");
							this.uploader.settings.multipart_params.upload_params = encodeURI(JSON.stringify(params));
							this.uploader.start();
						}.bind(this),

						UploadProgress: function(up, file) {

						},

						Error: function(up, err) {
							console.log("Upload error.");
						},

						FileUploaded: function(up, file, info) {
							console.log("Final image uploaded to server.");
							try {
								var response = JSON.parse(info.response);
								$(this).trigger("IMAGE_UPLOADED", {url:response.result, post_process_result:response.post_process_result});
							} catch(e) {
								console.log(info);
							}

						}.bind(this)
					}
				});

				console.log(this.uploader);

				this.uploader.init();


				return( this );

			}

			var p = BrowseUpload.prototype;

			// Return the base class constructor.
			return( BrowseUpload );
		}
);