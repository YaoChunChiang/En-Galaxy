<?php
$errMsg = "";
$type = $_REQUEST['type'];
if($type == 'question'){
   $itemAmount = $_REQUEST['questionAmount'];   
   $level = $_REQUEST['level'];
   $table = 'game_question';
   $sql = "select question_no from {$table} where question_status = 1 and level_no = {$level}";
   $target_No = 'question_no';
}else if($type == 'reward'){
   $itemAmount = $_REQUEST['rewardAmount'];
   $table = 'role_equip';
   $sql = "select equip_no from {$table} where equip_status = 1";
   $target_No = 'equip_no';
}

try {
// 抓出上架物件
require_once("pdoData.php");
$item = $pdo->query($sql);  
} catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";	
}
if($errMsg !=""){
	echo "$errMsg";
}
$itemRow = $item->fetchAll(PDO::FETCH_ASSOC);
$itemNo = array();
for($i = 0;$i<count($itemRow);$i++){
    array_push($itemNo,$itemRow[$i][$target_No]);
}
$randNo = array_rand($itemNo,$itemAmount);
// $randNo = shuffle($randNo);
$range = '';
for ($i=0; $i < count($randNo); $i++) { 
   //  $randNo[$i]
   $range = $range.' or '.$target_No.' = '.$itemNo[$randNo[$i]];
};
$sql = str_replace('where or','where',"select * from {$table} where".$range);


try {
// 抓出要回傳的物件
$target = $pdo->query($sql);  
} catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";	
}

if($errMsg !=""){
	echo "$errMsg";
}

$targetRow = $target->fetchAll(PDO::FETCH_ASSOC);
shuffle($targetRow);
echo json_encode($targetRow);
?>
