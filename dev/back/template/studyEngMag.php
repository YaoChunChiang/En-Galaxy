<?php
$errMsg = "";
try {
    $dsn = "mysql:host=localhost;port=3306;dbname=dd102g4;charset=utf8";
    $user = "root";
    $password = "root123";
    $options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE => PDO::CASE_NATURAL);
    $pdo = new PDO($dsn, $user, $password, $options);

    $sql = "select * from video";
    $videos = $pdo->query($sql);
    $videos->execute();
} catch (PDOException $e) {
    $errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
    $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}
?>
<div class="card">
    <div class="card-header">
        <div class="float-left"><i class="icon-book-open align-justify"></i>&nbsp;&nbsp;英文學習影片管理</div>
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
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        margin: auto;
                        width: 41.6%;
                        z-index: 2;
                        padding-bottom: 390px;
                    }
                </style>
                <!-- 上傳影片燈箱開始 -->
                <div class="card upVideoData" style="display:none;">
                    <div class="card-header">
                        新增影片資料
                    </div>
                    <div class="card-body">
                        <form action="studyEngAdd.php" method="post" enctype="multipart/form-data">
                            <div class="form-row">
                                <!-- <div class="form-group col-md-6">
                                    <label for="videoNumber">學習影片編號</label>
                                    <input type="text" class="form-control" value="EX:001" name="studyNo">
                                </div> -->
                                <div class="form-group col-md-6">
                                    <label for="exampleFormControlSelect1">影片等級</label>
                                    <select class="form-control" id="exampleFormControlSelect1 videoGrade" name="videoLevel">
                                        <option value="basic">初級</option>
                                        <option value="midden">中級</option>
                                        <option value="high">高級</option>
                                    </select>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="videoNumber">影片名稱</label>
                                    <input type="text" class="form-control" name="videoName">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="exampleFormControlSelect1">影片類別</label>
                                    <select class="form-control" id="videoClass" name="videoClass">
                                        <option>音樂類</option>
                                        <option>影劇類</option>
                                        <option>新聞類</option>
                                    </select>
                                </div>

                                <div class="form-group col-md-6">
                                    <label for="exampleFormControlFile1">請選擇要上傳的影片</label>
                                    <input type="file" class="form-control-file" id="exampleFormControlFile1" name="upFile">
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
                <th>學習影片編號</th>
                <th>英文等級</th>
                <th>影片名稱</th>
                <th>影片描述</th>
                <th>影片類別</th>
                <th>修改影片</th>
                <th>刪除影片</th>
            </tr>
        </thead>
        <tbody>

            <?php
            while ($videoRow = $videos->fetch(PDO::FETCH_ASSOC)) {
                ?>
                <tr>
                    <td><?= $videoRow["video_no"] ?></td>
                    <td><?= $videoRow["level_no"] ?></td>
                    <td><?= $videoRow["video_name"] ?></td>
                    <td><?= $videoRow["video_desc"] ?></td>
                    <td><?= $videoRow["video_type"] ?></td>
                    <td><button class="btn btn-primary btn-outline-success active fixed" type="button" aria-pressed="true">修改</button></td>
                    <td><button class="btn btn-primary btn-danger" type="button">刪除</button></td>
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