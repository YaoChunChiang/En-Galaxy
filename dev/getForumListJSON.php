<?php
try{
  //----------------連線資料庫
  require_once("pdoData.php");
  //--------------如果有que_title傳回值寫入資料庫
 
  if( isset($_REQUEST['que_title'])===true){//寫入資料庫
    $tbl_name="member_question";
    // $topic=$_REQUEST['topic'];
    // $detail=$_REQUEST['detail'];
    $datetime=date("y-m-d h:i:s");
    $sql="INSERT INTO $tbl_name (que_no, mem_no, que_title, que_desc, time, money,ans_no,que_status) 
    VALUES (null, 1, :title, :desc, '$datetime',:money,null,1)";
    $memberQuestion = $pdo->prepare($sql);
   //$memberQuestion->bindValue(":memno",$_REQUEST['mem_no']);
    $memberQuestion->bindValue(":title",$_REQUEST['que_title']);
    $memberQuestion->bindValue(":desc",$_REQUEST['que_desc']);
    $memberQuestion->bindValue(":money",$_REQUEST['que_money']);
    $memberQuestion->execute(); 
    echo "異動成功~<br>";
     
  }else{
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

  } 
}catch(PDOException $e){
  echo $e->getMessage();
}
?>
