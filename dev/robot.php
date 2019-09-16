<?php
try{
    $dsn = "mysql:host=localhost;port=8889;dbname=dd102g4_test;charset=utf8";
    $user = "root";
    $password = "root";
    $pdo = new PDO($dsn, $user, $password);
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
    }
}catch(PDOException $e){
    echo $e->getMessage();
}
?>