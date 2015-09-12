angular.module('generic.services', []).factory('PhotoUploadService', [ '$q', '$ionicLoading', function($q, $ionicLoading) {
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
					$ionicLoading.hide();
					callBack();
				}
			});
		}
	};
} ])