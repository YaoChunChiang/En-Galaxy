<?php
$errMsg = "";
try{
  require_once("pdoData.php");
  $sno = 0;
  $sno=($_GET['no']);
  
  $sql="select * from member_question q left join member_answer a on q.que_no = a.que_no left join mem_main m on q.mem_no =m.mem_no where q.que_no ={$sno}";
  $sql_answerCount="select count(*) from member_answer where que_no ={$sno}";
  $sql_BestAnswer="select * from member_question q left join member_answer a on q.que_no = a.que_no left join mem_main m on q.mem_no =m.mem_no where best_ans = true";
  $memberAns=$pdo->prepare($sql);
  $memberAns->execute();
  $result = $pdo->query($sql_answerCount);
  $result->bindColumn(1,$totalRecord);
  $result->fetch();
  $BestAnswer=$pdo->prepare($sql_BestAnswer);
  $BestAnswer->execute();
  
  //echo $memberAnsRow ;
    
 }catch(PDOException $e){
  $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}
?>


<link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
<section class="qAContent">
     <div class="forumBreadcrumbWrap">
        <ul id="forumBreadcrumb">
          <li><a href="home.html"><span class="icon icon-home"></span>En-Galaxy</a></li>
          <li><a href="forum.html"><span class="icon icon-double-angle-right"></span>社群專區</a></li>
          <li><a href="javascript:history.back()"><span class="icon icon-double-angle-right">問答懸賞</span></a></li>
          <li><a href="forumQA.html"><span class="icon icon-rocket"></span>問題詳情</a></li>
        </ul>
       </div>   
      <div class="container">
      <?php
      $memberAnsRow =$memberAns ->fetch(PDO::FETCH_ASSOC);
      ?>
       <div class="askQ"><div class="yellowBtn">我要提問</div></div>
       <div class="qTitle">
            <div class="info">
              <div class="bounty">
                <div class="imgWrap"><img src="img/forum/money.svg" alt="money" /></div>
                <span>懸賞金額：<?=$memberAnsRow['money']?></span>
              </div>
              <div class="ansNum"><span><?=$totalRecord?></span>回答</div>
              <div class="reportButton">
                  <span role="button">檢舉問題</span>
              </div>
            </div>
            <div class="imgWrap"> <img src="img/forum/character.svg" alt="profile" /></div>
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
                <div class="imgWrap"><?php if(isset ($BestAnswerRow['best_ans']) === false){
                          echo '';
                        }else{
                          echo '<span>解答</span>';
                        };?><img src="<?php if(isset ($BestAnswerRow['mem_img']) === false){
                          echo 'img/forum/character2.svg';
                        }else{
                          echo $BestAnswerRow['mem_img'];
                        };?>" alt="profile"/></div>
                <div class="ansSection" name="<?=$BestAnswerRow['ans_no']?>">
                    <div class="ansContent">
                        <span>冠軍</span>
                        <span>最佳解答：</span>
                        <span><?php if(isset ($BestAnswerRow['ans_desc']) === false){
                          echo '尚未有最佳解答';
                        }else{
                          echo $BestAnswerRow['ans_desc'];
                        };?></span>
                    </div>
                    <div class="aboutAns">
                        <a href="#"><?php if(isset ($BestAnswerRow['a.mem_no']) === false){
                          echo '';
                        }else{
                          echo $BestAnswerRow['a.mem_no'];
                        };?></a><span class="ansTIme"><?php if(isset ($BestAnswerRow['a.time']) === false){
                          echo '';
                        }else{
                          echo $BestAnswerRow['a.time'];
                        };?></span>
                    </div>
                    <div class="reportSection">
                        
                            <div class="commentBtn"><span>意見</span>
                          </div>
                        <div class="reportButton">
                          <span onclick="report(<?php if(isset ($BestAnswerRow['a.ans_no']) === false){
                          echo '';}else{ echo $BestAnswerRow['a.ans_no'] ;};
                          ?>)">檢舉不當</span></div>
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
        <!-- <div class="otherAnsSection">
          <div class="imgWrap"> <span>解答</span><img src="img/forum/character2.svg" alt="profile" /></div>
          <div class="ansSection">
              <div class="ansContent">
                 
                  <span>姐姐今後東京處罰，圍繞立即價</span>
              </div>
              <div class="aboutAns">
                  <a href="#">d87</a><span class="ansTIme">・ 2天前</span>
              </div>
              <div class="reportSection">
                  
                      <div class="commentBtn"><span>意見</span></div>
                  <div class="reportButton"><span>檢舉不當</span></div>
              </div>
          </div>
        </div> -->
        <div class="ansBoxWrap">
          <div class="ansBox">

            <div class="ansBoxTitle">
              <h3 id="no<?=$memberAnsRow['que_no']?>"><?=$memberAnsRow['que_title']?></h3>
              <h4><?=$memberAnsRow['que_desc']?></h4>
            </div>
            <div class="qTitle">
              <div class="imgWrap"> <img src="img/forum/character.svg" alt="profile" /></div>
              <div class="ansInputBox"> 
               <form action="#">
                 <div class="inputBoxWrap">
                   <textarea  cols="30" rows="10" placeholder="新增您的解答"id='ansDetail'></textarea>
                  </div><div class="inputBoxButton">
                  <span id='ansSendBtn'>送出</span>
                  <span>取消</span>
              </div>
               </form>
              </div>
              
         </div>
          </div>
        </div>
        <!-- --------------檢舉燈箱----------  -->
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
      </div>
   <script>
      
    function $id(id) {
      return document.getElementById(id);
    };
    var storage = sessionStorage;
    //將ans_no存入session
     function report(no){
      var storage = sessionStorage;
      if (storage['reportList'] == null) {
        storage.setItem('reportList', '')
    }
    let lists = document.querySelectorAll('.reportButton span');
    for (let i = 0; i < lists.length; i++) {
        lists[i].addEventListener('click', function () {
            let reportNo = parseInt(this.parentNode.getAttribute('name').replace('ans_no',''));
            //console.log(reportNo);
            storage.setItem('reportList', reportNo);
        })
     }
     }
  
  
    $('#reportSendBtn').click(function reportMessage(){
      let reportReason = $("select[name='reportMessage']").val();
      let no =storage.getItem('reportList');
      let mem_no =storage.getItem('mem_no');
      console.log(no);
      $.ajax({
        url:'reportSendDB.php',
        method:'POST',
        data: "&ans_no="+no+"&reason="+reportReason+"&mem_no="+mem_no,
        dataType:'JSON',
        success:
        function(){
            alert(data.status)
            storage.removeItem('reportList');
        }
      });
    });
      
    //   var xhr = new XMLHttpRequest(); 
    //   xhr.onload= function(){
    //     if(xhr.responseText =='成功'){
    //     }else{
    //     alert("reportMessage系統錯誤");
    //   }
    // }
    
    
    // let url = "reportSendDB.php?ans_no";
    // xhr.open("get", url, true);
    // xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    // var data_info = "jsonStr=" + JSON.stringify( reportReason );
    //     xhr.send(data_info);
    // })

    function showAnsList(jsonStr){
      var AnsList =JSON.parse(jsonStr);
      var htmlStr = "";
        if (AnsList[0].que_no){
          // let ansSection = document.createElement('div');
          //   ansSection.setAttribute('class','otherAnsSection');
          for(i=0;i<AnsList.length;i++){
            htmlStr+=`<div class="otherAnsSection">`;
            htmlStr+=`<div class="imgWrap"><span>解答</span> <img src="img/forum/character2.svg" alt="profile" />${AnsList[i].mem_name}</div><div class="ansSection">`;
            htmlStr+=`<div class="ansContent"><span>${AnsList[i].ans_desc}</span></div>`;
            htmlStr+=`<div class="aboutAns"><a href="#">${AnsList[i].mem_name}</a><span class="ansTIme">${AnsList[i].time}</span></div>`;
            htmlStr+=`<div class="reportSection"><div class="commentBtn"><span>意見</span></div>`;
            htmlStr+=`<div class="reportButton"name="ans_no${AnsList[i].ans_no}"><span onclick="report(${AnsList[i].ans_no})">檢舉不當</span></div></div></div></div>`;
          //  ansSection.innerHTML = htmlStr;
          let element = $(htmlStr).get(i);
          let box = document.querySelector('.ansBoxWrap');
          let parentDiv = box.parentNode; 
          parentDiv.insertBefore(element,box);
          }
    }
  }

    function getAnsList(){
        var xhr =new XMLHttpRequest();
        xhr.onload = function(){
          if(xhr.status ==200){
            showAnsList(xhr.responseText);
          }else{
            alert(xhr.status);
          }
        }//xhr.onload
        var url = "forumSendAns.php?no="+parseInt(window.location.search.replace('?no=',''));
        xhr.open("Get", url, false);
        xhr.send( null );
      };
      //立即執行取得訊息的AJAX
      getAnsList();
      //寫回去資料庫
    function sendToDB(e){
        let que_no=parseInt(window.location.search.replace('?no=',''));
          console.log(que_no);
        let ans_desc = $('#ansDetail').val(); 
        let mem_no = sessionStorage['mem_no']; 
        $.ajax({
          url:'forumSendAns.php',
          method:'POST',
          data: "&que_no="+que_no+"&ans_desc="+ans_desc+"&mem_no="+mem_no,
          dataType:'JSON',
          success:$('#ansDetail').val(''),
        });
      };
      document.getElementById('ansSendBtn').addEventListener('click',sendToDB); 
    function reportDoFirst(){
      //點按鈕打開燈箱
      $('.reportButton').click(
        function(){
          $('#reportBox').toggle();
        }
      );
      $('.reportCancelBtn').click(function(){
        $('#reportBox').toggle();
      })
      $('.reportBoxWrap button').click(function(){
        $('#reportBox').toggle();
      })
      }
//       //點x或(背景)及確認都會消失
//       function closeLightBox(){
//         $id('reportBox').style.display="none"
//       }
//       $id('reportCheck').addEventListener('click',closeLightBox);
//       document.getElementsByClassName('reportCancelBtn')[0].addEventListener('click',closeLightBox);

//  }
    window.addEventListener('load',reportDoFirst);

</script>
    </section>
 