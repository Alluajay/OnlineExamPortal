app.controller("resultsctrl",function($scope,$http,myService){
console.log("resultsctrl initiated");
$scope.Results_data={}
$scope.result_tab=myService.get_resulttab();
console.log($scope.result_tab);
$scope.result_data;
$http.get("api/getdata/GetResults.php?res_tab="+$scope.result_tab).success(function(response){
	$scope.Results_data=response.results;
});
$scope.export_but='#/results';
$scope.ex_res="";

    $scope.exportData = function () {
    	console.log("clicked");
        $http.get("api/getdata/export_into_excel.php?res_tab="+$scope.result_tab).success(function(response){
        	$scope.export_but=response;
        	$scope.ex_res="btn btn-success";
		});
    };
});