angular.module('generic.controllers', []).controller('PhotoUploadController',
		[ '$scope', '$ionicPlatform', 'PhotoUploadService', '$cordovaToast', '$ionicLoading', '$timeout', function($scope, $ionicPlatform, PhotoUploadService, $cordovaToast, $ionicLoading, $timeout) {
			$ionicPlatform.ready(function() {
				$scope.photos = [];
				$scope.progressCount = 0;
				$scope.upload = function() {
					$scope.photos = [];
					$scope.progressCount = 0;

					PhotoUploadService.getAllPhotos(function() {
						if ($scope.photos.length == 0) {
							$cordovaToast.show('没有找到照片！', 'long', 'center');
							return;
						}
						navigator.notification.confirm('确定要上传 ' + $scope.photos.length + ' 张照片吗？', function(result) {
							if (result != 1) {
								return;
							}

							var photos = angular.copy($scope.photos);
							(function uploadNextPhoto(photo) {
								$scope.progressCount ++;
								PhotoUploadService.upload(photo).then(function(success) {
									console.log(JSON.stringify(success));
								}, function(error) {
									console.log(JSON.stringify(error));
								}).finally(function(){
									if (photos.length > 0){
										uploadNextPhoto(photos.splice(0, 1)[0]);
									}else{
										console.log('完成！');
										PhotoUploadService.showTmpDir().then(function(entries){
											$cordovaToast.show('完成！临时文件数量：' + entries.length, 'long', 'center');
										}, function(error){
											
										});
									}
								});
							})(photos.splice(0, 1)[0]);
							

						}, '上传照片', [ '确定', '取消' ])
					}, (function() {
						$scope.photos = [];
						return $scope.photos;
					})());
				};// end upload
			});
		} ])