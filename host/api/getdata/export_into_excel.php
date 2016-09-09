
<?php

$result_tab=$_GET["res_tab"];

// Connection
include_once $_SERVER['DOCUMENT_ROOT'].'/exam/config.php';

$conn=mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

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

  
?>