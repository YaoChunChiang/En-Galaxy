<?php
try{
  //----------------連線資料庫
  require_once("pdoData.php");
  //--------------如果有que_title傳回值寫入資料庫
 
  if( isset($_REQUEST['que_no'])===true){//寫入資料庫
    $tbl_name="member_answer";
    // $topic=$_REQUEST['topic'];
    // $detail=$_REQUEST['detail'];
    $datetime=date("y-m-d h:i:s");
    $sql="INSERT INTO $tbl_name (ans_no, que_no, mem_no, time, ans_desc,best_ans) VALUES (null, :que_no, :mem_no, '$datetime', :ans_desc,null)";
    $memberQuestion = $pdo->prepare($sql);
    $memberQuestion->bindValue(":mem_no",$_REQUEST['mem_no']);
    $memberQuestion->bindValue(":que_no",$_REQUEST['que_no']);
    $memberQuestion->bindValue(":ans_desc",$_REQUEST['ans_desc']);
    //$memberQuestion->bindValue(":money",$_REQUEST['que_money']);
    $memberQuestion->execute(); 
    echo "異動成功<br>"; }
   elseif (isset($_REQUEST['ansReport'])===true) {
    $sql="UPDATE member_answer m left join answer_report r on m.ans_no=r.ans_no set m.ans_status= :reportStatus where r.answer_report = :repoNo";
     $reportAnswer=$pdo->prepare($sql);
     $reportAnswer->bindValue(":repoNo",$_REQUEST['ansReport']);
     $reportAnswer->bindValue(":reportStatus",$_REQUEST['reportStatus']);
    $reportAnswer->execute();
    echo "回答檢舉下架成功<br>";
   }elseif (isset($_REQUEST['actReport'])===true) {
    $sql="UPDATE activity m left join activity_report r on m.act_no=r.act_no set m.act_status= :reportStatus where r.act_repono = :repoNo";
     $reportAnswer=$pdo->prepare($sql);
     $reportAnswer->bindValue(":repoNo",$_REQUEST['actReport']);
     $reportAnswer->bindValue(":reportStatus",$_REQUEST['reportStatus']);
    $reportAnswer->execute();
    echo "活動檢舉下架成功<br>";
   }elseif (isset($_REQUEST['queReport'])===true) {
    $sql="UPDATE member_question m left join question_report r on m.que_no=r.que_no set m.que_status= :reportStatus where r.que_repono = :repoNo";
     $reportAnswer=$pdo->prepare($sql);
     $reportAnswer->bindValue(":repoNo",$_REQUEST['queReport']);
     $reportAnswer->bindValue(":reportStatus",$_REQUEST['reportStatus']);
    $reportAnswer->execute();
    echo "問題檢舉下架成功<br>";
   }elseif(isset($_REQUEST['que_money'])===true){
    $pdo->beginTransaction();
  
    // 選最佳答案
    $sql=" Update member_answer set best_ans =1 where ans_no=:ans_no";
    $chooseBest=$pdo->prepare($sql);
    $chooseBest->bindValue(":ans_no",$_REQUEST['ans_no']);
    $chooseBest->execute();
    // 更新問題的最佳答案
    $sqlQuestionBest="update member_question q SET ans_no=(SELECT ans_no from member_answer a where q.que_no=a.que_no and best_ans =1)";
    $QuestionBest=$pdo->prepare($sqlQuestionBest);
    $QuestionBest->execute();
    //找到回答問題的會員給獎金
    $sqlBounty=" UPDATE mem_main set mem_money= mem_money  + :que_money WHERE mem_no=( SELECT a.mem_no from (SELECT * from mem_main) m left join member_answer a on m.mem_no=a.mem_no left join member_question q on a.que_no=q.que_no where a.que_no = :que_no and q.ans_no=a.ans_no)";
    $Bounty=$pdo->prepare($sqlBounty);
    $Bounty->bindValue(":que_money",$_REQUEST['que_money']);
    $Bounty->bindValue(":que_no",$_REQUEST['queNo']);
    $Bounty->execute();
    //回傳資訊至前台告知誰獲得了獎金
    $sqlMember="select * from mem_main where mem_no=( SELECT a.mem_no from (SELECT * from mem_main) m left join member_answer a on m.mem_no=a.mem_no left join member_question q on a.que_no=q.que_no where a.que_no = :que_no and q.ans_no=a.ans_no)";
    $memberBounty=$pdo->prepare($sqlMember);
    $memberBounty->bindValue(":que_no",$_REQUEST['queNo']);
    $memberBounty->execute();
    
    if( $memberBounty->rowCount() == 0 ){ //找不到
      //傳回空的JSON字串
      echo "{}";
      }else{ //找得到
      //取回一筆資料
      $memberBountyRow = $memberBounty->fetchAll(PDO::FETCH_ASSOC);
      //送出json字串
      echo json_encode($memberBountyRow);
     }$pdo->commit();
   
   
   }else{
    $sno=$_GET['no'];
    $sql="select m.mem_name, a.ans_desc,a.time, q.que_no, a.ans_no from member_question q left join member_answer a on q.que_no = a.que_no left join mem_main m on a.mem_no =m.mem_no where q.que_no ={$sno} and a.ans_status=1";
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
  $pdo->rollback();
}
?>
