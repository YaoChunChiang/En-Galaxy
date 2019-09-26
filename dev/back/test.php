<?php 
$errMsg = "";

try {
	require_once("../pdoData.php");
	$itemAmount = '3';
   $table = 'role_equip';
   $sql = "select equip_no from {$table} where equip_status = 1";
   $target_No = 'equip_no';
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
array_splice($itemNo,0,3);
print_r($itemNo);
?>