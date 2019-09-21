<?php
$errMsg = "";
$type = $_REQUEST['type'];
// $type = 'queryQuestion';
try {
// 抓出上架物件
require_once("../pdoData.php");
if($type == 'addQuestion'){
	$level_no = $_REQUEST['level_no'];
	$question = $_REQUEST['question'];
	$opt_1 = $_REQUEST['opt_1'];
	$opt_2 = $_REQUEST['opt_2'];
	$opt_3 = $_REQUEST['opt_3'];
	$opt_4 = $_REQUEST['opt_4'];
	$answer = $_REQUEST['answer'];
	$sql = "insert into game_question (level_no ,question ,opt_1 ,opt_2 ,opt_3 ,opt_4 ,answer,question_status) value(:level_no,:question,:opt_1,:opt_2,:opt_3,:opt_4,:answer,1)";
	$questionAdd = $pdo->prepare($sql);
	$questionAdd->bindValue(":level_no",$level_no);
    $questionAdd->bindValue(":question",$question);
    $questionAdd->bindValue(":opt_1",$opt_1);
    $questionAdd->bindValue(":opt_2",$opt_2);
	$questionAdd->bindValue(":opt_3",$opt_3);
	$questionAdd->bindValue(":opt_4",$opt_4);
	$questionAdd->bindValue(":answer",$answer);
	$questionAdd->execute();
}else if($type == 'queryQuestion'){
	$amount = $_REQUEST['amount'];
	// $amount = 10;
	$questionPage = ($_REQUEST['page']-1)*$amount;
	// $questionPage = 1;
	$sql = "select * from game_question limit {$questionPage},{$amount}";
	$question = $pdo->query($sql);
	$sql = "select count(*) 'count' from game_question";
	$count = $pdo->query($sql);
}elseif($type == 'delete'){
	$question_no = $_REQUEST['questionNo'];
	$sql="delete from game_question where question_no = :question_no";
	$questionDelete = $pdo->prepare($sql);
	$questionDelete->bindValue(":question_no",$question_no);
	$questionDelete->execute();
}elseif($type == 'modify'){
	$question_no = $_REQUEST['questionNo'];
	$level_no = $_REQUEST['level_no'];
	$question = $_REQUEST['question'];
	$opt_1 = $_REQUEST['opt_1'];
	$opt_2 = $_REQUEST['opt_2'];
	$opt_3 = $_REQUEST['opt_3'];
	$opt_4 = $_REQUEST['opt_4'];
	$answer = $_REQUEST['answer'];
	$question_status = $_REQUEST['question_status'];
	$sql = "update game_question set level_no = :level_no,question = :question,opt_1 = :opt_1,opt_2 = :opt_2,opt_3 = :opt_3 ,opt_4 = :opt_4,answer= :answer,question_status = :question_status where question_no = :question_no";
	$questionAdd = $pdo->prepare($sql);
	$questionAdd->bindValue(":question_no",$question_no);
	$questionAdd->bindValue(":level_no",$level_no);
    $questionAdd->bindValue(":question",$question);
    $questionAdd->bindValue(":opt_1",$opt_1);
    $questionAdd->bindValue(":opt_2",$opt_2);
	$questionAdd->bindValue(":opt_3",$opt_3);
	$questionAdd->bindValue(":opt_4",$opt_4);
	$questionAdd->bindValue(":answer",$answer);
	$questionAdd->bindValue(":question_status",$anquestion_statusswer);
	$questionAdd->execute();
}


} catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";	
}
if($errMsg !=""){
	echo "$errMsg";
}
if($type == 'addQuestion' || $type == 'modify'){
	header("Location: quizGame.html");
} else if($type == 'queryQuestion'){
	$questionRow = $question->fetchAll(PDO::FETCH_ASSOC);
	$dataAmount = $count->fetch(PDO::FETCH_ASSOC);
	$arr = [];
	$arr[] = $questionRow;
	$arr[] = $dataAmount;
	echo json_encode($arr);
	// echo print_r($arr);
}


?>
