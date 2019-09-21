<?php
    require_once("pdoData.php");
    $who = $_REQUEST['who'];

    if($who === 'init'){
        $video_no = $_GET['video_no'];
        $sql = "SELECT vs.subtitles, v.video_no,v.video_name, v.video_desc,v.video_src,v.video_type ,e.level_name 
                FROM `video_subtitles` vs, video v , eng_level e 
                WHERE vs.video_no = v.video_no and v.level_no = e.level_no and v.video_no = :video_no";
    
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
    
        $sendVideoInfo = [$videoInfoRow,$objs];
    
        echo json_encode($sendVideoInfo);
    }else if($who === 'addMoney'){
        $mem_no = $_POST['memNum'];
        $moneyAdd = 10;
        $sql = "UPDATE mem_main SET mem_money = mem_money + {$moneyAdd} WHERE `mem_main`.`mem_no` = $mem_no";
        $pdo->exec($sql);
    }
?>