<?php
$errMsg = "";
try{
  require_once("connectionHsin.php");
  $sno = 0;
  $sno=($_GET['no']);
  
  $sql="select * from member_question q left join member_answer a on q.que_no = a.que_no left join mem_main m on q.mem_no =m.mem_no where q.que_no ={$sno}";
  $sql_answerCount="select count(*) from member_answer where que_no ={$sno}";
  $memberAns=$pdo->prepare($sql);
  $memberAns->execute();
  $result = $pdo->query($sql_answerCount);
  $result->bindColumn(1,$totalRecord);
  $result->fetch();
  
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
        <div class="bestAnsSection">
                <div class="imgWrap"> <span>解答</span><img src="img/forum/character2.svg" alt="profile"/></div>
                <div class="ansSection">
                    <div class="ansContent">
                        <span>冠軍</span>
                        <span>最佳解答：</span>
                        <span>所在地下載想起招商完美種種內容依據素質那就廣播鼓勵兄弟，那是市政府外貿熱線探索，討論別人營銷鐵路，百萬法規足球青春，優點一名打印通訊由於改進給我行情機械道理起來回事東西液晶，首頁確定財經認真聲音更好可以說，行動校園開了天下最大，表達還能不多，小心世紀，是。</span>
                    </div>
                    <div class="aboutAns">
                        <a href="#">我是冠軍</a><span class="ansTIme">・ 2天前</span>
                    </div>
                    <div class="reportSection">
                        
                            <div class="commentBtn"><span>意見</span>
                          </div>
                        <div class="reportButton"><span>檢舉不當</span></div>
                    </div>
                </div>
        </div>
        <!-- <div class="otherAnsSection">
          <div class="imgWrap"><span>解答</span> <img src="img/forum/character2.svg" alt="profile" /></div>
          <div class="ansSection">
              <div class="ansContent">
                  <span><?=$memberAnsRow['ans_desc']?></span>
              </div>
              <div class="aboutAns">
                  <a href="#"><?=$memberAnsRow['a.mem_no']?></a><span class="ansTIme"><?=$memberAnsRow['a.time']?></span>
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
                 <select name="" id="">
                     <option value="1">外部廣告</option>
                     <option value="2">仇恨言語</option>
                     <option value="3">色情內容</option>
                 </select>
                 <button>確認</button>
          </div>
       </div>
       <!-- ------------------------- -->
      </div>
   <script>
      
    function $id(id) {
      return document.getElementById(id);
    }
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
            htmlStr+=`<div class="reportButton"><span>檢舉不當</span></div></div></div></div>`;
          //  ansSection.innerHTML = htmlStr;
          let element = $(htmlStr).get(0);
          let box = document.querySelector('.ansBoxWrap');
           let parentDiv = box.parentNode; 
           parentDiv.insertBefore(element,box);
          } 
           
           //let container = document.querySelector('.container');
          

    }
  }

    function getAnsList(){
        var xhr =new XMLHttpRequest();
        xhr.onload = function(){
          if(xhr.status ==200){
            console.log(xhr.responseText);
            showAnsList(xhr.responseText);
          }else{
            alert(xhr.status);
          }
        }//xhr.onload
        var url = "sendAns.php?no="+window.location.search.substr(4,5);
        xhr.open("Get", url, false);
        xhr.send( null );
      };
      //立即執行取得訊息的AJAX
      getAnsList();
    function sendToDB(e){
        let que_no=window.location.search.substr(4,5);
          console.log(que_no);
        let ans_desc = $('#ansDetail').val(); 
        console.log(que_no);
        //let form_data = $('#questionForm').serializeArray();
        //console.log(form_data);
       //let data_info= JSON.stringify(form_data)
        $.ajax({
          url:'sendAns.php',
          method:'POST',
          data: "&que_no="+que_no+"&ans_desc="+ans_desc,
          dataType:'JSON',
          success:
          function(data){
            if(data.error !=''){
              
            }
          }
        });
      }
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
 