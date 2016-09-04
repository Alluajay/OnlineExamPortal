<?php
$quiz=array();
$quiz["sno"]="1";
$quiz["name"]='one';
$quiz["table_link"]="one.php";
$data=array();
$data[]=$quiz;
$data[]=$quiz;
//$data["data1"]=$quiz;
$final=array();
$final["records"]=$data;
echo json_encode($final);
?>