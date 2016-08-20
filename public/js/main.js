/**
 * Main AngularJS Web Application
 */
var app = angular.module('ymaaSPA', [
  'ngRoute'
]);

/**
 * Configure the Routes - git push
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "../partials/home.html", controller: "HomeCtrl"})
    // Pages
    .when("/about", {templateUrl: "../partials/about.html", controller: "PageCtrl"})
    .when("/research", {templateUrl: "../partials/research.html", controller: "PageCtrl"})
    .when("/alzheimers", {templateUrl: "../partials/alzheimers.html", controller: "PageCtrl"})
    .when("/school/:school_name", {templateUrl: "../partials/ucla.html", controller: "ChapterCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "../partials/404.html", controller: "PageCtrl"});
}]);

/**
 * Controls the Home
 */
app.controller('HomeCtrl', function ($scope/* $scope, $location, $http */) {
  // console.log("Home Controller reporting for duty.");
  // $.OrderlyTyper.options = {
  //       rotateRamdomly    : false,
  //       highlightSpeed    : 20,
  //       typeSpeed         : 100,
  //       clearDelay        : 500,
  //       typeDelay         : 200,
  //       clearOnHighlight  : true,
  //       OrderlyTyperDataAttr     : 'data-OrderlyTyper-targets',
  //       OrderlyTyperInterval     : 4000
  //     }

  // $('[data-OrderlyTyper-targets]').OrderlyTyper();
  function rotateText(){
    var text = $("[data-rotateText]").attr('data-rotateText');
    text = text.split(",");
    var delay = 5000;
    var index = 0;
    var rotation = window.setInterval(function(){
      if( index == (text.length - 1) ) {
        index = 0;
      } else {
        index ++;
      }
      $("[data-rotateText]").css("opacity","0");
      setTimeout(function(){
        $("[data-rotateText]").html(text[index]);
        $("[data-rotateText]").css("opacity","1");
      }, 1000);
    }, delay);

  }

  rotateText();
});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function ($scope, Server /* $scope, $location, $http */) {
  // console.log("Page Controller reporting for duty.");
  var reset = function(){
    $scope.message = false;
    $scope.timeline = false;
    $scope.youthb = false;
    $scope.board = false;
    $scope.advisors = false;
  };

  $scope.message = true;

  $scope.messageClick = function() {
    reset();
    $scope.message = true;
  };

  $scope.timelineClick = function() {
    reset();
    $scope.timeline = true;
  };

  $scope.ybClick = function() {
    reset();
    $scope.youthb = true;
  };

  $scope.boardClick = function() {
    reset();
    $scope.board = true;
  };

  $scope.advisorsClick = function() {
    reset();
    $scope.advisors = true;
    // Server.saveSchool({
    //   name: "UCLA",
    //   impact: "lolol",
    //   address: "1234 sd sf sd",
    // }, function(error, resp){
    //   console.log(error, resp);
    // });
  };

  

});

/**
 * Controls the Chapters
 */
app.controller('ChapterCtrl', function ($scope, $routeParams, Server/* $scope, $location, $http */) {
  // console.log("Page Controller reporting for duty.");
  var sectionScroll;
  var scrollPosition;

  console.log($routeParams);

  Server.getSchool($routeParams.school_name, function(error, resp){
    console.log(error, resp);
  });

  Server.uploadProfilePicture("http://localhost:8000/assets/images/andrew.jpg",
    function(error, resp){
      console.log(error, resp);
    });

  $(".sub_navbar a").off().one("click", function(e){
    e.preventDefault();
    e.stopPropagation();
    sectionScroll = $(this).attr("data-href");
    scrollPosition = $(sectionScroll).offset().top + "px";
    console.log(scrollPosition);
    $("html, body").animate({ scrollTop: scrollPosition });
  });
});

/**
 * Controls navBar
 */
app.controller('NavCtrl', function ($scope, $location/* $scope, $location, $http */) {
  // console.log("Nav Controller reporting for duty.");
  $scope.nav = false;
  if($location.url() != '/'){
          $scope.nav = true;
  }else{
      $scope.nav = false;
  }  
  
  $scope.$on('$locationChangeSuccess', function () {
    // console.log($location.url(), $scope.nav);
    if($location.url() != '/'){
            $scope.nav = true;
    }else{
        $scope.nav = false;
    }  
  });
});

app.factory('Server', function ($http) {
  var factory = {};
  // fix push
  factory.getSchool = (schoolName, onComplete) => {
    $http.get(`/school/${schoolName}`).then((resp) => {
      onComplete(null, resp);
    }, (err) => {
      onComplete(err, null);
    });
  };

  factory.saveSchool = (data, onComplete) => {
    $http.post('/save_school', {school_info: data}).then((resp) => {
      onComplete(null, resp);
    }, (err) => {
      onComplete(err, null);
    });
  };

  factory.uploadProfilePicture = (picture, onComplete) => {
    $http.post('/upload_profile_picture', {picture: picture}).then((resp) => {
      onComplete(null, resp);
    }, (err) => {
      onComplete(err, null);
    });
  };

  factory.donate = (paymentData, onComplete) => {
    $http.post('/donate', {payment_data: paymentData}).then((resp) => {
      onComplete(null, resp);
    }, (err) => {
      onComplete(err, null);
    });
  };

  return factory;
});
