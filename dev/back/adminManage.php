<?php
try {
    require_once("../pdoData.php");
    $action = $_REQUEST["action"];
    if ($action == "load") {
        $sql = "select * from admin where admin_level='0'";
        $admin = $pdo->prepare($sql);
        $admin->execute();
        if ($admin->rowCount() == 0) {
            echo "{}";
        } else {
            $adminRows = $admin->fetchAll();
            echo json_encode($adminRows);
        }
    } else if ($action == "addAdmin") {
        $admin_account = $_POST["admin_account"];
        $admin_psw = $_POST["admin_psw"];
        $admin_level = $_POST["admin_level"];
        $sql = "insert into admin(admin_no,admin_account,admin_psw,admin_level) values(null,:admin_account,:admin_psw,:admin_level)";
        $admin = $pdo->prepare($sql);
        $admin->bindValue(":admin_account", $admin_account);
        $admin->bindValue(":admin_psw", $admin_psw);
        $admin->bindValue(":admin_level", $admin_level);
        $admin->execute();

        $getNoSql = "SELECT * FROM admin ORDER by admin_no DESC LIMIT 1";
        $getNo = $pdo->prepare($getNoSql);
        $getNo->execute();
        if ($getNo->rowCount() == 0) {
            echo "{}";
        } else {
            $getNoRows = $getNo->fetch();
            echo json_encode($getNoRows);
        }
    } else if ($action == 'dellAdmin') {
        $dellJsonStr = $_POST['dellJsonStr'];
        $dellAdminNo = json_decode($dellJsonStr);
        // echo $dellJsonStr;
        $delSql = 'DELETE FROM admin WHERE admin_no = :admin_no';
        $dellAdmin = $pdo->prepare($delSql);
        $dellAdmin->bindValue(":admin_no", $dellAdminNo->admin_no);
        $dellAdmin->execute();
        if ($dellAdmin->rowCount() == 0) {
            echo '{}';
        } else {
            $dellAdminRoll = $dellAdmin->fetchAll();
            echo json_encode($dellAdminRoll);
        }
    } else if ($action == 'editAdmin') {
        $admin_no = $_POST['admin_no'];
        $admin_account = $_POST['admin_account'];
        $admin_psw = $_POST['admin_psw'];
        $admin_level = $_POST['admin_level'];
        $editSql = 'UPDATE admin SET admin_account = :admin_account,admin_psw = :admin_psw, admin_level = :admin_level WHERE admin_no = :admin_no';
        $editAdmin = $pdo->prepare($editSql);
        $editAdmin->bindValue(":admin_no", $admin_no);
        $editAdmin->bindValue(":admin_account", $admin_account);
        $editAdmin->bindValue(":admin_psw", $admin_psw);
        $editAdmin->bindValue(":admin_level", $admin_level);
        $editAdmin->execute();
        if ($editAdmin !=0){
            $editAdminRow = $editAdmin->fetchAll();
            echo json_encode($editAdminRow);
        }
    } else if ($action == 'getAdmin') {
        $admin_account = $_GET['admin_account'];
        $admin_psw = $_GET['admin_psw'];
        $sql = "select * from admin where admin_account = :admin_account and admin_psw= :admin_psw";
        $admins = $pdo->prepare($sql);
        // exit($sql);
        $admins->bindValue(":admin_account", $admin_account);
        $admins->bindValue(":admin_psw", $admin_psw);
        $admins->execute();
        if ($admins->rowCount() == 0) {
            echo "0";
        } else {
            $adminRow = $admins->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($adminRow);
        }
    }
} 
catch (PDOException $e) {
    echo $e->getMessage();
}
?>
