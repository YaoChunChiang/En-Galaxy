<?php
$dsn = "mysql:host=localhost;port=8889;dbname=dd102g4_test;charset=utf8";
    $user = "root";
    $password = "root";
    $options=array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE=>PDO::CASE_NATURAL);
    $pdo = new PDO($dsn, $user, $password, $options);
 ?>