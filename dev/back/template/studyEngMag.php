<?php 
$errMsg = "";
try {
	$dsn = "mysql:host=localhost;port=3306;dbname=dd102g4;charset=utf8";
	$user = "root";
	$password = "root123";
	$options=array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE=>PDO::CASE_NATURAL);
	$pdo = new PDO($dsn, $user, $password, $options);

	$sql = "select * from video";
    $videos= $pdo->query($sql);
    $videos->execute();

} catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}
?>

<div class="card">
    <div class="card-header">
        <div class="float-left"><i class="icon-book-open align-justify"></i>&nbsp;&nbsp;英文學習影片管理</div>
        <div class="clearfix"></div>
        <div class="float-right">
            <form>
                <label for="exampleFormControlFile1">請選擇要上傳的影片</label>
                <input type="file" class="form-control-file" id="exampleFormControlFile1">
            </form>
            <div class="d-inline-block mt-2 float-right"><button class="btn btn-warning mr-1" type="button">上傳影片</button><button class="btn btn-danger" type="button">取消</button></div>
        </div>        
    </div>

    <div class="card-body">
        <table class="table table-responsive-sm text-center">
            <thead>
                <tr>
                    <th>學習影片編號</th>
                    <th>英文等級</th>
                    <th>影片名稱</th>
                    <th>上傳時間</th>
                    <th>影片類別</th>
                    <th>修改影片</th>
                    <th>刪除影片</th>
                </tr>
            </thead>
            <tbody>
                
            <?php 
	while( $videoRow= $videos->fetch(PDO::FETCH_ASSOC)){
		require("studyEngMag.php");	
	?>
    <tr>
      <th scope="row"><?=$videoRow["video_no"]?></th>
      <td><?=$activitiesRow["level_no"]?></td>
      <td><?=$activitiesRow["video_name"]?></td>
      <td><?=$activitiesRow["video_desc"]?></td>
      <td><?=$activitiesRow["video_type"]?></td>
      <td><?=$activitiesRow["video_status"]?></td>
    </tr>
  <?php
  }
  ?>
            

            </tbody>
        </table>
        <ul class="pagination">
            <li class="page-item">
                <a class="page-link" href="#">Prev</a>
            </li>
            <li class="page-item active">
                <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#">3</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#">4</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#">Next</a>
            </li>
        </ul>

        <div class="d-inline-block float-right">
            <button class="btn btn-primary btn-lg" type="button">確認</button>
            <button class="btn  btn-danger btn-lg" type="button">取消</button>
        </div>

    </div>
</div>