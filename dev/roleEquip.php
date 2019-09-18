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
        $sql2 = "select r.equip_name,r.equip_src,r.equip_intro from mem_equip m,role_equip r where m.equip_no = r.equip_no and m.mem_no = :memNo and r.equip_class = '武器' and m.equip_status = 1";
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
        $sql4 = "select re.equip_name,re.equip_src,re.equip_intro from mem_equip me,role_equip re where me.equip_no = re.equip_no and me.mem_no = :memNo and re.equip_class = '飾品' and m.equip_status = 1";
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
        $sql6 = "select re.equip_name,re.equip_src,re.equip_intro from mem_equip me,role_equip re where me.equip_no = re.equip_no and me.mem_no = :memNo and re.equip_class = '武器'";
        $memWeapons = $pdo->prepare($sql6);
        $memWeapons->bindValue(":memNo", $memNo);
        $memWeapons->execute();
        if( $memWeapons->rowCount() == 0 ){
            $rows[5] = [''];
        }else{
            $rows[5] = $memWeapons->fetchAll();
        }
        $sql7 = "select re.equip_name,re.equip_src,re.equip_intro from mem_equip me,role_equip re where me.equip_no = re.equip_no and me.mem_no = :memNo and re.equip_class = '防具'";
        $memClothes = $pdo->prepare($sql7);
        $memClothes->bindValue(":memNo", $memNo);
        $memClothes->execute();
        if( $memClothes->rowCount() == 0 ){
            $rows[6] = [''];
        }else{
            $rows[6] = $memClothes->fetchAll();
        }
        $sql8 = "select re.equip_name,re.equip_src,re.equip_intro from mem_equip me,role_equip re where me.equip_no = re.equip_no and me.mem_no = :memNo and re.equip_class = '飾品'";
        $memAccessories = $pdo->prepare($sql8);
        $memAccessories->bindValue(":memNo", $memNo);
        $memAccessories->execute();
        if( $memAccessories->rowCount() == 0 ){
            $rows[7] = [''];
        }else{
            $rows[7] = $memAccessories->fetchAll();
        }
        echo json_encode($rows);
    }
}catch(PDOException $e){
    echo $e->getMessage();
}
?>