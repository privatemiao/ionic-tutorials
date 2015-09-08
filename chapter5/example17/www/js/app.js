// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [ 'ionic' ])

.run(function($ionicPlatform) {
	console.log('RUN....');
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
}).config(function() {
	console.log('CONFIG...');
}).factory('DataFactory', function($timeout, $q) {
	console.log('FACTORY...');
	
	var API = {
		getData : function(count) {
			var deferred = $q.defer();
			var data = [], _o = {};
			count = count || 3;
			for (var i = 0; i < count; i++) {
				_o = {
					random : (Math.random() + 1).toString(36).substring(7),
					time : (new Date()).toString().substring(15, 24)
				};
				data.push(_o);
			}
			$timeout(function() {
				deferred.resolve(data);
			}, 1000);
			return deferred.promise;
		}
	};
	return API;
})
.controller('AppController', function($scope, DataFactory){
	console.log('CONTROLLER...');
	
	$scope.items = [];
	
	$scope.doRefresh = function(){
		DataFactory.getData(3)
		.then(function(data){
			for(var index in data){
				$scope.items.splice(0, 0, data[index]);
			}
		}).finally(function(){
			$scope.$broadcast('scroll.refreshComplete');
		})
	};
	
	$scope.loadMore = function(){
		DataFactory.getData(3)
		.then(function(data){
			for(var index in data){
				$scope.items.push(data[index]);
			}
		}).finally(function(){
			$scope.$broadcast('scroll.infiniteScrollComplete');
		})
	};
	
	DataFactory.getData(3)
	.then(function(data){
		$scope.items = data;
	});
})




