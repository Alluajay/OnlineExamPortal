<?php        
include_once $_SERVER['DOCUMENT_ROOT'].'/exam/config.php';
$conn=mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
$host_user=$_GET["user"];
if(!$conn){

}else{
	$query="select * from quiz_list where `conducted_by`='$host_user'";
	$result=mysqli_query($conn,$query);
	if(!$result){

	}else{
		$data=array();
		if(mysqli_num_rows($result)>0){
			while ($row=mysqli_fetch_assoc($result)) {
				$quiz=array();
				$quiz["sno"]=$row["sno"];
				$quiz["name"]=$row["name"];
				$quiz["ques_tab"]=$row["ques_table_link"];
				$quiz["result_tab"]=$row["result_tab_link"];
				$quiz["description"]=$row["descr"];
				$quiz["cond_by"]=$row["conducted_by"];
                $data[]=$quiz;
			}
			$final=array();
			$final["records"]=$data;
			echo json_encode($final);
		}
	}
}
?>