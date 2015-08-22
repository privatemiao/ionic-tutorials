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
}).config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('login', {
		url : '/login',
		templateUrl : 'templates/login.html',
		controller : 'LoginController'
	}).state('app', {
		url : '/app',
		templateUrl : 'templates/app.html',
		controller : 'AppController'
	});

	$urlRouterProvider.otherwise('/login');
}).controller('LoginController', function($scope) {
}).controller('AppController', function($scope) {
	$scope.ratingArr = [ {
		value : 1,
		icon : 'ion-ios-star-outline'
	}, {
		value : 2,
		icon : 'ion-ios-star-outline'
	}, {
		value : 3,
		icon : 'ion-ios-star-outline'
	}, {
		value : 4,
		icon : 'ion-ios-star-outline'
	}, {
		value : 5,
		icon : 'ion-ios-star-outline'
	} ];

	$scope.setRating = function(val) {
		for (var i = 0; i < $scope.ratingArr.length; i++) {
			if (i < val) {
				$scope.ratingArr[i].icon = 'ion-ios-star';
			} else {
				$scope.ratingArr[i].icon = 'ion-ios-star-outline';
			}
		}
	};
});