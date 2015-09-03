// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [ 'ionic' ])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory
		// bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
}).controller('PhotoController', function($q, $scope, Camera) {
	$scope.takePhoto = function() {
		Camera.takePhoto().then(function(imageURI) {
			console.log('URI: ', imageURI);
		}, function(error) {
			console.log("Error: ", error);
		});
	};
}).factory('Camera', function($q) {
	return {
		takePhoto : function() {
			navigator.camera.getPicture(function(result) {
				q.resolve(result);
			}, function(error) {
				q.reject(error);
			}, {
				quality : 100
			})
		}
	};
});