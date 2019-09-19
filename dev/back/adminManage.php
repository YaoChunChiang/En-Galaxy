<?php
try {
    require_once("../pdoData.php");
    $getAction = $_GET["action"];
    $postAction = $_POST["action"];
    if($getAction == "load"){
        $sql = "select * from admin";
        $admin = $pdo->prepare($sql);
        $admin->execute();
        if( $admin->rowCount() == 0 ){
            echo "{}";
        }else{
            $adminRows = $admin->fetchAll();
            echo json_encode($adminRows);
        }
    }
    else if ($postAction == "addAdmin") {
        $admin_account = $_POST["admin_account"];
        $admin_psw = $_POST["admin_psw"];
        $admin_level = $_POST["admin_level"];
        $sql = "insert into admin(admin_no,admin_account,admin_psw,admin_level) values(null,:admin_account,:admin_psw,:admin_level)";
        $admin = $pdo->prepare($sql);
        $admin->bindValue(":admin_account", $admin_account);
        $admin->bindValue(":admin_psw", $admin_psw);
        $admin->bindValue(":admin_level", $admin_level);
        $admin->execute();

        $getNoSql ="SELECT * FROM admin ORDER by admin_no DESC LIMIT 1";
        $getNo = $pdo->prepare($getNoSql);
        $getNo->execute();
        if($getNo->rowCount() ==0){
            echo "{}";
        }else {
            $getNoRows = $getNo->fetch();
            echo json_encode($getNoRows);
        }
    }
    else if($postAction =='dellAdmin'){
        $dellJsonStr = $_POST['dellJsonStr'];
        $dellAdminNo = json_decode($dellJsonStr);
        // echo $dellJsonStr;
        $delSql='DELETE FROM admin WHERE admin_no = :admin_no';
        $dellAdmin=$pdo->prepare($delSql);
        $dellAdmin->bindValue(":admin", $dellAdminNo->admin_no);
        $dellAdmin->execute();
    }
    else if($postAction =='editAdmin'){
        $editJsonStr = $_POST['editJsonStr'];
        $editAdminData = json_decode($editJsonStr);
        // echo $dellJsonStr;
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
?>