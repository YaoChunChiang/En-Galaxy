
     function $id(id){
     return document.getElementById(id);
         }
     //取得檔案資料
     function getFileInfo(filestr){
         let dotPos =filestr.lastIndexOf('.');
         let fileName = filestr.substring(0,dotPos);
         let fileExt =filestr.substr(dotPos+1);
         //回傳一個陣列
         let file={
             name:fileName,
             ext:fileExt
         };return file;
     }
     //活動表單驗證檔案格式
     window.addEventListener('load',function(){
        $id('eventFile').onchange = function(e){
            //檔案格式規定如下
            let fileAccepts=["png","gif","svg","jpg"];
            let fileInfo = getFileInfo(this.value);
            console.log(this.value);
            if(fileAccepts.indexOf(fileInfo.ext.toLowerCase()) == -1){
                alert("檔案格式不對");
                e.target.value = "";
            }else{
                let file = this.files[0];
                let reader = new FileReader();
                console.log(reader);
                reader.onload = function(){
                    $id('eventImg').src = reader.result;
                    $id('eventImg').style.maxWidth = '200px';
                    $id('eventImg').style.maxHeight = '200px';
                    console.log(reader.result);  
                }
                reader.readAsDataURL(file);
            }
        }
    })
    //顯示問題已送出燈箱
    function showQuestionSuccessBox(){
        $('#questionSuccessLightBox').fadeIn(100);
    }
    function forumInit(){
      //顯示註冊/登入燈箱
      function showLoginBox(){
          $('#loginBox').fadeIn(100);
      }
      //提問表單驗證
      function checkForm(){
        if($id('que_title').value == ''){
          console.log($id('que_title').value)
          alert('要輸入標題');
          $id('que_title').focus();
          return true;
        }
        if($id('que_desc').value == ''){
          alert('要輸入問題描述');
          $id('que_desc').focus();
          return true;
        }
        if($id('que_money').value == ''){
          alert('要決定問題的懸賞金');
          $id('que_money').focus();
          return true;
        }else if(parseInt($id('que_money').value) - parseInt( sessionStorage.getItem('mem_money'))>0){
          alert('沒有足夠的錢喔喔喔');
          $id('que_money').value='';
          $id('que_money').focus();
          return true;
        }else{
          let leftMoney =parseInt( sessionStorage.getItem('mem_money')) - parseInt($id('que_money').value);
          sessionStorage.setItem('mem_money',leftMoney);
        }//記得透過ajax將剩下的錢傳回資料庫
        sendToDB();
        let questionFormInfo = document.querySelectorAll('#questionForm textarea,#questionForm input');
        for(let i = 0; i < questionFormInfo.length;i++){
           questionFormInfo[i].value='';
      }
    }
      //活動表單驗證
      function checkEventForm(){
        if($id('act_name').value == ''){
          alert('要輸入活動名稱');
          $id('act_name').focus();
          return true;
        }
        if($id('act_place').value == ''){
          alert('要輸入活動地點');
          $id('act_place').focus();
          return true;
        }
        if($id('act_date').value == ''){
          alert('要輸入活動日期');
          $id('act_date').focus();
          return true;
        }
        if($id('act_due').value == ''){
          alert('要輸入報名截止日期');
          $id('act_due').focus();
          return true;
        }
        if($id('act_min').value == ''){
          alert('要輸入活動人數');
          $id('act_min').focus();
          return true;
        }
        if($id('level_no').value == ''){
          alert('要輸入活動等級');
          $id('level_no').focus();
          return true;
        }
        if($id('eventFile').value == ''){
          alert('要上傳活動圖片');
          $id('eventFile').focus();
          return true;
        }
        if($id('actInfo').value == ''){
          alert('請輸入活動詳情');
          $id('actInfo').focus();
          return true;
        }
        activitySendToDB();
        
        $('#actFormBtn').click(function () {
          $('#showLaunch').slideToggle();
      })
      $("#eventForm").find(":input,textarea").each(function() {
        $(this).val("");
    });
      }
      //判斷會員有錢否
      function questionMoneyCheck(){
        let memMoney = parseInt( sessionStorage.getItem('mem_money'));
        if(memMoney > 0){
          console.log($id('que_title').value)
          document.getElementById('questionAdd').addEventListener('click',checkForm);
        }else{
          alert('沒錢啦')
            $('#forumQAddWindow').css('display','none');
        }
      }
      //判斷會員等級
      function eventLevelCheck(){
        let memLevel =  parseInt( sessionStorage.getItem('level_no'));
        if(memLevel >= 3){
          document.getElementById('launch').addEventListener('click',function(){
            $('#showLaunch').slideToggle();
           
          })
          $id('actFormBtn').addEventListener('click',checkEventForm)
        }else{
          alert('等級不夠再練練')
          $('#showLaunch').css('display','none');
        }
      }
     
     
     document.getElementById('eventFile').addEventListener('change',showImg);
    

     //提問燈箱新增按鈕建立事件聆聽功能
     let questionBtn =document.querySelectorAll('.askQuestion');
     for(let i = 0; i < questionBtn.length;i++){
        questionBtn[i].addEventListener('click',function(){
            sessionStorage['mem_no'] == null ? showLoginBox() : questionMoneyCheck()
            //檢驗
        })
     }
    
    //活動燈箱的顯示檔案圖片
     function showImg(){
     let file =document.getElementById('eventFile').files[0];
     let readFile =new FileReader();
     readFile.readAsDataURL(file);

     readFile.addEventListener('load',()=>{
     let image=document.getElementById('eventImg');
     image.src=readFile.result;
     image.style.maxWidth = '200px';
     image.style.maxHeight = '200px';
        })
     }
      //jQuery的tab功能 
     $('.tabGroup').each(function(){
         var $this =$(this);
         var $tab = $this.find('.tab.active');
         var $link = $tab.find('a');
         var $panel = $($link.attr('href'));
         $this.on('click','a',function(e){
             e.preventDefault();
             let $link = $(this);
             let id =this.hash;
             //console.log(id);
             if(id && !$link.is('.active')){
                 $panel.removeClass('active');
                 $tab.removeClass('active');
 
                 $panel=$(id).addClass('active');
                     $tab = $link.parent().addClass('active');
             }
         })
     })
     
    //TweenMax--animation
    let controller = new ScrollMagic.Controller();
    let animation = TweenLite.to('.imgAstronaut', 2, {
         ease: SlowMo.ease.config(0.7, 0.7, false),
         x: -1500,
         y:-200,
         opacity:0.1,
         repeat:-1,yoyo:true
     });
    
    let scene = new ScrollMagic.Scene({
     triggerElement: '#trigger_01', //觸發點
     reverse :false, 
     duration :'80%',//距離
     offset :' -300px'//偏移上方距離
      }).setTween(animation).addTo(controller) 

 
        //寫入資料到activity
       function activitySendToDB(){
          console.log($('#eventForm').serialize());
          $.ajax({
              url:'forumEventSend.php',
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
          }
      
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
              htmlStr+=`<a href="forumEvent.html"><div class="eventBoard"><a href="forumEvent.php?no=${EventsList[0].act_no}"><div class="eventProfile">`;       
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
              htmlStr+=`<div class="askQ"><div class="yellowBtn"><a href="forumEvent.php?no=${EventsList[0].act_no}">我要參加</a></div></div></div></a></div>`;
              htmlStr+=`<div class="waterfall">`;
            for(i=1;i<EventsList.length;i++){
              htmlStr +=`<div class="wrap"><div class="eventCard col-12 col-xl-4 col-md-6"><a href="forumEvent.php?no=${EventsList[i].act_no}"><div class="eventProfile">`;
              htmlStr +=`<div class="imgWrap"><img src="img/forum/bachelor.svg" alt="img" />`;
              htmlStr +=`<img src="img/forum/A.svg" alt="img"/><img src="img/forum/B.svg" alt="img"/><img src="img/forum/C.svg" alt="img"/></div>`;
              htmlStr +=`<div class="imgWrap"></div><div class="hostName">舉辦會員：${EventsList[i].mem_name}</div></div>`;
              htmlStr +=` <div class="eventInfo"><div class="infoList"><ul>`;
              htmlStr +=`<li>截止日期：${EventsList[i].act_due}</li><li>活動時間：${EventsList[i].act_date}</li>`;
              htmlStr +=`<li>活動地點： ${EventsList[i].act_place}</li><li>活動名稱：${EventsList[i].act_name}</li>`;
              htmlStr +=`<li>活動內容：${EventsList[i].act_detail}</li><li>報名人數：${EventsList[i].act_min}人/${EventsList[i].act_max}人</li></ul>`;
              htmlStr +=`</div><div class="askQ"><div class="yellowBtn"><a href="forumEvent.php?no=${EventsList[i].act_no}">我要參加</a></div>`;      
              htmlStr +=`</div></div></div></a></div>`;
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
        var url = 'forumEventSend.php';
        xhr.open("Get", url, false);
        xhr.send( null);
      }
      getEventsList();

 //創立活動燈箱建立事件聆聽功能
 document.getElementById('launch').addEventListener('click',function(){
  sessionStorage['level_no'] == null ? showLoginBox(): eventLevelCheck()
 })

       //顯示訊息燈箱....
       function msgInfoBox(msg){
         boxStr = '';
         boxStr +=`<div id="reportBox" class="infoBox">`;
         boxStr +=`<div class="reportBoxWrap"><h3>En-galaxy</h3>`
         boxStr +=`<a href="#" class="reportCancelBtn">X</a>`;
         boxStr +=`<h4>${msg}</h4>`;
         boxStr +=`<button id="reportCheck" class='checkBtn'>確認</button>`;
         boxStr +=`</div></div>`;
         this.parentNode.parentNode.parentNode.innerHTML = boxStr;
        
        }
       }//forumInit end

       //顯示問答黑板的訊息
       function showForumList(jsonStr){
         let ForumList =JSON.parse(jsonStr);
         console.log(ForumList[0].que_title);
         let htmlStr = "";
         if (ForumList[0].que_no){
           let i=0;
           for(i=0;i<ForumList.length;i++){ 
           htmlStr+=`<div class="qnaListContent"><a href="forumQA.php?no=${ForumList[i].que_no}">`;
           htmlStr+=`<div class="listWrap"><div class="imgWrap">`;
           htmlStr+=`<img src="img/forum/character.svg" alt="character" /></div><p>${ForumList[i].set_nickname}</p>`;
           htmlStr+=`<div class="info"><div class="bounty"><div class="imgWrap">`;
           htmlStr+=`<img src="img/forum/money.svg" alt="money"/></div>`;
           htmlStr+=`<span>${ForumList[i].money}</span></div>`;
           htmlStr+=`<div class="ansNum"><span>0</span>回答</div></div></div>`;
           htmlStr+=`<div class="questionTitle"><span class="qNum">Q${i + 1}</span>`;
           htmlStr+=`<a href="#"><h4>${ForumList[i].que_title}</h4></a>`;
           htmlStr+=`<div class="listTimeNButton"><span id="ask" class="askTime">${ForumList[i].time}</span>`;
           htmlStr+=`<div class="yellowBtn">挑戰回答</div></div></div>`;
           htmlStr+=`</div></a>`;
           let element = $(htmlStr).get(i);
           let greenButton = document.getElementsByClassName('gButton')[0]; 
           document.getElementById('questionPanel').insertBefore(element,greenButton); 
         } 
       }else{
           htmlStr+=`<div class="listWrap"><div class="imgWrap">`;
           htmlStr+=`<img src="img/forum/character.svg" alt="character" /></div>`;
           htmlStr+=`<div class="questionTitle"><span class="qNum"></span>`;
           htmlStr+=`<a href="#"><h4>暫無新問題發布</h4></a>`;
           htmlStr+=`<div class="listTimeNButton"><span id="ask" class="askTime"></span>`;
           htmlStr+=`<div class="yellowBtn">挑戰回答</div></div></div></div>`;
         }
         
       }
      //AJAX取得資料庫資料
       function getForumList(){
         var xhr =new XMLHttpRequest();
         xhr.onload = function(){
           if(xhr.status ==200){
             //console.log(xhr.responseText);
             showForumList(xhr.responseText);
           }else{
             alert(xhr.status);
           }
         }//xhr.onload
         var url = "getForumListJSON.php";
         xhr.open("Get", url, false);
         xhr.send( null );
       };
       //立即執行取得訊息的AJAX
       getForumList();
 
       //寫入資料到member_question
       function sendToDB(e){
         let que_title= $('#que_title').val();        
         let que_desc = $('#que_desc').val(); 
         let que_money = $('#que_money').val();  
         console.log(que_money) ;
         $.ajax({
           url:'getForumListJSON.php',
           method:'POST',
           data: "&que_title="+que_title+"&que_desc="+que_desc+"&que_money="+que_money,
           dataType:'JSON',
           success:showQuestionSuccessBox()
         });
         getForumList();
        //  document.getElementById('questionAdd').addEventListener('click',() =>{
        // let msg ='提問成功';
        //  boxStr = '';
        //  boxStr +=`<div id="reportBox" class="infoBox">`;
        //  boxStr +=`<div class="reportBoxWrap"><h3>En-galaxy</h3>`
        //  boxStr +=`<a href="#" class="reportCancelBtn">X</a>`;
        //  boxStr +=`<h4>${msg}</h4>`;
        //  boxStr +=`<button id="reportCheck" class='checkBtn'>確認</button>`;
        //  boxStr +=`</div></div>`;
        //  this.parentNode.parentNode.parentNode.parentNode.innerHTML =  boxStr;
        //  })
        //  console.log(this.parentNode.parentNode.parentNode);
        
       }
       //建立我要提問->新增按鈕的事件
      
       window.addEventListener('load',forumInit);