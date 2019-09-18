<?php
try{
    require_once("pdoData.php");
    $action = $_GET["action"];
    if($action == "loadMem"){
        $memNo = $_GET["memNo"];
        $setNo = $_GET["setNo"];
        $arr = [];
        $sql1 = "select * from role_set where set_no = :setNo";
        $memRole = $pdo->prepare($sql1);
        $memRole->bindValue(":setNo", $setNo);
        $memRoleRow = $memRole->fetchAll();
        $arr[0] = $memRoleRow;
        $sql2 = "select r.equip_name,r.equip_src,r.equip_intro from mem_equip m,role_equip r where m.equip_no = r.equip_no and m.mem_no = :memNo and r.equip_class = '武器'";
        $memWeapon = $pdo->prepare($sql2);
        $memWeapon->bindValue(":memNo", $memNo);
        $memWeaponRow = $memWeapon->fetchAll();
        $arr[1] = $memWeaponRow;
        echo json_encode($arr);
    }
}catch(PDOException $e){
    echo $e->getMessage();
}
?>