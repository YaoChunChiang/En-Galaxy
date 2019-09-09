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
          <i class="nav-icon icon-cursor"></i> 角色造型管理</a>
        <ul class="nav-dropdown-items">
          <li class="nav-item">
            <a class="nav-link" href="buttons/buttons.html">
              <i class="nav-icon icon-cursor"></i> Buttons</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="buttons/button-group.html">
              <i class="nav-icon icon-cursor"></i> Buttons Group</a>
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
	$dsn = "mysql:host=localhost;port=8889;dbname=dd102g4_test;charset=utf8";
	$user = "root";
	$password = "root";
	$options=array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE=>PDO::CASE_NATURAL);
	$pdo = new PDO($dsn, $user, $password, $options);

	$sql = "select * from member_question";
	$member_questions  = $pdo->query($sql);

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
        <a href="#">問答管理</a>
      </li>
      <li class="breadcrumb-item active" aria-current="page">問題管理</li>
      <!--麵包屑-->
    </ol>
  </nav>
</div>

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">問題編號</th>
      <th scope="col">會員ID</th>
      <th scope="col">提問時間</th>
      <th scope="col">問題標題</th>
      <th scope="col">問題內容</th>
      <th scope="col">懸賞金額</th>
      <th scope="col">最佳回答編號</th>
      <th scope="col">最佳回答內容</th>
    </tr>
  </thead>
  <tbody>
  <?php 
	while( $questionsRow = $member_questions->fetch(PDO::FETCH_ASSOC)){
		require("questionsRow.php");	
	?>
    <tr>
      <th scope="row"><?=$questionsRow["que_no"]?></th>
      <td><?=$questionsRow["mem_no"]?></td>
      <td><?=$questionsRow["time"]?></td>
      <td><?=$questionsRow["que_title"]?></td>
      <td><?=$questionsRow["que_desc"]?></td>
      <td>$<?=$questionsRow["money"]?></td>
      <td><?=$questionsRow["ans_no"]?></td>
      <td>ans_desc</td>
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
<script type="text/javascript">
    $(document).ready(jQuery(function($) {
        //initiate dataTables plugin
        var myTable = 
        $('#dynamic-table')
        //.wrap("<div class='dataTables_borderWrap' />")   //if you are applying horizontal scrolling (sScrollX)
        .DataTable( {
            bAutoWidth: false,
            "aoColumns": [
              { "bSortable": false },
              null, null, null, null,null,null,null,
              { "bSortable": false }//!!!!增加或減少欄位要改這裡!!!!!!null,
            ],
            "aaSorting": [],
            
            
            //"bProcessing": true,
            //"bServerSide": true,
            //"sAjaxSource": "http://127.0.0.1/table.php"	,
    
            //,
            //"sScrollY": "200px",
            //"bPaginate": false,
    
            //"sScrollX": "100%",
            //"sScrollXInner": "120%",
            //"bScrollCollapse": true,
            //Note: if you are applying horizontal scrolling (sScrollX) on a ".table-bordered"
            //you may want to wrap the table inside a "div.dataTables_borderWrap" element
    
            //"iDisplayLength": 50
    
    
            select: {
                // style: 'multi'
            }
        } );
    
        
        
        $.fn.dataTable.Buttons.defaults.dom.container.className = 'dt-buttons btn-overlap btn-group btn-overlap';
        
        new $.fn.dataTable.Buttons( myTable, {
            buttons: [
              {
                "extend": "colvis",
                "text": "<i class='fa fa-search bigger-110 blue'></i> <span class='hidden'>Show/hide columns</span>",
                "className": "btn btn-white btn-primary btn-bold",
                columns: ':not(:first):not(:last)'
              },
              {
                "extend": "copy",
                "text": "<i class='fa fa-copy bigger-110 pink'></i> <span class='hidden'>Copy to clipboard</span>",
                "className": "btn btn-white btn-primary btn-bold"
              },
              {
                "extend": "csv",
                "text": "<i class='fa fa-database bigger-110 orange'></i> <span class='hidden'>Export to CSV</span>",
                "className": "btn btn-white btn-primary btn-bold"
              },
              {
                "extend": "excel",
                "text": "<i class='fa fa-file-excel-o bigger-110 green'></i> <span class='hidden'>Export to Excel</span>",
                "className": "btn btn-white btn-primary btn-bold"
              },
              {
                "extend": "pdf",
                "text": "<i class='fa fa-file-pdf-o bigger-110 red'></i> <span class='hidden'>Export to PDF</span>",
                "className": "btn btn-white btn-primary btn-bold"
              },
              {
                "extend": "print",
                "text": "<i class='fa fa-print bigger-110 grey'></i> <span class='hidden'>Print</span>",
                "className": "btn btn-white btn-primary btn-bold",
                autoPrint: false,
                message: 'This print was produced using the Print button for DataTables'
              }		  
            ]
        } );
        myTable.buttons().container().appendTo( $('.tableTools-container') );
        
        //style the message box
        var defaultCopyAction = myTable.button(1).action();
        myTable.button(1).action(function (e, dt, button, config) {
            defaultCopyAction(e, dt, button, config);
            $('.dt-button-info').addClass('gritter-item-wrapper gritter-info gritter-center white');
        });
        
        
        var defaultColvisAction = myTable.button(0).action();
        myTable.button(0).action(function (e, dt, button, config) {
            
            defaultColvisAction(e, dt, button, config);
            
            
            if($('.dt-button-collection > .dropdown-menu').length == 0) {
                $('.dt-button-collection')
                .wrapInner('<ul class="dropdown-menu dropdown-light dropdown-caret dropdown-caret" />')
                .find('a').attr('href', '#').wrap("<li />")
            }
            $('.dt-button-collection').appendTo('.tableTools-container .dt-buttons')
        });
    
        ////
    
        setTimeout(function() {
            $($('.tableTools-container')).find('a.dt-button').each(function() {
                var div = $(this).find(' > div').first();
                if(div.length == 1) div.tooltip({container: 'body', title: div.parent().text()});
                else $(this).tooltip({container: 'body', title: $(this).text()});
            });
        }, 500);
        
        
        
        
        
        // myTable.on( 'select', function ( e, dt, type, index ) {
        // 	if ( type === 'row' ) {
        // 		$( myTable.row( index ).node() ).find('input:checkbox').prop('checked', true);
        // 	}
        // } );
        // myTable.on( 'deselect', function ( e, dt, type, index ) {
        // 	if ( type === 'row' ) {
        // 		$( myTable.row( index ).node() ).find('input:checkbox').prop('checked', false);
        // 	}
        // } );
    
    
    
    
        /////////////////////////////////
        //table checkboxes
        // $('th input[type=checkbox], td input[type=checkbox]').prop('checked', false);
        
        //select/deselect all rows according to table header checkbox
        // $('#dynamic-table > thead > tr > th input[type=checkbox], #dynamic-table_wrapper input[type=checkbox]').eq(0).on('click', function(){
        // 	var th_checked = this.checked;//checkbox inside "TH" table header
            
        // 	$('#dynamic-table').find('tbody > tr').each(function(){
        // 		var row = this;
        // 		if(th_checked) myTable.row(row).select();
        // 		else  myTable.row(row).deselect();
        // 	});
        // });
        
        //select/deselect a row when the checkbox is checked/unchecked
        // $('#dynamic-table').on('click', 'td input[type=checkbox]' , function(){
        // 	var row = $(this).closest('tr').get(0);
        // 	if(this.checked) myTable.row(row).deselect();
        // 	else myTable.row(row).select();
        // });
    
    
    
        // $(document).on('click', '#dynamic-table .dropdown-toggle', function(e) {
        // 	e.stopImmediatePropagation();
        // 	e.stopPropagation();
        // 	e.preventDefault();
        // });
        
        
        
        //And for the first simple table, which doesn't have TableTools or dataTables
        //select/deselect all rows according to table header checkbox
        // var active_class = 'active';
        // $('#simple-table > thead > tr > th input[type=checkbox]').eq(0).on('click', function(){
        // 	var th_checked = this.checked;//checkbox inside "TH" table header
            
        // 	$(this).closest('table').find('tbody > tr').each(function(){
        // 		var row = this;
        // 		if(th_checked) $(row).addClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', true);
        // 		else $(row).removeClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', false);
        // 	});
        // });
        
        //select/deselect a row when the checkbox is checked/unchecked
        // $('#simple-table').on('click', 'td input[type=checkbox]' , function(){
        // 	var $row = $(this).closest('tr');
        // 	if($row.is('.detail-row ')) return;
        // 	if(this.checked) $row.addClass(active_class);
        // 	else $row.removeClass(active_class);
        // });
    
        
    
        /********************************/
        //add tooltip for small view action buttons in dropdown menu
        $('[data-rel="tooltip"]').tooltip({placement: tooltip_placement});
        
        //tooltip placement on right or left
        function tooltip_placement(context, source) {
            var $source = $(source);
            var $parent = $source.closest('table')
            var off1 = $parent.offset();
            var w1 = $parent.width();
    
            var off2 = $source.offset();
            //var w2 = $source.width();
    
            if( parseInt(off2.left) < parseInt(off1.left) + parseInt(w1 / 2) ) return 'right';
            return 'left';
        }
        
        
        
        
        /***************/
        // $('.show-details-btn').on('click', function(e) {
        // 	e.preventDefault();
        // 	$(this).closest('tr').next().toggleClass('open');
        // 	$(this).find(ace.vars['.icon']).toggleClass('fa-angle-double-down').toggleClass('fa-angle-double-up');
        // });
        /***************/
        
        
        
        
        
        /**
        //add horizontal scrollbars to a simple table
        $('#simple-table').css({'width':'2000px', 'max-width': 'none'}).wrap('<div style="width: 1000px;" />').parent().ace_scroll(
          {
            horizontal: true,
            styleClass: 'scroll-top scroll-dark scroll-visible',//show the scrollbars on top(default is bottom)
            size: 2000,
            mouseWheelLock: true
          }
        ).css('padding-top', '12px');
        */
    
    
    }));
</script>
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