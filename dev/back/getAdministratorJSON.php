<?php
try{
  $dsn = "mysql:host=localhost;port=8889;dbname=dd102g4;charset=utf8";
  $user = "root";
  $password = "root";
  $options=array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE=>PDO::CASE_NATURAL);
  $pdo = new PDO($dsn, $user, $password, $options);
  // require_once("connectionTony.php");
  $sql = "select* from admin order by admin_no";
  $admin = $pdo->prepare($sql);
  //$member->bindValue(":memId", $_GET["memId"]);
  $admin->execute(); 
  
  if( $admin->rowCount() == 0 ){ //找不到
    //傳回空的JSON字串
    echo "{}";
  }else{ //找得到
    //取回一筆資料
    $adminRow = $admin->fetchAll(PDO::FETCH_ASSOC);
    //送出json字串
  echo json_encode($adminRow);
  }	
}catch(PDOException $e){
  echo $e->getMessage();
}
?>
