

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
<div class="modal fade" id="alertModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="alertModalLabel">確定刪除檢舉紀錄?</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
        <button type="button" class="btn  btn-outline-danger" id="deleteReport">刪除檢舉紀錄</button>
      </div>
    </div>
  </div>
</div>


<div class="card">
<div class="card-header">
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
</div>
<div class="card-body">
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
      <th scope="col">刪除檢舉紀錄</th>
    </tr>
  </thead>
  <tbody>

  </div>
  </div>
  <?php
 ini_set("display_errors","On");
 error_reporting(E_ALL);
 ?>
  <?php 
	while( $answerReportRow = $answerReport->fetch(PDO::FETCH_ASSOC)){
	
	?>
    <tr>
      <th scope="row"><?=$answerReportRow["answer_report"]?></th>
      <td class="reportNo"><?=$answerReportRow["ans_no"]?></td>
      <td><?=$answerReportRow["ans_desc"]?></td>
      <td><?=$answerReportRow["mem_no"]?></td>
      <td><?=$answerReportRow["reason"]?></td>
      <td><label class="switch switch-label switch-pill switch-outline-primary-alt">
        <input class="switch-input  reportStatus" type="checkbox"value="<?php 
        $answerReportRow["ans_status"] == 0 ? $status =1:$status = 0;
        echo $status;?>"<?php $answerReportRow["ans_status"] == 0 ? $check='checked':$check='' ;
        echo $check ;?>>
        <span class="switch-slider" data-checked="成立" data-unchecked="不成立"></span>
        </label></td>
        <td><div class="col-6 col-sm-4 col-md-2 col-xl mb-3 mb-xl-0">
              <button class="btn btn-block btn-outline-danger deleteReport" type="button"data-toggle="modal"
     data-target="#alertModal" data-whatever="@delete">刪除</button>
        </div></td>
    </tr>
    <?php
  }
  ?>

    </tbody>
</table>


<div class="pagination justify-content-center">
<ul class="pagination center">
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
</div>
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
            success: alert('檢舉下架成功'),
            
        });
})
   
   //按下刪除按鈕刪除檢舉資料DELETE FROM 資料表名稱 WHERE 條件式
   $('.deleteReport').on('click',function(){
     let repoNo=$(this).parent().parent().parent().children().eq(0).text();
     console.log(repoNo);
     $('#deleteReport').on('click',()=> {
       $.ajax({    
            url: `../forumSendAns.php?ansRepoNo=${repoNo}`,
            type: 'GET',
            success:afterDelete(),
            })
     })
     function afterDelete() {
      alert('刪除成功');
      $('.modal-backdrop.fade.show').hide();
      $('#alertModal').hide();
      location=location;
     }

   //檢舉的表篩選去除重複的資料
   
   })
  }
   window.addEventListener("load", reportInit, false);

</script>