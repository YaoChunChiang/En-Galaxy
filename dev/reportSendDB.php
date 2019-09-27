<?php
try{
  //----------------連線資料庫
  require_once("pdoData.php");
  //--------------如果有ans_no傳回值寫入資料庫
 
  if( isset($_REQUEST['ans_no'])===true){//寫入資料庫
    $tbl_name="answer_report";
    // $topic=$_REQUEST['topic'];
    // $detail=$_REQUEST['detail'];
    
    $sql="INSERT INTO $tbl_name (answer_report, mem_no, ans_no, ans_repo_time,reason) 
    VALUES (null, :mem_no, :ans_no, now(),:reason)";
    $reportList = $pdo->prepare($sql);
    $reportList->bindValue(":mem_no",$_REQUEST['mem_no']);
    $reportList->bindValue(":ans_no",$_REQUEST['ans_no']);
    $reportList->bindValue(":reason",$_REQUEST['reason']);
    $reportList->execute(); 
    echo "回答已檢舉~<br>";
     
  }else if(isset($_REQUEST['que_no'])===true){
    $tbl_name="question_report";
    // $topic=$_REQUEST['topic'];
    // $detail=$_REQUEST['detail'];
    
    $sql="INSERT INTO $tbl_name (que_repono, mem_no, que_no, time,reason) 
    VALUES (null, :mem_no, :que_no,now(), :reason)";
    $reportList = $pdo->prepare($sql);
    $reportList->bindValue(":mem_no",$_REQUEST['mem_no']);
    $reportList->bindValue(":que_no",$_REQUEST['que_no']);
    $reportList->bindValue(":reason",$_REQUEST['reason']);
    $reportList->execute(); 
    echo "問題已檢舉~<br>";
   }else if(isset($_REQUEST['act_no'])===true){
    $tbl_name="activity_report";
    // $topic=$_REQUEST['topic'];
    // $detail=$_REQUEST['detail'];
   
    $sql="INSERT INTO $tbl_name (act_repono, mem_no, act_no,time, reason) 
    VALUES (null, :mem_no, :act_no,now(), :reason)";
    $reportList = $pdo->prepare($sql);
    $reportList->bindValue(":mem_no",$_REQUEST['mem_no']);
    $reportList->bindValue(":act_no",$_REQUEST['act_no']);
    $reportList->bindValue(":reason",$_REQUEST['reason']);
    $reportList->execute(); 
    echo "活動已檢舉~<br>";
   }	


}catch(PDOException $e){
  echo $e->getMessage();
}
?>
