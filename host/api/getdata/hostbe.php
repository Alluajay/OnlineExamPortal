<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/exam/config.php';
$conn=mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
$case=isset($_POST["case"]) ? $_POST["case"]:'';
$response=array();

if(!$conn){
	$response["status"]="error";
	$response["message"]="error in connection";
}else{
	switch ($case) {
		case 'createquiz':
			$name=isset($_POST['name']) ? $_POST['name'] : '';
			$randno=rand(1,9999999);

			$desc=isset($_POST['description']) ? $_POST['description'] : '';
			$cond_by=isset($_POST['conducted_by']) ? $_POST['conducted_by'] : '';
			$hours=isset($_POST['hours']) ? $_POST['hours'] : '';
			$min = isset($_POST['mins']) ? $_POST['mins'] : '';
			$tab_name="quiz_list";
			$response=array();
			$ques_tab="ques_$randno";
			$result_tab="res_$randno";
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



			break;


		case 'get_ques':
		$host_user=isset($_POST["user"]) ? $_POST["user"]:'';
		$query="select * from $tab_name where `conducted_by`='$host_user'";
		$result=mysqli_query($conn,$query);
		if(!$result){

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
			$response["records"]=$data;
			}
		}
			break;
		case 'insertques':
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

			$query="INSERT INTO `$qtable` (`sno`, `ques`, `opa`, `opb`, `opc`, `opd`,`ans`,`marks`,`qtype`) VALUES (NULL, '$ques', '$opa', '$opb', '$opc', '$opd','$ans',$marks,'$qtype');";
			$result=mysqli_query($conn,$query);
			if(!$result){
				$response["status"]="error";
				$response["message"]="error in inserting";
			}else{
				 $response["status"]="success";
				 $response["message"]="inserted successfully";
		
			}
			break;

		case 'getresult':

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
				break;
		
		case 'exportintoexcel':
			$result_tab=isset($_POST['res_tab']) ? $_POST['res_tab'] : '';
			$file="results/$result_tab.csv";
			$sql = "select * from $result_tab";
			$qur = mysqli_query($conn,$sql);
			$fh = fopen($file, 'w') or die('Cannot open the file');
			$str = implode( ',', array("Sno","Name","Regno","EmailId","Marks") );
 			   fwrite( $fh, $str );
 			   fwrite( $fh, "\n" );  
			while($row = mysqli_fetch_assoc($qur)) {
			 $str = implode( ',', $row );
 			 fwrite( $fh, $str );
   			 fwrite( $fh, "\n" );   
  			}
		  	fclose($fh);
  			$op="api/getdata/$file";
  			print($op );
			break;
		default:
			# code...
			break;
	}
}
?>