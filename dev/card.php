<?php

$erroMsg = "";
try{
    $dsn = "mysql:host=localhost;port=8889;dbname=dd102g4_;charset=utf8";
    $user = "root";
    $password = "root";
    $options = array(PDO::ATTR_CASE=>PDO::CASE_NATURAL, PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
    $pdo = new PDO($dsn, $user, $password,$options);


    $doWhat = $_REQUEST['who'];
    $memNum = 1;



    if($doWhat == 'start'){
//         SELECT *
// FROM card_class
// LEFT JOIN vocab
// ON card_class.card_no = vocab.card_class
// where card_class.mem_no = 1
        // $sql = "SELECT a.card_class, b.vocab FROM card_class a, vocab b WHERE a.card_no = b.card_class and mem_no = $memNum";
        // $sql = "SELECT a.card_class, b.vocab FROM card_class a, vocab b WHERE a.card_no = b.card_class and mem_no = $memNum";
        $sql = "SELECT card_class.card_class, vocab.vocab FROM card_class LEFT JOIN vocab ON card_class.card_no = vocab.card_class where card_class.mem_no = $memNum";
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
    if($doWhat == 'addClass'){
        $addClass = $_POST['addClass'];
        $sql = "INSERT INTO `card_class` (`card_no`, `mem_no`, `card_class`) VALUES (NULL, :memNum, :addClass);";
        $vocabs = $pdo->prepare($sql);
        $vocabs->bindValue(':memNum', $memNum);
        $vocabs->bindValue(':addClass', $addClass);
        $vocabs->execute();
    }else if($doWhat == 'deleteClass'){
        $deleteClass = $_POST['deleteClass'];
        $sql = "DELETE FROM `card_class` WHERE card_class = '{$deleteClass}' and mem_no = $memNum";
        $affectedRow = $pdo->prepare($sql);
        $affectedRow -> execute();
        // echo $affectedRow;
        // echo $deleteClass;
    }else if($doWhat == 'renameClass'){
        $renameName = $_POST['renameName'];
        $whichClass = $_POST['whichClass'];
        $sql = "UPDATE `card_class` SET `card_class`= '{$renameName}' WHERE mem_no = $memNum and card_class = '{$whichClass}';";
        $pdo->exec($sql);

        // echo $renameName . $whichClass;

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