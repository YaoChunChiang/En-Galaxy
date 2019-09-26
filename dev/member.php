<?php
try {
    require_once("pdoData.php");
    $action = $_REQUEST["action"];
    
    // exit($action);
    if($action == "memDataEdit"){
        $mem_no=$_POST['mem_no'];
        $mem_name=$_POST['mem_name'];
        $set_nickname=$_POST['set_nickname'];
        $mem_psw=$_POST['mem_psw'];
        $mem_email=$_POST['mem_email'];
        $mem_cell=$_POST['mem_cell'];
        // $editSql = 'UPDATE mem_main SET mem_name = :mem_name, set_nickname = :set_nickname,mem_psw = :mem_psw,mem_email = :mem_email,mem_cell = :mem_cell WHERE mem_no = :mem_no';
        $editSql = "UPDATE mem_main SET mem_name = '$mem_name', set_nickname = '$set_nickname',mem_psw = '$mem_psw',mem_email = '$mem_email',mem_cell = '$mem_cell' WHERE mem_no = '$mem_no'";
        $memEdit = $pdo->prepare($editSql);
        // $memEdit->bindValue(":mem_no",$mem_no);
        // $memEdit->bindValue(":mem_name",$mem_name);
        // $memEdit->bindValue(":set_nickname",$set_nickname);
        // $memEdit->bindValue(":mem_psw",$mem_psw);
        // $memEdit->bindValue(":mem_mail",$mem_mail);
        // $memEdit->bindValue(":mem_cell",$mem_cell);
        // exit( "{$mem_psw},{$set_nickname},{$mem_no}");
        // exit($editSql);
        $memEdit->execute();
        // $sql='select * from mem_main where mem_no= :mem_no';
        // $memEdit=$pdo->query($sql);
        // $memEdit->execute();
        if( $memEdit->rowCount() == 0 ){
            echo "{}";
        }else{
            $memEditRows = $memEdit->fetchAll();
            echo json_encode($memEditRows);
        }
    }
    else if($action =='loadVideoCol'){
        $mem_noCol = $_POST['mem_no'];
        $vdoColSql='SELECT * FROM video JOIN video_col USING (video_no) WHERE mem_no=:mem_no';
        $vdoCol=$pdo->prepare($vdoColSql);
        $vdoCol->bindValue(":mem_no", $mem_noCol);
        $vdoCol->execute();
        if($vdoCol->rowCount() ==0){
            echo "{}";
        }else {
            $vdoColRows = $vdoCol->fetchAll();
            echo json_encode($vdoColRows);
        }
    }
    else if($action == 'videoColCancell'){
        $mem_noVideoCancell = $_POST['mem_no'];
        $video_noVideoCancell = $_POST['video_no'];
        $videoCancellSql='DELETE FROM video_col WHERE (mem_no = :mem_no) AND (video_no = :video_no)';
        $videoCancell=$pdo->prepare($videoCancellSql);
        $videoCancell->bindValue(":mem_no", $mem_noVideoCancell);
        $videoCancell->bindValue(":video_no", $video_noVideoCancell);
        $videoCancell->execute();
        if($videoCancell->rowCount() ==0){
            echo "{}";
        }else {
            $videoCancellRows = $videoCancell->fetchAll();
            echo json_encode($videoCancellRows);
        }
    }
    else if($action =='loadAchList'){
        $mem_achListNo = $_GET['mem_no'];
        $achListSql='SELECT * FROM ach_list';
        $achList=$pdo->prepare($achListSql);
        // $achList->bindValue(":mem_no", $mem_achListNo);
        $achList->execute();
        if($achList->rowCount() ==0){
            echo "{}";
        }else {
            $achListRows = $achList->fetchAll();
            echo json_encode($achListRows);
        }
    }
    else if($action =='loadMemAch'){
        $mem_achListNo = $_GET['mem_no'];
        $memAchSql='SELECT * FROM mem_ach JOIN ach_list USING(ach_no) WHERE mem_no=:mem_no';
        $memAchList=$pdo->prepare($memAchSql);
        $memAchList->bindValue(":mem_no", $mem_achListNo);
        $memAchList->execute();
        if($memAchList->rowCount() ==0){
            echo "{}";
        }else {
            $memAchListRows = $memAchList->fetchAll();
            echo json_encode($memAchListRows);
        }
    }
    else if($action =='loadTitleOnEquip'){
        $mem_titleOnEquipNo = $_GET['mem_no'];
        $memTitleSql='SELECT a.mem_no,a.ach_no,a.ach_status,b.ach_title
        FROM mem_ach a LEFT JOIN ach_list b on a.ach_no = b.ach_no
        WHERE a.mem_no = :mem_no';
        $memTitleList=$pdo->prepare($memTitleSql);
        $memTitleList->bindValue(":mem_no", $mem_titleOnEquipNo);
        $memTitleList->execute();
        if($memTitleList->rowCount() ==0){
            echo "{}";
        }else {
            $memTitleListRows = $memTitleList->fetchAll();
            echo json_encode($memTitleListRows);
        }
    }
    else if($action =='loadDefaultAct'){
        $mem_no_defaultAct = $_GET['mem_no'];
        $act_date = $_GET['today'];
        $memActDefaultSql='SELECT a.mem_no,a.act_no,b.act_name,b.act_date,b.act_place,b.act_detail,b.join_count,b.act_max,c.mem_name act_holder FROM `activity_history` a left JOIN  activity b on a.act_no = b.act_no left JOIN  mem_main c on b.mem_no=c.mem_no where (a.mem_no = :mem_no) AND (b.act_date = :act_date)';
        $memActDefault=$pdo->prepare($memActDefaultSql);
        $memActDefault->bindValue(":mem_no", $mem_no_defaultAct);
        $memActDefault->bindValue(":act_date", $today);
        $memActDefault->execute();
        if($memActDefault->rowCount() ==0){
            echo "{}";
        }else {
            $memActDefaultRows = $memActDefault->fetchAll();
            echo json_encode($memActDefaultRows);
        }
    }
    else if($action =='loadPointerAct'){
        $mem_no_pointerAct = $_GET['mem_no'];
        $date_pointerAct = $_GET['day'];
        // exit($date_pointerAct);
        $memActPointerSql='SELECT a.mem_no,a.act_no,b.act_name,b.act_date,b.act_place,b.act_detail,b.join_count,b.act_max,c.mem_name act_holder FROM `activity_history` a left JOIN  activity b on a.act_no = b.act_no left JOIN  mem_main c on b.mem_no=c.mem_no where (a.mem_no = :mem_no) AND (b.act_date = :dayAct)';
        $memActPointer=$pdo->prepare($memActPointerSql);
        $memActPointer->bindValue(":mem_no", $mem_no_pointerAct);
        $memActPointer->bindValue(":dayAct", $date_pointerAct);
        $memActPointer->execute();
        if($memActPointer->rowCount() ==0){
            echo "{}";
        }else {
            $memActPointerRows = $memActPointer->fetchAll();
            echo json_encode($memActPointerRows);
        }
    }
    else if($action =='actCancell'){
        $mem_noActCancell = $_POST['mem_no'];
        $act_noActCancell = $_POST['act_no'];
        // exit($mem_noActCancell);
        $actCancellSql='DELETE FROM activity_history WHERE (mem_no = :mem_no) AND (act_no = :act_no)';
        $actCancell=$pdo->prepare($actCancellSql);
        $actCancell->bindValue(":mem_no", $mem_noActCancell);
        $actCancell->bindValue(":act_no", $act_noActCancell);
        $actCancell->execute();
        if($actCancell->rowCount() ==0){
            echo "{}";
        }else {
            $actCancellRows = $actCancell->fetchAll();
            echo json_encode($actCancellRows);
        }
    }
    else if($action =='loadmemAct'){
        $mem_no_pointerAct = $_GET['mem_no'];
        // $date_pointerAct = $_GET['day'];
        // exit($date_pointerAct);
        $memActContentSql='SELECT a.mem_no,a.act_no,b.act_name,b.act_date,b.act_place,b.act_detail,b.join_count,b.act_max,c.mem_name act_holder FROM `activity_history` a left JOIN  activity b on a.act_no = b.act_no left JOIN  mem_main c on b.mem_no=c.mem_no where (a.mem_no = :mem_no)';
        $memActContent=$pdo->prepare($memActContentSql);
        $memActContent->bindValue(":mem_no", $mem_no_pointerAct);
        // $memActContent->bindValue(":dayAct", $date_pointerAct);
        $memActContent->execute();
        if($memActContent->rowCount() ==0){
            echo "{}";
        }else {
            $memActContentRows = $memActContent->fetchAll();
            echo json_encode($memActContentRows);
        }
    }
    else if($action =='equipMemAch'){
        $mem_titleOnEquipNo = $_POST['mem_no'];
        $achOnEquip = $_POST['ach_no'];
        $achReadyChange = $_POST['achReadyChange'];
        
        $titleOnEquipSql_1st='UPDATE mem_ach SET ach_status = 0
        WHERE (mem_no = :mem_no) AND (ach_no = :ach_noReadyChange)';
        $titleOnEquip_1st=$pdo->prepare($titleOnEquipSql_1st);
        $titleOnEquip_1st->bindValue(":mem_no", $mem_titleOnEquipNo);
        $titleOnEquip_1st->bindValue(":ach_noReadyChange", $achReadyChange);
        $titleOnEquip_1st->execute();
        // exit($titleOnEquipSql_1st);


        $titleOnEquipSql_2nd='UPDATE mem_ach SET ach_status=1
        WHERE (mem_no = :mem_no) AND (ach_no = :ach_noOnEquip)';
        // exit($titleOnEquipSql_2nd);
        $titleOnEquip_2nd=$pdo->prepare($titleOnEquipSql_2nd);
        $titleOnEquip_2nd->bindValue(":mem_no", $mem_titleOnEquipNo);
        $titleOnEquip_2nd->bindValue(":ach_noOnEquip", $achOnEquip);
        $titleOnEquip_2nd->execute();
        if($titleOnEquip_2nd->rowCount() ==0){
            echo "{}";
        }else {
            $memTitleOnEquip_2ndRows = $titleOnEquip_2nd->fetchAll();
            echo json_encode($memTitleOnEquip_2ndRows);
        }
    }

}catch(PDOException $e) {
    echo $e->getMessage();
}
