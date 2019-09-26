<?php 
$errMsg = "";
try {
	require_once("../pdoData.php");
	$sql = "SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'dd102g4' AND TABLE_NAME = 'mem_main'";
    $auto_increment = $pdo->query($sql);
    $auto_incrementNow = $auto_increment->fetch(PDO::FETCH_ASSOC);
    $mem_no = $auto_incrementNow['AUTO_INCREMENT'];
} catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";	
}
if($errMsg !=""){
	echo "$errMsg";
}
echo $mem_no;
?>