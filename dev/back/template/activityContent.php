<?php 
$errMsg = "";
try {
	$dsn = "mysql:host=localhost;port=3306;dbname=dd102g4_test;charset=utf8";
	$user = "root";
	$password = "123456/";
	$options=array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE=>PDO::CASE_NATURAL);
	$pdo = new PDO($dsn, $user, $password, $options);

	$sql = "select * from activity";
	$activities  = $pdo->prepare($sql);
    $activities -> execute();
} catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}
?>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<div class="breadcrumbs ace-save-state" id="breadcrumbs">
  <nav aria-label="breadcrumb" role="navigation">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <i class="ace-icon fa fa-home home-icon"></i>
        <a href="#">En-galaxy</a>
      </li>
      <li class="breadcrumb-item">
        <a href="#">活動管理</a>
      </li>
      <li class="breadcrumb-item active" aria-current="page">問題管理</li>
      <!--麵包屑-->
    </ol>
  </nav>
</div>

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">活動編號</th>
      <th scope="col">創辦會員ID</th>
      <th scope="col">活動名稱</th>
      <th scope="col">活動內容</th>
      <th scope="col">活動地點</th>
      <th scope="col">舉辦時間</th>
      <th scope="col">截止日期</th>
      <th scope="col">活動封面照片</th>
      <th scope="col">報名人數</th>
      <th scope="col">狀態</th>
    </tr>
  </thead>
  <tbody>
  <?php 
	while( $activitiesRow = $activities->fetch(PDO::FETCH_ASSOC)){
		require("activitiesRow.php");	
	?>
    <tr>
      <th scope="row"><?=$activitiesRow["act_no"]?></th>
      <td><?=$activitiesRow["mem_no"]?></td>
      <td><?=$activitiesRow["act_name"]?></td>
      <td><?=$activitiesRow["act_detail"]?></td>
      <td><?=$activitiesRow["act_place"]?></td>
      <td><?=$activitiesRow["act_date"]?></td>
      <td><?=$activitiesRow["act_due"]?></td>
      <td><?=$activitiesRow["act_img"]?></td>
      <td><?=$activitiesRow["join_count"]?>/<?=$activitiesRow["act_max"]?>人</td>
      <td><?=$activitiesRow["act_status"]?></td>
      <td></td>
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
