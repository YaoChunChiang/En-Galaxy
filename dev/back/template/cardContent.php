<?php
    $erroMsg = "";
    try{
        $dsn = "mysql:host=localhost;port=3306;dbname=dd102g4_;charset=utf8";
        $user = "root";
        $password = "MynameisAlex";
        $options = array(PDO::ATTR_CASE=>PDO::CASE_NATURAL, PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
        $pdo = new PDO($dsn, $user, $password,$options);

        $sql = "SELECT `default_vocab` FROM `default_vocab` WHERE `default_card_no` = 1";
        $defaultVocab = $pdo->query($sql);

        $sqlMid = "SELECT `default_vocab` FROM `default_vocab` WHERE `default_card_no` = 2";
        $defaultVocabMid = $pdo->query($sqlMid);

        $sqlHi = "SELECT `default_vocab` FROM `default_vocab` WHERE `default_card_no` = 3";
        $defaultVocabHi = $pdo->query($sqlHi);
        
        
            echo "連線成功~";
        }catch(PDOException $e){
            $erroMsg = $erroMsg . "錯誤訊息: " . $e->getMessage() . "<br>";
            $erroMsg .= "錯誤行號: " . $e->getLine() . "<br>";
        }


        
?>


<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">預設字卡管理</div>
            <div class="card-body">


                <div class="row">
                    <div class="col-sm-12 col-xl-4">
                        <div class="card">
                            <div class="card-header">
                                <i class="fa fa-align-justify"></i> 初級
                                <!-- <small>buttons with disabled items</small> -->
                            </div>
                            <div class="card-body">

                                <div class="list-group">
                                <!-- 自動生成 -->
                                <?php
                                    while($row = $defaultVocab->fetch(PDO::FETCH_ASSOC)){
                                ?>
                                    <button class="list-group-item list-group-item-action" type="button">
                                        <?php echo $row["default_vocab"]; ?>
                                        <a class="btn btn-danger float-right" href="#">
                                            <i class="fa fa-trash-o"></i>
                                        </a>
                                    </button>
                                <?php
                                    }//while
                                ?>




                                


                                    <!-- <button class="list-group-item list-group-item-action" type="button">Dapibus ac
                                        facilisis in<a class="btn btn-danger float-right" href="#">
                                            <i class="fa fa-trash-o"></i>
                                            </a></button>
                                    <button class="list-group-item list-group-item-action" type="button">Morbi leo
                                        risus<a class="btn btn-danger float-right" href="#">
                                            <i class="fa fa-trash-o"></i>
                                            </a></button>
                                    <button class="list-group-item list-group-item-action" type="button">Porta ac
                                        consectetur ac<a class="btn btn-danger float-right" href="#">
                                            <i class="fa fa-trash-o"></i>
                                            </a></button>
                                    <button class="list-group-item list-group-item-action" type="button"
                                        >Vestibulum at eros<a class="btn btn-danger float-right" href="#">
                                            <i class="fa fa-trash-o"></i>
                                            </a></button> -->
                                <!-- 自動生成 -->
                                </div>


                            </div>
                            <button class="btn btn-pill btn-primary w-25 mr-auto ml-auto mb-4 align-top" type="button">新增字卡</button>
                        </div>
                    </div>
                    <div class="col-sm-12 col-xl-4">
                        <div class="card">
                            <div class="card-header">
                                <i class="fa fa-align-justify"></i> 中級
                                <!-- <small>buttons with disabled items</small> -->
                            </div>
                            <div class="card-body">
                                <?php
                                    while($rowMid = $defaultVocabMid->fetch(PDO::FETCH_ASSOC)){
                                ?>
                                    <button class="list-group-item list-group-item-action" type="button">
                                        <?php echo $rowMid["default_vocab"]; ?>
                                        <a class="btn btn-danger float-right" href="#">
                                            <i class="fa fa-trash-o"></i>
                                        </a>
                                    </button>
                                <?php
                                    }//while
                                ?>
                            </div>
                            <button class="btn btn-pill btn-primary w-25 mr-auto ml-auto mb-4 align-top" type="button">新增字卡</button>
                        </div>
                    </div>
                    <div class="col-sm-12 col-xl-4">
                        <div class="card">
                            <div class="card-header">
                                <i class="fa fa-align-justify"></i> 高級
                                <!-- <small>buttons with disabled items</small> -->
                            </div>
                            <div class="card-body">
                                <div class="list-group">
                                    <?php
                                        while($rowHi = $defaultVocabHi->fetch(PDO::FETCH_ASSOC)){
                                    ?>
                                        <button class="list-group-item list-group-item-action" type="button">
                                            <?php echo $rowHi["default_vocab"]; ?>
                                            <a class="btn btn-danger float-right" href="#">
                                                <i class="fa fa-trash-o"></i>
                                            </a>
                                        </button>
                                    <?php
                                        }//while
                                    ?>
                                </div>
                            </div>
                            <button class="btn btn-pill btn-primary w-25 mr-auto ml-auto mb-4 align-top" type="button">新增字卡</button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>
</div>