<?php
$errMsg = "";
<<<<<<< HEAD
// $memId = $_REQUEST['memId'];
// $memPsw =$_REQUEST['memPsw'];
$memId ='test';
$memPsw ='test';
=======
$memId = $_REQUEST['memId'];
$memPsw =$_REQUEST['memPsw'];
// $memId ='test';
// $memPsw ='test';
>>>>>>> bc95a2c7e2abbe6d9226cca908e1a064208434d1

try {
  //連線
  $dsn = "mysql:host=localhost;port=3306;dbname=dd102g4;charset=utf8";
  $user = "root";
  $password = "au4a83";
  $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_CASE=>PDO::CASE_NATURAL);
  $pdo = new PDO($dsn, $user, $password, $options);	

  //準備好sql指令
  $sql = "select * from mem_main where mem_id='{$memId}' and mem_psw='{$memPsw}'";
  //透過pdo->query()將指令送到mysql執行
  $members = $pdo->query($sql);
  

} catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";	
}

if($errMsg !=""){
	echo "$errMsg";
}

if( $members->rowCount() == 0){
	echo "0";
}else{
	$memRow = $members->fetch(PDO::FETCH_ASSOC);
  echo json_encode( $memRow );
}

?>
