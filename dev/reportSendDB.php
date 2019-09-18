<?php
try{
  //----------------連線資料庫
  require_once("pdoData.php");
  //--------------如果有ans_no傳回值寫入資料庫
 
  if( isset($_REQUEST['ans_no'])===true){//寫入資料庫
    $tbl_name="answer_report";
    // $topic=$_REQUEST['topic'];
    // $detail=$_REQUEST['detail'];
    //$datetime=date("y-m-d h:i:s");
    $sql="INSERT INTO $tbl_name (answer_report, mem_no, ans_no, reason) 
    VALUES (null, 1, :ans_no, :reason)";
    $reportList = $pdo->prepare($sql);
   //$memberQuestion->bindValue(":memno",$_REQUEST['mem_no']);
    $reportList->bindValue(":ans_no",$_REQUEST['ans_no']);
    $reportList->bindValue(":reason",$_REQUEST['reason']);
    $reportList->execute(); 
    echo "異動成功~<br>";
     
  }else{
//   $sql = "select* from member_question q join mem_main m on  q.mem_no = m.mem_no order by time";
//   $memberQuestion = $pdo->prepare($sql);
//   //$member->bindValue(":memId", $_GET["memId"]);
//   $memberQuestion->execute(); 
//     if( $memberQuestion->rowCount() == 0 ){ //找不到
//     //傳回空的JSON字串
//     echo "{}";
//     }else{ //找得到
//     //取回一筆資料
//     $memberQuestionRow = $memberQuestion->fetchAll(PDO::FETCH_ASSOC);
//     //送出json字串
//     echo json_encode($memberQuestionRow);
   }	


}catch(PDOException $e){
  echo $e->getMessage();
}
?>
