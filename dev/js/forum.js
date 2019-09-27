
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
              alertBoxShow("檔案格式不對",'注意');
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
        
          alertBoxShow('要輸入標題','注意');
          $id('que_title').focus();
          return true;
        }
        if($id('que_desc').value == ''){
          alertBoxShow('要輸入問題描述','注意');
          $id('que_desc').focus();
          return true;
        }
        if($id('que_money').value == ''){
          alertBoxShow('要決定問題的懸賞金','注意');
          $id('que_money').focus();
          return true;
        }else if(parseInt($id('que_money').value) - parseInt( sessionStorage.getItem('mem_money'))>0){
          alertBoxShow('你已經沒有足夠的錢喔','注意');
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
           $id('forumQAddWindow').style.display='none';
      }
    }
      //活動表單驗證
      function checkEventForm(){
        if($id('act_name').value == ''){
          alertBoxShow('要輸入活動名稱','注意');
          $id('act_name').focus();
          return true;
        }
        if($id('act_place').value == ''){
          alertBoxShow('要輸入活動地點','注意');
          $id('act_place').focus();
          return true;
          
        }
        if($id('act_date').value == ''){
          alertBoxShow('要輸入活動日期','注意');
          $id('act_date').focus();
          return true;
        }
          let inputDate=$id('act_date').value;
          let d = new Date(); 
          let month = d.getMonth()+1; 
          let day = d.getDate() + 2; 

          let currentDate = d.getFullYear() + '/' + 
          (month<10 ? '0' : '') + month + '/' + 
          (day<10 ? '0' : '') + day;
       
          if((Date.parse(inputDate)).valueOf()<(Date.parse(currentDate)).valueOf()){
            alertBoxShow(`${inputDate}不能選過去和今天的日期`,'注意');
            $id('act_date').focus();
            return true;
          }
        if($id('act_due').value == ''){
          alertBoxShow('要輸入報名截止日期','注意');
          $id('act_due').focus();
          return true;
        }
          let  inputDueDate=$id('act_due').value;
          if((Date.parse(inputDueDate)).valueOf()>(Date.parse(inputDate)).valueOf()){
            alertBoxShow(`${inputDueDate}，報名截止日必須選在活動日期前`);
            $id('act_due').focus();
            return true;
          }
        
        if($id('act_min').value == ''){
          alertBoxShow('要輸入活動人數','注意');
          $id('act_min').focus();
          return true;
        }
        
        if($id('eventFile').value == ''){
          alertBoxShow('要上傳活動圖片','注意');
          $id('eventFile').focus();
          return true;
        }
        if($id('actInfo').value == ''){
          alertBoxShow('請輸入活動詳情','注意');
          $id('actInfo').focus();
          return true;
        }
        activitySendToDB();
        
        $('#actFormBtn').click(function () {
          $('#showLaunch').slideToggle();
      })
      
      }
      //判斷會員有錢否
      function questionMoneyCheck(){
        let memMoney = parseInt( sessionStorage.getItem('mem_money'));
        if(memMoney > 0){
          console.log($id('que_title').value)
          document.getElementById('questionAdd').addEventListener('click',checkForm);
        }else{
          alertBoxShow('已經沒錢啦','注意')
            $('#forumQAddWindow').css('display','none');
        }
      }
      //判斷會員等級
      function eventLevelCheck(){
        let memLevel =  parseInt( sessionStorage.getItem('level_no'));
        if(memLevel >= 3){
          $('.launch').on('click',function(){
            $('#showLaunch').fadeIn(200);
          });
          $('.closeShow').click(function () {
            $('#showLaunch').fadeOut(100);
        })

          $id('actFormBtn').addEventListener('click',checkEventForm)
        }else{
          alertBoxShow('等級不夠再練練,要達到最高等才能創辦活動','注意');
          $('#showLaunch').css('display','none');
        }
      }
     
     
    

     //提問燈箱新增按鈕建立事件聆聽功能
     let questionBtn =document.querySelectorAll('.askQuestion');
     for(let i = 0; i < questionBtn.length;i++){
        questionBtn[i].addEventListener('click',function(){
            sessionStorage['mem_no'] == null ? showLoginBox() : questionMoneyCheck()
            
        })
     }
     document.getElementById('eventFile').addEventListener('change',showImg);
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
           alertBoxShow('活動創立成功','通知','navy');
            location.reload();
           getEventsList();
       }
            
          
        $('#eventForm').submit(function(){
            return false;
        });
        function showEventsList(jsonStr){
          var EventsList =JSON.parse(jsonStr);
          //console.log(EventsList[0][0].act_name);
          var htmlStr = " ";
          var newHtmlStr = '';
          var today = new Date();
          if (EventsList[0][0].act_no && EventsList[1][0].act_no ){
            $id('topEventBoard').innerHTML=`<div class="eventProfile">      
            <div class="imgWrap"><img src="img/forum/bachelor.svg" alt="img" />
            <img src="img/forum/A.svg" alt="img" /><img src="img/forum/B.svg" alt="img" /><img src="img/forum/C.svg" alt="img" />
            </div><div class="imgWrap topOneMember">${memRole(EventsList[0][0].mem_no)}</div><div class="hostName">舉辦會員：${EventsList[0][0].mem_name}</div>
            </div></div><div class="eventInfo"><div class="infoList"><ul>
            <li>張貼日期：${EventsList[0][0].act_publish}</li>
            <li>活動時間：${EventsList[0][0].act_date}</li><li>活動地點：${EventsList[0][0].act_place}</li>
            <li>活動名稱：${EventsList[0][0].act_name}</li><li>活動內容：${EventsList[0][0].act_detail}</li>
            <li>報名人數：${EventsList[0][0].join_count}人/${EventsList[0][0].act_max}人</li></ul></div>
            <div class="askQ"><div class="yellowBtn"><a href="forumEvent.php?no=${EventsList[0][0].act_no}">我要參加</a></div>
            </div>
          </div>
        </div>`;
            for(i=1;i<EventsList[0].length;i++){
              htmlStr +=`<div class="wrap">
            <div class="eventCard col-12 col-xl-4 col-md-6">
              <div class="eventProfile">
                <div class="imgWrap"><img src="img/forum/bachelor.svg" alt="img" />
            <img src="img/forum/A.svg" alt="img"/>
            <img src="img/forum/B.svg" alt="img"/>
            <img src="img/forum/C.svg" alt="img"/></div>
                <div class="imgWrap">${memRole(EventsList[0][i].mem_no)}</div>
                <div class="hostName">舉辦會員：${EventsList[0][i].mem_name}</div>
              </div>
              <div class="eventInfo">
                <div class="infoList">
                  <ul>
              <li>張貼日期：${EventsList[0][i].act_publish}</li>
             <li>活動時間：${EventsList[0][i].act_date}</li><li>活動地點：${EventsList[0][i].act_place}</li>
            <li>活動名稱：${EventsList[0][i].act_name}</li><li>活動內容：${EventsList[0][i].act_detail}</li>
            <li>報名人數：${EventsList[0][i].join_count}人/${EventsList[0][i].act_max}人</li></ul>
                </div>
                <div class="askQ">
                  <div class="yellowBtn"><a href="forumEvent.php?no=${EventsList[0][i].act_no}">我要參加</a></div>
                </div>
              </div>
            </div>
          </div>`
            }$('#topEventList').html(htmlStr);
             $id('newEventBoard').innerHTML=`<div class="eventProfile">      
            <div class="imgWrap"><img src="img/forum/bachelor.svg" alt="img" />
            <img src="img/forum/A.svg" alt="img" /><img src="img/forum/B.svg" alt="img" /><img src="img/forum/C.svg" alt="img" />
            </div><div class="imgWrap topOneMember">${memRole(EventsList[1][0].mem_no)}</div><div class="hostName">舉辦會員：${EventsList[1][0].mem_name}</div>
            </div></div><div class="eventInfo"><div class="infoList"><ul>
            <li>張貼日期：${EventsList[1][0].act_publish}</li>
            <li>活動時間：${EventsList[1][0].act_date}</li><li>活動地點：${EventsList[1][0].act_place}</li>
            <li>活動名稱：${EventsList[1][0].act_name}</li><li>活動內容：${EventsList[1][0].act_detail}</li>
            <li>報名人數：${EventsList[1][0].join_count}人/${EventsList[1][0].act_max}人</li></ul></div>
            <div class="askQ"><div class="yellowBtn"><a href="forumEvent.php?no=${EventsList[1][0].act_no}">我要參加</a></div>
            </div>
          </div>
        </div>`
            
            for(i=1;i<EventsList[1].length;i++){
              newHtmlStr +=`<div class="wrap">
              <div class="eventCard col-12 col-xl-4 col-md-6">
                <div class="eventProfile">
                  <div class="imgWrap"><img src="img/forum/bachelor.svg" alt="img" />
              <img src="img/forum/A.svg" alt="img"/>
              <img src="img/forum/B.svg" alt="img"/>
              <img src="img/forum/C.svg" alt="img"/></div>
                  <div class="imgWrap">${memRole(EventsList[1][i].mem_no)}</div>
                  <div class="hostName">舉辦會員：${EventsList[1][i].mem_name}</div>
                </div>
                <div class="eventInfo">
                  <div class="infoList">
                    <ul>
               <li>張貼日期：${EventsList[1][i].act_publish}</li>
               <li>活動時間：${EventsList[1][i].act_date}</li><li>活動地點：${EventsList[1][i].act_place}</li>
              <li>活動名稱：${EventsList[1][i].act_name}</li><li>活動內容：${EventsList[1][i].act_detail}</li>
              <li>報名人數：${EventsList[1][i].join_count}人/${EventsList[1][i].act_max}人</li></ul>
                  </div>
                  <div class="askQ">
                    <div class="yellowBtn"><a href="forumEvent.php?no=${EventsList[1][i].act_no}">我要參加</a></div>
                  </div>
                </div>
              </div>
            </div>`
            }
            $('#newEventList').html(newHtmlStr);
        }else{
          htmlStr+=`<div class="askQ"><div class="yellowBtn launch">我要舉辦活動</div></div>`;
          $('#eventLists').html(htmlStr);
        }
      };
      //AJAX取得資料庫資料
      function getEventsList(){
          var xhr = new XMLHttpRequest();
          xhr.onload = function(){
            if(xhr.status==200){
                showEventsList(xhr.responseText);
               //console.log(xhr.responseText)
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
        //console.log(memNo)
        var xhr = new XMLHttpRequest();
        xhr.onload = function(){
          if(xhr.status==200){
              showMemberQnaList(xhr.responseText);
             // console.log(xhr.responseText)
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
     // console.log(QnaList);
      function qnaTitle(){
        //先更新會員資訊
          document.querySelectorAll('.qnaProfileInfo.info .ansNum')[0].firstChild.innerHTML=`${QnaList[0][0].mem_name}`;
          document.querySelectorAll('.qnaProfileInfo.info .ansNum')[1].firstChild.innerHTML=`英文等級:${QnaList[0][0].level_no}`;
          document.querySelectorAll('.qnaProfileSection .info:last-child .bounty')[0].lastElementChild.innerHTML=`${QnaList[0][0].mem_money}`;
          document.querySelectorAll('.qnaProfilePic.imgWrap')[0].innerHTML=`${memRole(QnaList[0][0].mem_no)}` 
          document.querySelectorAll('.qnaProfileSection .info:last-child .ansNum')[0].firstChild.innerHTML=`${QnaList[0][0].que_no == null? 0:QnaList[0].length}`;
          document.querySelectorAll('.qnaProfileSection .info:last-child .ansNum')[1].firstChild.innerHTML=`${QnaList[1][0].ans_no == null? 0:QnaList[1].length}`;
        //再創造
        let askbtn= document.querySelectorAll('#tabMine .askQ')[0].cloneNode(true);
        let mineTitle= document.querySelectorAll('#tabMine .forumTip')[0].cloneNode(true);
        let mineBoard= document.querySelectorAll('#tabMine .qnaBoard')[0].cloneNode(true);
        //let mineTab = document.createElement('div');
        // mineTab.className+='tabGroup';
        // mineTab.innerHTML=`<div class="tab active"><a href="#myQuestion">問題</a></div>
        // <div class="tab"><a href="#myAnswer">回答</a></div>`;
        // let tabGroup = document.getElementsByClassName('tabGroup')[1]; 
        askbtn.style.display = "";
        mineTitle.style.display="";
        mineBoard.style.display="";
        // mineTab.style.display="";
        $id('tabMine').appendChild(askbtn);
        $id('tabMine').appendChild(mineTitle);
        $id('tabMine').appendChild(mineBoard);
        //$id('tabMine').appendChild(mineTab);
      }
      
      var noQStr= '';
      var noAStr= '';
      var questionStr = '';
      var answerStr = ''; 
      let tabGroup = document.getElementsByClassName('tabGroup')[1]; 
     let memNo= sessionStorage['mem_no']
        if(QnaList[0][0].que_no ==null && QnaList[1][0].ans_no ==null){
          //顯示暫無問答
          qnaTitle();//
          noQStr+= `<h3>《我的問題列表》</h3>`;
          noQStr+= `<h3>目前暫無任何問題發布</h3>`;
          noQStr+= `<div class="qnaListPage"></div>`;//問題
          $id('myQuestion').innerHTML=noQStr;
          $id('tabMine').appendChild($id('myQuestion'));
          $id('tabMine').insertBefore(tabGroup,$id('myQuestion'))
          noAStr+= `<h3>《我的回答列表》</h3>`;//回答
          noAStr+= `<h3>目前暫無任何問題發布</h3>`;
          noAStr+= `<div class="qnaListPage"></div>`;

          $id('myAnswer').innerHTML=noAStr;
          $id('tabMine').appendChild($id('myAnswer'));
           
        }else if( QnaList[1][0].ans_no== null){
          //有問沒有回答
          qnaTitle();
          questionStr+= `<h3>《我的問題列表》</h3>`;
          for(let i=0;i<QnaList[0].length;i++){
           questionStr+= `<a href="forumQA.php?no=${QnaList[0][i].que_no}&mem_no=${memNo}"><div class="qnaListContent"><div class="listWrap"><div class="info"><div class="bounty"><div class="imgWrap">`;
           questionStr+=`<img src="img/forum/money.svg" alt="money" /></div><span>${QnaList[0][i].money}</span>`;
           questionStr+=`</div><div class="ansNum"><span>0</span>回答</div></div></div>`;
           questionStr+=`<div class="questionTitle"><span class="qNum">Q${i+1}</span><h4>${QnaList[0][i].que_title}</h4>`;
           questionStr+=`<div class="listTimeNButton">
           <span class="askTime">${QnaList[0][i].time}</span></div></div></div></a>`;
          }questionStr+= `<div class="qnaListPage"></div>`;
          $id('myQuestion').innerHTML=questionStr;
          $id('tabMine').appendChild($id('myQuestion'));
          $id('tabMine').insertBefore(tabGroup,$id('myQuestion'))
          noAStr+= `<h3>《我的回答列表》</h3>`;//回答
          noAStr+= `<h3>目前暫無任何回答發布</h3>`;
          noAStr+= `<div class="qnaListPage"></div>`;
          $id('myAnswer').innerHTML=noAStr;
          $id('tabMine').appendChild($id('myAnswer'));

        }else if(QnaList[0][0].que_no ==null){
          //沒問有答
          qnaTitle();
          noQStr+= `<h3>《我的問題列表》</h3>`;
          noQStr+= `<h3>目前暫無任何問題發布</h3>`;
          noQStr+= `<div class="qnaListPage"></div>`;//問題
          $id('myQuestion').innerHTML=noQStr;
          $id('tabMine').appendChild($id('myQuestion'));
          $id('tabMine').insertBefore(tabGroup,$id('myQuestion'))
           
          answerStr += `<h3>《我的回答列表》</h3>`;
          for(let i=0;i<QnaList[1].length;i++){
           answerStr +=`<a href="forumQA.php?no=${QnaList[1][i].que_no}&mem_no=${memNo}"><div class="qnaListContent"><div class="listWrap"><div class="info" style="display:none"><div class="bounty"><div class="imgWrap">`;
           answerStr +=`<img src="img/forum/money.svg" alt="money" /></div><span></span>`;
           answerStr +=`</div><div class="ansNum"><span>0</span>回答</div></div></div>`;
           answerStr +=`<div class="questionTitle"><span class="qNum">A${i+1}</span><h4>${QnaList[1][i].ans_desc}</h4>`;
           answerStr +=`<div class="listTimeNButton"><span class="askTime">${QnaList[1][i].time}</span></div></div></div></a>`;
          }answerStr += `<div class="qnaListPage"></div>`;
          $id('myAnswer').innerHTML=answerStr ;
          $id('tabMine').appendChild($id('myAnswer'));
        }else{
          //有問有答
          qnaTitle();
          questionStr+= `<h3>《我的問題列表》</h3>`;
          for(let i=0;i<QnaList[0].length;i++){
           questionStr+=`<a href="forumQA.php?no=${QnaList[0][i].que_no}&mem_no=${memNo}">`
           questionStr+=`<div class="qnaListContent"><div class="listWrap"><div class="info"><div class="bounty"><div class="imgWrap">`;
           questionStr+=`<img src="img/forum/money.svg" alt="money" /></div><span>${QnaList[0][i].money}</span>`;
           questionStr+=`</div><div class="ansNum"><span>0</span>回答</div></div></div>`;
           questionStr+=`<div class="questionTitle"><span class="qNum">Q${i+1}</span><h4>${QnaList[0][i].que_title}</h4>`;
           questionStr+=`<div class="listTimeNButton">
           <span  class="askTime">${QnaList[0][i].time}</span></div></div></div></a>`;
          }questionStr+= `<div class="qnaListPage"></div>`;
          $id('myQuestion').innerHTML=questionStr;
          $id('tabMine').appendChild($id('myQuestion'));
          $id('tabMine').insertBefore(tabGroup,$id('myQuestion'))
         
          answerStr += `<h3>《我的回答列表》</h3>`;
          for(let i=0;i<QnaList[1].length;i++){
           answerStr +=`<a href="forumQA.php?no=${QnaList[1][i].que_no}&mem_no=${memNo}"><div class="qnaListContent"><div class="listWrap"><div class="info" style="display:none"><div class="bounty"><div class="imgWrap">`;
           answerStr +=`<img src="img/forum/money.svg" alt="money" /></div><span></span>`;
           answerStr +=`</div><div class="ansNum"><span>0</span>回答</div></div></div>`;
           answerStr +=`<div class="questionTitle"><span class="qNum">A${i+1}</span><h4>${QnaList[1][i].ans_desc}</h4>`;
           answerStr +=`<div class="listTimeNButton"><span class="askTime">${QnaList[1][i].time}</span></div></div></div></a>`;
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
 if( sessionStorage['mem_no'] == null){
   document.getElementById('memberQna').style.display='none';
 }else{
  document.getElementById('memberQna').style.display='block';
 }
 
 //創立活動燈箱建立事件聆聽功能
 $('.launch').on('click',function(){
  sessionStorage['level_no'] == null ? showLoginBox(): eventLevelCheck()
 })
 function getMemberQna(){
  sessionStorage['mem_no'] == null?console.log('會員尚未登入'):getMemberQnaList();
}
getMemberQna();
    
let textMax = 50;

$('#que_title').keyup(function(){
  let textLength = $(this).val().length;
  let textRemaining = textMax - textLength;
  $('#que_title_text').html('還剩餘<span style="color:red">'+textRemaining+'</span>個字可輸入');
})
let textMaxdesc =140
$('#que_desc').keyup(function(){
  let textLength = $(this).val().length;
  let textRemaining = textMaxdesc - textLength;
  $('#que_desc_text').html('還剩餘<span style="color:red">'+textRemaining+'</span>個字可輸入');
})


if($id('memberLevel').innerText.indexOf('1') != -1){
  $id('memberLevel').innerHTML = '英文等級:初級';
 }else if($id('memberLevel').innerText.indexOf('2') != -1){
  $id('memberLevel').innerHTML = '英文等級:中級';
 }else if($id('memberLevel').innerText.indexOf('3') != -1){
  $id('memberLevel').innerHTML = '英文等級:高級';
 }

}//forumInit end

       //顯示問答黑板的訊息
       function showForumList(jsonStr){
         let ForumList =JSON.parse(jsonStr);
         //console.log(ForumList[1][0].que_title);
         //console.log(ForumList)
         let htmlStr = "";
         let htmlMoneyStr = "";

         if (ForumList[0][0].que_no && ForumList[1][0].que_no){//最熱門(最多人回答)
           let i=0;
           $id('mostBoard').innerHTML=`<a href="forumQA.php?no=${ForumList[0][0].que_no}">
           <div class="info">
             <div class="bounty">
              <div class="imgWrap"><img src="img/forum/money.svg" alt="money" /></div><span>${ForumList[0][0].money}</span></div>
             <div class="ansNum"><span>${ForumList[0][0].ans_count}</span>回答</div>
             <span class="askTime">${ForumList[0][0].time}</span>
           </div>
           <div class="qnaContent">
             <div class="questionTitle">
               <span class="qNum">Q${i + 1}</span>
                 <h4 class="boardText">
                   ${ForumList[0][0].que_title}
                 </h4>
             </div>
             <p class="hidden">
               ${ForumList[0][0].que_desc==undefined ? '':ForumList[0][0].que_desc}
             </p>
             <div class="profileImgWrap imgWrap info">
               <div class="memberPic">${memRole(ForumList[0][0].mem_no)}</div>
               <div class="ansNum"><span>ID:${ForumList[0][0].set_nickname}</span></div>
             </div>
             <div class="yellowBtn"><a href="forumQA.php?no=${ForumList[0][0].que_no}">挑戰回答</a></div>
           </div>
         </a>`;
   
           htmlStr+=`<div class="qnaListTitle" >
           <div class="imgTextbook"><img src="img/forum/testbook.svg" alt="testbook"></div>
           <h3>《熱門話題列表》</h3>
           <div class="imgTextPink"><img src="img/forum/textpink.svg" alt=""></div>
         </div>` ;
           for(i=1;i<ForumList[0].length;i++){ 
           htmlStr+=`<a href="forumQA.php?no=${ForumList[0][i].que_no}"><div class="qnaListContent">`;
           htmlStr+=`<div class="listWrap"><div class="imgWrap">`;
           htmlStr+=`<div class="memberPic">${memRole(ForumList[0][i].mem_no)}</div><p>${ForumList[0][i].set_nickname}</p></div>`;
           htmlStr+=`<div class="info"><div class="bounty"><div class="imgWrap">`;
           htmlStr+=`<img src="img/forum/money.svg" alt="money"/></div>`;
           htmlStr+=`<span>${ForumList[0][i].money}</span></div>`;
           htmlStr+=`<div class="ansNum"><span>${ForumList[0][i].ans_count}</span>回答</div></div></div>`;
           htmlStr+=`<div class="questionTitle"><span class="qNum">Q${i + 1}</span>`;
           htmlStr+=`<h4>${ForumList[0][i].que_title}</h4>`;
           htmlStr+=`<div class="listTimeNButton"><span  class="askTime">${ForumList[0][i].time}</span>`;
           htmlStr+=`<div class="yellowBtn">挑戰回答</div></div></div></div></a>`;
          }$('#questionPanel').html(htmlStr);
           let j =0;
          $id('highBoard').innerHTML=`<a href="forumQA.php?no=${ForumList[1][0].que_no}">
          <div class="info">
            <div class="bounty">
             <div class="imgWrap"><img src="img/forum/money.svg" alt="money" /></div><span>${ForumList[1][0].money}</span></div>
            <div class="ansNum"><span>${ForumList[1][0].ans_count}</span>回答</div>
            <span class="askTime">${ForumList[1][0].time}</span>
          </div>
          <div class="qnaContent">
            <div class="questionTitle">
              <span class="qNum">Q${j + 1}</span>
                <h4 class="boardText">
                  ${ForumList[1][0].que_title}
                </h4>
            </div>
            <p class="hidden">
              ${ForumList[1][0].que_desc==undefined ? '':ForumList[1][0].que_desc}
            </p>
            <div class="profileImgWrap imgWrap info">
              <div class="memberPic">${memRole(ForumList[1][0].mem_no)}</div>
              <div class="ansNum"><span>ID:${ForumList[1][0].set_nickname}</span></div>
            </div>
            <div class="yellowBtn"><a href="forumQA.php?no=${ForumList[1][0].que_no}">挑戰回答</a></div>
          </div>
        </a>`;      
         htmlMoneyStr+=`<div class="qnaListTitle" ><div class="imgTextbook"><img src="img/forum/testbook.svg" alt="testbook"></div><h3>《懸賞金額最多》</h3><div class="imgTextPink"><img src="img/forum/textpink.svg" alt="Pink"></div></div>`;
         for(j=1;j<ForumList[1].length;j++){ 
          htmlMoneyStr+=`<a href="forumQA.php?no=${ForumList[1][j].que_no}"><div class="qnaListContent">`;
          htmlMoneyStr+=`<div class="listWrap"><div class="imgWrap">`;
          htmlMoneyStr+=`<div class="memberPic">${memRole(ForumList[1][j].mem_no)}</div><p>${ForumList[1][j].set_nickname}</p></div>`;
          htmlMoneyStr+=`<div class="info"><div class="bounty"><div class="imgWrap">`;
          htmlMoneyStr+=`<img src="img/forum/money.svg" alt="money"/></div>`;
          htmlMoneyStr+=`<span>${ForumList[1][j].money}</span></div>`;
          htmlMoneyStr+=`<div class="ansNum"><span>${ForumList[1][j].ans_count}</span>回答</div></div></div>`;
          htmlMoneyStr+=`<div class="questionTitle"><span class="qNum">Q${j + 1}</span>`;
          htmlMoneyStr+=`<h4>${ForumList[1][j].que_title}</h4>`;
          htmlMoneyStr+=`<div class="listTimeNButton"><span id="ask" class="askTime">${ForumList[1][j].time}</span>`;
          htmlMoneyStr+=`<div class="yellowBtn">挑戰回答</div></div></div></div>`;
          htmlMoneyStr+=`</a>`
          ;}$('#questionExpensive').html(htmlMoneyStr);
           
         

        }else{
           htmlStr+=`<div class="listWrap"><div id="profilePic" class="imgWrap">`;
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
            // console.log(xhr.responseText);
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
           success:alertBoxShow('問題已送出','通知','navy',()=>{
             location.reload();
           }) 
         });
        getForumList();
        
       }
      
      
      
       window.addEventListener('load',forumInit);