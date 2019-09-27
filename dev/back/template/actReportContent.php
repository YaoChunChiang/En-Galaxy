


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
	$act_report  = $pdo->query($sql);

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
<div class="breadcrumbs ace-save-state" id="breadcrumbs">
  <nav aria-label="breadcrumb" role="navigation">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <i class="ace-icon fa fa-home home-icon"></i>
        <a href="adminManage.html">En-galaxy</a>
      </li>
      <li class="breadcrumb-item">
        <a href="#">社群管理</a>
      </li>
      <li class="breadcrumb-item active" aria-current="page">活動檢舉管理</li>
      <!--麵包屑-->
    </ol>
  </nav>
</div>
<div class="card">


<div class="card-body">
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
      <th scope="col">刪除檢舉紀錄</th>
    </tr>
  </thead>
  <tbody>
    
  </div>
  </div>
  <?php 
	while( $act_reportRow = $act_report->fetch(PDO::FETCH_ASSOC)){
	
	?>
    <tr class="reportNo">
      <th scope="row"><?=$act_reportRow["act_repono"]?></th>
      <td><?=$act_reportRow["act_no"]?></td>
      <td><?=$act_reportRow["act_name"]?></td>
      <td><?=$act_reportRow["act_detail"]?></td>
      <td><?=$act_reportRow["mem_no"]?></td>
      <td><?=$act_reportRow["time"]?></td>
      <td class="reportReason"><?=$act_reportRow["reason"]?></td>
      
      <td><label class="switch switch-3d switch-success">
        <input class="switch-input  reportStatus" type="checkbox"value="<?php 
        $act_reportRow["act_status"] == 0 ? $status =1:$status = 0;
        echo $status;?>"<?php $act_reportRow["act_status"] == 0 ? $check='checked':$check='' ;
        echo $check ;?>>
        <span class="switch-slider"></span>
        </label></td>
        <td><div class="col-6 col-sm-4 col-md-2 col-xl mb-3 mb-xl-0">
        <button class="btn btn-outline-danger deleteReport" type="button"data-toggle="modal"
     data-target="#alertModal" data-whatever="@delete">刪除</button>
</div></td>
    </tr>
    <?php
  }
  ?>
    </tbody>
</table>


<div class="pagination justify-content-center">
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
  </div>
<script>
  function reportInit() {
    
     $('.reportStatus').change(function(){
      if(sessionStorage['admin_level'] == 1){

    if($(this).val('1')){
          reportStatus=0;
    }else{
            reportStatus=1;
    } 
    console.log(this);
    console.log(reportStatus);
    let repoNo=$(this).parent().parent().parent().children(':first').text();
    $.ajax({    
              url: `../forumSendAns.php?actReport=${repoNo}&reportStatus=${reportStatus}`,
              type: 'GET',
              success: function(){
              },
          });
       }else{
         alert('權限不足')
       }   
  })

  $('.deleteReport').on('click',function(){
    if(sessionStorage['admin_level'] == 1){
      let repoNo=$(this).parent().parent().parent().children().eq(0).text();
      console.log(repoNo);
      $('#deleteReport').on('click',()=> {
        $.ajax({    
              url: `../forumSendAns.php?actRepoNo=${repoNo}`,
              type: 'GET',
              success:afterDelete(),
              })
      })
      function afterDelete() {
        alert('刪除成功');
        $('.modal-backdrop.fade.show').hide();
        $('#alertModal').hide();
        location.reload();
      }
    }else{
      $('.deleteReport').attr('data-target','');
      alert('權限不足'); 
    }
    })
    
    
    let reason=document.querySelectorAll('.reportReason');
    let i=0;
    for(i=0;i<reason.length;i++){
    if(reason[i].innerText.indexOf('1') != -1){
        reason[i].innerText='外部廣告';
    }else if(reason[i].innerText.indexOf('2') != -1){
        reason[i].innerText='仇恨言語';
    }else{
        reason[i].innerText='色情內容';
     }
   }
   }
   window.addEventListener("load", reportInit, false);

</script>
   