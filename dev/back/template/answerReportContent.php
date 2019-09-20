

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<?php 
$errMsg = "";
try {
	// $dsn = "mysql:host=localhost;port=8889;dbname=dd102g4_test;charset=utf8";
	// $user = "root";
	// $password = "root";
	// $options=array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE=>PDO::CASE_NATURAL);
	// $pdo = new PDO($dsn, $user, $password, $options);

  require_once("../pdoData.php");
	$sql = "select * from answer_report r left join member_answer m  on  r.ans_no=m.ans_no";
	$answerReport  = $pdo->query($sql);

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
      <li class="breadcrumb-item active" aria-current="page">回答檢舉管理</li>
      <!--麵包屑-->
    </ol>
  </nav>
</div>

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">回答檢舉編號</th>
      <th scope="col">回答編號</th>
      <th scope="col">回答內容</th>
      <th scope="col">檢舉會員ID</th>
      <!-- <th scope="col">檢舉時間</th> -->
      <th scope="col">檢舉原因</th>
      <th scope="col">檢舉成立狀態</th>
    </tr>
  </thead>
  <tbody>
  <?php
 ini_set("display_errors","On");
 error_reporting(E_ALL);
 ?>
  <?php 
	while( $answerReportRow = $answerReport->fetch(PDO::FETCH_ASSOC)){
	
	?>
    <tr class="reportNo">
      <th scope="row"><?=$answerReportRow["answer_report"]?></th>
      <td><?=$answerReportRow["ans_no"]?></td>
      <td><?=$answerReportRow["ans_desc"]?></td>
      <td><?=$answerReportRow["mem_no"]?></td>
      <td><?=$answerReportRow["reason"]?></td>
      <td><label class="switch switch-label switch-pill switch-outline-primary-alt">
        <input class="switch-input  reportStatus" type="checkbox"value="0">
        <span class="switch-slider" data-checked="成立" data-unchecked="不成立"></span>
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
   if($(this).val('1')){
         reportStatus=0;
   }else{
          reportStatus=1;
   } 
   console.log(this);
   console.log(reportStatus);
   let repoNo=$(this).parent().parent().parent().children(':first').text();
   $.ajax({    
            url: `../forumSendAns.php?ansReport=${repoNo}&reportStatus=${reportStatus}`,
            type: 'GET',
            success: function(){
            },
        });
})
   }
   window.addEventListener("load", reportInit, false);

</script>