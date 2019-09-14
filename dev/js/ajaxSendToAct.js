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
  function showEventsList(jsonStr){
    var EventsList =JSON.parse(jsonStr);
    console.log(EventsList[0].act_name);
    var htmlStr = " ";
    var today = new Date();

    if (EventsList[0].act_no){
        htmlStr+=`<div class="askQ"><div class="yellowBtn" id="launch">我要舉辦活動</div></div>`;
        htmlStr+=`<h3 class="forumTip"><div class="imgWrap"><img src="img/forum/eventTeamwork.png" alt="subtitle" /></div>這裡提供讓大家舉辦活動的space，會員可以報名參加，英文最高級的會員也可以創辦活動讓大家一同參與。</h3>`;
        htmlStr+=`<a href="forumEvent.html"><div class="eventBoard"><div class="eventProfile">`;       
        htmlStr+=`<div class="imgWrap"> <img src="img/forum/bachelor.svg" alt="img" />`;
        htmlStr+=` <img src="img/forum/A.svg" alt="img" /><img src="img/forum/B.svg" alt="img" /><img src="img/forum/C.svg" alt="img" />`;
        htmlStr+=`</div><div class="imgWrap"></div><div class="hostName">舉辦會員：${EventsList[0].mem_name}</div>`;
        htmlStr+=`</div><div class="eventInfo"><div class="infoList"><ul>`;
        htmlStr+=`<li>張貼日期：${today.getDay()}</li>`;
        htmlStr+=`<li>活動時間：${EventsList[0].act_date}</li>`;    
        htmlStr+=` <li>活動地點：${EventsList[0].act_place}</li>`;
        htmlStr+=`<li>活動名稱：${EventsList[0].act_name}</li>`;           
        htmlStr+=`<li>活動內容：${EventsList[0].act_detail}</li>`;
        htmlStr+=`<li>報名人數：${EventsList[0].act_min}人/${EventsList[0].act_max}人</li></ul></div></a>`;
        htmlStr+=`<div class="askQ"><div class="yellowBtn"><a href="forumEvent.html">我要參加</a></div></div></div></div>`;
        htmlStr+=`<div class="waterfall">`;
      for(i=1;i<EventsList.length;i++){
        htmlStr +=`<div class="wrap"><div class="eventCard col-12 col-xl-4 col-md-6">`;
        htmlStr +=`<div class="eventProfile"><div class="imgWrap"><img src="img/forum/bachelor.svg" alt="img" />`;
        htmlStr +=`<img src="img/forum/A.svg" alt="img"/><img src="img/forum/B.svg" alt="img"/><img src="img/forum/C.svg" alt="img"/>`;
        htmlStr +=`</div><div class="imgWrap"></div>`;
        htmlStr +=`<div class="hostName">舉辦會員：${EventsList[i].mem_name}</div></div>`;
        htmlStr +=`<div class="eventInfo"><div class="infoList"><ul>`;
        htmlStr +=`<li>截止日期：${EventsList[i].act_due}</li>`;
        htmlStr +=`<li>活動時間：${EventsList[i].act_date}</li>`;
        htmlStr +=`<li>活動地點： ${EventsList[i].act_place}</li>`;
        htmlStr +=`<li>活動名稱：${EventsList[i].act_name}</li>`;
        htmlStr +=`<li>活動內容：${EventsList[i].act_detail}</li>`;
        htmlStr +=`<li>報名人數：${EventsList[i].act_min}人/${EventsList[i].act_max}人</li>`;
        htmlStr +=`</ul></div><div class="askQ"><div class="yellowBtn">我要參加</div></div>`;       
        htmlStr +=`</div></div></div>`;
       }htmlStr +=`</div>`;
       $('#eventLists').html(htmlStr);
  }else{

  }
};
//AJAX取得資料庫資料
function getEventsList(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
      if(xhr.status==200){
          showEventsList(xhr.responseText);
        }else{
        alert(xhr.status)
    }
  }
  var url = 'eventImgUpload.php';
  xhr.open("Get", url, false);
  xhr.send( null );
}
getEventsList();


});
    