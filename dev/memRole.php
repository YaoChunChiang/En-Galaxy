<?php
try{
    $dsn = "mysql:host=localhost;port=8889;dbname=dd102g4_test;charset=utf8";
    $user = "root";
    $password = "root";
    $pdo = new PDO($dsn, $user, $password);
    $action = $_GET["action"];
    if($action == "loadMem"){
        $memNo = $_GET["memNo"];
        $sql1 = "select rs.set_body_src,rs.set_part_src,rs.set_lefthand_src,rs.set_righthand_src,mm.set_color from mem_main mm,role_set rs where mm.mem_no = :memNo and mm.set_no = rs.set_no";
        $memRole = $pdo->prepare($sql1);
        $memRole->bindValue(":memNo", $memNo);
        $memRole->execute();
        $rows[0] = $memRole->fetchAll();
        $sql2 = "select re.equip_src from mem_equip me,role_equip re where me.equip_no = re.equip_no and me.mem_no = :memNo and re.equip_class = '武器'";
        $memWeapon = $pdo->prepare($sql2);
        $memWeapon->bindValue(":memNo", $memNo);
        $memWeapon->execute();
        if( $memWeapon->rowCount() == 0 ){
            $rows[1] = [];
        }else{
            $rows[1] = $memWeapon->fetchAll();
        }
        $sql3 = "select re.equip_src from mem_equip me,role_equip re where me.equip_no = re.equip_no and me.mem_no = :memNo and re.equip_class = '防具'";
        $memCloth = $pdo->prepare($sql3);
        $memCloth->bindValue(":memNo", $memNo);
        $memCloth->execute();
        if( $memCloth->rowCount() == 0 ){
            $rows[2] = [];
        }else{
            $rows[2] = $memCloth->fetchAll();
        }
        $sql4 = "select re.equip_src from mem_equip me,role_equip re where me.equip_no = re.equip_no and me.mem_no = :memNo and re.equip_class = '飾品'";
        $memAccessory = $pdo->prepare($sql4);
        $memAccessory->bindValue(":memNo", $memNo);
        $memAccessory->execute();
        if( $memAccessory->rowCount() == 0 ){
            $rows[3] = [];
        }else{
            $rows[3] = $memAccessory->fetchAll();
        }
        $sql5 = "select el.level_vehicle_src from eng_level el,mem_main mm where el.level_no = mm.level_no and mm.mem_no = :memNo";
        $memVehicle = $pdo->prepare($sql5);
        $memVehicle->bindValue(":memNo", $memNo);
        $memVehicle->execute();
        if( $memVehicle->rowCount() == 0 ){
            $rows[4] = [];
        }else{
            $rows[4] = $memVehicle->fetchAll();
        }
        echo json_encode($rows);
    }
}catch(PDOException $e){
    echo $e->getMessage();
}
?>