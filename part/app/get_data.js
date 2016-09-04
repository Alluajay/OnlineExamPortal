
/* global $ */
app.controller('getdata',function($rootScope,$scope,$http,myService,$location,$interval){
	$http.post("api/getdata/getQuizList.php").success(function (response) {
			/*After Successfully fetch the data from JSON file assigning these data to $scope object variable*/
			//$scope.questions = response.records;
			$scope.members=response.records;
});
  console.log($rootScope.name);
	$scope.gotoquiz=function(quizname,quiztab,hours,mins,restab){
    console.log(mins+""+hours+""+quizname);
		myService.set(quizname,quiztab,hours,mins);
    $rootScope.res_tab=restab;
    console.log($rootScope.res_tab);
		$location.path('/quiz_page');
	}
});

app.controller('results',function($scope,$location,myService){
$scope.marks=myService.get_result();

});

app.controller('getQuizData',function ($rootScope,$scope, $window ,$rootScope,myService,$http,$location,$timeout,$interval) {
	$scope.Quizname=myService.get_name();
	$scope.Quiztabname=myService.get_tab();
  $scope.user=myService.get_user();
  $scope.hour=myService.get_hours();
  $scope.minutes=myService.get_mins();
  $scope.email=$rootScope.email;
  console.log($rootScope.email);

	if($scope.Quizname==null){
		console.log("empty");
	}else{
		 		   $http.get("api/getdata/Getquizques.php?tab="+$scope.Quiztabname).success(function (response) {
			/*After Successfully fetch the data from JSON file assigning these data to $scope object variable*/
			//$scope.questions = response.records;
			$scope.setGlobal(response);
			console.log("response got");

		});


  console.log($scope.user.name+" user got");

$scope.questions=[];
    $scope.setGlobal=function(response){
      $scope.questions=response.records;
      $scope.quesarr=[$scope.questions];
      }
  //$scope.questions=[];
  $scope.index=1;
  $scope.pos=$scope.index-1;
  $scope.results=[];
  $scope.submit=function(){
        $scope.marks = 0;
        console.log("submit called");

        //$scope.i=0;
      for (var i = 0; i < $scope.results.length; i++) {
       //console.log(angular.equals($scope.questions[i].ans,$scope.results[i]));

        if(angular.equals($scope.questions[i].ans,$scope.results[i])){
          console.log($scope.results[i]);
          //$http.post("",{'name':})
          
          $scope.marks=$scope.marks+parseInt($scope.questions[i].marks);
        }
      }
      console.log($scope.marks);
      myService.set_result($scope.marks);
      $scope.result_data={username:$rootScope.name,marks:$scope.marks,result_tab:$rootScope.res_tab,email:$rootScope.email,regno:$rootScope.regno};
      $http({
        method : "POST",
        url : "api/getdata/update_result.php",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
       transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
       },
      data: $scope.result_data
      }).success(function(response){
        $scope.qtable=response.qtable;
        $scope.setGlobal(response);
        myService.set_questab(response.qtable);
        console.log(response.message+$scope.qtable);
            toaster.pop(response.status, "", response.message, 1000, 'trustedHtml');
                $location.path('/quizques');
      });

      $location.path('/result');
    }
//timer starts
$scope.seconds=00;
$scope.counter=$scope.minutes*60;
if($scope.hour!=0 && $scope.minutes==0){
  $scope.tott=$scope.hour*60*60;
  $scope.seconds=60;
  $scope.minutes=59;
  $scope.hour--;
}else if($scope.hour==0 && $scope.minutes!=0){
  $scope.tott=$scope.minutes*60;
  $scope.seconds=60;
  $scope.minutes--;
}else if($scope.seconds!=0){
  $scope.tott=$scope.seconds;
}
var timer=$interval(function () {
      if($scope.tott!=0){
        if($scope.seconds==0 && $scope.tott!=0){
           if($scope.minutes!=0){
             $scope.seconds=60;
             $scope.minutes--;
            }else{
               if($scope.hour!=0){
                 $scope.minutes=59;
                 $scope.seconds=60;
                 $scope.hour--;
                }
            }
          } 


        $scope.seconds--;
        $scope.tott--;        
        }else{
          $interval.cancel(timer);
          $scope.submit();
        }      
   }, 10);		   
 }
 //timer ends
 	//console.log($scope.questions[0].opa);	
});