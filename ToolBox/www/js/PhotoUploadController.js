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
							if (result != 1){
								return;
							}
							
							var uri = encodeURI('http://192.168.45.94:8080/upload');
							
							$scope.photos.forEach(function(photo){
								resolveLocalFileSystemURL(photo, function(fileEntry) {
									fileEntry.file(function(file){
										var ft = new FileTransfer();
										ft.upload(file.localURL, uri, function(response){
											console.log('Success->', response);
										}, function(error){
											console.log('Error->', error);
										}, {
											fileKey : 'file',
											fileName : file.name,
											mimeType : file.type,
											params : {name : file.name}
										});
									});
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