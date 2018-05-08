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
    .when("/winners2017", {templateUrl: "../partials/winners2017.html", controller: "PageCtrl"})
    .when("/create", {templateUrl: "../partials/create.html", controller: "CreateCtrl"})
    .when("/join", {templateUrl: "../partials/join.html", controller: "JoinCtrl"})
    .when("/verify", {templateUrl: "../partials/verify.html", controller: "VerifyCtrl"})
    .when("/chapters", {templateUrl: "../partials/chapters.html", controller: "ChaptersCtrl"})
    .when("/404", {templateUrl: "../partials/four.html", controller: "FourCtrl"})
    .when("/map", {templateUrl: "../partials/four.html", controller: "TempCtrl"})
    .when("/syllabus", {templateUrl: "../partials/syllabus.html", controller: "PageCtrl"})
    .when("/tshirts", {templateUrl: "../partials/tshirts.html", controller: "PageCtrl"})
    .when("/newMember", {templateUrl: "../partials/newMember.html", controller: "PageCtrl"})
    .when("/newmember", {templateUrl: "../partials/newMember.html", controller: "PageCtrl"})
    .when("/futureOfCare", {templateUrl: "../partials/futureOfCare.html", controller: "PageCtrl"})
    .when("/uscApply", {templateUrl: "../partials/uscApply.html", controller: "PageCtrl"})
    .when("/press", {templateUrl: "../partials/press.html", controller: "PageCtrl"})
    .when("/ab2101", {templateUrl: "../partials/ab2101.html", controller: "PageCtrl"})
    .when("/joinOurTeam", {templateUrl: "../partials/joinOurTeam.html", controller: "PageCtrl"})

    .when("/:school_name", {templateUrl: "../partials/ucla.html", controller: "ChapterCtrl"})

    // else 404
}]);

/**
 * Controls the Home
 */
app.controller('HomeCtrl', function ($scope, Server/* $scope, $location, $http */) {
  $scope.showAlert = 1;

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
      }, 5000);
    }, delay);

  }

  rotateText();

  window.setTimeout(function(){
    if($scope.showAlert === 1) {
      $scope.showAlert = 0;
      $(".popup").css("display","flex").hide().fadeIn("slow");
    }
  }, 5000);

  Server.getListOfSchools("", function(error, resp){
     console.log(error, resp);
     $scope.schools = resp.data;
   });

  $(".signUpHomeBtn").click(function(){
    $scope.showAlert = 0;
    var email = $("input[name='emailSignup']")[0].value;
    window.open("http://theyouthmovement.us12.list-manage1.com/subscribe?u=5f851aa4acb0fd4c38a3e670b&id=e490bdf6a7&MERGE0="+email);
  });

  $('.popup').on('click', function(e) {
    if (e.target !== this)
      return;
    
    $(".popup").fadeOut("slow").hide();
    $scope.showAlert = 0;
  });

});

