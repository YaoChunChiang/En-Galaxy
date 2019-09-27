<?php 
$errMsg = "";
try {
    require_once("pdoData.php");
    $mem_no = $_REQUEST['mem_no'];
    $ach_no = $_REQUEST['ach_no'];
    $sql = "select * from mem_ach where mem_no = {$mem_no} and ach_no = {$ach_no}";
    $ach = $pdo->query($sql);
    $result = $ach->fetch(PDO::FETCH_ASSOC);
 if(gettype($result) != 'array'){      
    $sql = "select ach_title from ach_list where ach_no = '{$ach_no}'";
    $achInfo = $pdo->query($sql);
    $achTitle = $achInfo->fetch(PDO::FETCH_ASSOC);
    $sql = "INSERT INTO `mem_ach`(`mem_no`, `ach_no`, `ach_status`) VALUES ('{$mem_no}','{$ach_no}','0')";
    $getAch = $pdo->prepare($sql);
    $getAch->bindValue(":mem_no",$mem_no);
    $getAch->bindValue(":ach_no",$ach_no);
    $getAch->execute();
    echo json_encode($achTitle);
 }else {
     echo 'alreadyGet';
 }
} catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";	
}
if($errMsg !=""){
	echo "$errMsg";
}


?>