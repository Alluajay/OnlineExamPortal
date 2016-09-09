<?php
$marks=$_POST["marks"];
$user=$_POST["username"];
$user_email=$_POST["email"];
$user_rno=$_POST["regno"];
$result_tab=$_POST["result_tab"];
$response=array();
include_once '../config.php';
$conn=mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);


if(!$conn){
	$response['status']="error";
	$response['message']="error in connection";
}else{
	$query="insert into $result_tab VALUES (null,'$user','$user_rno','$user_email',$marks,null)";
	$result=mysqli_query($conn,$query);
	if($result){
		$response['status']="success";
		$response['message']="marks recorded";
	}else{
		$response['status']="error";
		$response['message']="failed to record marks";
		}
	}


//echo $marks" "$user" "$user_email" "$user_rno" "$result_tab;
echo json_encode($response);
?>