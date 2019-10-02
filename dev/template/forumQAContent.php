<?php
$errMsg = "";
try{
  require_once("pdoData.php");
  $sno = 0;
  $sno=($_GET['no']);
//   if(isset($_GET['no']) &&($_GET['mem_no'])){
//   $sql="select q.money, q.que_no, q.que_title, q.que_desc from member_question q left join member_answer a on q.que_no = a.que_no left join mem_main m on q.mem_no =m.mem_no where q.que_no ={$sno}";
//   $sql_BestAnswer="select * from member_question q left join member_answer a on q.que_no = a.que_no left join mem_main m on q.mem_no =m.mem_no where best_ans = true";
  
// }else{
  $sql="select q.money, q.que_no, q.que_title, q.que_desc,q.mem_no  from member_question q left join member_answer a on q.que_no = a.que_no left join mem_main m on q.mem_no =m.mem_no where q.que_no ={$sno}";
  $sql_answerCount="select count(*) from member_answer where que_no ={$sno} and ans_status=1";
  $sql_BestAnswer="select a.mem_no,m.set_nickname,a.time,a.ans_desc,a.best_ans,a.ans_no
                   from member_question q 
                   left join member_answer a 
                   on q.que_no = a.que_no 
                   left join mem_main m 
                   on a.mem_no =m.mem_no 
                   where best_ans = true and q.que_no ={$sno}";
  $memberAns=$pdo->prepare($sql);
  $memberAns->execute();
  $result = $pdo->query($sql_answerCount);
  $result->bindColumn(1,$totalRecord);
  $result->fetch();
  $BestAnswer=$pdo->prepare($sql_BestAnswer);
  $BestAnswer->execute();
  // }
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
<!-- ------ -->
<link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
<section class="qAContent">
     <div class="forumBreadcrumbWrap">
        <ul id="forumBreadcrumb">
          <li><a href="home.html"><span class="icon icon-home"></span>En-Galaxy</a></li>
          <li><a href="forum.html"><span class="icon icon-double-angle-right"></span>社群專區</a></li>
          <li><a href="javascript:history.back()"><span class="icon icon-double-angle-right">問答懸賞</span></a></li>
          <li><a href="#"><span class="icon icon-rocket"></span>問題詳情</a></li>
        </ul>
       </div>  
      <div class="container">
      <?php
      $memberAnsRow =$memberAns ->fetch(PDO::FETCH_ASSOC);
      ?>
       <!-- 提問燈箱開始 -->
       <div id="forumQAddWindow" class="cardWindow">
          <div class="forumQAddWarp">
            <div class="window">
                <form id="questionForm">
                  <h3>我要提問</h3>
                  <label for="que_title">問題標題:</label>
                  <p id="que_title_text"></p>
                  <textarea cols="30" rows="5" name="que_title" id="que_title" placeholder="請輸入問題標題"></textarea>
                  <br><label for="que_desc">問題描述:</label>
                  <p id="que_desc_text"></p>
                  <textarea cols="30" rows="10" name="que_desc" id="que_desc" placeholder="請輸入問題描述"></textarea>
                  <br>
                  <label for="que_money">設定懸賞金額:</label><input type="number" min="0"name="que_money" id="que_money">GEM
                  <div class="buttons">
                      <div class="cancel">取消</div>
                      <div class="confirm" id="questionAdd">新增</div>
                </form>
             </div>
            <div class="close"></div>
        </div>
          </div>
    </div>
      <div class="cardWindow" id="queResponse"></div>
      <!-- 提問燈箱結束 -->
    
       <div class="askQ"><div class="yellowBtn askQuestion">我要提問</div></div>
       <div class="qTitle">
            <div class="info">
              <div class="bounty">
                <div class="imgWrap"><img src="img/forum/money.svg" alt="money" /></div>
                <span id="bountyMoney">懸賞金額：<?=$memberAnsRow['money']?></span>
              </div>
              <div class="ansNum"><span><?=$totalRecord?></span>回答</div>
              <div class="reportButton"name="que_no<?=$memberAnsRow['que_no']?>">
                  <span role="button"onclick="report(<?=$memberAnsRow['que_no']?>)">檢舉問題</span>
              </div>
            </div>
            <div class="imgWrap memberPic" name="mem_no<?=$memberAnsRow['mem_no']?>" id="questionMember"></div>
            <div class="questionTitle"> <h3>
                    <span>問題：<?=$memberAnsRow['que_title']?></span></h3>
                  <h4><?=$memberAnsRow['que_desc']?></h4>
            </div>
            
       </div>
       <div class="ansTitle"><h2>回答列表</h2></div> 
        <!-- 18px -->
      <?php
      $BestAnswerRow =$BestAnswer ->fetch(PDO::FETCH_ASSOC);
      ?>
        <div class="bestAnsSection">
                <div class="imgWrap" id="bestProfile" name="<?php if(isset ($BestAnswerRow['mem_no']) === false){
                          echo 'none';
                        }else{
                          echo $BestAnswerRow['mem_no'];
                        };?>"><?php if(isset ($BestAnswerRow['best_ans']) === false){
                          echo '';
                        }else{
                          echo '<span>最佳解答</span>';
                        };?> </div>
                <div class="ansSection" name="<?=$BestAnswerRow['ans_no']?>">
                    <div class="ansContent">
                    <?php if(isset ($BestAnswerRow['ans_desc']) === false){

                    }else{?>
                        <div class="trophy"><img src="img/member/medal.svg" alt="trophy"></div>
                        <span>最佳解答：</span>
                        <span>
                   <?php }?>
                        <?php if(isset ($BestAnswerRow['ans_desc']) === false){
                          echo '尚未有最佳解答';
                        }else{
                        
                          echo $BestAnswerRow['ans_desc'];
                        };?></span>
                    </div>
                    <div class="aboutAns">
                        <a href="#"><?php if(isset ($BestAnswerRow['set_nickname']) === false){
                          echo '';
                        }else{
                          echo $BestAnswerRow['set_nickname'].'・';
                        };?></a><span class="ansTIme"><?php if(isset ($BestAnswerRow['time']) === false){
                          echo '';
                        }else{
                          echo $BestAnswerRow['time'];
                        };?></span>
                    </div>
                    <div class="reportSection">
                    
                         
                      <?php if(isset ($BestAnswerRow['ans_desc']) === false){
                        echo '';
                      }else{
                        ?>
                      
                         <div class="reportButton" name="ans_no<?=$BestAnswerRow['ans_no']?>">
                          <span onclick="report(<?php if(isset ($BestAnswerRow['ans_no']) === false){
                          echo '';}else{ echo $BestAnswerRow['ans_no'] ;};
                          ?>)">檢舉不當</span></div>
                          <?php
                         } ?>
                    </div>
                </div>
        </div>
        <!-- <div class="otherAnsSection">
          <div class="imgWrap"><span>解答</span> <img src="img/forum/character2.svg" alt="profile" /></div>
          <div class="ansSection">
              <div class="ansContent">
                  <span></span>
              </div>
              <div class="aboutAns">
                  <a href="#"></a><span class="ansTIme"></span>
              </div>
              <div class="reportSection">
                  
                      <div class="commentBtn"><span>意見</span></div>
                  <div class="reportButton"><span>檢舉不當</span></div>
              </div>
          </div>
        </div> -->
 <?php
 ini_set("display_errors","On");
 error_reporting(E_ALL);
 ?>
  <?php if(isset($_GET['mem_no'])){
     ?>
     <div class="ansBoxWrap">
      </div>
   <?php   
  }else{
    ?>
        <div class="ansBoxWrap">
          <div class="ansBox">
            <div class="ansBoxTitle">
              <h3 id="no<?=$memberAnsRow['que_no']?>"><?=$memberAnsRow['que_title']?></h3>
              <h4><?=$memberAnsRow['que_desc']?></h4>
            </div>
          <div class="qTitle">
              <div class="imgWrap memberPic" id="memberProfile"></div>
              <div class="ansInputBox"> 
               <form action="#">
                 <div class="inputBoxWrap">
                  <p id="feedback"></p>
                   <textarea  cols="30" rows="10" placeholder="新增您的解答"id='ansDetail'></textarea>
                  </div><div class="inputBoxButton">
                  <span id='ansSendBtn'>送出</span>
                  <span>取消</span>
              </div>
               </form>
              </div>
              
        </div>
        
    <?php  
     } ?>
          </div>
        </div>
        <!-- --------------檢舉燈箱----------  -->
        <div id="reportBox" >
          <div class="reportBoxWrap">
               <h4>檢舉原因</h4>
               <div class="eventFormClose reportCancelBtn"></div>
               
                 <select name="reportMessage">
                     <option>請選擇原因</option>
                     <option value="1">外部廣告</option>
                     <option value="2">仇恨言語</option>
                     <option value="3">色情內容</option>
                 </select>
                 <button id="reportSendBtn">確認</button>
          </div>
       </div>
       <!-- ------------------------- -->
      </div>
      <script src="js/forumQna.js"></script>
      <!-- <script src="js/forum.js"></script> -->
      <script src="js/eventLightBox.js"></script>
    </section>
    
 