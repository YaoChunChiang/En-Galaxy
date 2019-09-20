

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<?php 
$errMsg = "";
try {
	// $dsn = "mysql:host=localhost;port=3306;dbname=dd102g4_test;charset=utf8";
	// $user = "root";
	// $password = "123456/";
	// $options=array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE=>PDO::CASE_NATURAL);
	// $pdo = new PDO($dsn, $user, $password, $options);

  require_once("../pdoData.php");
	$sql = "select r.act_repono, r.act_no, a.act_name, a.act_detail,r.mem_no,r.time,r.reason,a.act_status from activity_report r left join activity a on r.act_no=a.act_no";
	$question_report  = $pdo->query($sql);

} catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}
?>
<div class="breadcrumbs ace-save-state" id="breadcrumbs">
  <nav aria-label="breadcrumb" role="navigation">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <i class="ace-icon fa fa-home home-icon"></i>
        <a href="#">En-galaxy</a>
      </li>
      <li class="breadcrumb-item">
        <a href="#">檢舉管理</a>
      </li>
      <li class="breadcrumb-item active" aria-current="page">活動檢舉管理</li>
      <!--麵包屑-->
    </ol>
  </nav>
</div>

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">活動檢舉編號</th>
      <th scope="col">活動編號</th>
      <th scope="col">活動標題</th>
      <th scope="col">活動描述</th>
      <th scope="col">檢舉會員ID</th>
      <th scope="col">檢舉時間</th>
      <th scope="col">檢舉原因</th>
      <th scope="col">檢舉成立狀態</th>
    </tr>
  </thead>
  <tbody>
  <?php 
	while( $que_reportRow = $question_report->fetch(PDO::FETCH_ASSOC)){
	
	?>
    <tr class="reportNo">
      <th scope="row"><?=$que_reportRow["act_repono"]?></th>
      <td><?=$que_reportRow["act_no"]?></td>
      <td><?=$que_reportRow["act_name"]?></td>
      <td><?=$que_reportRow["que_detail"]?></td>
      <td><?=$que_reportRow["mem_no"]?></td>
      <td><?=$que_reportRow["time"]?></td>
      <td><?=$que_reportRow["reason"]?></td>
      
      <td><label class="switch switch-label switch-pill switch-outline-primary-alt">
        <input class="switch-input reportStatus" type="checkbox" unchecked="<?=$que_reportRow["act_status"]?>">
        <span class="switch-slider" data-checked="不成立" data-unchecked="成立"></span>
        </label></td>
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
<script>
   function reportInit() {
    $('.reportStatus').change(function(){
   if($(this).attr('checked')){
           alert('有勾選');
   }else{
           alert('無勾選');
   }
})
   }
   window.addEventListener("load", reportInit, false);

</script>
   