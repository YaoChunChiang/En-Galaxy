<?php
try{
    $dsn = "mysql:host=localhost;port=8889;dbname=dd102g4_test;charset=utf8";
    $user = "root";
    $password = "root";
    $pdo = new PDO($dsn, $user, $password);
    $action = $_GET["action"];
    if($action == "loadMem"){
        $memNo = $_GET["memNo"];
        $setNo = $_GET["setNo"];
        $sql1 = "select * from role_set where set_no = :setNo";
        $memRole = $pdo->prepare($sql1);
        $memRole->bindValue(":setNo", $setNo);
        $memRole->execute();
        $rows[0] = $memRole->fetchAll();
        $sql2 = "select r.equip_name,r.equip_src,r.equip_intro from mem_equip m,role_equip r where m.equip_no = r.equip_no and m.mem_no = :memNo and r.equip_class = '武器'";
        $memWeapon = $pdo->prepare($sql2);
        $memWeapon->bindValue(":memNo", $memNo);
        $memWeapon->execute();
        $rows[1] = $memWeapon->fetchAll();
        echo json_encode($rows);
    }
}catch(PDOException $e){
    echo $e->getMessage();
}
?>