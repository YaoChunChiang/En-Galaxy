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
        <div class="imgWrap"></div>
        <div class="hostName">舉辦會員：<?=$memberActRow['mem_name']?></div>
        <div class="contactButton"><a href="<?=$memberActRow['mem_email']?>">聯絡主辦人</a></div>
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
            <div class="wrap">
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
            <div class="wrap">
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
            </div> -->
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
    <script>
    function $id(id) {
      return document.getElementById(id);
    }
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
    window.addEventListener('load',reportDoFirst);

    </script>
    <script>
    
    var controller = new ScrollMagic.Controller();
    var animation = TweenMax.to('.eventBgImg', 1, {
    y: -1000,
 
});

var scene = new ScrollMagic.Scene({
    triggerElement: '#trigger_01', //觸發點
     reverse :true, 
    duration :'70%',//距離
    offset :'200px'//偏移上方距離
}).setTween(animation).addTo(controller);

$(document).ready(function(){

//寫入資料到activity
$('#actFormBtn').click(function(){
 console.log($('#eventForm').serialize());
 $.ajax({
     url:'eventImgUpload.php',
     method:'POST',
     data: "&"+$('#eventForm').serialize(),
     dataType:'JSON',
     success:
     function(data){
       if(data.status =='success'){
         alert(data.message)
         clearInputs();
         getEventsList();
       }
     }
   });
});

 function clearInputs(){
     $('#eventForm :input').each(function(){
         $(this).val('');
     })
 }   
  
$('#eventForm').submit(function(){
   return false;
});
//AJAX取得資料庫資料
function getEventsList(){
 var xhr = new XMLHttpRequest();
 xhr.onload = function(){
   if(xhr.status==200){
       console.log(xhr.responseText)
       showEventsList(xhr.responseText);
     }else{
     alert(xhr.status)
 }
}
let no =parseInt(window.location.search.replace('?no=',''));
var url = `forumEventSend.php?no=${no}`;
xhr.open("Get", url, false);
xhr.send( null );
}
getEventsList();
function showEventsList(jsonStr){
 var EventsList =JSON.parse(jsonStr);
 console.log(EventsList[0].act_name);
 var htmlStr = " ";
 var today = new Date();
 htmlStr+=`<div class="waterfall">`;
 if (EventsList[0].act_no){
   for(i=0;i<EventsList.length;i++){
     htmlStr +=`<div class="wrap"><div class="eventCard "><div class="eventProfile">`;
     htmlStr +=`<div class="imgWrap"><img src="img/forum/bachelor.svg" alt="img" />`;
     htmlStr +=`<img src="img/forum/A.svg" alt="img"/><img src="img/forum/B.svg" alt="img"/><img src="img/forum/C.svg" alt="img"/></div>`;
     htmlStr +=`<div class="imgWrap"></div><div class="hostName">舉辦會員：${EventsList[i].mem_name}</div></div>`;
     htmlStr +=`<div class="eventInfo"><div class="infoList"><ul>`;
     htmlStr +=`<li>截止日期：${EventsList[i].act_due}</li><li>活動時間：${EventsList[i].act_date}</li>`;
     htmlStr +=`<li>活動地點： ${EventsList[i].act_place}</li><li>活動名稱：${EventsList[i].act_name}</li>`;
     htmlStr +=`<li>活動內容：${EventsList[i].act_detail}</li><li>報名人數：${EventsList[i].join_count}人/${EventsList[i].act_max}人</li></ul>`;
     htmlStr +=`</div><div class="askQ"><div class="yellowBtn"><a href="forumEvent.php?no=${EventsList[i].act_no}">我要參加</a></div>`;      
     htmlStr +=`</div></div></div></div>`;
     //let elementEvent = $(htmlStr).get(i);
    //$('#eventLists').append(elementEvent);
   }htmlStr+=`</div>`;;
   //let element= $(htmlStr).get(0)
   $('#eventLists').html(htmlStr);
   
    
}else{

}
};

});

var storage = sessionStorage;
    //將ans_no存入session
     function report(no){
      var storage = sessionStorage;
      if (storage['reportList'] == null) {
        storage.setItem('reportList', no)
        //storage.setItem('reportList', no);
    }
    let lists = document.querySelectorAll('.reportButton');
    for (let i = 0; i < lists.length; i++) {
        lists[i].addEventListener('click', function () {
            let reportNo = this.getAttribute('name');
            console.log(reportNo);
            storage.setItem('reportList', no);
        })
     }
     }
  
  
    $('#reportSendBtn').click(function reportMessage(){
      let reportReason = $("select[name='reportMessage']").val();
      console.log(reportReason);
      let mem_no=0;
      storage.getItem('mem_no')?mem_no =storage.getItem('mem_no'):mem_no=1;
     
      let reportType =storage.getItem('reportList').substring(0,3);
      //console.log(reportType);
      let reportNo = storage.getItem('reportList').slice(6)
      //console.log(reportNo);
      switch (reportType) {
        case "ans":
          $.ajax({
        url:'reportSendDB.php',
        method:'POST',
        data: "&ans_no="+reportNo+"&reason="+reportReason+"&mem_no="+mem_no,
        dataType:'JSON',
        success:afterReport(),
       
      });
          break;
        case "que":
        $.ajax({
        url:'reportSendDB.php',
        method:'POST',
        data: "&que_no="+reportNo+"&reason="+reportReason+"&mem_no="+mem_no,
        dataType:'JSON',
        success:afterReport(),
      });
          break;
        case "act":
        $.ajax({
        url:'reportSendDB.php',
        method:'POST',
        data: "&act_no="+reportNo+"&reason="+reportReason+"&mem_no="+mem_no,
        dataType:'JSON',
        success:afterReport(),
      });
      function afterReport() {
        storage.removeItem('reportList');
            alert('檢舉已送出');
      }
          break;
      }
      
    });
      
    </script>