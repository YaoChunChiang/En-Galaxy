<?php
$errMsg = "";

if($_REQUEST['type'] == 'login'){
  $memId = $_REQUEST['memId'];
  $memPsw =$_REQUEST['memPsw'];
  $sql = "select * from mem_main where mem_id='{$memId}' and mem_psw='{$memPsw}'";
}else if ($_REQUEST['type'] == 'mem_id'){
  $sql = "select mem_id from mem_main";
}
// $memId ='test';
// $memPsw ='test';

try {
  //連線
  require_once("pdoData.php");


  // 下列存成pdoData
  // $dsn = "mysql:host=localhost;port=自己的;dbname=資料庫名稱;charset=utf8";
  // $user = "自己的";
  // $password = "自己的";
  // $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_CASE=>PDO::CASE_NATURAL);
  // $pdo = new PDO($dsn, $user, $password, $options);
  
  

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
	$memRow = $members->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode( $memRow );
}

?>
