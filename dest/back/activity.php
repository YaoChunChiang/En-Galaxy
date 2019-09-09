<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
  <title>En-Galaxy後台</title>
  <!-- Icons-->
  <link href="node/@coreui/icons/css/coreui-icons.min.css" rel="stylesheet">
  <link href="node/flag-icon-css/css/flag-icon.min.css" rel="stylesheet">
  <link href="node/font-awesome/css/font-awesome.min.css" rel="stylesheet">
  <link href="node/simple-line-icons/css/simple-line-icons.css" rel="stylesheet">
  <!-- Main styles for this application-->
  <link href="css/style.css" rel="stylesheet">
</head> 

<body class="app header-fixed sidebar-fixed aside-menu-fixed sidebar-lg-show">
 <!-- top_header -->
 <header class="app-header navbar">
    <button class="navbar-toggler sidebar-toggler d-lg-none mr-auto" type="button" data-toggle="sidebar-show">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="#">
      <img class="navbar-brand-full" src="img/brand/logo.svg" width="89" height="100" alt="En-Galaxy Logo">
      <!-- <img class="navbar-brand-minimized" src="img/brand/sygnet.svg" width="30" height="30" alt="CoreUI Logo"> -->
    </a>
    <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" data-toggle="sidebar-lg-show">
      <span class="navbar-toggler-icon"></span>
    </button>
    <ul class="nav navbar-nav d-md-down-none">
      <li class="nav-item px-3">
        <a class="nav-link" href="#">使用者</a>
      </li>
    </ul>
    <ul class="nav navbar-nav ml-auto">
      <li class="nav-item mr-3">管理員</li>
      <!-- <li class="nav-item mr-3">登出</li> -->
      <a class="nav-item mr-3" href="login.html">登出</a>
    </ul>
  </header>
  <div class="app-body">
    <div class="sidebar">
      <!-- sidebar menu-->
      <nav class="sidebar-nav">
    <ul class="nav">
      <li class="nav-item">
        <a class="nav-link" href="index.html">
          <i class="nav-icon icon-speedometer"></i> 系統概況
          <span class="badge badge-primary">NEWs</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="charts.html">
          <i class="nav-icon icon-pie-chart"></i> 管理員管理</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="charts.html">
          <i class="nav-icon icon-pie-chart"></i> 帳號管理</a>
      </li>
      <li class="nav-item nav-dropdown">
        <a class="nav-link nav-dropdown-toggle" href="#">
          <i class="nav-icon icon-puzzle"></i>題庫管理</a>
        <ul class="nav-dropdown-items">
          <li class="nav-item">
            <a class="nav-link" href="base/breadcrumb.html">
              <i class="nav-icon icon-puzzle"></i> 遊戲題庫管理</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="base/cards.html">
              <i class="nav-icon icon-puzzle"></i> 影片題庫管理</a>
          </li>
        </ul>
      </li>
      <li class="nav-item nav-dropdown">
        <a class="nav-link nav-dropdown-toggle" href="#">
          <i class="nav-icon icon-cursor"></i> 角色管理</a>
        <ul class="nav-dropdown-items">
          <li class="nav-item">
            <a class="nav-link" href="roleSetManage.html">
              <i class="nav-icon icon-cursor"></i> 角色設定管理</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="template/roleEquipmentManage.html">
              <i class="nav-icon icon-cursor"></i>角色裝備管理</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="buttons/dropdowns.html">
              <i class="nav-icon icon-cursor"></i> Dropdowns</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="buttons/brand-buttons.html">
              <i class="nav-icon icon-cursor"></i> Brand Buttons</a>
          </li>
        </ul>
      </li>
      <li class="nav-item nav-dropdown">
        <a class="nav-link nav-dropdown-toggle" href="#">
          <i class="nav-icon icon-star"></i> 社群管理</a>
        <ul class="nav-dropdown-items">
          <li class="nav-item">
            <a class="nav-link" href="icons/coreui-icons.html">
              <i class="nav-icon icon-star"></i> 活動檢舉管理</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="icons/flags.html">
              <i class="nav-icon icon-star"></i> 留言檢舉管理</a>
          </li>
        </ul>
      </li>
      <li class="nav-item nav-dropdown">
        <a class="nav-link nav-dropdown-toggle" href="#">
          <i class="nav-icon icon-star"></i> 商店商品管理</a>
        <ul class="nav-dropdown-items">
          <li class="nav-item">
            <a class="nav-link" href="icons/coreui-icons.html">
              <i class="nav-icon icon-star"></i> CoreUI Icons
              <span class="badge badge-success">NEW</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="icons/flags.html">
              <i class="nav-icon icon-star"></i> Flags</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="icons/font-awesome.html">
              <i class="nav-icon icon-star"></i> Font Awesome
              <span class="badge badge-secondary">4.7</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="icons/simple-line-icons.html">
              <i class="nav-icon icon-star"></i> Simple Line Icons</a>
          </li>
        </ul>
      </li>
      <li class="nav-item nav-dropdown">
        <a class="nav-link nav-dropdown-toggle" href="#">
          <i class="nav-icon icon-bell"></i> 影片管理</a>
        <ul class="nav-dropdown-items">
          <li class="nav-item">
            <a class="nav-link" href="notifications/alerts.html">
              <i class="nav-icon icon-bell"></i> Alerts</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="notifications/badge.html">
              <i class="nav-icon icon-bell"></i> Badge</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="notifications/modals.html">
              <i class="nav-icon icon-bell"></i> Modals</a>
          </li>
        </ul>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="card.php">
          <i class="nav-icon icon-calculator"></i> 字卡管理
        </a>
      </li>
    </ul>
  </nav>
      <button class="sidebar-minimizer brand-minimizer" type="button"></button>
    </div>
    <main class="main">
      <!-- Breadcrumb-->
      <ol class="breadcrumb">
        <li class="breadcrumb-item">Home</li>
        <li class="breadcrumb-item">
          <a href="#">Admin</a>
        </li>
        <li class="breadcrumb-item active">Dashboard</li>
        <!-- Breadcrumb Menu-->
        <li class="breadcrumb-menu d-md-down-none">
          <div class="btn-group" role="group" aria-label="Button group">
            <a class="btn" href="#">
              <i class="icon-speech"></i>
            </a>
            <a class="btn" href="./">
              <i class="icon-graph"></i>  Dashboard</a>
            <a class="btn" href="#">
              <i class="icon-settings"></i>  Settings</a>
          </div>
        </li>
      </ol>
      <div class="container-fluid">
   
       <!-- 中間內容 -->
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

       <!-- end -->
      </div>
    </main>
    
  </div>
  <footer class="app-footer">
        <div>
          <a href="#">En-galaxy</a>
          <span>&copy; 2019 copyright</span>
        </div>
      </footer>
  <!-- CoreUI and necessary plugins-->
  <script src="node/jquery/dist/jquery.min.js"></script>
<script src="node/popper.js/dist/umd/popper.min.js"></script>
<script src="node/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="node/pace-progress/pace.min.js"></script>
<script src="node/perfect-scrollbar/dist/perfect-scrollbar.min.js"></script>
<script src="node/@coreui/coreui/dist/js/coreui.min.js"></script>
</body>
</html>