<?php
try{
  //----------------連線資料庫
  require_once("connectionHsin.php");
  //--------------如果有que_title傳回值寫入資料庫
 
  if( isset($_REQUEST['que_no'])===true){//寫入資料庫
    $tbl_name="member_answer";
    // $topic=$_REQUEST['topic'];
    // $detail=$_REQUEST['detail'];
    $datetime=date("y-m-d h:i:s");
    $sql="INSERT INTO $tbl_name (ans_no, que_no, mem_no, time, ans_desc,best_ans) VALUES (null, :que_no, 1, '$datetime', :ans_desc,null)";
    $memberQuestion = $pdo->prepare($sql);
   //$memberQuestion->bindValue(":memno",$_REQUEST['mem_no']);
    $memberQuestion->bindValue(":que_no",$_REQUEST['que_no']);
    $memberQuestion->bindValue(":ans_desc",$_REQUEST['ans_desc']);
    //$memberQuestion->bindValue(":money",$_REQUEST['que_money']);
    $memberQuestion->execute(); 
    echo "異動成功<br>";

     
  }else{
    $sno=$_GET['no'];
    $sql="select * from member_question q left join member_answer a on q.que_no = a.que_no left join mem_main m on q.mem_no =m.mem_no where q.que_no ={$sno}";
    ini_set("display_errors","On");
    error_reporting(E_ALL);
    $member_answer = $pdo->prepare($sql);
  //$member->bindValue(":memId", $_GET["memId"]);
  $member_answer->execute(); 
    if( $member_answer->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "{}";
    }else{ //找得到
    //取回一筆資料
    $member_answerRow = $member_answer->fetchAll(PDO::FETCH_ASSOC);
    //送出json字串
    echo json_encode($member_answerRow);
   }	

  } 
}catch(PDOException $e){
  echo $e->getMessage();
}
?>
