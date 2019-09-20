<?php
    require_once("pdoData.php");
    $video_no = $_GET['video_no'];
    $sql = "SELECT vs.subtitles, v.video_no,v.video_name, v.video_desc,v.video_src,v.video_type ,e.level_name 
            FROM `video_subtitles` vs, video v , eng_level e 
            WHERE vs.video_no = v.video_no and v.level_no = e.level_no and v.video_no = {$video_no}";

    $videoInfo = $pdo->query($sql);
    $videoInfoRow = $videoInfo->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($videoInfoRow);
?>