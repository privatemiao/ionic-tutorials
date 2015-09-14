angular.module('generic.services', []).factory('PhotoUploadService', [ '$q', '$ionicLoading', '$timeout', function($q, $ionicLoading, $timeout) {
	var uri = encodeURI('http://192.168.8.100:8080/upload');

	return {
		getAllPhotos : function(callBack, photos) {
			photos;
			$ionicLoading.show({
				template : '读取照片...'
			});
			CameraRoll.getPhotos(function(photo) {
				if (photo) {
					photos.push(photo);
				} else {
					$timeout(function() {
						$ionicLoading.hide();
						callBack();
					}, 500);
				}
			});
		},
		upload : function(photo) {
			var deferred = $q.defer();
			resolveLocalFileSystemURL(photo, function(fileEntry) {
				fileEntry.file(function(file) {
					var ft = new FileTransfer();
					ft.onprogress = function(progressEvent) {
					    if (progressEvent.lengthComputable) {
					      console.log(((progressEvent.loaded / progressEvent.total).toFixed(2) * 100) + "%");
					    } else {
					    	console.log('100%');
					    }
					};
					ft.upload(file.localURL, uri, function(response) {
						deferred.resolve(response);
					}, function(error) {
						deferred.reject(error);
					}, {
						fileKey : 'file',
						fileName : file.name,
						mimeType : file.type
					});
				});
			});
			return deferred.promise;
		},
		showTmpDir : function(){
			var path = cordova.file.tempDirectory;
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
} ])