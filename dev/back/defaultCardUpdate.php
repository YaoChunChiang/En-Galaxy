<?php

$erroMsg = "";
try{
    $dsn = "mysql:host=localhost;port=8889;dbname=dd102g4_;charset=utf8";
    $user = "root";
    $password = "root";
    $options = array(PDO::ATTR_CASE=>PDO::CASE_NATURAL, PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
    $pdo = new PDO($dsn, $user, $password,$options);


    $doWhat = $_GET["who"];

    if($doWhat == 'addVocab'){
        // echo $newVocab;
        $newVocab = $_GET["vocab"];
        $level = $_GET["lev"];

        $sqlUpdateVocab = "INSERT INTO `default_vocab` (`vocab_no`, `default_card_no`, `default_vocab`) VALUES( null, :vlevel, :newVocab);";
        $statement = $pdo->prepare($sqlUpdateVocab);
        $statement -> bindValue(":vlevel", $level);
        $statement -> bindValue(":newVocab", $newVocab);
        $statement -> execute();
    }else if($doWhat == 'deleteVocab'){
        $deleteVocab = $_GET['vocab'];
        // echo $deleteVocab;
        $sqlDeleteVocab = "DELETE FROM `default_vocab` WHERE `default_vocab` = :vocab";
        $statement = $pdo->prepare($sqlDeleteVocab);
        $statement -> bindValue(":vocab", $deleteVocab);
        $statement -> execute();
    }



    }catch(PDOException $e){
        $erroMsg = $erroMsg . "錯誤訊息: " . $e->getMessage() . "<br>";
        $erroMsg .= "錯誤行號: " . $e->getLine() . "<br>";
    }


?>