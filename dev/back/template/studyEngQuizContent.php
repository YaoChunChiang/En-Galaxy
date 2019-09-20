<?php
$errMsg = "";
try {
    require_once("../pdoData.php");
    $sql = "select * from video";
    $video = $pdo->query($sql);
    $videoRows = $video->fetchAll(PDO::FETCH_ASSOC);

    $sql = "select * from video_qs";
    $videosQS = $pdo->query($sql);
    $videosQS->execute();
} catch (PDOException $e) {
    $errMsg .= "錯誤原因 : " . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}
?>


<div class="card">
    <div class="card-header">
        <div class="float-left"><i class="icon-book-open align-justify"></i>&nbsp;&nbsp;學習影片題庫管理</div>
        <div class="clearfix"></div>
        <div class="d-inline-block mt-2 float-right">
            <button class="btn btn-warning mr-1" id="videoQAdd" type="button">上傳題庫</button>
        </div>
    </div>

    <div class="card-body">
        <table class="table table-responsive-sm text-center">
            <thead>
                <tr>
                    <th>影片題目編號</th>
                    <th>影片編號</th>
                    <th>影片題目</th>
                    <th>選項一</th>
                    <th>選項二</th>
                    <th>選項三</th>
                    <th>選項四</th>
                    <th>正確解答</th>
                    <th>上下架狀態</th>
                    <th>修改答案</th>
                    <th>刪除題目</th>
                </tr>
            </thead>
            <tbody>

                <?php
                while ($videoQust = $videosQS->fetch(PDO::FETCH_ASSOC)) {
                    // require("studyEngMag.php");	
                    ?>
                    <tr>
                        <td><?= $videoQust["video_q_no"] ?></td>
                        <td><?= $videoQust["video_no"] ?></td>
                        <td><?= $videoQust["video_q"] ?></td>
                        <td><?= $videoQust["opt_1"] ?></td>
                        <td><?= $videoQust["opt_2"] ?></td>
                        <td><?= $videoQust["opt_3"] ?></td>
                        <td><?= $videoQust["opt_4"] ?></td>
                        <td><?= $videoQust["answer"] ?></td>
                        <td><label class="switch switch-3d switch-success">
                            <input class="switch-input" type="checkbox" checked="0">
                            <span class="switch-slider"></span>
                        </label></td>
                        <td><button class="btn btn-primary btn-outline-success active repair" type="button" aria-pressed="true">修改</button></td>
                        <td><button class="btn btn-primary btn-danger quizDel" type="button">刪除</button></td>
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

    </div>


</div>



<div class="card position-absolute fixed-top col-lg-4 offset-lg-4 col-md-6 offset-md-3 mt-5 d-none videoQustAdd" style="">
    <div class="card-header">
        新增題庫資料
    </div>
    <div class="card-body">
        <form action="upQuiz.php" method="post" enctype="multipart/form-data">
        <input type="hidden" name="who" value="updateQuiz">
            <div class="form-row">
                <div class="form-group ml-auto mr-auto col-md-6 col-sm-8">
                    
                    <label for="videoNumber">影片編號</label>

                    <!-- 有問題 開始 -->
      
                    <select class="form-control" id="videoNumber" name="videoNo">
                       <?php foreach( $videoRows as $i => $videoRow){?>
                                <option value="<?=$videoRow["video_no"]?>"><?=$videoRow["video_no"]?></option>
                       <?php }?>
                                      
                    <?php
                    ini_set("display_errors","On");
                    error_reporting(E_ALL);
                    ?>
                    </select>

                     <!-- 有問題 結束 -->
                    
                </div>
                <div class="form-group col-md-6">
                    <label for="videoTitle">影片題目</label>
                    <input type="text" class="form-control" value="ex: Do you like me?" name="videoQuest">
                </div>
                <div class="form-group col-md-6">
                    <label for="opt1">選項一</label>
                    <input type="text" class="form-control" name="optNoFirst">
                </div>
                <div class="form-group col-md-6">
                    <label for="opt2">選項二</label>
                    <input type="text" class="form-control" name="optNoTwo">
                </div>
                <div class="form-group col-md-6">
                    <label for="opt3">選項三</label>
                    <input type="text" class="form-control" name="optNoThree">
                </div>
                <div class="form-group col-md-6">
                    <label for="opt4">選項四</label>
                    <input type="text" class="form-control" name="optNoFour">
                </div>
                <div class="form-group col-md-6">
                    <label for="rightAns">正確解答</label>
                    <input type="text" class="form-control" name="corAns">
                </div>

            </div>

            <div class="d-flex flex-row-reverse">
                <button class="btn btn-primary order-2 mr-1 videoConfirm" type="submit" name="submit">確認</button>
                <button class="btn btn-danger order-1 cancleUpload" type="button">取消</button>
            </div>
        </form>
    </div>
</div>