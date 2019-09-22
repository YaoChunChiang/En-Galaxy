<?php
try{
    require_once("pdoData.php");
    $action = $_GET["action"];
    if($action == "load"){
        $sql = "select * from chat_robot";
        $qnas = $pdo->query($sql);
        if( $qnas->rowCount() == 0 ){
            echo "{}";
        }else{
            $qnasRows = $qnas->fetchAll();
            echo json_encode($qnasRows);
        }
    }else if($action == "addToCard"){
        $memNo = $_GET["memNo"];
        $sql = "select * from card_class where mem_no = :memNo";
        $cardClasses = $pdo->prepare($sql);
        $cardClasses->bindValue(":memNo", $memNo);
        $cardClasses->execute();
        if( $cardClasses->rowCount() == 0 ){
            echo "{}";
        }else{
            $cardClassesRows = $cardClasses->fetchAll();
            echo json_encode($cardClassesRows);
        }
    }else if($action == "comfirmAdd"){
        $cardClass = $_GET["cardClass"];
        $cardVocabulary = $_GET["cardVocabulary"];
        $sql = "insert into vocab (card_class,vocab) values (:cardClass,:cardVocabulary)";
        $vocabularyAdded = $pdo->prepare($sql);
        $vocabularyAdded->bindValue(":cardClass", $cardClass);
        $vocabularyAdded->bindValue(":cardVocabulary", $cardVocabulary);
        $vocabularyAdded->execute();
    }else if($action == "loadMemRole"){
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
        $sql3 = "select re.equip_no,re.equip_name,re.equip_src,re.equip_intro from mem_equip me,role_equip re where me.equip_no = re.equip_no and me.mem_no = :memNo and re.equip_class = '防具'and me.equip_status = 1";
        $memCloth = $pdo->prepare($sql3);
        $memCloth->bindValue(":memNo", $memNo);
        $memCloth->execute();
        if( $memCloth->rowCount() == 0 ){
            $rows[2] = [''];
        }else{
            $rows[2] = $memCloth->fetchAll();
        }
        $sql4 = "select re.equip_no,re.equip_name,re.equip_src,re.equip_intro from mem_equip me,role_equip re where me.equip_no = re.equip_no and me.mem_no = :memNo and re.equip_class = '飾品' and me.equip_status = 1";
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
    }
}catch(PDOException $e){
    echo $e->getMessage();
}
?>