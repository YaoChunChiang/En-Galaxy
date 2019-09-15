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
 @@include('template/top_header.html')
  <div class="app-body">
    <div class="sidebar">
      <!-- sidebar menu-->
      @@include('template/sidebar_nav.html')
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
       @@include('template/studyEngMag.php')
       <!-- end -->
      </div>
    </main>
    
  </div>
  @@include('template/footer.html')
  <!-- CoreUI and necessary plugins-->
  @@include('template/script.html')
</body>
</html>