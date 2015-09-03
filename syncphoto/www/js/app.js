// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [ 'ionic', 'ngCordova' ])

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
}).controller('PhotoController', function($ionicPlatform, $q, $scope, $cordovaImagePicker) {
	$ionicPlatform.ready(function() {
		$scope.takePhoto = function() {
			navigator.camera.getPicture(function(result) {
				console.log(result);
			}, function(error) {
				console.log(error);
			}, {
				quality : 100
			});
		};
		$scope.pickPhoto = function() {
			$cordovaImagePicker.getPictures({
				maximumImageCount : 10,
				width : 800,
				height : 800,
				quality : 80
			}).then(function(results) {
				for (var i = 0; i < results.length; i++) {
					console.log('Image URI: ', results[i])
				}
			}, function(error) {
				console.log('Error: ', error);
			});
		};
	});
})