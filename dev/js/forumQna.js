     
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
      let lists = document.querySelectorAll('.reportButton');
      for (let i = 0; i < lists.length; i++) {
          lists[i].addEventListener('click', function () {
              let reportNo = this.getAttribute('name');
              console.log(reportNo);
              storage.setItem('reportList', reportNo);
          })
       }
       }
    
    
      $('#reportSendBtn').click(function reportMessage(){
        let reportReason = $("select[name='reportMessage']").val();
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
        
      
      function showAnsList(jsonStr){
        var AnsList =JSON.parse(jsonStr);
        var htmlStr = "";
        console.log(AnsList);
        if(window.location.search.indexOf('mem_no') == -1 && AnsList == null ){
          htmlStr+=`<div class="otherAnsSection">`;
          htmlStr+=`<div class="ansSection">`;
          htmlStr+=`<div class="ansContent"><h2>暫無任何回答</h2></div>`;
          htmlStr+=`</div></div>`;
        //  ansSection.innerHTML = htmlStr;
        let element = $(htmlStr).get(0);
        let box = document.querySelector('.ansBoxWrap');
        let parentDiv = box.parentNode; 
        parentDiv.insertBefore(element,box);
        }else if(window.location.search.indexOf('mem_no') >= 0 && AnsList[0].que_no ){
          for(i=0;i<AnsList.length;i++){
            htmlStr+=`<div class="otherAnsSection">`;
            htmlStr+=`<div class="imgWrap"><span>解答</span> <img src="img/forum/character2.svg" alt="profile" />${AnsList[i].mem_name}</div><div class="ansSection">`;
            htmlStr+=`<div class="ansContent"><span>${AnsList[i].ans_desc}</span></div>`;
            htmlStr+=`<div class="aboutAns"><a href="#">${AnsList[i].mem_name}．</a><span class="ansTIme">${AnsList[i].time}</span></div>`;
            htmlStr+=`<div class="reportSection"><div class="commentBtn chooseBest" name="ans_no${AnsList[i].ans_no}"><span>選擇為最佳解答</span></div>`;
            htmlStr+=`<div class="reportButton"name="ans_no${AnsList[i].ans_no}"><span onclick="report(${AnsList[i].ans_no})">檢舉不當</span></div></div></div></div>`;
          //  ansSection.innerHTML = htmlStr;
          let element = $(htmlStr).get(i);
          let box = document.querySelector('.ansBoxWrap');
          let parentDiv = box.parentNode; 
          parentDiv.insertBefore(element,box);
        }
      }else if( AnsList[0].que_no ){
        for(i=0;i<AnsList.length;i++){
          htmlStr+=`<div class="otherAnsSection">`;
          htmlStr+=`<div class="imgWrap"><span>解答</span> <img src="img/forum/character2.svg" alt="profile" />${AnsList[i].mem_name}</div><div class="ansSection">`;
          htmlStr+=`<div class="ansContent"><span>${AnsList[i].ans_desc}</span></div>`;
          htmlStr+=`<div class="aboutAns"><a href="#">${AnsList[i].mem_name}．</a><span class="ansTIme">${AnsList[i].time}</span></div>`;
          htmlStr+=`<div class="reportSection">`;
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
              console.log(xhr.responseText);
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
            success:afterAnswer(),
          });
          function afterAnswer() {
            $('#ansDetail').val('');
            alert('答案已送出');
            getAnsList();
          }
        };
        document.getElementById('ansSendBtn').addEventListener('click',sendToDB);
        
        function msgLightBox(msg){
          boxStr='';
          boxStr+=`<div class="lightBoxWrap"></div>`;
          boxStr+=`<div class="lightBox"><h2>${msg}</h2>`;
          boxStr+=` <div class="popup__icons dis-f fw-w">`;
          boxStr+=`</div><i class="closeBtn far fa-times-circle"></i></div>`;
          $('#questionSuccessLightBox').html(boxStr);
          $('#questionSuccessLightBox').fadeIn(100);
          $('.closeBtn').click(function(){
            $('#questionSuccessLightBox').slideToggle();
           
        })
        $('.lightBoxWrap').click(function(){
            $('#questionSuccessLightBox').slideToggle();
        })
        }
         
        $('.chooseBest').on('click',function(){
            let ans_no=$(this).attr('name').slice(6);
            console.log(ans_no);
            let queNo=parseInt(window.location.search.replace('?no=',''));
            let que_money=parseInt($('#bountyMoney').text().slice(5));
            console.log(que_money);
            var xhr = new XMLHttpRequest();
          xhr.onload = function(){
          if(xhr.status==200){
              MemberList(xhr.responseText);
              console.log(xhr.responseText)
            }else{
            alert(xhr.status)
        }
      }
      var url = "forumSendAns.php?queNo="+queNo+"&ans_no="+ans_no+"&que_money="+que_money;
      xhr.open("Get", url, false);
      xhr.send( null);

            // $.ajax({
            //   url:'forumSendAns.php',
            //   method:'POST',
            //   data: "&queNo="+queNo+"&ans_no="+ans_no+"&que_money="+que_money,
            //   dataType:'JSON',
            //   success: function(jsonStr){
            //     let member = JSON.parse(jsonStr);
            //     console.log(member);
            //     msgLightBox(`已選擇最佳回答<br>${member[0].mem_name}獲得${que_money}`)
            //   }
              
            // }); 
        })
        function MemberList(jsonStr){
          let member = JSON.parse(jsonStr);
          console.log(member);
          let que_money=parseInt($('#bountyMoney').text().slice(5));
          msgLightBox(`已選擇最佳回答<br>${member[0].mem_name}獲得${que_money}`)
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
  //       //點x或(背景)及確認都會消失
  //       function closeLightBox(){
  //         $id('reportBox').style.display="none"
  //       }
  //       $id('reportCheck').addEventListener('click',closeLightBox);
  //       document.getElementsByClassName('reportCancelBtn')[0].addEventListener('click',closeLightBox);
  
  //  }
  
      window.addEventListener('load',reportDoFirst);

//       SELECT * FROM member_answer a left join member_question q on a.que_no=q.que_no where a.que_no = 10

// 選最佳答案
// Update member_answer set best_ans =1 where ans_no=7

// 更新問題的最佳答案
// update member_question q SET ans_no=(SELECT ans_no from member_answer a where q.que_no=a.que_no and best_ans =1)

// 找到回答問題的會員給獎金
// //SELECT a.mem_no FROM member_answer a left join member_question q on a.que_no=q.que_no left join mem_main m on a.mem_no=m.mem_no where a.que_no = 10 and q.ans_no=a.ans_no
	


// _______>>>>
// UPDATE mem_main set mem_money=mem_money+500 WHERE mem_no=(
// SELECT a.mem_no from (SELECT * from mem_main) m left join member_answer a on m.mem_no=a.mem_no left join member_question q on a.que_no=q.que_no where a.que_no = 10 and q.ans_no=a.ans_no)


// 活動報名

// Click

// mem_no session
// act_no loaction

// Insert into activity_history values( :mem_no,:act_no, now())
// Update activity set join_count=(SELECT count(*) FROM `activity_history` where act_no =2) where act_no=2;

  