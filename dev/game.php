<?php
$errMsg = "";
$questionAmount = 2;
$level = 1;
try {
// 抓出上架題目
require_once("pdoData.php");
$sql = "select question_no from game_question where question_status = 1 and level_no = {$level}";
$question = $pdo->query($sql);  
} catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";	
}

if($errMsg !=""){
	echo "$errMsg";
}

if( $question->rowCount() == 0){
    echo "0";
}else{
    $questionRow = $question->fetchAll(PDO::FETCH_ASSOC);
 //   print_r($questionRow);
     $questionNo = array();
     for($i = 0;$i<count($questionRow);$i++){
         array_push($questionNo,$questionRow[$i]['question_no']);
     }
     $randNo = array_rand($questionNo,$questionAmount);
     $range = '';
     for ($i=0; $i < count($randNo); $i++) { 
        //  $randNo[$i]
        $range = $range.' or question_no = '.$questionNo[$randNo[$i]];
     };
     $sql = str_replace('where or','where',"select * from game_question where".$range);
}

try {
// 抓出要回傳的題目
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
