<?php
try{
  $dsn = "mysql:host=localhost;port=8889;dbname=dd102g4;charset=utf8";
  $user = "root";
  $password = "root";
  $pdo = new PDO($dsn, $user, $password);
  $sql = "select * from role_set";
  $roleSets = $pdo->query($sql);
  if( $roleSets->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "{}";
  }else{ //找得到
    //取回一筆資料
    $roleSetRows = $roleSets->fetch(PDO::FETCH_ASSOC);
    //$memRow["memId"],$memRow["memName"],
    //送出json字串
    echo json_encode( $roleSetRows );
  }	
}catch(PDOException $e){
  echo $e->getMessage();
}
?>