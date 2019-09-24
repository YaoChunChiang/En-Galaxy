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
    let hostNo= $('#hostMember').attr('name').slice(6)
    let memstr = memRole(hostNo);
    $('#hostMember').html(memstr);
    }
  window.addEventListener('load',reportDoFirst);

  
  
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
   htmlStr +=`<div class="imgWrap">${memRole(EventsList[i].mem_no)}</div><div class="hostName">舉辦會員：${EventsList[i].mem_name}</div></div>`;
   htmlStr +=`<div class="eventInfo"><div class="infoList"><ul>`;
   htmlStr +=`<li>截止日期：${EventsList[i].act_due}</li><li>活動時間：${EventsList[i].act_date}</li>`;
   htmlStr +=`<li>活動地點： ${EventsList[i].act_place}</li><li>活動名稱：${EventsList[i].act_name}</li>`;
   htmlStr +=`<li>活動內容：${EventsList[i].act_detail}</li><li>報名人數：${EventsList[i].join_count==null?0:EventsList[i].join_count}人/${EventsList[i].act_max}人</li></ul>`;
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
   
// mem_no session
// act_no loaction

// Update activity set join_count=(SELECT count(*) FROM `activity_history` where act_no =2) where act_no=2;
// 報名活動
   $('#signEvent').on('click',function(){
     let mem_no= sessionStorage['mem_no'];
     let act_no= parseInt(window.location.search.replace('?no=',''));
     console.log('act_no')
     $.ajax({
        url:'forumEventSend.php',
        method:'POST',
        data: "&mem_no="+mem_no+"&act_no="+act_no,
        dataType:'JSON',
        success:alertBoxShow('活動報名成功','通知','navy'),
       
     })
   });


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