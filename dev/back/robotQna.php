<?php
try{
    require_once("../pdoData.php");
    $action = $_GET["action"];
    if($action == "confirmInsert"){
        $qnaQ = $_GET["qnaQ"];
        $qnaA = $_GET["qnaA"];
        $qnaStatus = $_GET["qnaStatus"];
        $sql = "insert into chat_robot (keyword_con,keyword_ans,keyword_status) values (:qnaQ, :qnaA,:qnaStatus)";
        $insertQna = $pdo->prepare($sql);
        $insertQna->bindValue(":qnaQ", $qnaQ);
        $insertQna->bindValue(":qnaA", $qnaA);
        $insertQna->bindValue(":qnaStatus", $qnaStatus);
        $insertQna->execute();
    }else if($action == "load"){
        $sql = "select * from chat_robot";
        $qnas = $pdo->query($sql);
        if( $qnas->rowCount() == 0 ){
            echo "{}";
        }else{
            $qnasRows = $qnas->fetchAll();
            echo json_encode( $qnasRows);
        }
    }else if($action == "confirmModify"){
        $qnaNo = $_GET["qnaNo"];
        $qnaQ = $_GET["qnaQ"];
        $qnaA = $_GET["qnaA"];
        $qnaStatus = $_GET["qnaStatus"];
        $sql = "update chat_robot set keyword_con=:qnaQ,keyword_ans=:qnaA,keyword_status=:qnaStatus where keyword_no=:qnaNo";
        $modifyQna = $pdo->prepare($sql);
        $modifyQna->bindValue(":qnaNo", $qnaNo);
        $modifyQna->bindValue(":qnaQ", $qnaQ);
        $modifyQna->bindValue(":qnaA", $qnaA);
        $modifyQna->bindValue(":qnaStatus", $qnaStatus);
        $modifyQna->execute();
    }else if($action == "delete"){
        $qnaNo = $_GET["qnaNo"];
        $sql = "delete from chat_robot where keyword_no=:qnaNo ";
        $deleteQna = $pdo->prepare($sql);
        $deleteQna->bindValue(":qnaNo", $qnaNo);
        $deleteQna->execute();
    }
}catch(PDOException $e){
    echo $e->getMessage();
}
?>