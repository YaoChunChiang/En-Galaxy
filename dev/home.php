<?php
$errMsg = "";
try{
    require_once("pdoData.php");

    $who = $_REQUEST['who'];

    if($who === 'getQuestion'){
        $sql = 'SELECT * FROM `member_question` limit 1, 3';
        $questions = $pdo->query($sql);
        $questionRows = $questions->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($questionRows);
    }else if($who === 'getActivityData'){
        $sql = 'SELECT * FROM `activity` a, `mem_main` m where a.mem_no = m.mem_no limit 1, 3';
        $activitys = $pdo->query($sql);
        $activityRows = $activitys->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($activityRows);
    }



}catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";	
}

if($errMsg !=""){
	echo "$errMsg";
}


?>