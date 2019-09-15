<?php
try {
    $dsn = "mysql:host=localhost;port=8889;dbname=dd102g4;charset=utf8";
    $user = "root";
    $password = "root";
    $options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE => PDO::CASE_NATURAL);
    $pdo = new PDO($dsn, $user, $password, $options);
    // require_once("connectionTony.php");
    $sql = "select* from admin order by admin_no";
    $admin = $pdo->prepare($sql);
    //$member->bindValue(":memId", $_GET["memId"]);
    $admin->execute();

    // if ($admin->rowCount() == 0) { //找不到
    //     //傳回空的JSON字串
    //     echo "{}";
    // } else { //找得到
    //     //取回一筆資料
    //     $adminRow = $admin->fetchAll(PDO::FETCH_ASSOC);
    //     //送出json字串
    //     echo json_encode($adminRow);
    // }
} catch (PDOException $e) {
    echo $e->getMessage();
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
                <a href="#">管理員管理</a>
            </li>
            <!--麵包屑-->
        </ol>
    </nav>
</div>

<button type="button" class="btn btn-pill btn-outline-success">新增管理員</button>
<table class="table">
    <thead class="thead-dark">
        <tr>
            <th scope="col">管理員編號</th>
            <th scope="col">管理員名稱</th>
            <th scope="col">管理員密碼</th>
            <th scope="col">管理員權限</th>
            <th scope="col">管理員權限設定</th>
        </tr>
    </thead>
    <tbody>
        <?php
        while ($adminRow = $admin->fetch(PDO::FETCH_ASSOC)) {

            ?>
            <tr>
                <td><?= $adminRow["admin_no"] ?></td>
                <td><?= $adminRow["admin_account"] ?></td>
                <td>
                    <input type="text" disabled value=<?= $adminRow["admin_psw"] ?>>
                </td>
                <td>
                    <select id="inputState" class="form-control" disabled>
                        <option value="1">管理員</option>
                        <option value="2">唯讀</option>
                    </select>
                    <?= $adminRow["admin_level"] ?></td>
                <td>
                    <button type="button" class="btn btn-pill btn-primary btn-sm">編輯</button>
                    <button type="button" class="btn btn-pill btn-danger btn-sm">刪除</button>
                </td>
            </tr>
        <?php
        }
        ?>
    </tbody>
</table>