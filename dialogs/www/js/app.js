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
}).controller('ToastController', function($cordovaToast, $cordovaDialogs, $scope) {
	$scope.name = 'Mel';
	$scope.changeName = function() {
		$cordovaDialogs.prompt('Name please?', 'Identity', [ 'Cancel', 'OK' ], 'Harry Potter').then(function(result) {
			if (result.buttonIndex == 2){
				$scope.name = result.input1;
				$cordovaToast.show('Change name Mel -> ' + $scope.name, 'long', 'center').then(function(success) {
				}, function(error) {
				});
			}
		});
	};
})