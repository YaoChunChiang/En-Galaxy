<?php
try{
  $errMsg='';
    require_once('pdoData.php'); 
    //接收變數

    // $var1=(empty($_REQUEST['dataInfo']))?"":$_REQUEST['var1']; 
    // $var2=(empty($_REQUEST['var2']))?"":$_REQUEST['var2']; 
    // $var3=(empty($_REQUEST['var3']))?"":$_REQUEST['var3']; 

    //接收檔案屬性值

    $file=(empty($_FILES['file']))?"":$_FILES['file']; 
    if(isset($_FILES["file"]["error"])){
      //echo $_FILES['uploadFile']['error'] ;
      if($file['error'] == UPLOAD_ERR_OK){
        $sql = "insert into activity(`act_no`,`mem_no`, `act_name`, `act_date`, `act_due`, `act_place`,`act_detail`,act_img,act_max,act_min,act_status)
                               values(null, 1, :aname, :date,:date_d, :place,:detail, '',15,:min,1 )";//圖檔位置先給空字串
        $activities= $pdo -> prepare($sql);
        $activities -> bindValue(":aname", $_REQUEST["act_name"]);
        $activities -> bindValue(":date", $_REQUEST["act_date"]);
        $activities -> bindValue(":date_d", $_REQUEST["act_due"]);
        $activities -> bindValue(":place", $_REQUEST["act_place"]);
        $activities -> bindValue(":detail", $_REQUEST["act_detail"]);
        //$activities -> bindValue(":max", $_REQUEST["最大"]);
        $activities -> bindValue(":min", $_REQUEST["act_min"]);
        $activities -> execute();


        
        ini_set("display_errors","On");
        error_reporting(E_ALL);
          
        //取得id值
        $actNo = $pdo-> lastInsertId();

        //檢查資料夾存不存在
        if(file_exists('event') === false){
            mkdir('event');
        } 
        //將檔案copy到要放的路徑
        $fileInfoArr = pathinfo($file['name']);
        echo $fileInfoArr['extension'];
        //可以使用pathinfo的方法取副檔名
        $fileName = "{$actNo}.{$fileInfoArr['extension']}";//8.gif

        //拷貝檔案
        $from = $file['tmp_name'];
        $to = "event/{$fileName}";
        copy($from,$to);
        //將檔案名稱寫進資料庫
        $sql = "update activity set act_img = :image where act_no = {$actNo}";
        $products = $pdo ->prepare($sql);
        $products -> bindValue(':image',$fileName);
        $products -> execute();
        echo "新增成功";
    }else{
      echo "錯誤代碼:".$e ->getMessage()."<br>";
      echo "錯誤原因:".$e ->getLine()."<br>";
     }
    
  }elseif(isset($_REQUEST["no"])==true) {
    $sql = "select* from activity a  left join mem_main m on  a.mem_no = m.mem_no where act_status=1 and act_no!='{$_REQUEST["no"]}' order by act_date";
    $memberAct= $pdo->prepare($sql);
    $memberAct ->execute();
    if( $memberAct ->rowCount() == 0){
      echo "{}";
    }else{
      $memberActRow = $memberAct ->fetchAll(PDO::FETCH_ASSOC);
      echo json_encode($memberActRow);
    }
  
  }else{
    $sqlNew = "select* from activity a  left join mem_main m on  a.mem_no = m.mem_no where act_status=1  order by act_publish desc";
    $sqlWelcome = "select* from activity a  left join mem_main m on  a.mem_no = m.mem_no where act_status=1  order by join_count desc";
    ini_set("display_errors","On");
    error_reporting(E_ALL);
    $memberActs = $pdo->prepare($sqlNew);
    $memberActsW = $pdo->prepare($sqlWelcome);
    //$member->bindValue(":memId", $_GET["memId"]);
    $memberActs ->execute(); 
    $memberActsW ->execute();
    $actResults=[];
      if( $memberActs ->rowCount() == 0 || $memberActsW ->rowCount() == 0){ //找不到
      //傳回空的JSON字串
      echo "{}";
      }else{ //找得到
      //取回一筆資料
      $actResults[1] = $memberActs ->fetchAll(PDO::FETCH_ASSOC);
      $actResults[0] = $memberActsW ->fetchAll(PDO::FETCH_ASSOC);
      //送出json字串
      echo json_encode($actResults);
  }
}
    
}catch(PDOException $e){
  $errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
  $errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";	
  }
?>
  