<?php 
$errMsg = "";

try {
	require_once("../pdoData.php");
	$sql = "select * from video_qs";
$question = $pdo->query($sql);
$sql = "select count(*) 'count' from video_qs";
$count = $pdo->query($sql);
$sql = "select video_no from video";
$video_no = $pdo->query($sql);
	// $type = $_REQUEST['type'];
	// echo $questionModify; 
} catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";	
}
if($errMsg !=""){
	echo "$errMsg";
}
$questionRow = $question->fetchAll(PDO::FETCH_ASSOC);
$allVideoNo = $video_no->fetchAll(PDO::FETCH_ASSOC);
	$dataAmount = $count->fetch(PDO::FETCH_ASSOC);
	$arr = [];
	$arr[] = $questionRow;
	$arr[] = $dataAmount;
	$arr[] = $allVideoNo;
	echo json_encode($arr);
?>