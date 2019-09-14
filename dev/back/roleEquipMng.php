<?php
try{
    $dsn = "mysql:host=localhost;port=8889;dbname=dd102g4;charset=utf8";
    $user = "root";
    $password = "root";
    $pdo = new PDO($dsn, $user, $password);
    $action = $_GET["action"];
        if($action == "confirmInsert"){
            $equipClass = $_GET["equipClass"];
            $equipName = $_GET["equipName"];
            $equipSrc = $_GET["equipSrc"];
            $equipPrice = $_GET["equipPrice"];
            $equipStatus = $_GET["equipStatus"];
            $equipIntro = $_GET["equipIntro"];
            $sql = "insert into role_equip (equip_class,equip_name,equip_src,equip_price,equip_status,equip_intro) values (:equipClass, :equipName,:equipSrc,:equipPrice,:equipStatus,:equipIntro)";
            $InsertEquip = $pdo->prepare($sql);
            $InsertEquip->bindValue(":equipClass", $equipClass);
            $InsertEquip->bindValue(":equipName", $equipName);
            $InsertEquip->bindValue(":equipSrc", $equipSrc);
            $InsertEquip->bindValue(":equipPrice", $equipPrice);
            $InsertEquip->bindValue(":equipStatus", $equipStatus);
            $InsertEquip->bindValue(":equipIntro", $equipIntro);
            $InsertEquip->execute();
        }else if($action == "load"){
            $sql = "select * from role_equip";
            $equips = $pdo->query($sql);
            if( $equips->rowCount() == 0 ){
                echo "{}";
            }else{
                $equipsRows = $equips->fetchAll();
                echo json_encode( $equipsRows);
            }
        }
}catch(PDOException $e){
  echo $e->getMessage();
}
?>