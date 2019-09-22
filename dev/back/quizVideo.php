<?php
$errMsg = "";
$type = $_REQUEST['type'];
// $type = 'queryQuestion';
try {
// 抓出上架物件
require_once("../pdoData.php");
if($type == 'addQuestion'){
	$video_no = $_REQUEST['video_no'];
	$video_q = $_REQUEST['video_q'];
	$opt_1 = $_REQUEST['opt_1'];
	$opt_2 = $_REQUEST['opt_2'];
	$opt_3 = $_REQUEST['opt_3'];
	$opt_4 = $_REQUEST['opt_4'];
	$answer = $_REQUEST['answer'];
	$sql = "insert into video_qs (video_no ,video_q ,opt_1 ,opt_2 ,opt_3 ,opt_4 ,answer,video_q_status) value(:video_no,:video_q,:opt_1,:opt_2,:opt_3,:opt_4,:answer,1)";
	$questionAdd = $pdo->prepare($sql);
	$questionAdd->bindValue(":video_no",$video_no);
    $questionAdd->bindValue(":video_q",$video_q);
    $questionAdd->bindValue(":opt_1",$opt_1);
    $questionAdd->bindValue(":opt_2",$opt_2);
	$questionAdd->bindValue(":opt_3",$opt_3);
	$questionAdd->bindValue(":opt_4",$opt_4);
	$questionAdd->bindValue(":answer",$answer);
	$questionAdd->execute();
}else if($type == 'queryQuestion'){
	$amount = $_REQUEST['amount'];
	$questionPage = ($_REQUEST['page']-1)*$amount;
	$sql = "select * from video_qs limit {$questionPage},{$amount}";
	$question = $pdo->query($sql);
    $sql = "select count(*) 'count' from video_qs";    
    $count = $pdo->query($sql);
    $sql = "select video_no from video";
    $video_no = $pdo->query($sql);
}elseif($type == 'delete'){
	$video_q_no = $_REQUEST['questionNo'];
	$sql="delete from video_qs where video_q_no = :video_q_no";
	$questionDelete = $pdo->prepare($sql);
	$questionDelete->bindValue(":video_q_no",$video_q_no);
	$questionDelete->execute();
}elseif($type == 'modify'){
	$video_q_no = $_REQUEST['questionNo'];
	$video_no = $_REQUEST['modifyData']['video_no'];
	$video_q = $_REQUEST['modifyData']['video_q'];
	$opt_1 = $_REQUEST['modifyData']['opt_1'];
	$opt_2 = $_REQUEST['modifyData']['opt_2'];
	$opt_3 = $_REQUEST['modifyData']['opt_3'];
	$opt_4 = $_REQUEST['modifyData']['opt_4'];
	$answer = $_REQUEST['modifyData']['answer'];
	$video_q_status = $_REQUEST['modifyData']['video_q_status'];
	$sql = "update video_qs set video_no = :video_no,video_q = :video_q,opt_1 = :opt_1,opt_2 = :opt_2,opt_3 = :opt_3 ,opt_4 = :opt_4,answer= :answer,video_q_status = :video_q_status where video_q_no = :video_q_no";
	$questionModify = $pdo->prepare($sql);
	$questionModify->bindValue(":video_q_no",$video_q_no);
	$questionModify->bindValue(":video_no",$video_no);
    $questionModify->bindValue(":video_q",$video_q);
    $questionModify->bindValue(":opt_1",$opt_1);
    $questionModify->bindValue(":opt_2",$opt_2);
	$questionModify->bindValue(":opt_3",$opt_3);
	$questionModify->bindValue(":opt_4",$opt_4);
	$questionModify->bindValue(":answer",$answer);
	$questionModify->bindValue(":video_q_status",$video_q_status);
	$aa = $questionModify->execute();
}


} catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";	
}
if($errMsg !=""){
	echo "$errMsg";
}
if($type == 'modify'){
	echo $aa;
}
if($type == 'addQuestion'){
	header("Location: quizGame.html");	
} else if($type == 'queryQuestion'){
    $questionRow = $question->fetchAll(PDO::FETCH_ASSOC);
    $allVideoNo = $video_no->fetchAll(PDO::FETCH_ASSOC);
	$dataAmount = $count->fetch(PDO::FETCH_ASSOC);
	$arr = [];
	$arr[] = $questionRow;
    $arr[] = $dataAmount;
    $arr[] = $allVideoNo;
	echo json_encode($arr);
}


?>
