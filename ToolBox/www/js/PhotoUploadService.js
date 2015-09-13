angular.module('generic.services', []).factory('PhotoUploadService', [ '$q', '$ionicLoading', '$timeout', function($q, $ionicLoading, $timeout) {
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
		}
	};
} ])