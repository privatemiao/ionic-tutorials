angular.module('generic.controllers', []).controller('PhotoUploadController',
		[ '$scope', '$ionicPlatform', 'PhotoUploadService', '$cordovaToast', '$ionicLoading', '$timeout', function($scope, $ionicPlatform, PhotoUploadService, $cordovaToast, $ionicLoading, $timeout) {
			$ionicPlatform.ready(function() {
				$scope.photos = [];
				$scope.upload = function() {
					$scope.photos = [];

					PhotoUploadService.getAllPhotos(function() {
						if ($scope.photos.length == 0) {
							$cordovaToast.show('没有找到照片！', 'long', 'center');
							return;
						}
						navigator.notification.confirm('确定要上传 ' + $scope.photos.length + ' 张照片吗？', function(result) {
							if (result != 1) {
								return;
							}

							$scope.photos.forEach(function(photo) {
								PhotoUploadService.upload(photo).then(function(success) {
									console.log(success);
								}, function(error) {
									console.log(error);
								});
							});

						}, '上传照片', [ '确定', '取消' ])
					}, (function() {
						$scope.photos = [];
						return $scope.photos;
					})());
				};// end upload
			});
		} ])