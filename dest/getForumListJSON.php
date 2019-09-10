<?php
try{
  require_once("connectionHsin.php");
  $sql = "select* from member_question q join mem_main m on  q.mem_no = m.mem_no order by time";
  $memberQuestion = $pdo->prepare($sql);
  //$member->bindValue(":memId", $_GET["memId"]);
  $memberQuestion->execute(); 
  
  if( $memberQuestion->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "{}";
  }else{ //找得到
    //取回一筆資料
    $memberQuestionRow = $memberQuestion->fetchAll(PDO::FETCH_ASSOC);
    //送出json字串
  echo json_encode($memberQuestionRow);
  }	
}catch(PDOException $e){
  echo $e->getMessage();
}
?>
