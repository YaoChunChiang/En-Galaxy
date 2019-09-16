<?php
try{
    require_once('connectionHsin.php');
      if(isset($_REQUEST["no"])===true){
        $sql = "select* from activity a  left join mem_main m on  a.mem_no = m.mem_no where act_status=1 and act_no!='{$_REQUEST["no"]}' order by act_date";
      }elseif (isset($_REQUEST["no"])===false) {
        $sql = "select* from activity a  left join mem_main m on  a.mem_no = m.mem_no where act_status=1  order by act_date";
      
        $memberActs = $pdo->prepare($sql);
        //$member->bindValue(":memId", $_GET["memId"]);
        $memberActs ->execute(); 
          if( $memberActs ->rowCount() == 0 ){ //找不到
          //傳回空的JSON字串
          echo "{}";
          }else{ //找得到
          //取回一筆資料
          $memberActsRow = $memberActs ->fetchAll(PDO::FETCH_ASSOC);
          //送出json字串
          echo json_encode($memberActsRow);
          }
      }else{
         //確定是否上傳成功
         if($_FILES['upFile']['error'] == UPLOAD_ERR_OK){
            $sql = "insert into activity(`act_no`,`mem_no`, `act_name`, `act_date`, `act_due`, `act_place`,`act_detail`,act_img,act_max,act_min,act_status)
                                   values(null, 1, :aname, :date,:date_d, :place,:detail, '',15,:min,1 )";//圖檔位置先給空字串
            $activities= $pdo -> prepare($sql);
            $activities -> bindValue(":aname", $_POST["act_name"]);
            $activities -> bindValue(":date", $_POST["act_date"]);
            $activities -> bindValue(":date_d", $_POST["act_due"]);
            $activities -> bindValue(":place", $_POST["act_place"]);
            $activities -> bindValue(":detail", $_POST["act_detail"]);
            //$activities -> bindValue(":max", $_POST["最大"]);
            $activities -> bindValue(":min", $_POST["act_min"]);
            $activities -> execute();
    
            //取得id值
            $actNo = $pdo-> lastInsertId();
    
            //檢查資料夾存不存在
            if(file_exists('event/img') ===false){
                mkdir('event/img');
            } 
            //將檔案copy到要放的路徑
            $fileInfoArr = pathinfo($_FILES['uploadFile']['name']);
            echo $fileInfoArr['extension'];
            //可以使用pathinfo的方法取副檔名
            $fileName = "{$actNo}.{$fileInfoArr['extension']}";//8.gif
    
            //拷貝檔案
            $from = $_FILES['uploadFile']['tmp_name'];
            $to = 'event/img/$fileName';
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
 }
}
catch(PDOException $e){
        $errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
        $errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";	
        }
?>