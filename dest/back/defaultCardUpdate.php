<?php

$erroMsg = "";
try{
    $dsn = "mysql:host=localhost;port=3306;dbname=dd102g4_;charset=utf8";
    $user = "root";
    $password = "MynameisAlex";
    $options = array(PDO::ATTR_CASE=>PDO::CASE_NATURAL, PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
    $pdo = new PDO($dsn, $user, $password,$options);

    $newVocab = $_GET["vocab"];
    $level = $_GET["lev"];

    // echo $newVocab;
    $sqlUpdateVocab = "INSERT INTO `default_vocab` (`vocab_no`, `default_card_no`, `default_vocab`) VALUES( null, :vlevel, :newVocab);";
    $statement = $pdo->prepare($sqlUpdateVocab);
    $statement -> bindValue(":vlevel", $level);
    $statement -> bindValue(":newVocab", $newVocab);
    $statement -> execute();


    }catch(PDOException $e){
        $erroMsg = $erroMsg . "錯誤訊息: " . $e->getMessage() . "<br>";
        $erroMsg .= "錯誤行號: " . $e->getLine() . "<br>";
    }


?>