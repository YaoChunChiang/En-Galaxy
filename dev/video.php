<?php
    $errMsg = '';
    try{
        require_once("pdoData.php");

        $who = $_REQUEST['who'];
    
        if($who === 'init'){
            $video_no = $_GET['video_no'];
            $sql = "SELECT v.subtitle, v.video_no,v.video_name, v.video_desc,v.video_src,v.video_type ,e.level_name 
                    FROM  video v , eng_level e 
                    WHERE v.level_no = e.level_no and v.video_no = :video_no";
        
            $sqlQuestion = "SELECT video_q, opt_1, opt_2, opt_3, opt_4, answer 
                            FROM video_qs 
                            WHERE video_no = :video_no 
                            and video_q_status = 1";
        
            //撈影片資訊
            $videoInfo = $pdo->prepare($sql);
            $videoInfo->bindValue(":video_no", $video_no);
            $videoInfo->execute();
            $videoInfoRow = $videoInfo->fetchObject();
            //撈題庫
            $videoQuestion = $pdo->prepare($sqlQuestion);
            $videoQuestion->bindValue("video_no", $video_no);
            $videoQuestion->execute();
            while($videoQuestionRow = $videoQuestion->fetchObject()){
                $objs[] = $videoQuestionRow;
            }
            // $videoQuestionRow = $videoQuestion->fetchObject();
            $sendVideoInfo = [$videoInfoRow, $objs];
            echo json_encode($sendVideoInfo);
        }else if($who === 'addMoney'){
            $mem_no = $_POST['memNum'];
            $moneyAdd = 10;
            $sql = "UPDATE mem_main SET mem_money = mem_money + {$moneyAdd} WHERE `mem_main`.`mem_no` = $mem_no";
            $pdo->exec($sql);
        }else if($who === 'addFavorateVideo'){
            $videoNo = $_GET['videoNo'];
            $memNum = $_GET['memNum'];
            $sql = 'INSERT INTO `video_col` (`video_no`, `mem_no`) VALUES (:videoNo, :memNum)';
            $addFavorate = $pdo->prepare($sql);
            $addFavorate->bindValue(':videoNo', $videoNo);
            $addFavorate->bindValue(':memNum', $memNum);
            $addFavorate->execute();
            echo 'weeee';
    
        }else if($who === 'getCardClass'){
            $memNum = $_GET['memNum'];
            $sql = 'SELECT card_class, card_no FROM `card_class` WHERE mem_no = :memNum';
            $cardClass = $pdo->prepare($sql);
            $cardClass->bindValue(':memNum', $memNum);
            $cardClass->execute();
            $cardClasses = $cardClass->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($cardClasses);
        }else if($who === 'addVocab'){
            // $memNum = $_GET['memNum'];
            $whichClass = $_GET['whichClass'];
            $vocab = $_GET['vocab'];

            $sql = 'INSERT INTO `vocab` (`vocab_no`, `card_class`, `vocab`, `add_time`, `forget_time`, `remeb_time`) 
                    VALUES (NULL, :whichClass, :vocab, NULL, NULL, NULL);';
            $addVocab = $pdo->prepare($sql);
            $addVocab->bindValue(':whichClass', $whichClass);
            $addVocab->bindValue(':vocab', $vocab);
            $addVocab->execute();
            echo 'weeee';
        }
    }catch(PDOException $e){
        echo $e->getMessage();
    }
?>