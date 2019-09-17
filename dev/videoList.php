<?php
    require_once("pdoData.php");
    $who = $_REQUEST['who'];

    if($who === 'start'){
        $sqlGetVideo = "SELECT `level_no`, `video_name`, `video_type` ,`video_pic`FROM `video` WHERE `video_status` != 0";
        $videos = $pdo->query($sqlGetVideo);
        $videosObject = $videos->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($videosObject);
    }
?>