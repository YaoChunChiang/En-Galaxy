<?php
$errMsg = "";
try{
  require_once("pdoData.php");
  $ano = 0;
  $ano=($_GET['no']);
  
  $sql="select * from activity a left join mem_main m on a.mem_no =m.mem_no where a.act_no ={$ano}";
  //$sql_answerCount="select count(*) from member_answer where que_no ={$sno}";
  $memberAct=$pdo->prepare($sql);
  $memberAct->execute();
  // $result = $pdo->query($sql_answerCount);
  // $result->bindColumn(1,$totalRecord);
  // $result->fetch();
  
  //echo $memberAnsRow ;
    
 }catch(PDOException $e){
  $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}
?>


<div class="alertWindowWrap">
    <div class="alertWindow">
        <h3 class="alertTitle">TITLE</h3>
        <div class="alertContent">Lorem hil ad facere saepe iusto consequatur minus ab tenetur repellendus laborum magni!</div>
        <div class="closeWrap">
            <div class="alertButton">確認</div>
        </div>
        <div class="alertClose"></div>
    </div>
</div>
<!-- ---------------------- -->
<link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
<section class="eventInfoSection">
  <div class="container">
      <div class="forumBreadcrumbWrap">
          <ul id="forumBreadcrumb">
            <li><a href="home.html"><span class="icon icon-home"></span>En-Galaxy</a></li>
            <li><a href="forum.html"><span class="icon icon-double-angle-right"></span>社群專區</a></li>
            <li><a href="javascript:history.back()"><span class="icon icon-double-angle-right">交流活動</span></a></li>
            <li><a href="#"><span class="icon icon-rocket"></span>活動訊息</a></li>
          </ul>
         </div>
         <?php
      $memberActRow =$memberAct ->fetch(PDO::FETCH_ASSOC);
      ?>
      <!-- <form action="#" id="signUpForm"> -->
        <div class="eventWrap">
            <div class="eventTitle">
              <!-- <input type="hidden" name="eventId" /> -->
              <div class="eventTitleWrap">
                <div class="imgWrap"><img src="img/forum/blackboard.png" alt="blackboard"></div>
                <h2><?=$memberActRow['act_name']?></h2>
              </div>
              <div class="eventBtnArea" >
                  <button type="button" class="redButton" id="signEvent">我要報名</button>
                  <button id="report" class="reportBtn reportButton" name="act_no<?=$memberActRow['act_no']?>"onclick=report("act_no<?=$memberActRow['act_no']?>")>檢舉不當</button>
                </div>
            </div>
          
      <div class="eventInfoArea">
        <div class="eventPic col-12">
          <img src="img/event/<?=$memberActRow['act_img']?>" alt="活動照片" />
        </div>
        <div class="eventInfoWrap">
          
          <div class="eventDetail">
            <h3>活動詳情</h3>
            <span>活動日期：<?=$memberActRow['act_date']?></span>
            <span>活動地點：<?=$memberActRow['act_place']?></span>
            <span>截止日期：<?=$memberActRow['act_due']?></span>
            <span>已報名人數：<?=$memberActRow['join_count']?>人</span>
            <span>剩餘名額：<?=$memberActRow['act_max'] - $memberActRow['join_count']?>人</span>
            <span
              >活動簡介：
              <?=$memberActRow['act_detail']?>
            </span>
          </div>
        </div>
      </div>
       <!-- </form> -->
       <?php
      ini_set("display_errors","On");
      error_reporting(E_ALL);
         ?>
    <div id="trigger_01"></div>
    <!-- <div class="eventHostBg"> -->
      <div class="eventHost">
          <div class="eventHostTitle"><div class="Wrap"><img src="img/forum/idea.png" alt="idea"></div><h2>主辦會員資訊</h2></div>
        <div class="imgWrap memberPic" name="mem_no<?=$memberActRow['mem_no']?>" id="hostMember"></div>
        <div class="hostName">舉辦會員：<?=$memberActRow['mem_name']?></div>
        <div class="contactButton"><a href="mailto:<?=$memberActRow['mem_email']?>">聯絡主辦人</a></div>
      </div>
    <!-- </div> -->
  </div>
    
    <div class="otherEvent">
      <div class="otherEventTitle"><div class="Wrap"><img src="img/forum/book.png" alt="book"></div><h2>其他活動</h2></div>
        <div class="otherEventList" id="eventLists">
            <!-- <div class="wrap">
              <div class="eventCard">
                <div class="eventProfile">
                  <div class="imgWrap">
                    <img src="img/forum/bachelor.svg" />
                    <img src="img/forum/A.svg" />
                    <img src="img/forum/B.svg" />
                    <img src="img/forum/C.svg" />
                  </div>
                  <div class="imgWrap"></div>
                  <div class="hostName">舉辦會員：superman</div>
                </div>
                <div class="eventInfo">
                  <div class="infoList">
                    <ul>
                      <li>張貼日期：2019/08/24</li>
                      <li>活動時間：2019/09/30 am 12:00</li>
                      <li>活動地點： cama cafe</li>
                      <li>活動名稱：一起說已與</li>
                      <li>活動內容：英語會話五四三</li>
                      <li>報名人數：10人/15人</li>
                    </ul>
                  </div>
                  <div class="askQ">
                    <div class="yellowBtn">我要參加</div>
                  </div>
                </div>
              </div>
            </div>
           -->
        </div>
      </div>
      <div class="eventBgImg">
          <img src="img/forum/rocket.svg" alt="rocket" \>
      </div>
      <div class="eventBgImg">
            <img src="img/forum/cloud.svg" alt="cloud" \>
        </div>
    </div>
    <!-- ------------檢舉燈箱-------- -->
    <div id="reportBox" >
          <div class="reportBoxWrap">
               <h4>檢舉原因</h4>
               <a href="#" class="reportCancelBtn">X</a>
                 <select name="reportMessage">
                     <option value="1">外部廣告</option>
                     <option value="2">仇恨言語</option>
                     <option value="3">色情內容</option>
                 </select>
                 <button id="reportSendBtn">確認</button>
          </div>
       </div>
   <!-- ------------------------- -->
</section>
    <script src="js/forumEvent.js"></script>