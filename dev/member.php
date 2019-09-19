<?php
try {
    require_once("../pdoData.php");
    $action = $_REQUEST["action"];
    
    echo ($action);
    if($action == "memDataEdit"){
        $editSql = "update mem_main set mem_name=:mem_name,set_nickname=:set_nickname,mem_psw=:mem_psw,mem_email=:mem_email,mem_cell=:mem_cell where mem_no=:mem_no";
        $memEdit = $pdo->prepare($editSql);
        $memEdit->bindValue(":mem_no",$_PUT['mem_no']);
        $memEdit->bindValue(":mem_name",$_PUT['mem_name']);
        $memEdit->bindValue(":set_nickname",$_PUT['set_nickname']);
        $memEdit->bindValue(":mem_psw",$_PUT['mem_psw']);
        $memEdit->bindValue(":mem_mail",$_PUT['mem_mail']);
        $memEdit->bindValue(":mem_cell",$_PUT['mem_cell']);
        $memEdit->execute();
        if( $memEdit->rowCount() == 0 ){
            echo "{}";
        }else{
            $memEditRows = $memEdit->fetchAll();
            echo json_encode($memEditRows);
        }
    }
    else if($action =='dellVideoCol'){
        $dellJsonStr = $_POST['dellJsonStr'];
        $dellAdminNo = json_decode($dellJsonStr);
        // echo $dellJsonStr;
        $delSql='DELETE FROM admin WHERE admin_no = :admin_no';
        $dellAdmin=$pdo->prepare($delSql);
        $dellAdmin->bindValue(":admin", $dellAdminNo->admin_no);
        $dellAdmin->execute();
    }
    else if($action =='editMemData'){
        $editJsonStr = $_POST['editJsonStr'];
        $editAdminData = json_decode($editJsonStr);
        $editSql='UPDATE admin SET admin_account = :admin_account,admin_psw = :admin_psw, admin_level = :admin_level WHERE admin_no = :admin_no';
        $editAdmin=$pdo->prepare($editSql);
        $editAdmin->bindValue(":admin_no", $editAdminData->admin_no);
        $editAdmin->bindValue(":admin_account", $editAdminData->admin_account);
        $editAdmin->bindValue(":admin_psw", $editAdminData->admin_psw);
        $editAdmin->bindValue(":admin_level", $editAdminData->admin_level);
        $editAdmin->execute();
    }

}catch(PDOException $e) {
    echo $e->getMessage();
}
