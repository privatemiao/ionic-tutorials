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
					ft.upload(file.localURL, uri, function(response) {
//						console.log('Success->', response);
						deferred.resolve(response);
					}, function(error) {
//						console.log('Error->', error);
						deferred.reject(error);
					}, {
						fileKey : 'file',
						fileName : file.name,
						mimeType : file.type,
						params : {
							name : file.name
						},
						date : file.lastModified
					});
				});
			});
			return deferred.promise;
		}
	};
} ])