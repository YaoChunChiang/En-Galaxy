<?php
$errMsg = "";
try {
    
    require_once("../pdoData.php");

    $sql = "select * from video";
    $videos = $pdo->query($sql);
    $videos->execute();
} catch (PDOException $e) {
    $errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
    $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}
?>
<div class="breadcrumbs ace-save-state" id="breadcrumbs">
  <nav aria-label="breadcrumb" role="navigation">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <i class="ace-icon fa fa-home home-icon"></i>
        <a href="adminManage.html">En-galaxy</a>
      </li>
      <li class="breadcrumb-item">
        <a href="#">影片管理</a>
      </li>
      <li class="breadcrumb-item active" aria-current="page">英文影片管理</li>
      <!--麵包屑-->
    </ol>
  </nav>
</div>
<div class="card">
    
    <div class="card-header">
        
        <div class="clearfix"></div>
        <div class="float-right">

            <div class="d-inline-block mt-2 float-right"><button class="btn btn-warning mr-1 videoAddData" type="button">新增影片資料</button>


                <!-- CSS -->
                <style>
                    .main {
                        position: relative;
                    }

                    .upVideoData {
                        position: absolute;
                        left: 0;
                        right: 0;
                        margin: auto;
                        width: 41.6%;
                        z-index: 2;
                    }
                    .vidowPic{
                        width:200px;
                        text-align: center;
                    }
                    .vidowPic img{
                        width:100%;
                    }
                </style>
                <!-- 上傳影片燈箱開始 -->
                <div class="card upVideoData" style="display:none;">
                    <div class="card-header">
                        新增影片資料
                    </div>
                    <div class="card-body">
                        <form action="studyEngAdd.php" method="Post" enctype="multipart/form-data">
                            <div class="form-row">
                              <input type="hidden" name="who" value="addVideo">
                                <div class="form-group col-md-6">
                                    <label for="exampleFormControlSelect1">影片等級</label>


                                    <select class="form-control" id="exampleFormControlSelect1 videoGrade" name="videoLevel">
           
                                        <option value="1">初級</option>
                                        <option value="2">中級</option>
                                        <option value="3">高級</option>
          
                                    </select>

                                </div>
                                <div class="form-group col-md-6">
                                    <label for="videoNumber">影片名稱</label>
                                    <input type="text" class="form-control" name="videoName">
                                </div>
                                <div class="form-group col-md-12">
                                    <label for="exampleFormControlSelect1">影片類別</label>
                                    <select class="form-control" id="videoClass" name="videoClass">
                                        <option>音樂</option>
                                        <option>影劇</option>
                                        <option>新聞</option>
                                    </select>
                                </div>

                                <div class="form-group col-md-6">
                                    <label for="exampleFormControlFile1">請選擇要上傳的影片</label>
                                    <input type="file" class="form-control-file" id="upVideo" name="upFile[]">
                                </div>

                                <div class="form-group col-md-6">
                                    <label for="exampleFormControlFile">請選擇要上傳的截圖</label>
                                    <input type="file" class="form-control-file" id="upPic" name="upFile[]">
                                </div>

                                <div class="form-group col-md-6">
                                    <label for="exampleFormControlFile">請選擇要上傳的字幕</label>
                                    <input type="file" class="form-control-file" id="subtitle" name="upFile[]">
                                </div>

                                <div class="form-group col-md-12">
                                    <label for="exampleFormControlTextarea1">請輸入影片描述</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="videoDesc"></textarea>
                                </div>

                                <div class="d-flex flex-row-reverse col-md-12">
                                    <button class="btn btn-primary order-2 mr-1 videoConfirm" type="submit" name="submit">確認</button>
                                    <button class="btn btn-danger order-1 videoC" type="button">取消</button>
                                </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
<div class="card-body">
    <table class="table table-responsive-sm text-center">
        <thead>
            <tr>
                <th>影片編號</th>
                <th>英文等級</th>
                <th>影片名稱</th>
                <th>影片描述</th>
                <th>影片類別</th>
                <th>影片截圖</th>
                <th>上下架狀態</th>
                <th>修改影片</th>
                <th>刪除影片</th>
            </tr>
        </thead>
        <tbody>

            <?php
            while ($videoRow = $videos->fetch(PDO::FETCH_ASSOC)) {
                ?>
                <tr>
                    <td class="videoNo">
                        <?= $videoRow["video_no"] ?>
                    </td>
                    <td class="levelNo">
                    <input type="text" readonly="" class="form-control-plaintext form-control-sm modified text-center level_no" value="<?= $videoRow["level_no"] ?>">
                        
                    </td>
                    <td class="videoName">
                    <input type="text" readonly="" class="form-control-plaintext form-control-sm modified text-center video_name" value="<?= $videoRow["video_name"] ?>">
                    </td>
                    <td class="videoDesc">
                    <input type="text" readonly="" class="form-control-plaintext form-control-sm modified text-center video_desc" value="<?= $videoRow["video_desc"] ?>">
                    </td>
                    <td class="videoType">
                    <input type="text" readonly="" class="form-control-plaintext form-control-sm modified text-center video_type" value="<?= $videoRow["video_type"] ?>">
                    </td>
                    <td class="vidowPic">
                        <img src="../video/<?= $videoRow["video_pic"] ?>">
                    </td>
                    <td>
                        <label class="switch switch-3d switch-success">
                            <input class="switch-input modified" type="checkbox" name="video_q_status" disabled="" value="<?= $videoRow["video_status"] ?>">
                            <span class="switch-slider"></span>
                        </label>
                    </td>
                    <!-- <td><button class="btn btn-primary btn-outline-success active fixed" type="button" aria-pressed="true">修改</button></td> -->
                    <td>
                        <button class="btn btn-primary active questionModifyStart edit" type="button">修改</button>
                        <button class="btn btn-outline-success active questionModifyConfirm d-none" type="button" aria-pressed="true" data-toggle="modal" data-whatever="@modify" data-target="#alertModal">確認</button>
                    </td>
                    <td><button class="btn btn-primary btn-danger videoDel" type="button">刪除</button></td>
                </tr>
            <?php
            }
            ?>
        </tbody>
    </table>
    <ul class="pagination d-flex justify-content-center">
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

    <!-- <div class="d-inline-block float-right">
        <button class="btn btn-primary btn-lg" type="button">確認</button>
        <button class="btn  btn-danger btn-lg" type="button">取消</button>
    </div> -->
</div>
</div>