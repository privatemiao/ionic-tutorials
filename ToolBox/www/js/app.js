angular.module('generic', [ 'ionic', 'ngCordova', 'generic.controllers', 'generic.services' ])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
}).config([ '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('tab', {
		url : '/tab',
		abstract : true,
		templateUrl : 'partial/tabs.html'
	}).state('tab.photo', {
		url : '/photo',
		views : {
			'tab-photo' : {
				templateUrl : 'partial/tab-photo.html'
			}
		}
	}).state('tab.photo-upload', {
		url : '/photo/upload',
		views : {
			'tab-photo' : {
				templateUrl : 'partial/tab-photo-upload.html',
				controller : 'PhotoUploadController'
			}
		}
	}).state('tab.photo-view', {
		url : '/photo/view',
		views : {
			'tab-photo' : {
				templateUrl : 'partial/tab-photo-view.html'
			}
		}
	})

	.state('tab.contact', {
		url : '/contact',
		views : {
			'tab-contact' : {
				templateUrl : 'partial/tab-contact.html'
			}
		}
	}).state('tab.setting', {
		url : '/setting',
		views : {
			'tab-setting' : {
				templateUrl : 'partial/tab-setting.html'
			}
		}
	})

	$urlRouterProvider.otherwise('/tab/photo');
} ])