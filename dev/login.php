<?php
$errMsg = "";
$type = $_REQUEST['type'];
try {
  require_once("pdoData.php");

  if($type == 'getInfo'){
    $memId = $_REQUEST['memId'];
    $memPsw =$_REQUEST['memPsw'];
    $sql = "select * from mem_main where mem_id='{$memId}' and mem_psw='{$memPsw}'";
    $members = $pdo->query($sql);
    if( $members->rowCount() == 0){
 	    echo "0";
    }else{
 	    $memRow = $members->fetchAll(PDO::FETCH_ASSOC);
      echo json_encode( $memRow );
    }
  }
  else if ($type == 'mem_id'){
    $sql = "select mem_id from mem_main";
    $members = $pdo->query($sql);
    if( $members->rowCount() == 0){
 	    echo "0";
    }else{
 	    $memRow = $members->fetchAll(PDO::FETCH_ASSOC);
      echo json_encode( $memRow );
    }
  } 
  else if($type == 'registered'){
    // 取得最新mem_no        
    // $sql = "SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'dd102g4' AND TABLE_NAME = 'mem_main'";
    // $auto_increment = $pdo->query($sql);
    // $auto_incrementNow = $auto_increment->fetch(PDO::FETCH_ASSOC);
    // $mem_no = $auto_incrementNow['AUTO_INCREMENT'];
    // 註冊會員資訊
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
    $members = $pdo->exec($sql);
    //last insert
    $mem_no=$pdo->lastInsertId();
    //讓他獲得預設裝備 讓他獲得預設字卡
    $sql2="insert into mem_equip (mem_no,equip_no,equip_status) values (:mem_no,1,1);
          insert into mem_equip (mem_no,equip_no,equip_status) values (:mem_no,2,1);
          insert into mem_equip (mem_no,equip_no,equip_status) values (:mem_no,3,1);
          insert into card_class (mem_no,card_class) values (:mem_no,'音樂');";
    $equipGet = $pdo->prepare($sql2);
	  $equipGet->bindValue(":mem_no",$mem_no);
    $equipGet->execute();
    
    // echo $members,$mem_no;
  } 
  else if($type == 'dateCheck'){
    $today = $_REQUEST['today'];
    $memNo = $_REQUEST['memNo'];
    $memContinue = $_REQUEST['memContinue'];
    $sql = "update mem_main set mem_last_lgn=:today,mem_continue=:memContinue where mem_no= :memNo";
    $dateCheck = $pdo->prepare($sql);
	  $dateCheck->bindValue(":today",$today);
	  $dateCheck->bindValue(":memContinue",$memContinue);
    $dateCheck->bindValue(":memNo",$memNo);
    $dateCheck->execute();
    
  }
} catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";	
}
if($errMsg !=""){
  echo "$errMsg";
  
  // echo gettype($today);
}
?>
