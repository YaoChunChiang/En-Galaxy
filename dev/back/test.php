<?php 
$errMsg = "";
// $type = 'queryQuestion';
try {
	require_once("../pdoData.php");
	// $type = $_REQUEST['type'];
	$question_no = '4';
	$level_no = '1';
	$question = 'test';
	$opt_1 = '2';
	$opt_2 = '2';
	$opt_3 = '2';
	$opt_4 = '2';
	$answer = '2';
	$question_status = '1';
	$sql = "update game_question set level_no = :level_no,question = :question,opt_1 = :opt_1,opt_2 = :opt_2,opt_3 = :opt_3 ,opt_4 = :opt_4,answer= :answer,question_status = :question_status where question_no = :question_no";
	$questionModify = $pdo->prepare($sql);
	$questionModify->bindValue(":question_no",$question_no);
	$questionModify->bindValue(":level_no",$level_no);
    $questionModify->bindValue(":question",$question);
    $questionModify->bindValue(":opt_1",$opt_1);
    $questionModify->bindValue(":opt_2",$opt_2);
	$questionModify->bindValue(":opt_3",$opt_3);
	$questionModify->bindValue(":opt_4",$opt_4);
	$questionModify->bindValue(":answer",$answer);
	$questionModify->bindValue(":question_status",$question_status);
	$questionModify->execute();
	// echo $questionModify; 
} catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";	
}
if($errMsg !=""){
	echo "$errMsg";
}
?>