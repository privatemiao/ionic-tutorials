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
}).controller('FileController', function($scope, $ionicPlatform, FileService) {
//	$ionicPlatform.ready(function() {
		$scope.photos = [];
		$scope.startTime = 0;
		$scope.fetchAllPhotos = function() {
			$scope.photos = [];
			$scope.startTime = new Date().getTime();
			CameraRoll.getPhotos(function(photo) {
				if (photo) {
					$scope.photos.push(photo);
				} else {
					alert('Finish->' + (new Date().getTime() - $scope.startTime));
				}
			});
		};// end fetchAllPhotos

		$scope.showVariables = function() {
			$scope.photos.forEach(function(photo) {
				FileService.getAssetFile(photo);
			});
		};// end showVariables
//	});
}).factory('FileService', function($q) {
	return {
		getAssetFile : function(path) {
//			path = 'assets-library://asset/asset.JPG?id=6E5438ED-9A8C-4ED0-9DEA-AB2D8F8A9360&ext=JPG';
			resolveLocalFileSystemURL(path, function(fileEntry) {
				console.log(fileEntry.toInternalURL());
			});
		}
	};
})