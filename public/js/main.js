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
    .when("/create", {templateUrl: "../partials/create.html", controller: "CreateCtrl"})
    .when("/:school_name", {templateUrl: "../partials/ucla.html", controller: "ChapterCtrl"})
    // else 404
    .when("/404", {templateUrl: "../partials/404.html", controller: "ChapterCtrl"})
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
  };

  

});

/**
 * Controls the Chapters
 */
app.controller('ChapterCtrl', function ($sce, $scope, $routeParams, Server/* $scope, $location, $http */) {
  // console.log("Page Controller reporting for duty.");
  var sectionScroll;
  var scrollPosition;

  console.log($routeParams);

  $scope.trustAsResourceUrl = $sce.trustAsResourceUrl;

  Server.getSchool($routeParams.school_name, function(error, resp){
     console.log(error, resp);
    if (!resp.data[0]) {
      window.location = "/#/404";
    } 
    else{
      $scope.school = resp.data[0];
      $scope.school.team.forEach(function(elem){
        if (!elem.prof_url) {
          elem.prof_url = "assets/images/user.png";
        }
      });
      $scope.school.news.forEach(function(elem){
        if (!elem.image_url) {
          elem.image_url = "assets/images/why1.png";
        }
      });
    }
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


app.controller('CreateCtrl', function ($scope, $routeParams, Server) {
  console.log("Create Controller reporting for duty.");

  $(".createSubmit").click(function(){
    var file = $scope.myFile;
                   
    console.log('file is ' );
    console.dir(file);

    // Server.uploadProfilePicture("http://localhost:8000/assets/images/andrew.jpg",
    // function(error, resp){
    //   console.log(error, resp);
    // });

    //   var reader = new FileReader();
    //   reader.onload = function(){
    //     var dataURL = reader.result;
    //     Server.uploadProfilePicture(dataURL, function(error, resp){
    //         console.log(error, resp);
    //     });
    //   };
    //   reader.readAsDataURL(file);

    // });
    // Server.uploadProfilePicture("http://localhost:8000/assets/images/andrew.jpg",
    //   function(error, resp){
    //     console.log(error, resp);
    //   });
    var members = [];
    var news = [];
    if ($scope.name1) {
      members.push({
        name: $scope.name1,
        position: $scope.position1,
        prof_url: "",
      });
    }
    if ($scope.name2) {
      members.push({
        name: $scope.name2,
        position: $scope.position2,
        prof_url: "",
      });
    }
    if ($scope.name3) {
      members.push({
        name: $scope.name3,
        position: $scope.position3,
        prof_url: "",
      });
    }
    if ($scope.name4) {
      members.push({
        name: $scope.name4,
        position: $scope.position4,
        prof_url: "",
      });
    }
    if ($scope.name5) {
      members.push({
        name: $scope.name5,
        position: $scope.position5,
        prof_url: "",
      });
    }
    if ($scope.name6) {
      members.push({
        name: $scope.name6,
        position: $scope.position6,
        prof_url: "",
      });
    }
    if ($scope.title1) {
      news.push({
        title: $scope.title1,
        date: $scope.date1,
        article_url: $scope.article_url1,
        image_url: "",
      });
    }
    if ($scope.title2) {
      news.push({
        title: $scope.title2,
        date: $scope.date2,
        article_url: $scope.article_url2,
        image_url: "",
      });
    }
    if ($scope.title3) {
      news.push({
        title: $scope.title3,
        date: $scope.date3,
        article_url: $scope.article_url3,
        image_url: "",
      });
    }

    Server.saveSchool({
      name: $scope.name,
      impact: $scope.impact,
      address: $scope.address,
      fb_link: $scope.fb_link,
      instagram: $scope.fb_link,
      twitter_link: $scope.twitter_link,
      calendar: $scope.calendar,
      team: members,
      news: news,
    }, function(error, resp){
      console.log(error, resp);
    });
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


app.directive('fileModel', ['$parse', function ($parse) {
  return {
     restrict: 'A',
     link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;
        
        element.bind('change', function(){
           scope.$apply(function(){
              modelSetter(scope, element[0].files[0]);
           });
        });
     }
  };
}]);


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
