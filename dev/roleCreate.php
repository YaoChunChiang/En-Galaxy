<?php
try{
    $dsn = "mysql:host=localhost;port=8889;dbname=dd102g4_test;charset=utf8";
    $user = "root";
    $password = "root";
    $pdo = new PDO($dsn, $user, $password);
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
    }  
}catch(PDOException $e){
    echo $e->getMessage();
}
?>