/**
 * Controls all other Pages
 */

 app.controller('VerifyCtrl', function ($scope, Server/* $scope, $location, $http */) {
    $scope.password = false;
    $scope.passkey = "fsdf";

    Server.getListOfSchools("", function(error, resp){
       console.log(error, resp);
       var schools = resp.data;
       $scope.schools = [];
       for (var i = schools.length-1; i >= 0; i--) {
        var tempSchools = jQuery.grep($scope.schools, function(school) {
          if(school) {
            return school.name == schools[i].name;
          }
          return false;
        })

        if (!tempSchools.length) {
          $scope.schools.push(schools[i]);
        }
       }

       console.log($scope.schools);

       for (var i = 0; i < $scope.schools.length; i++) {
          if($scope.schools[i].verified && $scope.schools[i].verified == "true") {
            $scope.schools[i].verified = true;
          } else {
            $scope.schools[i].verified = false;
          }  
       }

       console.log($scope.schools);

     });

    $scope.check = function(passkey) {
      console.log("", passkey, "");
      if(passkey == "ymaaendalz") {
        $scope.password = true;
        console.log("mazaa");
      }
    };

    $(".schoolVerifyForm").on("click", "#verifyButton", function(){
      var name = $(this).attr("data-name");
      console.log($(this).attr("data-name"));
      Server.getSchool(name, function(error, resp){
        var school = resp.data[resp.data.length - 1];
        
        if(school.verified && school.verified == "true") {
          school.verified = "false";
        } else {
          school.verified = "true";
        }

        Server.saveSchool(school, function(error, resp){
          console.log(error, resp);
          location.reload();
        });

      });
    })
 });

 app.controller('JoinCtrl', function ($scope, Server/* $scope, $location, $http */) {

 });


 app.controller('ChaptersCtrl', function ($scope, Server/* $scope, $location, $http */) {
    Server.getListOfSchools("", function(error, resp){
       console.log(error, resp);
       var schools = resp.data;
       $scope.schools = [];
       for (var i = schools.length; i >= 0; i--) {
        var tempSchools = jQuery.grep($scope.schools, function(school) {
          if(school) {
            return school.name == schools[i].name;
          }
          return false;
        })
        if (!tempSchools.length) {
          $scope.schools.push(schools[i]);
        }

       }
     });
 });

 app.controller('FourCtrl', function ($scope, Server/* $scope, $location, $http */) {
  
 });

 app.controller('TempCtrl', function ($scope, Server/* $scope, $location, $http */) {
    window.location.assign("https://drive.google.com/open?id=1i9yAEOND7s_J3eYOqNjevy_36y4&usp=sharing")
 });


