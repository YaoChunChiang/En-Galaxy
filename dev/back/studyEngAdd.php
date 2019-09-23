<?php
$errMsg = "";

try {
    require_once("../pdoData.php");

    // 刪除資料庫 
    $who = $_REQUEST['who'];
    // echo $who;
    if ($who === 'deleteVideo') {
        $videoDelete = $_POST["videoNum"];

        // echo $videoDelete;
        $sql = "DELETE FROM video WHERE video.video_no = {$videoDelete}";
        $pdo->exec($sql);



    } else if ($who === 'addVideo') {
        $videoLevel = $_POST["videoLevel"];
        $videoName = $_POST["videoName"];
        $videoDesc = $_POST["videoDesc"];
        $videoClass = $_POST["videoClass"];
        // echo $videoLevel.$videoName.$videoDesc.$videoClass;
        // $upFile = $_FILES["upFile"];
        //上傳檔案用$_FILES["變數"]
        // $videoLevel = '1';
        
        print_r($_FILES["upFile"]["error"][2]);
        if ($_FILES["upFile"]["error"][1] == UPLOAD_ERR_OK) { 
            $sql = "INSERT INTO video (video_no, level_no, video_name, video_desc, video_src, video_type, video_status, video_pic, subtitle) 
            VALUES (NULL, :videoLevel , :videoName , :videoDesc , '', :videoClass , '1', '', '')";

            $videos = $pdo->prepare($sql);
            $videos->bindValue(":videoLevel", $videoLevel);
            $videos->bindValue(":videoName", $videoName);
            $videos->bindValue(":videoDesc", $videoDesc);
            $videos->bindValue(":videoClass", $videoClass);
            $videos->execute();

            //取得自動創號的key值
            $psn = $pdo->lastInsertId();           

            if (file_exists("../video") === false) {
                mkdir("../video");
            }


            //將檔案copy到要放的路徑
            for ($i = 0; $i < count($_FILES["upFile"]["name"]); $i++) {
                $fileInfoArr = pathinfo($_FILES["upFile"]["name"][$i]);
                $fileName = "{$psn}.{$fileInfoArr["extension"]}";  //8.gif
                print_r($fileName);

                //將檔案名稱寫回資料庫
                if ($i === 0) { //如果i=[0]--影片，就會執行下面判斷
                    $sql = "update video set video_src = :video where video_no = $psn";
                    $products = $pdo->prepare($sql);
                    $products->bindValue(":video", $fileName);
                    $products->execute();

                    $from = $_FILES["upFile"]["tmp_name"][$i];
                    print_r($from);
                    $to = "../video//$fileName";
                    copy($from, $to);

                    echo "新增影片成功~";
                }  else if ($i === 2){ //i = [2] ==字幕
                    $sql = "update video set subtitle = :subtitle where video_no = $psn";
                    $products = $pdo->prepare($sql);
                    $products->bindValue(":subtitle", $fileName);
                    $products->execute();

                    $from = $_FILES["upFile"]["tmp_name"][$i];
                    // print_r($from);
                    $to = "../video//$fileName";
                    copy($from, $to);

                    echo "新增成功~";
                } else if ($i === 1) { //如果i=[1]--圖片，就會執行下面判斷
                    $sql = "update video set video_pic = :videoImage where video_no = $psn";
                    $products = $pdo->prepare($sql);
                    $products->bindValue(":videoImage", $fileName);
                    $products->execute();

                    $from = $_FILES["upFile"]["tmp_name"][$i];
                    // print_r($from);
                    $to = "../video//$fileName";
                    copy($from, $to);

                    echo "新增成功~";
                }   
            }
        }
        // header("location:studyEngMag.php");

    }else if($who === 'modifyVideo'){
        //video.js取值後，在php接值
        $videoGradeChinese = $_POST['videoGrade'];
        $filmName=$_POST['filmName'];
        $videoDesc=$_POST['videoDesc'];
        $videoClass=$_POST['videoClass'];

        //將 $videoGradeChinese 改成 $videoGrade 可用數字去傳值回去給資料庫
        switch($videoGradeChinese){
            case '初級':
                $videoGrade = 1;
            break;
            case '中級':
                $videoGrade = 2;
            break;
            case '高級':
                $videoGrade = 3;
            break;
        }
        echo $videoGrade;

        
        $sql = "INSERT INTO video (video_no, level_no, video_name, video_desc, video_src, video_type, video_status, video_pic); 
        VALUES (NULL, :videoLevel , :videoName , :videoDesc , '', :videoClass , '1', '')";

        $videos = $pdo->prepare($sql);
        $videos->bindValue(":videoLevel", $videoLevel);
        $videos->bindValue(":videoName", $videoName);
        $videos->bindValue(":videoDesc", $videoDesc);
        $videos->bindValue(":videoClass", $videoClass);
        $videos->execute();



    }
} catch (PDOException $e) {
    $errMsg .= "錯誤原因 : " . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}
echo $errMsg;
?>