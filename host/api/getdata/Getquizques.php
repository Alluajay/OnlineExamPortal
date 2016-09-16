<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/exam/config.php';
$conn=mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
$tab_name=isset($_GET['tab']) ? $_GET['tab'] : ''
//echo $tab_name;
if(!$conn){
echo "error in connection";
}else{
	$query="select * from $tab_name";
	$result=mysqli_query($conn,$query);
	if(!$result){

   // echo "error in query";
    echo $tab_name;
	}else{
		$data=array();
		if(mysqli_num_rows($result)>0){
			while ($row=mysqli_fetch_assoc($result)) {
				$quiz_ques=array();
				$quiz_ques["sno"]=$row["sno"];
				$quiz_ques["ques"]=$row["ques"];
				$quiz_ques["opa"]=$row["opa"];	
				$quiz_ques["opb"]=$row["opb"];
				$quiz_ques["opc"]=$row["opc"];
				$quiz_ques["opd"]=$row["opd"];
				$quiz_ques["ans"]=$row["ans"];
				$quiz_ques["marks"]=$row["marks"];
                $data[]=$quiz_ques;
			}
			$final=array();
			$final["records"]=$data;
			echo json_encode($final);
		}
	}
}
?>