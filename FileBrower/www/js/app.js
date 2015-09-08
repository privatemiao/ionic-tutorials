angular.module('starter', [ 'ionic' ])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
}).controller('FileController', function($scope, $ionicPlatform, fileService) {
	$ionicPlatform.ready(function() {
		$scope.refresh = function() {
			fileService.getEntriesAtRoot().then(function(result) {
				$scope.files = result;
				console.log('Files->', $scope.files);
			}, function(error) {
				console.error(error);
			});
		};

		$scope.getContent = function(path) {
			fileService.getEntries(path).then(function(result) {
				$scope.files = result;
				$scope.files.unshift({
					name : '[parent]'
				});
				fileService.getParentDirectory(path).then(function(result) {
					result.name = '[parent]';
					$scope.files[0] = result;
				}, function(error) {
					console.error(error);
				});
			}, function(error) {
				console.error(error);
			});
		};
	});
}).factory('fileService', function($q) {
	return {
		getParentDirectory : function(path) {
			var deferred = $q.defer();
			window.resolveLocalFileSystemURI(path, function(fileSystem) {
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
			window.resolveLocalFileSystemURI(path, function(fileSystem) {
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