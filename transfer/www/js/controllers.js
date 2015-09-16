angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicPlatform) {
	$ionicPlatform.ready(function() {
		var uri = encodeURI('http://192.168.45.94:8080/upload');
		var filePath = "file:///sdcard/Download/E72C971F91F96D7CA8FF3863EEB5E065E1ACB66E.bin";
		$scope.progress = 0;
		var pro = document.getElementById('progress');
		$scope.upload = function() {
			$scope.progress = 0;
			var preProgress = 0;
			var ft = new FileTransfer();
			ft.onprogress = function(progressEvent) {
				if (progressEvent.lengthComputable) {
					preProgress = parseInt(progressEvent.loaded / progressEvent.total * 100);
					if (preProgress != $scope.progress){
						$scope.progress = preProgress;
						pro.value = $scope.progress;
					}
				}
			};
			ft.upload(filePath, uri, function(response) {
				console.log('Success->', JSON.stringify(response));
				$scope.progress = 100;
				pro.value = 100;
			}, function(error) {
				console.error(error);
			}, {
				fileKey : 'file',
				mimeType : 'application/bin',
				fileName : 'E72C971F91F96D7CA8FF3863EEB5E065E1ACB66E.bin'
			});
		
		};
	});
})

.controller('ChatsCtrl', function($scope, Chats) {

	$scope.chats = Chats.all();
	$scope.remove = function(chat) {
		Chats.remove(chat);
	};
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
	$scope.settings = {
		enableFriends : true
	};
});
