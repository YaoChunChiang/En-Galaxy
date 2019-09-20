<?php
try{
    require_once("pdoData.php");
    $action = $_GET["action"];
    if($action == "loadMem"){
        $memNo = $_GET["memNo"];
        $setNo = $_GET["setNo"];
        $sql1 = "select * from role_set where set_no = :setNo";
        $memRole = $pdo->prepare($sql1);
        $memRole->bindValue(":setNo", $setNo);
        $memRole->execute();
        $rows[0] = $memRole->fetchAll();
        $sql2 = "select r.equip_no,r.equip_name,r.equip_src,r.equip_intro from mem_equip m,role_equip r where m.equip_no = r.equip_no and m.mem_no = :memNo and r.equip_class = '武器' and m.equip_status = 1";
        $memWeapon = $pdo->prepare($sql2);
        $memWeapon->bindValue(":memNo", $memNo);
        $memWeapon->execute();
        if( $memWeapon->rowCount() == 0 ){
            $rows[1] = [''];
        }else{
            $rows[1] = $memWeapon->fetchAll();
        }
        $sql3 = "select re.equip_name,re.equip_src,re.equip_intro from mem_equip me,role_equip re where me.equip_no = re.equip_no and me.mem_no = :memNo and re.equip_class = '防具'and me.equip_status = 1";
        $memCloth = $pdo->prepare($sql3);
        $memCloth->bindValue(":memNo", $memNo);
        $memCloth->execute();
        if( $memCloth->rowCount() == 0 ){
            $rows[2] = [''];
        }else{
            $rows[2] = $memCloth->fetchAll();
        }
        $sql4 = "select re.equip_name,re.equip_src,re.equip_intro from mem_equip me,role_equip re where me.equip_no = re.equip_no and me.mem_no = :memNo and re.equip_class = '飾品' and me.equip_status = 1";
        $memAccessory = $pdo->prepare($sql4);
        $memAccessory->bindValue(":memNo", $memNo);
        $memAccessory->execute();
        if( $memAccessory->rowCount() == 0 ){
            $rows[3] = [''];
        }else{
            $rows[3] = $memAccessory->fetchAll();
        }
        $sql5 = "select el.level_vehicle_src from eng_level el,mem_main mm where el.level_no = mm.level_no and mm.mem_no = :memNo";
        $memVehicle = $pdo->prepare($sql5);
        $memVehicle->bindValue(":memNo", $memNo);
        $memVehicle->execute();
        if( $memVehicle->rowCount() == 0 ){
            $rows[4] = [''];
        }else{
            $rows[4] = $memVehicle->fetchAll();
        }
        echo json_encode($rows);
    }else if($action == "loadMemClosets"){
        $memNo = $_GET["memNo"];
        $sql1 = "select re.equip_name,re.equip_src,re.equip_intro from mem_equip me,role_equip re where me.equip_no = re.equip_no and me.mem_no = :memNo and re.equip_class = '武器'";
        $memWeapons = $pdo->prepare($sql1);
        $memWeapons->bindValue(":memNo", $memNo);
        $memWeapons->execute();
        if( $memWeapons->rowCount() == 0 ){
            $rows[0] = [''];
        }else{
            $rows[0] = $memWeapons->fetchAll();
        }
        $sql2 = "select re.equip_name,re.equip_src,re.equip_intro from mem_equip me,role_equip re where me.equip_no = re.equip_no and me.mem_no = :memNo and re.equip_class = '防具'";
        $memClothes = $pdo->prepare($sql2);
        $memClothes->bindValue(":memNo", $memNo);
        $memClothes->execute();
        if( $memClothes->rowCount() == 0 ){
            $rows[1] = [''];
        }else{
            $rows[1] = $memClothes->fetchAll();
        }
        $sql3 = "select re.equip_name,re.equip_src,re.equip_intro from mem_equip me,role_equip re where me.equip_no = re.equip_no and me.mem_no = :memNo and re.equip_class = '飾品'";
        $memAccessories = $pdo->prepare($sql3);
        $memAccessories->bindValue(":memNo", $memNo);
        $memAccessories->execute();
        if( $memAccessories->rowCount() == 0 ){
            $rows[2] = [''];
        }else{
            $rows[2] = $memAccessories->fetchAll();
        }
        echo json_encode($rows);
    }else if($action == "loadMemStores"){
        $memNo = $_GET["memNo"];
        $sql1 = "select * from role_equip re left join mem_equip me on re.equip_no = me.equip_no where re.equip_status = 1 and re.equip_class='武器' and (me.mem_no is null or me.mem_no != :memNo) order by re.equip_no";
        $storeWeapons = $pdo->prepare($sql1);
        $storeWeapons->bindValue(":memNo", $memNo);
        $storeWeapons->execute();
        if( $storeWeapons->rowCount() == 0 ){
            $rows[0] = [''];
        }else{
            $rows[0] = $storeWeapons->fetchAll();
        }
        $sql2 = "select * from role_equip re left join mem_equip me on re.equip_no = me.equip_no where re.equip_status = 1 and re.equip_class='防具' and (me.mem_no is null or me.mem_no != :memNo) order by re.equip_no";
        $storeClothes = $pdo->prepare($sql2);
        $storeClothes->bindValue(":memNo", $memNo);
        $storeClothes->execute();
        if( $storeClothes->rowCount() == 0 ){
            $rows[1] = [''];
        }else{
            $rows[1] = $storeClothes->fetchAll();
        }
        $sql3 = "select * from role_equip re left join mem_equip me on re.equip_no = me.equip_no where re.equip_status = 1 and re.equip_class='飾品' and (me.mem_no is null or me.mem_no != :memNo) order by re.equip_no";
        $storeAccessories = $pdo->prepare($sql3);
        $storeAccessories->bindValue(":memNo", $memNo);
        $storeAccessories->execute();
        if( $storeAccessories->rowCount() == 0 ){
            $rows[2] = [''];
        }else{
            $rows[2] = $storeAccessories->fetchAll();
        }
        echo json_encode($rows);
    }else if($action == "purchase"){
        $memNo = $_GET["memNo"];
        $balance = $_GET["balance"];
        $equipNo = $_GET["equipNo"];
        $equipChanged = $_GET["equipChanged"];
        $sql1 = "update mem_main set mem_money = :balance where mem_no = :memNo";
        $updateMoney = $pdo->prepare($sql1);
        $updateMoney->bindValue(":memNo", $memNo);
        $updateMoney->bindValue(":balance", $balance);
        $updateMoney->execute();
        $sql2 = "insert into mem_equip (mem_no,equip_no,equip_status) values (:memNo,:equipNo,1)";
        $insertEquip = $pdo->prepare($sql2);
        $insertEquip->bindValue(":memNo", $memNo);
        $insertEquip->bindValue(":equipNo", $equipNo);
        $insertEquip->execute();
        $sql3 = "update mem_equip set equip_status=0 where mem_no = :memNo and equip_no = :equipChanged";
        $unequipEquip = $pdo->prepare($sql3);
        $unequipEquip->bindValue(":memNo", $memNo);
        $unequipEquip->bindValue(":equipChanged", $equipChanged);
        $unequipEquip->execute();
    }
}catch(PDOException $e){
    echo $e->getMessage();
}
?>