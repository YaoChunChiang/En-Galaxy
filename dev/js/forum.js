
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
      function questionFormCheck(){
          let memMoney = parseInt( sessionStorage.getItem('mem_money'));
          console.log(memMoney)
          if(memMoney > 0){
            document.getElementById('que_money').addEventListener('change',function(){
                let questionMoney = parseInt($('#que_money').val());
                console.log(questionMoney)
                if(questionMoney - memMoney < 0){
                 document.getElementById('questionAdd').addEventListener('click',function(){
                     alert('沒有足夠的錢喔喔喔');
                 })
                  return false;
               }else {
                    let leftMoney =memMoney - questionMoney ;
                    sessionStorage.setItem('mem_money',leftMoney);
                    document.getElementById('questionAdd').addEventListener('click',function(){
                        sendToDB();
                    let questionFormInfo = document.querySelectorAll('#questionForm textarea,#questionForm input');
                    for(let i = 0; i < questionFormInfo.length;i++){
                       questionFormInfo[i].value='';
                                                 }
                    })
                    //記得透過ajax將剩下的錢傳回資料庫
               }  
            })
               
          }else{
            alert('沒錢啦')
            $('#forumQAddWindow').css('display','none');
          }
        
      }

     document.getElementById('eventFile').addEventListener('change',showImg);
     
     //提問燈箱新增按鈕建立事件聆聽功能
     let questionBtn =document.querySelectorAll('.askQuestion');
     for(let i = 0; i < questionBtn.length;i++){
        questionBtn[i].addEventListener('click',function(){
            sessionStorage['mem_no'] == null ? showLoginBox() : questionFormCheck()
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
             console.log(xhr.responseText);
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
         document.getElementById('questionAdd').addEventListener('click',() =>{
        let msg ='提問成功';
         boxStr = '';
         boxStr +=`<div id="reportBox" class="infoBox">`;
         boxStr +=`<div class="reportBoxWrap"><h3>En-galaxy</h3>`
         boxStr +=`<a href="#" class="reportCancelBtn">X</a>`;
         boxStr +=`<h4>${msg}</h4>`;
         boxStr +=`<button id="reportCheck" class='checkBtn'>確認</button>`;
         boxStr +=`</div></div>`;
         this.parentNode.parentNode.parentNode.parentNode.innerHTML =  boxStr;
         })
         console.log(this.parentNode.parentNode.parentNode);
        
       }
       //建立我要提問->新增按鈕的事件
      
       window.addEventListener('load',forumInit);