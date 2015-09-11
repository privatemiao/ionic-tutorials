angular.module('generic.controllers', []).controller('PhotoUploadController', [ '$scope', '$ionicPlatform', function($scope, $ionicPlatform) {
	$ionicPlatform.ready(function() {
		$scope.name = 'Mel';
	});
} ])