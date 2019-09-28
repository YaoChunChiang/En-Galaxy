<?php
try {
    require_once("../pdoData.php");
    $action = $_REQUEST["action"];
    if ($action == "loadAccount") {
        $sql = "select * from mem_main";
        $memberMain = $pdo->prepare($sql);
        $memberMain->execute();
        if ($memberMain->rowCount() == 0) {
            echo "{}";
        } else {
            $memberMainRows = $memberMain->fetchAll();
            echo json_encode($memberMainRows);
        }
    } else if ($action == "changeAuthority") {
        $mem_no = $_POST["mem_no"];
        $mem_now = $_POST["check"];
        if($mem_now == 'true'){
            $mem_status = 1;
        }
        if($mem_now  == 'false'){
            $mem_status = 0;
        }
        // exit($mem_status);
        $memberChangeSql = " update mem_main set mem_status = '$mem_status' where mem_no = '$mem_no'";
        $memberChange = $pdo->prepare($memberChangeSql);
        // $memberChange->bindValue(":mem_no", $mem_no);
        // $memberChange->bindValue(":mem_status", $mem_status);
        $memberChange->execute();
        if ($memberChange->rowCount() == 0) {
            echo "{}";
        } else {
            // $memberChangeRows = $memberChange->fetchAll();
            echo json_encode($mem_status);
        }
    }
} catch (PDOException $e) {
    echo $e->getMessage();
}
