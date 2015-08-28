// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [ 'ionic' ])

.run(function($ionicPlatform, $rootScope) {
	// View Life Cycle
	$rootScope.$on('$ionicView.loaded', function(event, view) {
		console.log('Loaded...', view.stateName);
	});

	$rootScope.$on('$ionicView.beforeEnter', function(event, view) {
		console.log('Before Enter...', view.stateName);
	});

	$rootScope.$on('$ionicView.afterEnter', function(event, view) {
		console.log('After Enter...', view.stateName);
	});
	
	$rootScope.$on('$ionicView.enter', function(event, view){
		console.log('Entered', view.stateName);
	});
	
	$rootScope.$on('$ionicView.leave', function(event, view){
		console.log('Left...', view.stateName);
	});

	$rootScope.$on('$ionicView.beforeLeave', function(event, view){
		console.log('Before Leave...', view.stateName);
	});
	
	$rootScope.$on('$ionicView.afterLeave', function(event, view){
		console.log('After Leave...', view.stateName);
	});
	
	$rootScope.$on('$ionicView.unloaded', function(event, view){
		console.log('View unloaded...', view.stateName);
	});
	
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
	$stateProvider.state('page1', {
		url : '/page1',
		templateUrl : 'page1.html'
	}).state('page2', {
		url : '/page2',
		templateUrl : 'page2.html'
	});
	$urlRouterProvider.otherwise('/page1');
})