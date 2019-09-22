
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
     //活動表單驗證圖片檔案格式
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
    function msgLightBox(msg){
      boxStr='';
      boxStr+=`<div class="lightBoxWrap"></div>`;
      boxStr+=`<div class="lightBox"><h2>${msg}</h2>`;
      boxStr+=` <div class="popup__icons dis-f fw-w">`;
      boxStr+=`</div><i class="closeBtn far fa-times-circle"></i></div>`;
      $('#questionSuccessLightBox').html(boxStr);
      $('#questionSuccessLightBox').fadeIn(100);
    }
    
    //顯示問題已送出燈箱
    function showQuestionSuccessBox(){
        $('#questionSuccessLightBox').fadeIn(100);
        $('#forumQAddWindow').fadeOut(100);
        $('#memStatusGEM').html(sessionStorage['mem_money']);
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
      // $("#eventForm").find(":input,textarea").each(function() {
      //   $(this).val("");
    // });
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
          $('.launch').on('click',function(){
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
        var fileData = $('#eventFile').prop('files')[0];   //取得上傳檔案屬性
        var formData = new FormData();  //建構new FormData()
        formData.append('file', fileData);  //吧物件加到file後面
        console.log($('#eventForm').serialize());
        let datasInfo=$('#eventForm').serialize();
       //另外要傳送的變數
       formData.append('dataInfo', $('#eventForm').serialize());
       console.log(formData);
       let mem_no=sessionStorage['mem_no'];
      
          $.ajax({
              url:`forumEventSend.php?${datasInfo}&mem_no=${mem_no}`,
              method:'POST',
              cache: false,
              contentType: false,
              processData: false,
              data: formData,
              dataType:'JSON',
              success:action(),
            });
          }
          function action(){
            $('#showLaunch').css('display','none')
           msgLightBox('活動創立成功');
           $('.closeBtn').click(function(){
            $('#questionSuccessLightBox').slideToggle();
           
        })
        $('.lightBoxWrap').click(function(){
            $('#questionSuccessLightBox').slideToggle();
        })
           getEventsList();
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
          console.log(EventsList[0][0].act_name);
          var htmlStr = " ";
          var newHtmlStr = '';
          var today = new Date();
      
          if (EventsList[0][0].act_no && EventsList[1][0].act_no ){
              htmlStr+=`<div class="askQ"><div class="yellowBtn launch">我要舉辦活動</div></div>`;
              htmlStr+=`<h3 class="forumTip"><div class="imgWrap"><img src="img/forum/eventTeamwork.png" alt="subtitle" /></div>這裡提供讓大家舉辦活動的space，會員可以報名參加，英文最高級的會員也可以創辦活動讓大家一同參與。</h3>`;
              htmlStr+=`<a href="forumEvent.html"><div class="eventBoard"><a href="forumEvent.php?no=${EventsList[0][0].act_no}"><div class="eventProfile">`;       
              htmlStr+=`<div class="imgWrap"> <img src="img/forum/bachelor.svg" alt="img" />`;
              htmlStr+=`<img src="img/forum/A.svg" alt="img" /><img src="img/forum/B.svg" alt="img" /><img src="img/forum/C.svg" alt="img" />`;
              htmlStr+=`</div><div class="imgWrap"></div><div class="hostName">舉辦會員：${EventsList[0][0].mem_name}</div>`;
              htmlStr+=`</div><div class="eventInfo"><div class="infoList"><ul>`;
              htmlStr+=`<li>張貼日期：${EventsList[0][0].act_publish}</li>`;
              htmlStr+=`<li>活動時間：${EventsList[0][0].act_date}</li>`;    
              htmlStr+=` <li>活動地點：${EventsList[0][0].act_place}</li>`;
              htmlStr+=`<li>活動名稱：${EventsList[0][0].act_name}</li>`;           
              htmlStr+=`<li>活動內容：${EventsList[0][0].act_detail}</li>`;
              htmlStr+=`<li>報名人數：${EventsList[0][0].act_min}人/${EventsList[0][0].act_max}人</li></ul></div></a>`;
              htmlStr+=`<div class="askQ"><div class="yellowBtn"><a href="forumEvent.php?no=${EventsList[0][0].act_no}">我要參加</a></div></div></div></a></div>`;
              htmlStr+=`<div class="waterfall">`;
            for(i=1;i<EventsList[0].length;i++){
              htmlStr +=`<div class="wrap"><div class="eventCard col-12 col-xl-4 col-md-6"><a href="forumEvent.php?no=${EventsList[0][i].act_no}"><div class="eventProfile">`;
              htmlStr +=`<div class="imgWrap"><img src="img/forum/bachelor.svg" alt="img" />`;
              htmlStr +=`<img src="img/forum/A.svg" alt="img"/><img src="img/forum/B.svg" alt="img"/><img src="img/forum/C.svg" alt="img"/></div>`;
              htmlStr +=`<div class="imgWrap"></div><div class="hostName">舉辦會員：${EventsList[0][i].mem_name}</div></div>`;
              htmlStr +=`<div class="eventInfo"><div class="infoList"><ul>`;
              htmlStr +=`<li>截止日期：${EventsList[0][i].act_due}</li><li>活動時間：${EventsList[0][i].act_date}</li>`;
              htmlStr +=`<li>活動地點： ${EventsList[0][i].act_place}</li><li>活動名稱：${EventsList[0][i].act_name}</li>`;
              htmlStr +=`<li>活動內容：${EventsList[0][i].act_detail}</li><li>報名人數：${EventsList[0][i].act_min}人/${EventsList[0][i].act_max}人</li></ul>`;
              htmlStr +=`</div><div class="askQ"><div class="yellowBtn"><a href="forumEvent.php?no=${EventsList[0][i].act_no}">我要參加</a></div>`;      
              htmlStr +=`</div></div></div></a></div>`;
            }htmlStr +=`</div>`;
            $('#eventLists').html(htmlStr);
              newHtmlStr+=`<div class="askQ"><div class="yellowBtn launch">我要舉辦活動</div></div>`;
              newHtmlStr+=`<h3 class="forumTip"><div class="imgWrap"><img src="img/forum/eventTeamwork.png" alt="subtitle" /></div>這裡提供讓大家舉辦活動的space，會員可以報名參加，英文最高級的會員也可以創辦活動讓大家一同參與。</h3>`;
              newHtmlStr+=`<a href="forumEvent.html"><div class="eventBoard"><a href="forumEvent.php?no=${EventsList[1][0].act_no}"><div class="eventProfile">`;       
              newHtmlStr+=`<div class="imgWrap"> <img src="img/forum/bachelor.svg" alt="img" />`;
              newHtmlStr+=` <img src="img/forum/A.svg" alt="img" /><img src="img/forum/B.svg" alt="img" /><img src="img/forum/C.svg" alt="img" />`;
              newHtmlStr+=`</div><div class="imgWrap"></div><div class="hostName">舉辦會員：${EventsList[1][0].mem_name}</div>`;
              newHtmlStr+=`</div><div class="eventInfo"><div class="infoList"><ul>`;
              newHtmlStr+=`<li>張貼日期：${EventsList[1][0].act_publish}</li>`;
              newHtmlStr+=`<li>活動時間：${EventsList[1][0].act_date}</li>`;    
              newHtmlStr+=`<li>活動地點：${EventsList[1][0].act_place}</li>`;
              newHtmlStr+=`<li>活動名稱：${EventsList[1][0].act_name}</li>`;           
              newHtmlStr+=`<li>活動內容：${EventsList[1][0].act_detail}</li>`;
              newHtmlStr+=`<li>報名人數：${EventsList[1][0].act_min}人/${EventsList[1][0].act_max}人</li></ul></div></a>`;
              newHtmlStr+=`<div class="askQ"><div class="yellowBtn"><a href="forumEvent.php?no=${EventsList[1][0].act_no}">我要參加</a></div></div></div></a></div>`;
              newHtmlStr+=`<div class="waterfall">`;
            for(i=1;i<EventsList[1].length;i++){
              newHtmlStr +=`<div class="wrap"><div class="eventCard col-12 col-xl-4 col-md-6"><a href="forumEvent.php?no=${EventsList[1][i].act_no}"><div class="eventProfile">`;
              newHtmlStr +=`<div class="imgWrap"><img src="img/forum/bachelor.svg" alt="img" />`;
              newHtmlStr +=`<img src="img/forum/A.svg" alt="img"/><img src="img/forum/B.svg" alt="img"/><img src="img/forum/C.svg" alt="img"/></div>`;
              newHtmlStr +=`<div class="imgWrap"></div><div class="hostName">舉辦會員：${EventsList[1][i].mem_name}</div></div>`;
              newHtmlStr +=` <div class="eventInfo"><div class="infoList"><ul>`;
              newHtmlStr +=`<li>截止日期：${EventsList[1][i].act_due}</li><li>活動時間：${EventsList[1][i].act_date}</li>`;
              newHtmlStr +=`<li>活動地點： ${EventsList[1][i].act_place}</li><li>活動名稱：${EventsList[1][i].act_name}</li>`;
              newHtmlStr +=`<li>活動內容：${EventsList[1][i].act_detail}</li><li>報名人數：${EventsList[1][i].act_min}人/${EventsList[1][i].act_max}人</li></ul>`;
              newHtmlStr +=`</div><div class="askQ"><div class="yellowBtn"><a href="forumEvent.php?no=${EventsList[1][i].act_no}">我要參加</a></div>`;      
              newHtmlStr +=`</div></div></div></a></div>`;
            }newHtmlStr +=`</div>`;
            $('#newEvent').html(newHtmlStr);
        }else{
      
        }
      };
      //AJAX取得資料庫資料
      function getEventsList(){
          var xhr = new XMLHttpRequest();
          xhr.onload = function(){
            if(xhr.status==200){
                showEventsList(xhr.responseText);
               // console.log(xhr.responseText)
              }else{
              alert(xhr.status)
          }
        }
        var url = 'forumEventSend.php';
        xhr.open("Get", url, false);
        xhr.send( null);
      }
      getEventsList();
      //取得會員問答資料
      function getMemberQnaList(){
        let memNo=sessionStorage['mem_no'];
        console.log(memNo)
        var xhr = new XMLHttpRequest();
        xhr.onload = function(){
          if(xhr.status==200){
              showMemberQnaList(xhr.responseText);
              console.log(xhr.responseText)
            }else{
            alert(xhr.status)
        }
      }
      var url = `getForumListJSON.php?mem_no=${memNo}`;
      xhr.open("Get", url, false);
      xhr.send( null);
    }
   
    
    //秀出會員問答資料
    function showMemberQnaList(jsonStr){
     
      var QnaList =JSON.parse(jsonStr);
      console.log(QnaList);
      function qnaTitle(){
        //先更新會員資訊
          document.querySelectorAll('.qnaProfileInfo.info .ansNum')[0].firstChild.innerHTML=`${QnaList[0][0].mem_name}`;
          document.querySelectorAll('.qnaProfileInfo.info .ansNum')[1].firstChild.innerHTML=`英文等級:${QnaList[0][0].level_no}`;
          document.querySelectorAll('.qnaProfileSection .info:last-child .bounty')[0].lastElementChild.innerHTML=`${QnaList[0][0].mem_money}`;
          document.querySelectorAll('.qnaProfileSection .info:last-child .ansNum')[0].firstChild.innerHTML=`${QnaList[0][0].que_no == null? 0:QnaList[0].length}`;
          document.querySelectorAll('.qnaProfileSection .info:last-child .ansNum')[1].firstChild.innerHTML=`${QnaList[1][0].ans_no == null? 0:QnaList[1].length}`;
        //再創造
        let askbtn= document.querySelectorAll('#tabMine .askQ')[0].cloneNode(true);
        let mineTitle= document.querySelectorAll('#tabMine .forumTip')[0].cloneNode(true);
        let mineBoard= document.querySelectorAll('#tabMine .qnaBoard')[0].cloneNode(true);
        let mineTab= document.querySelectorAll('#tabMine .tabGroup')[0].cloneNode(true);
        askbtn.style.display = "";
        mineTitle.style.display="";
        mineBoard.style.display="";
        mineTab.style.display="";
        $id('tabMine').appendChild(askbtn);
        $id('tabMine').appendChild(mineTitle);
        $id('tabMine').appendChild(mineBoard);
        $id('tabMine').appendChild(mineTab);
      }
      
      var noQStr= '';
      var noAStr= '';
      var questionStr = '';
      var answerStr = '';
     
        if(QnaList[0][0].que_no ==null && QnaList[1][0].ans_no ==null){
          //顯示暫無問答
          qnaTitle();//
          noQStr+= `<h3>《我的問題列表》</h3>`;
          noQStr+= `<h3>目前暫無任何問題發布</h3>`;
          noQStr+= `<div class="qnaListPage"></div>`;//問題
          $id('myQuestion').innerHTML=noQStr;
          $id('tabMine').appendChild($id('myQuestion'));
          noAStr+= `<h3>《我的回答列表》</h3>`;//回答
          noAStr+= `<h3>目前暫無任何問題發布</h3>`;
          noAStr+= `<div class="qnaListPage"></div>`;
          $id('myAnswer').innerHTML=noAStr;
          $id('tabMine').appendChild($id('myAnswer'));
        }else if(QnaList[0][0].que_no ==true && QnaList[1][0].ans_no ==null){
          //有問沒有回答
          qnaTitle();
          questionStr+= `<h3>《我的問題列表》</h3>`;
          for(let i=0;i<QnaList[0].length;i++){
           questionStr+= `<a href="forumQA.php?no=${QnaList[0][i].que_no}"><div class="qnaListContent"><div class="listWrap"><div class="info"><div class="bounty"><div class="imgWrap">`;
           questionStr+=`<img src="img/forum/money.svg" alt="money" /></div><span>${QnaList[0][i].money}</span>`;
           questionStr+=`</div><div class="ansNum"><span>0</span>回答</div></div></div>`;
           questionStr+=`<div class="questionTitle"><span class="qNum">Q${i+1}</span><h4>${QnaList[0][i].que_title}</h4>`;
           questionStr+=`<div class="listTimeNButton">
           <span id="ask" class="askTime">${QnaList[0][i].time}</span></div></div></div></a>`;
          }questionStr+= `<div class="qnaListPage"></div>`;
          $id('myQuestion').innerHTML=questionStr;
          $id('tabMine').appendChild($id('myQuestion'));
          noAStr+= `<h3>《我的回答列表》</h3>`;//回答
          noAStr+= `<h3>目前暫無任何問題發布</h3>`;
          noAStr+= `<div class="qnaListPage"></div>`;
          $id('myAnswer').innerHTML=noAStr;
          $id('tabMine').appendChild($id('myAnswer'));

        }else if(QnaList[0][0].que_no ==null && QnaList[1][0].ans_no ==true){
          //沒問有答
          qnaTitle();
          noQStr+= `<h3>《我的問題列表》</h3>`;
          noQStr+= `<h3>目前暫無任何問題發布</h3>`;
          noQStr+= `<div class="qnaListPage"></div>`;//問題
          $id('myQuestion').innerHTML=noQStr;
          $id('tabMine').appendChild($id('myQuestion'));
           answerStr += `<h3>《我的回答列表》</h3>`;
          for(let i=0;i<QnaList[1].length;i++){
           answerStr += `<a href="forumQA.php?no=${QnaList[1][i].que_no}"><div class="qnaListContent"><div class="listWrap"><div class="info"><div class="bounty"><div class="imgWrap">`;
           answerStr +=`<img src="img/forum/money.svg" alt="money" /></div><span>${QnaList[1][i].money}</span>`;
           answerStr +=`</div><div class="ansNum"><span>0</span>回答</div></div></div>`;
           answerStr +=`<div class="questionTitle"><span class="qNum">Q${i+1}</span><h4>${QnaList[1][i].que_title}</h4>`;
           answerStr +=`<div class="listTimeNButton">
           <span id="ask" class="askTime">${QnaList[1][i].time}</span></div></div></div></a>`;
          }answerStr += `<div class="qnaListPage"></div>`;
          $id('myAnswer').innerHTML=answerStr ;
          $id('tabMine').appendChild($id('myAnswer'));
        }else{
          //有問有答
          qnaTitle();
          questionStr+= `<h3>《我的問題列表》</h3>`;
          for(let i=0;i<QnaList[0].length;i++){
           questionStr+=`<a href="forumQA.php?no=${QnaList[0][i].que_no}">`
           questionStr+=`<div class="qnaListContent"><div class="listWrap"><div class="info"><div class="bounty"><div class="imgWrap">`;
           questionStr+=`<img src="img/forum/money.svg" alt="money" /></div><span>${QnaList[0][i].money}</span>`;
           questionStr+=`</div><div class="ansNum"><span>0</span>回答</div></div></div>`;
           questionStr+=`<div class="questionTitle"><span class="qNum">Q${i+1}</span><h4>${QnaList[0][i].que_title}</h4>`;
           questionStr+=`<div class="listTimeNButton">
           <span id="ask" class="askTime">${QnaList[0][i].time}</span></div></div></div></a>`;
          }questionStr+= `<div class="qnaListPage"></div>`;
          $id('myQuestion').innerHTML=questionStr;
          $id('tabMine').appendChild($id('myQuestion'));
         
          answerStr += `<h3>《我的回答列表》</h3>`;
          for(let i=0;i<QnaList[1].length;i++){
           answerStr +=`<a href="forumQA.php?no=${QnaList[1][i].que_no}"><div class="qnaListContent"><div class="listWrap"><div class="info"><div class="bounty"><div class="imgWrap">`;
           answerStr +=`<img src="img/forum/money.svg" alt="money" /></div><span>${QnaList[1][i].money}</span>`;
           answerStr +=`</div><div class="ansNum"><span>0</span>回答</div></div></div>`;
           answerStr +=`<div class="questionTitle"><span class="qNum">Q${i+1}</span><h4>${QnaList[1][i].que_title}</h4>`;
           answerStr +=`<div class="listTimeNButton"><span id="ask" class="askTime">${QnaList[1][i].time}</span></div></div></div></a>`;
          }answerStr += `<div class="qnaListPage"></div>`;
          $id('myAnswer').innerHTML=answerStr ;
          $id('tabMine').appendChild($id('myAnswer'));
        }//append(htmlStr)
    
    } 
    
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
 //點擊我的問答頁籤進行判定
 document.getElementById('memberQna').addEventListener('click',function(){
 if( sessionStorage['mem_no'] == null) {
   showLoginBox();
   $('#tabMine').css('padding','0');
   document.getElementById('tabMine').innerHTML='<h1 class="msgAdjsut">請登入會員</h1>'
 }else{
   //getMemberQnaList();
 }
 })
 //創立活動燈箱建立事件聆聽功能
 $('.launch').on('click',function(){
  sessionStorage['level_no'] == null ? showLoginBox(): eventLevelCheck()
 })
 function getMemberQna(){
  sessionStorage['mem_no'] == null?console.log('會員尚未登入'):getMemberQnaList();
}
getMemberQna();
       //顯示訊息燈箱....
      //  function msgInfoBox(msg){
      //    boxStr = '';
      //    boxStr +=`<div id="reportBox" class="infoBox">`;
      //    boxStr +=`<div class="reportBoxWrap"><h3>En-galaxy</h3>`
      //    boxStr +=`<a href="#" class="reportCancelBtn">X</a>`;
      //    boxStr +=`<h4>${msg}</h4>`;
      //    boxStr +=`<button id="reportCheck" class='checkBtn'>確認</button>`;
      //    boxStr +=`</div></div>`;
      //    this.parentNode.parentNode.parentNode.innerHTML = boxStr;
        
      //   }
       }//forumInit end

       //顯示問答黑板的訊息
       function showForumList(jsonStr){
         let ForumList =JSON.parse(jsonStr);
         //console.log(ForumList[1][0].que_title);
         let htmlStr = "";
         let htmlMoneyStr = "";
         if (ForumList[0][0].que_no && ForumList[1][0].que_no){//最熱門(最多人回答)
           let i=0;
           htmlStr+=`<div class="askQ"><div class="yellowBtn askQuestion">我要提問</div></div>`;
           htmlStr+=`<h3 class="forumTip"><div class="imgWrap"><img src="img/forum/qna.png" alt="subtitle" /></div>快來挑戰回答大家的提問，搶下懸賞金額成為一代英語大師～</h3>`;
           htmlStr+=`<a href="forumQA.php?no=${ForumList[0][0].que_no}"><div class="qnaBoard"><div class="info"><div class="bounty"><div class="imgWrap"><img src="img/forum/money.svg" alt="money" /></div>`;
           htmlStr+=` <span>${ForumList[0][0].money}</span></div><div class="ansNum"><span>${ForumList[0][0].ans_count}</span>回答</div><span id="ask" class="askTime">${ForumList[0][0].time}</span></div>`;
           htmlStr+=`<div class="qnaContent"><div class="questionTitle"><span class="qNum">Q${i + 1}</span><h4>${ForumList[0][0].que_title}</h4></div>`;
           htmlStr+=`<p class="hidden">${ForumList[0][0].que_desc==undefined ? '':ForumList[0][0].que_desc}</p></div><div class="profileImgWrap imgWrap info"><img src="img/forum/character.svg" alt="memberProfile"><div class="ansNum"><span>ID:${ForumList[0][0].set_nickname}</span></div>`;
           htmlStr+=`</div></div></a><div class="qnaList" id="questionPanel">`;
          
           for(i=1;i<ForumList[0].length;i++){ 
           htmlStr+=`<a href="forumQA.php?no=${ForumList[0][i].que_no}"><div class="qnaListContent">`;
           htmlStr+=`<div class="listWrap"><div class="imgWrap">`;
           htmlStr+=`<img src="img/forum/character.svg" alt="character" /></div><p>${ForumList[0][i].set_nickname}</p>`;
           htmlStr+=`<div class="info"><div class="bounty"><div class="imgWrap">`;
           htmlStr+=`<img src="img/forum/money.svg" alt="money"/></div>`;
           htmlStr+=`<span>${ForumList[0][i].money}</span></div>`;
           htmlStr+=`<div class="ansNum"><span>${ForumList[0][i].ans_count}</span>回答</div></div></div>`;
           htmlStr+=`<div class="questionTitle"><span class="qNum">Q${i + 1}</span>`;
           htmlStr+=`<h4>${ForumList[0][i].que_title}</h4>`;
           htmlStr+=`<div class="listTimeNButton"><span id="ask" class="askTime">${ForumList[0][i].time}</span>`;
           htmlStr+=`<div class="yellowBtn">挑戰回答</div></div></div>`;
           htmlStr+=`</div></a>`;
          //  let element = $(htmlStr).get(i);
          //  let greenButton = document.getElementsByClassName('gButton')[0]; 
          //  document.getElementById('questionPanel').insertBefore(element,greenButton);
         }htmlStr+=`</div>`;
         $('#tabMost').html(htmlStr);
     
         htmlMoneyStr+=`<div class="askQ"><div class="yellowBtn askQuestion">我要提問</div></div>`;
         htmlMoneyStr+=`<h3 class="forumTip"><div class="imgWrap"><img src="img/forum/qna.png" alt="subtitle" /></div>快來挑戰回答大家的提問，搶下懸賞金額成為一代英語大師～</h3>`;
         htmlMoneyStr+=`<a href="forumQA.php?no=${ForumList[1][0].que_no}"><div class="qnaBoard"><div class="info"><div class="bounty"><div class="imgWrap"><img src="img/forum/money.svg" alt="money" /></div>`;
         htmlMoneyStr+=` <span>${ForumList[1][0].money}</span></div><div class="ansNum"><span>${ForumList[1][0].ans_count}</span>回答</div><span id="ask" class="askTime">${ForumList[1][0].time}</span></div>`;
         htmlMoneyStr+=`<div class="qnaContent"><div class="questionTitle"><span class="qNum">Q${i + 1}</span><h4>${ForumList[1][0].que_title}</h4></div>`;
         htmlMoneyStr+=`<p class="hidden">${ForumList[1][0].que_desc==undefined ? '':ForumList[1][0].que_desc}</p></div><div class="profileImgWrap imgWrap info"><img src="img/forum/character.svg" alt="memberProfile"><div class="ansNum"><span>ID:${ForumList[1][0].set_nickname}</span></div>`;
         htmlMoneyStr+=`</div></div></a><div class="qnaList"id="questionExpensive">`;
         for(i=1;i<ForumList[1].length;i++){ 
          htmlMoneyStr+=`<a href="forumQA.php?no=${ForumList[1][i].que_no}"><div class="qnaListContent">`;
          htmlMoneyStr+=`<div class="listWrap"><div class="imgWrap">`;
          htmlMoneyStr+=`<img src="img/forum/character.svg" alt="character" /></div><p>${ForumList[1][i].set_nickname}</p>`;
          htmlMoneyStr+=`<div class="info"><div class="bounty"><div class="imgWrap">`;
          htmlMoneyStr+=`<img src="img/forum/money.svg" alt="money"/></div>`;
          htmlMoneyStr+=`<span>${ForumList[1][i].money}</span></div>`;
          htmlMoneyStr+=`<div class="ansNum"><span>${ForumList[1][i].ans_count}</span>回答</div></div></div>`;
          htmlMoneyStr+=`<div class="questionTitle"><span class="qNum">Q${i + 1}</span>`;
          htmlMoneyStr+=`<h4>${ForumList[1][i].que_title}</h4>`;
          htmlMoneyStr+=`<div class="listTimeNButton"><span id="ask" class="askTime">${ForumList[1][i].time}</span>`;
          htmlMoneyStr+=`<div class="yellowBtn">挑戰回答</div></div></div>`;
          htmlMoneyStr+=`</div></a>`;
          // let elementE = $(htmlMoneyStr).get(i);
          // let greenBtn = document.getElementsByClassName('btnWarp')[0]; 
          // document.getElementById('questionExpensive').insertBefore(elementE,greenBtn); 
         }htmlMoneyStr+=`</div>`;
         $('#tabHigh').html(htmlMoneyStr);

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
         let mem_no = sessionStorage['mem_no'];  
         let money = sessionStorage['mem_money'];
         console.log(que_money) ;
         $.ajax({
           url:'getForumListJSON.php',
           method:'POST',
           data: "&que_title="+que_title+"&que_desc="+que_desc+"&que_money="+que_money+"&mem_no="+mem_no+"&money="+money,
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
      
      
       window.addEventListener('load',forumInit);