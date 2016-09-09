var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster']);

app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
        when('/login', {
            title: 'Login',
            templateUrl: 'partials/login.html',
            controller: 'authCtrl'
        })
            .when('/logout', {
                title: 'Logout',
                templateUrl: 'partials/login.html',
                controller: 'logoutCtrl'
            })
            .when('/signup', {
                title: 'Signup',
                templateUrl: 'partials/signup.html',
                controller: 'authCtrl'
            })
            .when('/dashboard', {
                title: 'Dashboard',
                templateUrl: 'partials/dashboard.html',
                controller: 'authCtrl'
            })
            .when('/examques',{
                title:'Exam_Question',
                templateUrl:'partials/ExamQues.html',
                controller:'authCtrl'
            })
            .when('/results',{
                title:'Exam_Results',
                templateUrl:'partials/results.html',
                controller:'authCtrl'
            })
            .when('/quizques', {
                title: 'QuizQuestions',
                templateUrl: 'partials/QuizQues.html',
                controller: 'authCtrl',
                
            })
            .when('/', {
                title: 'Login',
                templateUrl: 'partials/login.html',
                controller: 'authCtrl',
                role: '0'
            })
            
            .otherwise({
                redirectTo: '/login'
            });
  }])
    .run(function ($rootScope, $location, Data,myService) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.authenticated = false;
            Data.get('session').then(function (results) {
                if (results.uid) {
                    $rootScope.authenticated = true;
                    $rootScope.uid = results.uid;
                    $rootScope.name = results.name;
                    $rootScope.email = results.email;
                    $rootScope.question_tab;
                    $rootScope.result_tab;
                  //  myService.set_user(results);
                } else {
                    var nextUrl = next.$$route.originalPath;
                    if (nextUrl == '/signup' || nextUrl == '/login' ) {

                    }else{
                        $location.path('/login');
                    }
                }
            });
        });
    })
    .factory('myService', function() {
        /**
        var savedData_name = {};
        var savedData_tab = {};
        var resultdata={};
        var user_arr={};
        var result_tab={};
        var question_tab={};
        var setvar=1;
            function set(data_name,data_tab) {
             console.log("data saved "+data_name + setvar + " " + data_tab);
                savedData_name = data_name;
                savedData_tab=data_tab;
                setvar=1;
            }
            function get_name() {
                console.log("data returned "+savedData_name+setvar);
                if(setvar==0){
                    return null;
                }else{
                     console.log("returned");
                return savedData_name;
                }
               
                }
                function get_tab(){
                    console.log("data returned "+savedData_tab+setvar);
                if(setvar==0){
                    return null;
                }else{
                     console.log("returned");
                return savedData_tab;
                }
                }
                function set_user(userarr){
                    console.log(userarr.name);
                    user_arr=userarr;
                }
                function get_user(){
                    console.log(user_arr.name+"returned");
                    return user_arr;
                }
                function set_resulttab(res_tab){
                    result_tab=res_tab;
                }
                function get_resulttab(){
                    return result_tab;
                }
                function set_questab(ques_tab){
                    question_tab=ques_tab;
                }
                function get_questab(){
                    return question_tab;
                }

                return {
                 set: set,
                 get_name: get_name,
                 get_tab:get_tab,
                 set_user:set_user,
                 get_user:get_user,
                 set_resulttab:set_resulttab,
                 get_resulttab:get_resulttab,
                 set_questab:set_questab,
                 get_questab:get_questab

                }
                */

    })
/**.config(['$httpProvider', function ($httpProvider) {
  // Intercept POST requests, convert to standard form encoding
  $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  $httpProvider.defaults.transformRequest.unshift(function (data, headersGetter) {
    var key, result = [];

    if (typeof data === "string")
      return data;

    for (key in data) {
      if (data.hasOwnProperty(key))
        result.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
    }
    return result.join("&");
  });
}])*/;