app.controller('PageCtrl', function ($scope, Server /* $scope, $location, $http */) {
  // console.log("Page Controller reporting for duty.");
  var reset = function(){
    $scope.message = false;
    $scope.timeline = false;
    $scope.youthb = false;
    $scope.board = false;
    $scope.advisors = false;
    $scope.honorboard = false;
    $scope.friends = false;
    $scope.joinTeam = false;
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

  $scope.hbClick = function() {
    reset();
    $scope.honorboard = true;
  };

   $scope.friendsClick = function() {
    reset();
    $scope.friends = true;
  };

  $scope.joinTeamClick = function() {
    reset();
    $scope.joinTeam = true;
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
      if($scope.school.verified == "false") {
        window.location = "/#/404";  
      }
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

  $scope.openLink = function(link) {
    window.open(link);
  };

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
  $scope.verified = "false";

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

          if(!$scope.verified) {
            $scope.verified = "false";
          }
          $scope.address = $scope.school.address;
          $scope.impact = $scope.school.impact;

          $scope.background = $scope.school.background;
          $scope.state = $scope.school.state;
          $scope.prevFunds = $scope.school.prevFunds;
          $scope.fundGoals = $scope.school.fundGoals;
          $scope.schoolNumber = $scope.school.schoolNumber;

          $scope.fb_link = $scope.school.fb_link;
          $scope.instagram_link = $scope.school.instagram_link;
          $scope.twitter_link = $scope.school.twitter_link;
          $scope.calendar = $scope.school.calendar;
          $scope.galleria = $scope.school.galleria;
          $scope.insta_galleria = $scope.school.insta_galleria;

          $scope.school.team.forEach(function(elem, index){
            if (!elem.prof_url) {
              elem.prof_url = "assets/images/user.png";
            }
            $scope["name"+(index+1)] = elem.name;
            $scope["position"+(index+1)] = elem.position;
            $scope["about"+(index+1)] = elem.about;
            $scope["link"+(index+1)] = elem.link;
            $scope.prof_urls[index] = elem.prof_url;
          });

          $scope.school.news.forEach(function(elem, index){
            if (!elem.image_url) {
              elem.image_url = "assets/images/why1.png";
            }
            $scope["title"+(index+1)] = elem.title;
            $scope["date"+(index+1)] = elem.date;
            $scope["article_url"+(index+1)] = elem.article_url;
          });
        }
      });
  });

  $scope.imageError = ["","","","","","","","","","","",""];
  $scope.prof_urls = ["","","","","","","","","","","",""];

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
        about: $scope.about1,
        link: $scope.link1,
      });
    }
    if ($scope.name2) {
      members.push({
        name: $scope.name2,
        position: $scope.position2,
        prof_url: $scope.prof_urls[1],
        about: $scope.about2,
        link: $scope.link2,
      });
    }
    if ($scope.name3) {
      members.push({
        name: $scope.name3,
        position: $scope.position3,
        prof_url: $scope.prof_urls[2],
        about: $scope.about3,
        link: $scope.link3,
      });
    }
    if ($scope.name4) {
      members.push({
        name: $scope.name4,
        position: $scope.position4,
        prof_url: $scope.prof_urls[3],
        about: $scope.about4,
        link: $scope.link4,
      });
    }
    if ($scope.name5) {
      members.push({
        name: $scope.name5,
        position: $scope.position5,
        prof_url: $scope.prof_urls[4],
        about: $scope.about5,
        link: $scope.link5,
      });
    }
    if ($scope.name6) {
      members.push({
        name: $scope.name6,
        position: $scope.position6,
        prof_url: $scope.prof_urls[5],
        about: $scope.about6,
        link: $scope.link6,
      });
    }
    if ($scope.name7) {
      members.push({
        name: $scope.name7,
        position: $scope.position7,
        prof_url: $scope.prof_urls[6],
        about: $scope.about7,
        link: $scope.link7,
      });
    }
    if ($scope.name8) {
      members.push({
        name: $scope.name8,
        position: $scope.position8,
        prof_url: $scope.prof_urls[7],
        about: $scope.about8,
        link: $scope.link8,
      });
    }
    if ($scope.name9) {
      members.push({
        name: $scope.name9,
        position: $scope.position9,
        prof_url: $scope.prof_urls[8],
        about: $scope.about9,
        link: $scope.link9,
      });
    }
    if ($scope.name10) {
      members.push({
        name: $scope.name10,
        position: $scope.position10,
        prof_url: $scope.prof_urls[9],
        about: $scope.about10,
        link: $scope.link10,
      });
    }
    if ($scope.name11) {
      members.push({
        name: $scope.name11,
        position: $scope.position11,
        prof_url: $scope.prof_urls[10],
        about: $scope.about11,
        link: $scope.link11,
      });
    }
    if ($scope.name12) {
      members.push({
        name: $scope.name12,
        position: $scope.position12,
        prof_url: $scope.prof_urls[11],
        about: $scope.about12,
        link: $scope.link12,
      });
    }

    if ($scope.title1) {
      news.push({
        title: $scope.title1,
        date: $scope.date1,
        article_url: $scope.article_url1,
        image_url: $scope.image_url1,
      });
    }
    if ($scope.title2) {
      news.push({
        title: $scope.title2,
        date: $scope.date2,
        article_url: $scope.article_url2,
        image_url: $scope.image_url2,
      });
    }
    if ($scope.title3) {
      news.push({
        title: $scope.title3,
        date: $scope.date3,
        article_url: $scope.article_url3,
        image_url: $scope.image_url3,
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
      schoolNumber: $scope.schoolNumber,
      address: $scope.address,
      state: $scope.state,
      fb_link: $scope.fb_link,
      instagram_link: $scope.instagram_link,
      twitter_link: $scope.twitter_link,
      calendar: $scope.calendar,
      insta_galleria: $scope.insta_galleria,
      galleria: $scope.galleria,
      team: members,
      news: news,
    }, function(error, resp){
      console.log(error, resp);
      if(!error) {
        if(resp.status == 200) {
          window.alert("School info updated");
        }
      } else {
        window.alert("Error processing info. Please try again later.");
      }
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

  $("#mobileNav").slideUp(0);

  $(".hamburger").click(function(){
    $(".hamburger .fa").fadeOut(200)
    $("#mobileNav").slideToggle(600, function() {
      $(".hamburger .fa").toggleClass("fa-bars fa-close");
      $(".hamburger .fa").fadeIn(200)
    });
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
