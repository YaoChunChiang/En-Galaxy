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
}else if($type == 'getReward'){
   $mem_no = $_REQUEST['mem_no'];
   $equip_no = $_REQUEST['equip_no'];
   $sql = "insert into mem_equip (mem_no, equip_no, equip_status) values(:mem_no,:equip_no,0)";
}else if($type == 'getMoney'){
   $mem_no = $_REQUEST['mem_no'];
   $level = $_REQUEST['level'];
   $sql = "update mem_main set mem_money = mem_money+100 , level_no = :level where mem_no = :mem_no";
}

try {
// 抓出上架物件
require_once("pdoData.php");
  if($type == 'getReward'){
     $mem_equip = $pdo->prepare($sql);
     $mem_equip->bindValue(":mem_no",$mem_no);
     $mem_equip->bindValue(":equip_no",$equip_no);
     $mem_equip->execute();
  }else if($type == 'getMoney'){
     $mem_money = $pdo->prepare($sql);
     $mem_money->bindValue(":mem_no",$mem_no);
     $mem_money->bindValue(":level",$level);
     $mem_money->execute();
   } else{
     $item = $pdo->query($sql);  
  }

} catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";	
}
if($errMsg !=""){
	echo "$errMsg";
}
if($type == 'getReward' || $type == 'getMoney'){
   die();
}
$itemRow = $item->fetchAll(PDO::FETCH_ASSOC);
$itemNo = array();
for($i = 0;$i<count($itemRow);$i++){
    array_push($itemNo,$itemRow[$i][$target_No]);
}
if($type == 'reward'){
   array_splice($itemNo,0,3);
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
