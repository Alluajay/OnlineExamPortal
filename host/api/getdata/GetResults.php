<?php
$result_tab=isset($_GET['res_tab']) ? $_GET['res_tab'] : '';

include_once $_SERVER['DOCUMENT_ROOT'].'/exam/config.php';
$conn=mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if(!$conn){

}else {
	$query="select * from $result_tab";
	$result=mysqli_query($conn,$query);
	if(!$result){
		$final=array();
		$final["status"]="error in query";
		$final["query"]=$query;
		echo json_encode($final);
	}else{
		$data=array();
		if(mysqli_num_rows($result)>0){
			while ($row=mysqli_fetch_assoc($result)) {
				$resultdata=array();
				$resultdata["sno"]=$row["sno"];
				$resultdata["name"]=$row["name"];
				$resultdata["regno"]=$row["rno"];
				$resultdata["email"]=$row["email"];
				$resultdata["score"]=$row["score"];
				$data[]=$resultdata;

			}
			$final=array();
			$final["results"]=$data;
			$final["status"]="success";
			echo json_encode($final);

		}else{
					$final=array();
		$final["status"]="error no data";
		echo json_encode($final);
		}
	}
}


?>