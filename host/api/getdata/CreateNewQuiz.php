<?php
$name=$_POST["name"];
$randno=rand(1,9999999);

$desc=$_POST["description"];
$cond_by=$_POST["conducted_by"];
$hours=$_POST["hours"];
$min=$_POST["mins"];
$tab_name="quiz_list";
$response=array();
if($name!=''){
	$ques_tab="ques_$randno";
$result_tab="res_$randno";

include_once '../config.php';
$conn=mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
if(!$conn){
		$response["status"]="error";
		$response["message"]="error in connection";
}else{
	$query="INSERT INTO `quiz_db`.`quiz_list` (`sno`, `name`, `ques_table_link`, `descr`, `result_tab_link`, `conducted_by`,`hours`,`mins`) VALUES (NULL, '$name', '$ques_tab', '$desc', '$result_tab', '$cond_by','$hours','$mins');";
	$result=mysqli_query($conn,$query);
	if(!$result){
		$response["status"]="error";
		$response["message"]="error in inserting";
	}else{
		
		$query="CREATE TABLE `quiz_db`.`$result_tab` (`sno` int(4) NOT NULL AUTO_INCREMENT PRIMARY KEY,`name` varchar(40) NOT NULL,`rno` int(11) NOT NULL,
 				 `email` varchar(40) NOT NULL,
  				`score` decimal(15,0) NOT NULL,
  				`created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
				)";
		$result=mysqli_query($conn,$query);
		if(!$result){
			$response["status"]="error";
			$response["message"]="error in creating result table";
		}else{
			$query="CREATE TABLE `quiz_db`.`$ques_tab` (`sno` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, `ques` varchar(2000) NOT NULL,`opa` varchar(1000) NOT NULL,`opb` varchar(1000) NOT NULL,`opc` varchar(1000) NOT NULL,`opd` varchar(1000) NOT NULL,
 		 	`ans` varchar(4) NOT NULL,
 		 	`marks` int(3) NOT NULL DEFAULT '1',
 			 `qtype` varchar(11) NOT NULL
			)";
			$result=mysqli_query($conn,$query);
			if(!$result){
				$response["status"]="error";
			$response["message"]="error in creating question table";
		
			}else{
					$response["status"]="success";
					$response["message"]="inserted";
					$response["qtable"]=$ques_tab;
			}
		}		
	}

}
}else{
	$response["status"]="error";
	$response["message"]="data empty";

}
echo json_encode($response);

?>