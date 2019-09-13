<?php

$erroMsg = "";
try{
    $dsn = "mysql:host=localhost;port=8889;dbname=dd102g4_;charset=utf8";
    $user = "root";
    $password = "root";
    $options = array(PDO::ATTR_CASE=>PDO::CASE_NATURAL, PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
    $pdo = new PDO($dsn, $user, $password,$options);


    $doWhat = $_GET['who'];
    $memNum = 1;



    if($doWhat == 'start'){
        // $sql = "SELECT a.card_class, b.vocab FROM card_class a, vocab b WHERE a.card_no = b.card_class and mem_no = $memNum";
        $sql = "SELECT a.card_class, b.vocab FROM card_class a, vocab b WHERE a.card_no = b.card_class and mem_no = $memNum";
        $vocabs = $pdo->query($sql);
        // $vocabsObject = $vocabs->fetchObject();
        // $test = '';
        // while($vocabsObject = $vocabs->fetchObject()){
        //     $test += json_encode($vocabsObject)
        // }
        $vocabsObject = $vocabs->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($vocabsObject);
        // echo $vocabsObject;
    }


    // $getVocabClass = "SELECT DISTINCT b.card_class FROM `vocab` `a`, `card_class` `b` WHERE a.card_class = b.card_no and b.mem_no = 1";
    // $statement = $pdo->prepare($getVocabClass);
    // // $statement -> bindValue(":vlevel", $level);
    // // $statement -> bindValue(":newVocab", $newVocab);
    // $statement -> execute();
  
    }catch(PDOException $e){
        $erroMsg = $erroMsg . "錯誤訊息: " . $e->getMessage() . "<br>";
        $erroMsg .= "錯誤行號: " . $e->getLine() . "<br>";
    }


?>