<?php
try{
    require_once("pdoData.php");
    $action = $_GET["action"];
    if($action == "load"){
        $sql = "select * from role_set where set_status = 1";
        $roles = $pdo->query($sql);
        if( $roles->rowCount() == 0 ){
            echo "{}";
        }else{
            $rolesRows = $roles->fetchAll();
            echo json_encode($rolesRows);
        }
    }else if($action == "loadMemRole"){
        $setNo = $_GET["setNo"];
        $sql = "select * from role_set where set_no = :setNo";
        $memRole = $pdo->prepare($sql);
        $memRole->bindValue(":setNo", $setNo);
        $memRole->execute();
        if( $memRole->rowCount() == 0 ){
            echo "{}";
        }else{
            $memRoleRow = $memRole->fetchAll();
            echo json_encode($memRoleRow);
        }
    }else if($action == "loadMemRole"){
        $setNo = $_GET["setNo"];
        $sql = "select * from role_set where set_no = :setNo";
        $memRole = $pdo->prepare($sql);
        $memRole->bindValue(":setNo", $setNo);
        $memRole->execute();
        if( $memRole->rowCount() == 0 ){
            echo "{}";
        }else{
            $memRoleRow = $memRole->fetchAll();
            echo json_encode($memRoleRow);
        }
    }else if($action == "rebirthPrice"){
        $nickNameChanged = $_GET["nickNameChanged"];
        $raceChanged = $_GET["raceChanged"];
        $colorChanged = $_GET["colorChanged"];
        $memNo = $_GET["memNo"];
        $memMoney = $_GET["memMoney"];
        $sql = "update mem_main set set_nickname = :nickNameChanged,mem_money = :memMoney,set_no = :raceChanged,set_color = :colorChanged where mem_no = :memNo";
        $memChange = $pdo->prepare($sql);
        $memChange->bindValue(":nickNameChanged", $nickNameChanged);
        $memChange->bindValue(":memMoney", $memMoney);
        $memChange->bindValue(":raceChanged", $raceChanged);
        $memChange->bindValue(":colorChanged", $colorChanged);
        $memChange->bindValue(":memNo", $memNo);
        $memChange->execute();
    }
}catch(PDOException $e){
    echo $e->getMessage();
}
?>