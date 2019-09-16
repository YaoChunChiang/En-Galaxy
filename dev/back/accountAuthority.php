<?php
try {
    $dsn = "mysql:host=localhost;port=8889;dbname=dd102g4;charset=utf8";
    $user = "root";
    $password = "root";
    $options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE => PDO::CASE_NATURAL);
    $pdo = new PDO($dsn, $user, $password, $options);
    $sql = " update mem_main set mem_status = :mem_status where mem_no = :mem_no";
    $memberMain = $pdo->prepare($sql);
    $memberMain->bindValue(":mem_no", $_POST["mem_no"]);
    $memberMain->bindValue(":mem_status", $_POST["mem_status"]);
    $memberMain->execute();
}
catch (PDOException $e) {
    echo $e->getMessage();
}
