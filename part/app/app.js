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
            .when('/quiz_page', {
                title: 'Quiz_Page',
                templateUrl: 'partials/quiz_page.html',
                controller:'authCtrl'
                
            })
            .when('/result', {
                title: 'result',
                templateUrl: 'partials/result.html',
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
                    $rootScope.res_tab="";
                    myService.set_user(results);
                    $location.path(nextUrl);
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
        var savedData_name = {};
        var savedData_tab = {};
        var savedData_hours = {};
        var savedData_mins = {};
        var resultdata={};
        var user_arr={};
        var result={};
        var setvar=1;
            function set(data_name,data_tab,data_hours,data_mins) {
            // console.log("data saved "+data_name + setvar + " " + data_tab+" "+data_mins+" "+data_hours);
                savedData_name = data_name;
                savedData_tab=data_tab;
                savedData_hours=data_hours;
                savedData_mins=data_mins;
                setvar=1;
            }
            function set_result(data_result){
                result=data_result;
                                        console.log("saved "+result);

            }

            function get_result(){
                                        console.log("returned "+result);

                return result;
            }

            function get_name() {
                //console.log("data returned "+savedData_name+setvar);
                if(setvar==0){
                         return null;
                    }else{
                        //console.log("returned");
                         return savedData_name;
                     }
                }
            function get_tab(){
                    //console.log("data returned "+savedData_tab+setvar);
                     if(setvar==0){
                        return null;
                    }else{
                     //    console.log("returned");
                    return savedData_tab;
                    }
                }


            function get_hours(){
                    //console.log("data returned "+savedData_hours+setvar);
                    if(setvar==0){
                        return null;
                     }else{
                       //  console.log("returned");
                        return savedData_hours;
                    }
                }

            function get_mins(){
                    //console.log("data returned "+savedData_mins+setvar);
                    if(setvar==0){
                         return null;
                    }else{
                     //    console.log("returned");
                        return savedData_mins;
                    }
                }



                function set_user(userarr){
                   // console.log(userarr.name);
                    user_arr=userarr;
                }
                function get_user(){
                  //  console.log(user_arr.name+"returned");
                    return user_arr;
                }

                return {
                 set: set,
                 get_name: get_name,
                 get_tab:get_tab,
                 set_user:set_user,
                 get_user:get_user,
                 get_mins:get_mins,
                 get_hours:get_hours,
                 set_result:set_result,
                 get_result:get_result
                }

    });

