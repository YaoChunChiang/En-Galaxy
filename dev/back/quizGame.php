<?php
$errMsg = "";

$sql = "select * from game_question";


try {
// 抓出上架物件
require_once("../pdoData.php");
$question = $pdo->query($sql);  

} catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";	
}
if($errMsg !=""){
	echo "$errMsg";
}

$questionRow = $question->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($questionRow);

?>
