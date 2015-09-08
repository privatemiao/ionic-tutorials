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
}).controller('FileController', function($ionicPlatform, $scope, FileService) {
	$ionicPlatform.ready(function() {
		FileService.getEntriesAtRoot().then(function(result) {
			$scope.files = result;
		}, function(error) {
			console.error(error);
		});

		$scope.getContent = function(path) {
			console.log('NativeURL->', path);

			FileService.getEntries(path).then(function(result) {
				$scope.files = result;
				$scope.files.unshift({
					name : '[parent]'
				});
				FileService.getParentDirectory(path).then(function(result) {
					result.name = '[parent]';
					$scope.files[0] = result;
				}, function(error) {
					console.error(error);
				});
			}, function(error) {
				console.error(error);
			});
		};
		
		$scope.pop = function(){
			alert('EWlc');
		};

	});
}).factory('FileService', function($q) {
	return {
		getParentDirectory : function(path) {
			var deferred = $q.defer();
			window.resolveLocalFileSystemURL(path, function(fileSystem) {
				fileSystem.getParent(function(result) {
					deferred.resolve(result);
				}, function(error) {
					deferred.reject(error);
				});
			}, function(error) {
				deferred.reject(error);
			});
			return deferred.promise;
		},
		getEntriesAtRoot : function() {
			var deferred = $q.defer();
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
				var directoryReader = fileSystem.root.createReader();
				directoryReader.readEntries(function(entries) {
					deferred.resolve(entries);
				}, function(error) {
					deferred.reject(error);
				});
			}, function(error) {
				deferred.reject(error);
			});
			return deferred.promise;
		},
		getEntries : function(path) {
			var deferred = $q.defer();
			window.resolveLocalFileSystemURL(path, function(fileSystem) {
				var directoryReader = fileSystem.createReader();
				directoryReader.readEntries(function(entries) {
					deferred.resolve(entries);
				}, function(error) {
					deferred.reject(error);
				});
			}, function(error) {
				deferred.reject(error);
			});
			return deferred.promise;
		}
	};
})