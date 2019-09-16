<?php
$type = $_REQUEST['type'];
$errMsg = "";
if($type == 'getInfo'){
  $memId = $_REQUEST['memId'];
  $memPsw =$_REQUEST['memPsw'];
  $sql = "select * from mem_main where mem_id='{$memId}' and mem_psw='{$memPsw}'";
}else if ($type == 'mem_id'){
  $sql = "select mem_id from mem_main";
} else if($type == 'registered'){
  $sql = "insert into mem_main ";
  $column = '(';
  $val = ' values(';
  $data = $_REQUEST['data'];
  foreach ($data as $key => $value) {
    $column .= $key.",";
    $val .= "'".$value."',";
  }
  $column .= ')';
  $val .= ')';
  $sql = str_replace(",)",")","$sql$column$val").';';
} else if($type == 'dateCheck'){
  $today = $_REQUEST['today'];
  $memNo = $_REQUEST['memNo'];
  $memContinue = $_REQUEST['memContinue'];
  $sql = "update mem_main set mem_last_lgn='{$today}',mem_continue='{$memContinue}' where mem_no= '{$memNo}'";
}




// $memId ='test';
// $memPsw ='test';




try {
  // 連線
  require_once("pdoData.php");

  // 下列存成pdoData
  // $dsn = "mysql:host=localhost;port=自己的;dbname=資料庫名稱;charset=utf8";
  // $user = "自己的";
  // $password = "自己的";
  // $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_CASE=>PDO::CASE_NATURAL);
  // $pdo = new PDO($dsn, $user, $password, $options);
  
  

  // 透過pdo->query()將指令送到mysql執行


  if($type == 'registered' || $type == 'dateCheck'){
    $members = $pdo->exec($sql);
  }else{
    $members = $pdo->query($sql);
  }
  
  

} catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";	
}

if($errMsg !=""){
	echo "$errMsg";
}


if($type != 'registered' && $type != 'dateCheck'){
   if( $members->rowCount() == 0){
 	    echo "0";
   }else{
 	    $memRow = $members->fetchAll(PDO::FETCH_ASSOC);
      echo json_encode( $memRow );
   }
}else{
  echo $members;
}

?>
