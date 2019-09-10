<?php

$erroMsg = "";
try{
    $dsn = "mysql:host=localhost;port=3306;dbname=dd102g4_;charset=utf8";
    $user = "root";
    $password = "MynameisAlex";
    $options = array(PDO::ATTR_CASE=>PDO::CASE_NATURAL, PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
    $pdo = new PDO($dsn, $user, $password,$options);


    $getVocabClass = "SELECT DISTINCT b.card_class FROM `vocab` `a`, `card_class` `b` WHERE a.card_class = b.card_no and b.mem_no = 1";
    $statement = $pdo->prepare($getVocabClass);
    // $statement -> bindValue(":vlevel", $level);
    // $statement -> bindValue(":newVocab", $newVocab);
    $statement -> execute();
  
    }catch(PDOException $e){
        $erroMsg = $erroMsg . "錯誤訊息: " . $e->getMessage() . "<br>";
        $erroMsg .= "錯誤行號: " . $e->getLine() . "<br>";
    }


?>