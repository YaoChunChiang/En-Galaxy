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
    VALUES (null, :mem_no, :title, :desc, '$datetime',:money,null,1)";
    $memberQuestion = $pdo->prepare($sql);
    $memberQuestion->bindValue(":mem_no",$_REQUEST['mem_no']);
    $memberQuestion->bindValue(":title",$_REQUEST['que_title']);
    $memberQuestion->bindValue(":desc",$_REQUEST['que_desc']);
    $memberQuestion->bindValue(":money",$_REQUEST['que_money']);
    $memberQuestion->execute(); 
    echo "異動成功~<br>";
     
  }elseif (isset($_REQUEST['mem_no'])===true) {//取得會員問答資料
    $memNo=$_REQUEST['mem_no'];
    //select * ,ifnull(q.que_no,0) from mem_main m left join member_question q on q.mem_no = m.mem_no where m.mem_no =1
    $sqlQuestion = "select * from mem_main m left join member_question q on q.mem_no = m.mem_no where m.mem_no ={$memNo} and q.que_status=1";
    $sqlAnswer ="select * from mem_main m left join member_answer a on a.mem_no = m.mem_no where m.mem_no={$memNo} and a.ans_status=1";
    $memQuestionList= $pdo->prepare($sqlQuestion);
    $memQuestionList ->execute();
    $memAnswerList= $pdo->prepare($sqlAnswer);
    $memAnswerList ->execute();
    $qnaResults=[];
    if($memQuestionList->rowCount() == 0 && $memAnswerList->rowCount() == 0 ){
      
      echo '{}';
      
    }else{
    
      $qnaResults[0]=$memQuestionList->fetchAll(PDO::FETCH_ASSOC);
      $qnaResults[1]=$memAnswerList->fetchAll(PDO::FETCH_ASSOC);
      echo json_encode($qnaResults);
    }
  }
  else{
  $sqlPopular = "select q.que_no, m.set_nickname, q.money,q.que_title, q.time, count(a.que_no=q.que_no) ans_count from member_question q left join member_answer a on q.que_no = a.que_no left join mem_main m on q.mem_no =m.mem_no  where q.que_status=1 GROUP by q.que_no order by ans_count desc";
  $sqlExpensive= "select q.que_no, m.set_nickname, q.money, count(a.que_no=q.que_no) ans_count,q.que_title, q.time from member_question q left join member_answer a on q.que_no = a.que_no left join mem_main m on q.mem_no =m.mem_no  where q.que_status=1 GROUP by q.que_no ORDER BY q.money DESC";
  $memberQuestionPop = $pdo->prepare($sqlPopular);
  $memberQuestionExp = $pdo->prepare($sqlExpensive);
  $memberQuestionPop->execute();
  $memberQuestionExp->execute();  
    if( $memberQuestionPop->rowCount() == 0 ||$memberQuestionExp->rowCount() == 0){ //找不到
    //傳回空的JSON字串
    echo "{}";
    }else{ //找得到
    //取回一筆資料
    $questionResults=[];
    $questionResults[0]= $memberQuestionPop->fetchAll(PDO::FETCH_ASSOC);
    $questionResults[1]= $memberQuestionExp->fetchAll(PDO::FETCH_ASSOC);
    //送出json字串
    echo json_encode($questionResults);
   }	

  } 
}catch(PDOException $e){
  echo $e->getMessage();
}
?>
