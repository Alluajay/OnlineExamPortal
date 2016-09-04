app.controller('hostctrl',function($scope,$http,myService,$location){
	$scope.quizList={};
	console.log(myService.get_user());
	$http.get("api/getdata/GetHostQuizList.php?user="+myService.get_user().name).success(function(response){
		console.log("got");
		$scope.quizList=response.records;
		console.log($scope.quizList[0]);
	});
	$scope.createexam=function(){
		console.log("create exam link added");
				$location.path("/examques");
			}
	$scope.gotoquespage=function(exam){
				console.log("clicked"+exam);

		$location.path("examques");
	};
	$scope.resultpage=function(result_tab){
				console.log("clicked");

		myService.set_resulttab(result_tab);
		console.log("clicked");
		$location.path("results");
	};

});
 