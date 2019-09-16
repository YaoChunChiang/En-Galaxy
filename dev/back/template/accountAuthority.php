<?php
try {
    $dsn = "mysql:host=localhost;port=8889;dbname=dd102g4;charset=utf8";
    $user = "root";
    $password = "root";
    $options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE => PDO::CASE_NATURAL);
    $pdo = new PDO($dsn, $user, $password, $options);
    $sql = "select* from mem_main";
    $memberMain = $pdo->prepare($sql);
    $memberMain->execute();
}
catch (PDOException $e) {
    echo $e->getMessage();
}

?>