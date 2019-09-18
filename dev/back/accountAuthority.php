<?php
try {
    require_once("pdoData.php");
    $sql = " update mem_main set mem_status = :mem_status where mem_no = :mem_no";
    $memberMain = $pdo->prepare($sql);
    $memberMain->bindValue(":mem_no", $_POST["mem_no"]);
    $memberMain->bindValue(":mem_status", $_POST["mem_status"]);
    $memberMain->execute();
}
catch (PDOException $e) {
    echo $e->getMessage();
}
