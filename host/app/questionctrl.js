app.controller("questionctrl",function($scope,$http,myService,toaster,Data,$location){
console.log("questionctrl initiated");
$scope.user=myService.get_user();
var index=0;
$scope.qtable="";
$scope.examdetails={};
$scope.question={sno:'1',ques:'',opa:'',opb:'',opc:'',opd:'',ans:'',marks:'',qtype:''};

$scope.examdetails={"name":"","description":"","conducted_by":$scope.user.name,"hours":"","mins":""};
$scope.createexam=function(){
$http({
        method : "POST",
        url : "api/getdata/CreateNewQuiz.php",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
   		 transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
   		 },
      data: $scope.examdetails
    	}).success(function(response){
        $scope.qtable=response.qtable;
        $scope.setGlobal(response);
        myService.set_questab(response.qtable);
    		console.log($scope.qtable);
        		toaster.pop(response.status, "", response.message, 1000, 'trustedHtml');
                $location.path('/quizques');
    	});
    }
    $scope.questions=[];
    // test
    $scope.items = [];

   $scope.itemsToAdd = [$scope.question];
     $scope.index=$scope.itemsToAdd.length;

     $scope.Insertques=function(){j
      $http({
        method : "POST",
        url : "api/getdata/CreateNewEvent.php",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
       transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
       },
      data: $scope.examdetails
      }).success(function(response){
        console.log(response.message);
            toaster.pop(response.status, "", response.message, 1000, 'trustedHtml');
                $location.path('/quizques');
      });
    };

  
  $scope.addNew = function() {

    $scope.itemsToAdd.push({
      sno:$scope.itemsToAdd.length+1,ques:'',opa:'',opb:'',opc:'',opd:'',ans:'',marks:'',qtype:''
    })
         $scope.index=$scope.itemsToAdd.length;
         angular.forEach($scope.itemsToAdd,function(item){
          console.log(item.sno);
          console.log(item.ques);
         });

  }

  $scope.setGlobal=function(data){
$scope.qtable=data.qtable;
  };

  $scope.submit=function(){
    console.log($scope.qtable);
    angular.forEach($scope.itemsToAdd,function(item){
      var obj={
        "qtable":$scope.qtable
      };
      item.qtable=$scope.qtable;
          $http({
        method : "POST",
        url : "api/getdata/insertQues.php",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
       transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
       },
      data: item
      }).success(function(response){
        console.log(response.message);
            toaster.pop(response.status, "", response.message, 1000, 'trustedHtml');
                $location.path('/quizques');
      });
         });
    
  }
  //test

});
app.controller("questionupload",function($scope,$http,myService,toaster,Data,$location){
    $scope.questions=[];
    // test
    $scope.items = [];
    $scope.qtable=myService.get_questab();
      $scope.question={sno:'1',ques:'',opa:'',opb:'',opc:'',opd:'',ans:'',marks:'',qtype:''};

   $scope.itemsToAdd = [$scope.question];
     $scope.index=$scope.itemsToAdd.length;

 $scope.addNew = function() {

    $scope.itemsToAdd.push({
      sno:$scope.itemsToAdd.length+1,ques:'',opa:'',opb:'',opc:'',opd:'',ans:'',marks:'',qtype:''
    })
         $scope.index=$scope.itemsToAdd.length;
         angular.forEach($scope.itemsToAdd,function(item){
          console.log(item.sno);
          console.log(item.ques);
         });

  };

 

  $scope.submit=function(){
    console.log($scope.qtable);
    angular.forEach($scope.itemsToAdd,function(item){
            item["qtable"]=$scope.qtable;
            console.log(item["qtable"]);

        $http({
        method : "POST",
        url : "api/getdata/insertQues.php",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
       transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
       },
      data: item
      }).success(function(response){
        console.log(response.message);
            toaster.pop(response.status, "", response.message, 1000, 'trustedHtml');
                $location.path('/quizques');
      });
         });
    
  };
});