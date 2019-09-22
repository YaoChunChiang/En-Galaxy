<?php
try{
  require_once("../pdoData.php");
  $action = $_GET["action"];
  if($action == "load"){
    $sql = "select * from role_set";
    $sets = $pdo->query($sql);
    if( $sets->rowCount() == 0 ){ //找不到
      //傳回空的JSON字串
      echo "{}";
    }else{ //找得到
      //取回一筆資料
      $setsRows = $sets->fetchAll();
      //$memRow["memId"],$memRow["memName"],
      //送出json字串
      echo json_encode( $setsRows );
    }
  }else if($action == "setInsert"){
    $setName = $_GET["setName"];
    $setBodySrc = $_GET["setBodySrc"];
    $setPartSrc = $_GET["setPartSrc"];
    $setLeftHandSrc = $_GET["setLeftHandSrc"];
    $setRightHandSrc = $_GET["setRightHandSrc"];
    $setStatus = $_GET["setStatus"];
    $setIntro = $_GET["setIntro"];
    $sql = "insert into role_set set_name, set_body_src,set_part_src,set_lefthand_src,set_righthand_src,set_status,set_intro values (:setName, :setBodySrc,:setPartSrc,:setLeftHandSrc,:setRightHandSrc,:setStatus,:setIntro)";
    $InsertSet = $pdo->prepare($sql);
    $InsertSet->bindValue(":setName", $setName);
    $InsertSet->bindValue(":setBodySrc", $setBodySrc);
    $InsertSet->bindValue(":setPartSrc", $setPartSrc);
    $InsertSet->bindValue(":setLeftHandSrc", $setLeftHandSrc);
    $InsertSet->bindValue(":setRightHandSrc", $setRightHandSrc);
    $InsertSet->bindValue(":setStatus", $setStatus);
    $InsertSet->bindValue(":setIntro", $setIntro);
    $InsertSet->execute();
  }else if($action == "setModify"){
    $setNo = $_GET["setNo"];
    $setName = $_GET["setName"];
    $setBodySrc = $_GET["setBodySrc"];
    $setPartSrc = $_GET["setPartSrc"];
    $setLeftHandSrc = $_GET["setLeftHandSrc"];
    $setRightHandSrc = $_GET["setRightHandSrc"];
    $setStatus = $_GET["setStatus"];
    $setIntro = $_GET["setIntro"];
    $sql = "update role_set set set_name=:set_name,set_body_src=:set_body_src,set_part_src=:set_part_src,
    set_lefthand_src=:set_lefthand_src,
    set_righthand_src=:set_righthand_src,
    set_status=:set_status,
    set_intro=:set_intro where set_no=:set_no";
    $modifySet = $pdo->prepare($sql);
    $modifySet->bindValue(":set_name", $setName);
    $modifySet->bindValue(":set_body_src", $setBodySrc);
    $modifySet->bindValue(":set_part_src", $setPartSrc);
    $modifySet->bindValue(":set_lefthand_src", $setLeftHandSrc);
    $modifySet->bindValue(":set_righthand_src", $setRightHandSrc);
    $modifySet->bindValue(":set_status", $setStatus);
    $modifySet->bindValue(":set_intro", $setIntro);
    $modifySet->bindValue(":set_no", $setNo);
    $modifySet->execute();
  }
  else if($action == "setDelete"){
    $setId = $_GET["setId"];
    $sql = "delete from role_set where set_no = :set_no";
    $deleteSet = $pdo->prepare($sql);
    $deleteSet->bindValue(":set_no", $setId);
    $deleteSet->execute();
  }
}catch(PDOException $e){
  echo $e->getMessage();
}
?>