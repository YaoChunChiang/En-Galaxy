<?php
$errMsg = "";

try {
    require_once("../pdoData.php");

    // 刪除資料庫 
    $who = $_POST['who'];
    // echo $who;
    if ($who === 'deleteVideo') {
        $videoDelete = $_POST["videoNum"];

        // echo $videoDelete;
        $sql = "DELETE FROM video WHERE video.video_no = {$videoDelete}";
        $pdo->exec($sql);

        // die();


    } else if ($who === 'updateVideo') {
        $videoLevel = $_POST["videoLevel"];
        $videoName = $_POST["videoName"];
        $videoDesc = $_POST["videoDesc"];
        $videoClass = $_POST["videoClass"];
        $upFile = $_FILES["upFile"]; //上傳檔案用$_FILES["變數"]
        // $videoLevel = '1';
        $sql = "INSERT INTO video (video_no, level_no, video_name, video_desc, video_src, video_type, video_status, video_pic) 
        // print_r($upFile['name'][0]);

        if ($_FILES["upFile"]["error"][1] == UPLOAD_ERR_OK) { //陣列檔案[0]影片,[1]圖片,若[1]的圖片無錯誤訊息，將進行下面的條件
            //準備資料庫語法。video_src和video_pic此處先不綁定，後面再綁定回來值
            $sql = "INSERT INTO video (video_no, level_no, video_name, video_desc, video_src, video_type, video_status, video_pic) 
            VALUES (NULL, :videoLevel , :videoName , :videoDesc , '', :videoClass , '1', '')";

            $videos = $pdo->prepare($sql);
            $videos->bindValue(":videoLevel", $videoLevel);
            $videos->bindValue(":videoName", $videoName);
            $videos->bindValue(":videoDesc", $videoDesc);
            $videos->bindValue(":videoClass", $videoClass);
            $videos->execute();

            //取得自動創號的key值
            $psn = $pdo->lastInsertId();

            //先檢查video資料夾存不存在，不存在就建video資料夾
            if (file_exists("video") === false) {
                mkdir("video");
            }

            //先檢查VideoImages資料夾存不存在，不存在就建VideoImages資料夾
            if (file_exists("VideoImages") === false) {
                mkdir("VideoImages");
            }


            //將檔案copy到要放的路徑
            for ($i = 0; $i < count($_FILES["upFile"]["name"]); $i++) {
                $fileInfoArr = pathinfo($_FILES["upFile"]["name"][$i]);
                $fileName = "{$psn}.{$fileInfoArr["extension"]}";  //8.gif


                //將檔案名稱寫回資料庫
                if ($i === 0) { //如果i=[0]--影片，就會執行下面判斷
                    $sql = "update video set video_src = :video where video_no = $psn";
                    $products = $pdo->prepare($sql);
                    $products->bindValue(":video", $fileName);
                    $products->execute();

                    $from = $_FILES["upFile"]["tmp_name"][$i]; //
                    // print_r($from);
                    $to = "video//$fileName";
                    copy($from, $to);

                    echo "新增成功~";
                } else if ($i === 1) { //如果i=[1]--圖片，就會執行下面判斷
                    $sql = "update video set video_pic = :videoImage where video_no = $psn";
                    $products = $pdo->prepare($sql);
                    $products->bindValue(":videoImage", $fileName);
                    $products->execute();

                    $from = $_FILES["upFile"]["tmp_name"][$i]; //
                    // print_r($from);
                    $to = "VideoImages//$fileName";
                    copy($from, $to);

                    echo "新增成功~";
                }
            }
        }
    }
} catch (PDOException $e) {
    $errMsg .= "錯誤原因 : " . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}
echo $errMsg;
// header("location:studyEngMag.php");
?>