/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
var app = angular.module('ymaaSPA', [
  'ngRoute'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "HomeCtrl"})
    // Pages
    .when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

/**
 * Controls the Home
 */
app.controller('HomeCtrl', function ($scope/* $scope, $location, $http */) {
  console.log("Home Controller reporting for duty.");
});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function ($scope/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");
});

/**
 * Controls navBar
 */
app.controller('NavCtrl', function ($scope, $location/* $scope, $location, $http */) {
  console.log("Nav Controller reporting for duty.");
  $scope.nav = false;
  if($location.url() != '/'){
          $scope.nav = true;
  }else{
      $scope.nav = false;
  }  
  
  $scope.$on('$locationChangeSuccess', function () {
    console.log($location.url(), $scope.nav);
    if($location.url() != '/'){
            $scope.nav = true;
    }else{
        $scope.nav = false;
    }  
  });
  
});