var app = angular.module('MainApp', ['ngRoute']);
var controllers = {};
var factories = {};
app.controller(controllers);
app.factory(factories);
app.config(function($routeProvider, $locationProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'partials/editSelect.html',
    controller: 'EditSelectCtrl',
  }).
  when('/viewSites', {
    templateUrl: 'partials/home.html',
    controller: 'HomeCtrl',
  }).  
  when('/editPage/:ref', {
   	templateUrl: 'partials/editPage.html',
    controller: 'EditPageCtrl',
  }).
  otherwise('/');
});

controllers.HomeCtrl = function ($scope, $http) {
  $.get('api/names').then(function (data){
    $scope.names = data;
    $scope.$apply();
  });
}

controllers.EditSelectCtrl = function ($scope, $http) {
    $.get('api/names').then(function (data){
      $scope.names = data;
      $scope.$apply();
  });
}

controllers.EditPageCtrl = function ($scope, $http, $routeParams) {
  $scope.pageURL = "/sites/"+ $routeParams.ref +".html";
  $scope.ref = $routeParams.ref;
  var url = 'api/file/' + $routeParams.ref + '.html';
  $.get(url).then(function (data){
    $scope.fileData = data;
    $scope.$apply();
  });

  $scope.saveBtn = function () {
    var sendData = { data : $scope.fileData };
   $.post(url, sendData).then(function (){
      alert("Successfully saved your page!");
   });
  }
}
