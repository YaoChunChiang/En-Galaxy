<?php
$errMsg = "";

try {
    $dsn = "mysql:host=localhost;port=3306;dbname=dd102g4;charset=utf8";
    $user = "root";
    $password = "root123";
    $options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE => PDO::CASE_NATURAL);
    $pdo = new PDO($dsn, $user, $password, $options);
    
// if( $_FILES["upFile"]["error"] == UPLOAD_ERR_OK){
    // $level_no=$_POST["level_no"];
    // $video_name=$_POST["video_name"];
    // $video_desc=$_POST["video_desc"];
    // $video_type=$_POST["video_type"];

    // $sql = "INSERT INTO video (video_no, level_no, video_name, video_desc, video_src, video_type, video_status) VALUES (NULL,:videoLevel, :videoName, :videoDesc,NULL, :videoClass , '1')";
    $videoLevel =$_POST["videoLevel"];
    $videoName =$_POST["videoName"];
    $videoDesc = $_POST["videoDesc"];
    $videoClass =$_POST["videoClass"];
    $upPic = $_POST["upPic"];
    // $videoLevel = '1';
    echo $upPic;
    $sql = "INSERT INTO video (video_no, level_no, video_name, video_desc, video_src, video_type, video_status, video_pic) 
    VALUES (NULL, :videoLevel , :videoName , :videoDesc , NULL, :videoClass , '1', :upPic)";
    
    $videos = $pdo->prepare($sql);
    $videos->bindValue(":videoLevel",$videoLevel);
    $videos->bindValue(":videoName",$videoName);
    $videos->bindValue(":videoDesc",$videoDesc);
    $videos->bindValue(":videoClass",$videoClass);
    $videos->bindValue(":upPic",$upPic);
    $videos->execute();
} catch (PDOException $e) {
    $errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
    $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}   echo $errMsg;
header("location:studyEngMag.php");
// print_r($videos);
    // die();

    //取得自動創號的key值
        // $psn = $pdo->lastInsertId();
        
        //先檢查film資料夾存不存在
		// if( file_exists("film") === false){
		// 	mkdir("film");
		// }
		//將檔案copy到要放的路徑
		// $fileInfoArr = pathinfo($_FILES["upFile"]["name"]);
		// $fileName = "{$psn}.{$fileInfoArr["extension"]}";  //8.gif

		// $from = $_FILES["upFile"]["tmp_name"];//
		// print_r($from);
		// $to = "film//$fileName";
        // copy( $from, $to);
        
        //將檔案名稱寫回資料庫
        // $sql = "update video set film = :film where psn = $psn";
        // $videos=$pdo->prepare($sql);
        // $videos->bindValue(":film",$fileName);
        // $videos->execute();
        // echo "新增成功!";

// }else{
//     echo "錯誤代碼 : {$_FILES["upFile"]["error"]} <br>";
//     echo "新增失敗<br>";
// }

?>
