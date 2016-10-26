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
    .when("/verify", {templateUrl: "../partials/verify.html", controller: "VerifyCtrl"})
    .when("/chapters", {templateUrl: "../partials/chapters.html", controller: "ChaptersCtrl"})
    .when("/404", {templateUrl: "../partials/four.html", controller: "FourCtrl"})
    .when("/:school_name", {templateUrl: "../partials/ucla.html", controller: "ChapterCtrl"})
    // else 404
}]);

/**
 * Controls the Home
 */
app.controller('HomeCtrl', function ($scope/* $scope, $location, $http */) {
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

 app.controller('VerifyCtrl', function ($scope, Server/* $scope, $location, $http */) {
    Server.getListOfSchools("", function(error, resp){
       console.log(error, resp);
       $scope.schools = resp.data;
     });
 });

 app.controller('ChaptersCtrl', function ($scope, Server/* $scope, $location, $http */) {
    Server.getListOfSchools("", function(error, resp){
       console.log(error, resp);
       $scope.schools = resp.data;
     });
 });

 app.controller('FourCtrl', function ($scope, Server/* $scope, $location, $http */) {
  
 });


app.controller('PageCtrl', function ($scope, Server /* $scope, $location, $http */) {
  // console.log("Page Controller reporting for duty.");
  var reset = function(){
    $scope.message = false;
    $scope.timeline = false;
    $scope.youthb = false;
    $scope.board = false;
    $scope.advisors = false;
    $scope.outreach = false;
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

  $scope.outreachClick = function() {
    reset();
    $scope.outreach = true;
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
    if (!resp.data[resp.data.length - 1]) {
      window.location = "/#/404";
    } 
    else{
      $scope.school = resp.data[resp.data.length - 1];
      var backgroundUrl = "url('"+$scope.school.background+"')";
      console.log(backgroundUrl);
      $("#splashChapter").css("background",backgroundUrl);
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

  $scope.verifyStatus = "";
  $scope.verified = false;

  $(".verifyName").click(function(){
      if(!$scope.name || !$scope.password)
        return;

      Server.getSchool($scope.name, function(error, resp){
         console.log(error, resp);
        if (!resp.data[resp.data.length - 1]) {
          $scope.verifyStatus = "Available";
        } 
        else{
          if(resp.data[resp.data.length - 1].password != $scope.password){
            $scope.verifyStatus = "Wrong Password";
            return;
          }
          $scope.verifyStatus = "Found";
          $scope.school = resp.data[resp.data.length - 1];
          console.log($scope.school);
          $scope.verified = $scope.school.verified;
          $scope.address = $scope.school.address;
          $scope.impact = $scope.school.impact;

          $scope.background = $scope.school.background;
          $scope.state = $scope.school.state;
          $scope.prevFunds = $scope.school.prevFunds;
          $scope.fundGoals = $scope.school.fundGoals;

          $scope.fb_link = $scope.school.fb_link;
          $scope.instagram_link = $scope.school.instagram_link;
          $scope.twitter_link = $scope.school.twitter_link;
          $scope.calendar = $scope.school.calendar;

          $scope.school.team.forEach(function(elem, index){
            if (!elem.prof_url) {
              elem.prof_url = "assets/images/user.png";
            }
            $scope["name"+(index+1)] = elem.name;
            $scope["position"+(index+1)] = elem.position;
            $scope["prof_urls"+index] = elem.prof_url;
          });

          $scope.school.news.forEach(function(elem){
            if (!elem.image_url) {
              elem.image_url = "assets/images/why1.png";
            }
          });
        }
      });
  });

  $scope.imageError = ["","","","","",""];
  $scope.prof_urls = ["","","","","",""];

  $scope.uploadImage = function(ind) {
    var temp = "myFile" + (ind + 1);
    var file = $scope[temp];
    console.log(file);
    var reader = new FileReader();
    reader.onload = function(){
      var dataURL = reader.result;
      Server.uploadProfilePicture(dataURL, file.type, $scope.name + "-" + file.name, function(error, resp){
          if(error) {
            console.log("loda", error);
            $scope.imageError[ind] = error.data;
          } else if(resp.status == 200) {
            $scope.imageError[ind] = "Uploaded";
            $scope.prof_urls[ind] = "https://ymaa-content.s3-us-west-2.amazonaws.com/" + $scope.name + "-" + file.name;
          }
      });
    };
    reader.readAsDataURL(file);
  };


  $(".createSubmit").click(function(){
    var file = $scope.myFile1;

    console.log('file is ' );
    console.log(file);

    var members = [];
    var news = [];

    if ($scope.name1) {
      members.push({
        name: $scope.name1,
        position: $scope.position1,
        prof_url: $scope.prof_urls[0],
      });
    }
    if ($scope.name2) {
      members.push({
        name: $scope.name2,
        position: $scope.position2,
        prof_url: $scope.prof_urls[1],
      });
    }
    if ($scope.name3) {
      members.push({
        name: $scope.name3,
        position: $scope.position3,
        prof_url: $scope.prof_urls[2],
      });
    }
    if ($scope.name4) {
      members.push({
        name: $scope.name4,
        position: $scope.position4,
        prof_url: $scope.prof_urls[3],
      });
    }
    if ($scope.name5) {
      members.push({
        name: $scope.name5,
        position: $scope.position5,
        prof_url: $scope.prof_urls[4],
      });
    }
    if ($scope.name6) {
      members.push({
        name: $scope.name6,
        position: $scope.position6,
        prof_url: $scope.prof_urls[5],
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
      password: $scope.password,
      verified: $scope.verified,
      background: $scope.background,
      impact: $scope.impact,
      prevFunds: $scope.prevFunds,
      fundGoals: $scope.fundGoals,
      address: $scope.address,
      state: $scope.state,
      fb_link: $scope.fb_link,
      instagram_link: $scope.fb_link,
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

// figure out the image thing and fix that
// and make a get school-list request call in the factory to get the lists of schools


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

  factory.getListOfSchools = (schoolName, onComplete) => {
    $http.get('/list_of_schools/').then((resp) => {
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

  factory.uploadProfilePicture = (picture, mimetype, name, onComplete) => {
    $http.post('/upload_profile_picture', {name: name, picture: picture, type: mimetype}).then((resp) => {
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
