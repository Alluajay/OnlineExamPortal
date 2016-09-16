<?php

$sno=isset($_POST['sno']) ? $_POST['sno'] : '';
$ques=isset($_POST['ques']) ? $_POST['ques'] : '';
$opa=isset($_POST['opa']) ? $_POST['opa'] : '';
$opb=isset($_POST['opb']) ? $_POST['opb'] : '';
$opc=isset($_POST['opc']) ? $_POST['opc'] : '';
$opd=isset($_POST['opd']) ? $_POST['opd'] : '';
$ans=isset($_POST['ans']) ? $_POST['ans'] : '';
$marks=isset($_POST['marks']) ? $_POST['marks'] : '';
$qtype=isset($_POST['qtype']) ? $_POST['qtype'] : '';
$qtable=isset($_POST['qtable']) ? $_POST['qtable'] : '';

include_once $_SERVER['DOCUMENT_ROOT'].'/exam/config.php';
$conn=mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if(!$conn){
		$response["status"]="error";
		$response["message"]="error in connection";
}else{
	$query="INSERT INTO `$qtable` (`sno`, `ques`, `opa`, `opb`, `opc`, `opd`,`ans`,`marks`,`qtype`) VALUES (NULL, '$ques', '$opa', '$opb', '$opc', '$opd','$ans',$marks,'$qtype');";
	$result=mysqli_query($conn,$query);
	if(!$result){
		$response["status"]="error";
		$response["message"]="error in inserting";
	}else{
		 $response["status"]="success";
		 $response["message"]="inserted successfully";
		
		//$response["query"]=$query;
		
	}

}

echo json_encode($response);

?>