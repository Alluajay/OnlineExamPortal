<?php

$sno=$_POST["sno"];
$ques=$_POST["ques"];
$opa=$_POST["opa"];
$opb=$_POST["opb"];
$opc=$_POST["opc"];
$opd=$_POST["opd"];
$ans=$_POST["ans"];
$marks=$_POST["marks"];
$qtype=$_POST["qtype"];
$qtable=$_POST["qtable"];
echo $qtable;

//echo $sno.$ques.$opa.$opb.$opc.$opd.$ans.$marks.$qtype;
include_once '../config.php';
$conn=mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if(!$conn){
		$response["status"]="error";
		$response["message"]="error in connection";
}else{
	$query="INSERT INTO `quiz`.`$qtable` (`sno`, `ques`, `opa`, `opb`, `opc`, `opd`,`ans`,`marks`,`qtype`) VALUES (NULL, '$ques', '$opa', '$opb', '$opc', '$opd','$ans',$marks,'$qtype');";
	$result=mysqli_query($conn,$query);
	if(!$result){
		echo $query;
		$response["status"]="error";
		$response["message"]="error in inserting";
	}else{
		echo $response["status"]="success";
		echo $response["message"]="inserted successfully";
		
		//$response["query"]=$query;
		
	}

}

echo json_encode($response);

?>