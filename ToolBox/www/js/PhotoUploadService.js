angular.module('generic.services', []).factory('PhotoUploadService', [ '$q', '$ionicLoading', function($q, $ionicLoading) {
	return {
		getAllPhotos : function(callBack) {
			var photos = [];
			$ionicLoading.show({
				template : '读取照片...'
			});
			CameraRoll.getPhotos(function(photo) {
				if (photo) {
					photos.push(photo);
					console.log('Size->', photos.length);
				} else {
					$ionicLoading.hide();
					callBack(photos);
				}
			});
		}
	};
} ])