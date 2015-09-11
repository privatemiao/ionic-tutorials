angular.module('generic.controllers', [])
.controller('PhotoUploadController', [ '$scope', '$ionicPlatform', 'PhotoUploadService', '$cordovaToast', function($scope, $ionicPlatform, PhotoUploadService, $cordovaToast) {
	$ionicPlatform.ready(function() {
		$scope.upload = function() {
			PhotoUploadService.getAllPhotos(function(photos){
				console.log('Photos->', photos.length);
				//navigator.notification.confirm(message, confirmCallback, [title], [buttonLabels])
				if (photos.length == 0){
					$cordovaToast.show('没有找到照片！', 'long', 'center');
					return;
				}
				navigator.notification.confirm('确定要上传吗？', function(result){
					if (result != 1){
						return;
					}
					photos.forEach(function(photo){
						resolveLocalFileSystemURL(photo, function(fileEntry) {
							console.log('FileEntry->', fileEntry);
						});
					});
					
					
				}, '上传照片', ['确定', '取消'])
			});
		};// end upload
	});
} ])