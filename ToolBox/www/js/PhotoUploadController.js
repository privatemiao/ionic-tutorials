angular.module('generic.controllers', [])
.controller('PhotoUploadController', 
		[ '$scope', '$ionicPlatform', 'PhotoUploadService', '$cordovaToast', 
		  function($scope, $ionicPlatform, PhotoUploadService, $cordovaToast) {
	$ionicPlatform.ready(function() {
		$scope.photos = [];
		$scope.upload = function() {
			PhotoUploadService.getAllPhotos(function(){
				if ($scope.photos.length == 0){
					$cordovaToast.show('没有找到照片！', 'long', 'center');
					return;
				}
				navigator.notification.confirm('确定要上传 '+$scope.photos.length+' 张照片吗？', function(result){
					$scope.photos.forEach(function(photo){
						resolveLocalFileSystemURL(photo, function(fileEntry) {
//							console.log('FileEntry->', fileEntry);
						});
					});
				}, '上传照片', ['确定', '取消'])
			}, (function(){
				$scope.photos = [];
				return $scope.photos;
			})());
		};// end upload
	});
} ])