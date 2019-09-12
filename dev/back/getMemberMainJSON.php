<?php
try{
  require_once("connectionTony.php");
  $sql = "select* from mem_main order by mem_no";
  $memberMain = $pdo->prepare($sql);
  //$member->bindValue(":memId", $_GET["memId"]);
  $memberMain->execute(); 
  
  if( $memberMain->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "{}";
  }else{ //找得到
    //取回一筆資料
    $memberMainRow = $memberMain->fetchAll(PDO::FETCH_ASSOC);
    //送出json字串
  echo json_encode($memberMainRow);
  }	
}catch(PDOException $e){
  echo $e->getMessage();
}
?>
