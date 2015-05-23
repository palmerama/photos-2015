// Extending modules: http://www.bennadel.com/blog/2320-extending-classes-in-a-modular-javascript-application-architecture-using-requirejs.htm

requirejs.config({

	//By default load any module IDs from js/lib
	baseUrl: '/assets/js/src/',

	paths: {},

	generateSourceMaps: false,
	preserveLicenseComments: false,
	useStrict: true,

	urlArgs: "bust=" + (new Date()).getTime()
});

// Dependencies
require([]);

require(['utils/DomReady', 'project/AppManager'], function (DomReady, AppManager) {
	DomReady(
		function() {
			window.mainApp = new AppManager();
		}
	);
});