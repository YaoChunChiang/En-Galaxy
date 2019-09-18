<?php
$errMsg = "";
try {
    require_once("../pdoData.php");

    $who = $_POST['who'];
    if ($who === 'deleteQuiz') {
        $quizDelete = $_POST["myQuiz"];
        $sql="DELETE FROM video_qs WHERE video_qs.video_q_no = {$quizDelete}";
        $pdo->exec($sql);
    }
    else {

        $videoNo = $_POST["videoNo"];
        $videoQuest = $_POST["videoQuest"];
        $optNoFirst = $_POST["optNoFirst"];
        $optNoTwo = $_POST["optNoTwo"];
        $optNoThree = $_POST["optNoThree"];
        $optNoFour = $_POST["optNoFour"];
        $corAns = $_POST["corAns"];

        $sql = "INSERT INTO video_qs (video_q_no, video_no, video_q, opt_1, opt_2, opt_3, opt_4, answer, video_q_status) 
    VALUES (NULL, :videoNo, :videoQuest, :optNoFirst, :optNoTwo, :optNoThree, :optNoFour, :corAns, NULL)";
        $videosQS = $pdo->prepare($sql);
        $videosQS->bindValue(":videoNo", $videoNo);
        $videosQS->bindValue(":videoQuest", $videoQuest);
        $videosQS->bindValue(":optNoFirst", $optNoFirst);
        $videosQS->bindValue(":optNoTwo", $optNoTwo);
        $videosQS->bindValue(":optNoThree", $optNoThree);
        $videosQS->bindValue(":optNoFour", $optNoFour);
        $videosQS->bindValue(":corAns", $corAns);
        $videosQS->execute();
    }
} catch (PDOException $e) {
    $errMsg .= "錯誤原因 : " . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}
echo $errMsg;
// header("location:studyEngQuiz.php");
