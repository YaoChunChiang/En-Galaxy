<?php
try{
    require_once("../pdoData.php");
    $action = $_GET["action"];
        if($action == "confirmInsert"){
            $equipClass = $_GET["equipClass"];
            $equipName = $_GET["equipName"];
            $equipSrc = $_GET["equipSrc"];
            $equipPrice = $_GET["equipPrice"];
            $equipStatus = $_GET["equipStatus"];
            $equipIntro = $_GET["equipIntro"];
            $sql = "insert into role_equip (equip_class,equip_name,equip_src,equip_price,equip_status,equip_intro) values (:equipClass, :equipName,:equipSrc,:equipPrice,:equipStatus,:equipIntro)";
            $insertEquip = $pdo->prepare($sql);
            $insertEquip->bindValue(":equipClass", $equipClass);
            $insertEquip->bindValue(":equipName", $equipName);
            $insertEquip->bindValue(":equipSrc", $equipSrc);
            $insertEquip->bindValue(":equipPrice", $equipPrice);
            $insertEquip->bindValue(":equipStatus", $equipStatus);
            $insertEquip->bindValue(":equipIntro", $equipIntro);
            $insertEquip->execute();
        }else if($action == "load"){
            $sql = "select * from role_equip";
            $equips = $pdo->query($sql);
            if( $equips->rowCount() == 0 ){
                echo "{}";
            }else{
                $equipsRows = $equips->fetchAll();
                echo json_encode( $equipsRows);
            }
        }else if($action == "confirmModify"){
            $equipNo = $_GET["equipNo"];
            $equipClass = $_GET["equipClass"];
            $equipName = $_GET["equipName"];
            $equipSrc = $_GET["equipSrc"];
            $equipPrice = $_GET["equipPrice"];
            $equipStatus = $_GET["equipStatus"];
            $equipIntro = $_GET["equipIntro"];
            $sql = "update role_equip set equip_class=:equipClass,equip_name=:equipName,equip_src=:equipSrc,equip_price=:equipPrice,equip_status=:equipStatus,equip_intro=:equipIntro where equip_no=:equipNo";
            $modifyEquip = $pdo->prepare($sql);
            $modifyEquip->bindValue(":equipClass", $equipClass);
            $modifyEquip->bindValue(":equipName", $equipName);
            $modifyEquip->bindValue(":equipSrc", $equipSrc);
            $modifyEquip->bindValue(":equipPrice", $equipPrice);
            $modifyEquip->bindValue(":equipStatus", $equipStatus);
            $modifyEquip->bindValue(":equipIntro", $equipIntro);
            $modifyEquip->bindValue(":equipNo", $equipNo);
            $modifyEquip->execute();
        }else if($action == "delete"){
            $equipNo = $_GET["equipNo"];
            $sql = "delete from role_equip where equip_no=:equipNo ";
            $deleteEquip = $pdo->prepare($sql);
            $deleteEquip->bindValue(":equipNo", $equipNo);
            $deleteEquip->execute();
        }
}catch(PDOException $e){
  echo $e->getMessage();
}
?>