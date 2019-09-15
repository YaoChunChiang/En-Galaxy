<?php
$errMsg = "";
try {
    $dsn = "mysql:host=localhost;port=3306;dbname=dd102g4;charset=utf8";
    $user = "root";
    $password = "root123";
    $options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE => PDO::CASE_NATURAL);
    $pdo = new PDO($dsn, $user, $password, $options);

    $sql = "select * from video_qs";
    $videosQS = $pdo->query($sql);
    $videosQS->execute();
} catch (PDOException $e) {
    $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
    $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}
?>

<div class="card">
    <div class="card-header">
        <div class="float-left"><i class="icon-book-open align-justify"></i>&nbsp;&nbsp;學習影片題庫管理</div>
        <div class="clearfix"></div>
        <div class="d-inline-block mt-2 float-right"><button class="btn btn-warning mr-1"
                type="button">上傳題庫</button><button class="btn btn-danger" type="button">取消</button></div>

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
                        <td><button class="btn btn-primary btn-outline-success active" type="button" aria-pressed="true">修改</button></td>
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