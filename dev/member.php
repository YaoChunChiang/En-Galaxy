<?php
try {
    require_once("pdoData.php");
    $action = $_POST["action"];
    // exit($action);
    if($action == "memDataEdit"){
        $mem_no=$_POST['mem_no'];
        $mem_name=$_POST['mem_name'];
        $set_nickname=$_POST['set_nickname'];
        $mem_psw=$_POST['mem_psw'];
        $mem_mail=$_POST['mem_mail'];
        $mem_cell=$_POST['mem_cell'];
        // $editSql = 'UPDATE mem_main SET mem_name = :mem_name, set_nickname = :set_nickname,mem_psw = :mem_psw,mem_email = :mem_email,mem_cell = :mem_cell WHERE mem_no = :mem_no';
        $editSql = "UPDATE mem_main SET mem_name = '$mem_name', set_nickname = '$set_nickname',mem_psw = '$mem_psw',mem_email = '$mem_email',mem_cell = '$mem_cell' WHERE mem_no = '$mem_no'";
        $memEdit = $pdo->prepare($editSql);
        $memEdit->bindValue(":mem_no",$mem_no);
        // $memEdit->bindValue(":mem_name",$mem_name);
        // $memEdit->bindValue(":set_nickname",$set_nickname);
        // $memEdit->bindValue(":mem_psw",$mem_psw);
        // $memEdit->bindValue(":mem_mail",$mem_mail);
        // $memEdit->bindValue(":mem_cell",$mem_cell);
        // exit( "{$mem_psw},{$set_nickname},{$mem_no}");
        // exit($editSql);
        $memEdit->execute();
        $sql='select * from mem_main where mem_no= :mem_no';
        $memEdit=$pdo->query($sql);
        // if( $memEdit->rowCount() == 0 ){
        //     echo "{}";
        // }else{
        //     $memEditRows = $memEdit->fetchAll();
        //     echo json_encode($memEditRows);
        // }
    }
    else if($action =='memVideoCol'){
        $getVdoColJsonStr = $_GET['dellJsonStr'];
        $movColJsonStr = json_decode($getVdoColJsonStr);
        // echo $getVdoColJsonStr;
        $vdoColSql='SELECT * FROM video JOIN video_col USING (video_no)';
        $vdoCol=$pdo->prepare($vdoColSql);
        // $vdoCol->bindValue(":admin", $vdoColNo->admin_no);
        $vdoCol->execute();
        $vdoColRow=$vdoCol->fetchAll();
        echo json_encode($vdoColRow);
    }
    // else if($action =='editMemData'){
    //     $editJsonStr = $_POST['editJsonStr'];
    //     $editAdminData = json_decode($editJsonStr);
    //     $editSql='UPDATE admin SET admin_account = :admin_account,admin_psw = :admin_psw, admin_level = :admin_level WHERE admin_no = :admin_no';
    //     $editAdmin=$pdo->prepare($editSql);
    //     $editAdmin->bindValue(":admin_no", $editAdminData->admin_no);
    //     $editAdmin->bindValue(":admin_account", $editAdminData->admin_account);
    //     $editAdmin->bindValue(":admin_psw", $editAdminData->admin_psw);
    //     $editAdmin->bindValue(":admin_level", $editAdminData->admin_level);
    //     $editAdmin->execute();
    // }

}catch(PDOException $e) {
    echo $e->getMessage();
}
