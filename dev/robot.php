<?php
try{
    $dsn = "mysql:host=localhost;port=8889;dbname=dd102g4_test;charset=utf8";
    $user = "root";
    $password = "root";
    $pdo = new PDO($dsn, $user, $password);
    $action = $_GET["action"];
    if($action == "load"){
        $sql = "select * from chat_robot";
        $qnas = $pdo->query($sql);
        if( $qnas->rowCount() == 0 ){
            echo "{}";
        }else{
            $qnasRows = $qnas->fetchAll();
            echo json_encode($qnasRows);
        }
    }else if($action == "addToCard"){
        $memNo = $_GET["memNo"];
        $sql = "select * from card_class where mem_no = :memNo";
        $cardClasses = $pdo->prepare($sql);
        $cardClasses->bindValue(":memNo", $memNo);
        $cardClasses->execute();
        if( $cardClasses->rowCount() == 0 ){
            echo "{}";
        }else{
            $cardClassesRows = $cardClasses->fetchAll();
            echo json_encode($cardClassesRows);
        }
    }else if($action == "comfirmAdd"){
        $cardClass = $_GET["cardClass"];
        $cardVocabulary = $_GET["cardVocabulary"];
        $sql = "insert into vocab (card_class,vocab) values (:cardClass,:cardVocabulary)";
        $vocabularyAdded = $pdo->prepare($sql);
        $vocabularyAdded->bindValue(":cardClass", $cardClass);
        $vocabularyAdded->bindValue(":cardVocabulary", $cardVocabulary);
        $vocabularyAdded->execute();
    }else if($action == "loadMemRole"){
        $setNo = $_GET["setNo"];
        $sql = "select * from role_set where set_no = :setNo";
        $memRole = $pdo->prepare($sql);
        $memRole->bindValue(":setNo", $setNo);
        $memRole->execute();
        if( $memRole->rowCount() == 0 ){
            echo "{}";
        }else{
            $memRoleRow = $memRole->fetchAll();
            echo json_encode($memRoleRow);
        }
    }
}catch(PDOException $e){
    echo $e->getMessage();
}
?>