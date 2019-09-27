<?php 
$errMsg = "";
try {
	require_once("../pdoData.php");
	$mem_no = 1;
   $sql = "select * from mem_ach where mem_no = {$mem_no} and ach_no = 1";
   $item = $pdo->query($sql);
   $itemRow = $item->fetch(PDO::FETCH_ASSOC);
$itemNo = array();
} catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";	
}
if($errMsg !=""){
	echo "$errMsg";
}
if(gettype($itemRow) != 'array')
echo '123';
?>