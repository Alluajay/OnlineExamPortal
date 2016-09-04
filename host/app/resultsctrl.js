app.controller("resultsctrl",function($scope,$http,myService){
console.log("resultsctrl initiated");
$scope.Results_data={}
$scope.result_tab=myService.get_resulttab();
console.log($scope.result_tab);
$http.get("api/getdata/GetResults.php?res_tab="+$scope.result_tab).success(function(response){
	$scope.Results_data=response.results;
});
});