angular.module('generic.services', [])
.factory('PhotoUploadService', ['$q', function($q){
	return {
		getAllPhotos : function(callBack){
			var photos = [];
			CameraRoll.getPhotos(function(photo){
				if (photo){
					photos.push(photo);
				}else{
					callBack(photos);
				}
			});
		}
	};
}])