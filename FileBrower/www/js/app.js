// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('FileController', function($ionicPlatform, $scope){
  $ionicPlatform.ready(function(){
    console.log('Ionic Device Ready');

    $scope.echo = function(){
      console.log('Welcome');
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        var directory = fileSystem.root.createReader();
        directory.readEntries(function(entries){
          var buffer = [];
          entries.forEach(function(entry){
            console.log('Name->', entry.name);
            buffer.push(entry.name);
          })
          alert(buffer.join(' | '));
        }, function(error){
        console.error(error);
      });
      }, function(error){
        console.error(error);
      });
    };
  });
})