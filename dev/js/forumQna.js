     
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
              //console.log(reportNo);
              storage.setItem('reportList', reportNo);
          })
       }
       }
    
    
      $('#reportSendBtn').click(function reportMessage(){
        let reportReason = $("select[name='reportMessage']").val();
        let mem_no=0;
        storage.getItem('mem_no')?mem_no =storage.getItem('mem_no'):mem_no=3;
       
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
          alertBoxShow('檢舉已送出','通知','navy',()=>{
            location.reload();
          });
        }
            break;
        }
        
      });
  
        
      
      function showAnsList(jsonStr){
        var AnsList =JSON.parse(jsonStr);
        var htmlStr = "";
        //console.log(AnsList);
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
           htmlStr+= `<div class="otherAnsSection">
          <div class="imgWrap memberPic"> <span>解答</span>${memRole(AnsList[i].mem_no)}</div>
          <div class="ansSection">
              <div class="ansContent">
                   <span>${AnsList[i].ans_desc}</span>
              </div>
              <div class="aboutAns">
                  <a href="#">${AnsList[i].set_nickname}．</a><span class="ansTIme">${AnsList[i].time}</span>
              </div>
              <div class="reportSection">
              <div class="commentBtn chooseBest" name="ans_no${AnsList[i].ans_no}"><span>選擇為最佳解答</span></div>   
                  <div class="reportButton" name="ans_no${AnsList[i].ans_no}"><span onclick="report(${AnsList[i].ans_no})">檢舉不當</span></div>
              </div>
          </div>
        </div>`;

          let element = $(htmlStr).get(i);
          let box = document.querySelector('.ansBoxWrap');
          let parentDiv = box.parentNode; 
          parentDiv.insertBefore(element,box);
        }
      }else if( AnsList[0].que_no ){
        for(i=0;i<AnsList.length;i++){
          htmlStr+=`<div class="otherAnsSection">
          <div class="imgWrap memberPic"> <span>解答</span>${memRole(AnsList[i].mem_no)}</div>
          <div class="ansSection">
              <div class="ansContent">
                   <span>${AnsList[i].ans_desc}</span>
              </div>
              <div class="aboutAns">
                  <a href="#">${AnsList[i].set_nickname}．</a><span class="ansTIme">${AnsList[i].time}</span>
              </div>
              <div class="reportSection">
              
                  <div class="reportButton" name="ans_no${AnsList[i].ans_no}"><span onclick="report(${AnsList[i].ans_no})">檢舉不當</span></div>
              </div>
          </div>
        </div>`;
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
             // console.log(xhr.responseText);
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

        // function(){
        //   var xhr = new XMLHttpRequest();
      
        //   xhr.onload = function(){
        //     alert( xhr.responseText);
        //     console.log( xhr.responseText);
        //   }
          
        //   xhr.open("post","login_send_json.php",true);
        //   xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        //   var dataObj = {};
        //   dataObj.memId = document.getElementById("memId").value;
        //   dataObj.memPsw = document.getElementById("memPsw").value;
      
        //   var data_info = "dataInfo=" + JSON.stringify(dataObj);
        //   xhr.send(data_info);
        // };
        function afterAnswer() {
          $('#ansDetail').val('');
          alertBoxShow('答案已送出','通知','navy',()=>{
            location.reload();
          });
        }



        //寫回去資料庫
      function sendaToDB(){
        var xhr = new XMLHttpRequest();
      
        xhr.onload = function(){
          //alert( xhr.responseText);
          console.log( xhr.responseText);
        }
        xhr.open("post","forumSendAns.php",true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        var dataObj = {};
          dataObj.que_no = parseInt(window.location.search.replace('?no=',''));
          dataObj.ans_desc = document.getElementById('ansDetail').value;
          dataObj.mem_no = sessionStorage['mem_no'];
          var data_info = "dataInfo=" + JSON.stringify(dataObj);
          xhr.send(data_info);
          afterAnswer();
          getAnsList();
        };
        function showLoginBox(){
          alertBoxShow('回答問題須先登入會員','注意')
          $('#loginBox').fadeIn(100);
          
      }
      function chooseBest(){
        if($('#bestProfile').attr('name').indexOf('none') == -1){
          alertBoxShow('已經選擇過最佳解答','通知','navy')
          return;
        }else{
          let ans_no=$(this).attr('name').slice(6);
          //console.log(ans_no);
          let queNo=parseInt(window.location.search.replace('?no=',''));
          let que_money=parseInt($('#bountyMoney').text().slice(5));
          //console.log(que_money);
          var xhr = new XMLHttpRequest();
        xhr.onload = function(){
        if(xhr.status==200){
            MemberList(xhr.responseText);
            //console.log(xhr.responseText)
          }else{
          alert(xhr.status)
         }
        }
        var url = "forumSendAns.php?queNo="+queNo+"&ans_no="+ans_no+"&que_money="+que_money;
        xhr.open("Get", url, false);
        xhr.send( null);
        }
      }
      if($('.chooseBest')){
       let best= document.getElementsByClassName('chooseBest');
       for(i=0;i<best.length;i++){
        best[i].addEventListener('click',chooseBest)
       }
      }
      
    //   if($('#bestProfile').attr('name').indexOf('none') == -1){
    //     $('.chooseBest').on('click',alertBoxShow('已經選擇過最佳解答','通知','navy'))
    //   }else{
    //     $('.chooseBest').on('click',function(){
    //         let ans_no=$(this).attr('name').slice(6);
    //         //console.log(ans_no);
    //         let queNo=parseInt(window.location.search.replace('?no=',''));
    //         let que_money=parseInt($('#bountyMoney').text().slice(5));
    //         //console.log(que_money);
    //         var xhr = new XMLHttpRequest();
    //       xhr.onload = function(){
    //       if(xhr.status==200){
    //           MemberList(xhr.responseText);
    //           //console.log(xhr.responseText)
    //         }else{
    //         alert(xhr.status)
    //     }
    //   }
    //   var url = "forumSendAns.php?queNo="+queNo+"&ans_no="+ans_no+"&que_money="+que_money;
    //   xhr.open("Get", url, false);
    //   xhr.send( null);

    //     })

    // }
        function MemberList(jsonStr){
          let member = JSON.parse(jsonStr);
          console.log(member);
          let que_money=parseInt($('#bountyMoney').text().slice(5));
          alertBoxShow(`已選擇最佳回答<br>${member[0].mem_name}獲得${que_money}`,'通知','navy',()=>{
            location.reload();
          })
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
        function showLoginBox(){
            $('#loginBox').fadeIn(100);
        }
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
        $('#memStatusGEM').html(sessionStorage['mem_money']);
      }
      //寫入資料到member_question
      function sendToDB(){
        var xhr = new XMLHttpRequest();
      
        xhr.onload = function(){
          //alert( xhr.responseText);
          console.log( xhr.responseText);
        }
        xhr.open("post","getForumListJSON.php",true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        var dataObj = {};
          dataObj.que_title = $id('que_title').value;
          dataObj.que_desc = $id('que_desc').value;
          dataObj.que_money = $id('que_money').value;
          dataObj.mem_no = sessionStorage['mem_no'];
          dataObj.money = sessionStorage['mem_money'];
          var data_info = "dataInfo=" + JSON.stringify(dataObj);
          xhr.send(data_info);
          alertBoxShow('問題已送出','通知','navy');
          //getForumList();
       }
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
     //提問燈箱新增按鈕建立事件聆聽功能
     let questionBtn =document.querySelectorAll('.askQuestion');
     for(let i = 0; i < questionBtn.length;i++){
        questionBtn[i].addEventListener('click',function(){
            sessionStorage['mem_no'] == null ? showLoginBox() : questionMoneyCheck()
        })
     }
     let memno=$('#questionMember').attr('name').slice(6);
     let questionMember =memRole(memno);
     $('#questionMember').html(questionMember);

     let mymem_no=sessionStorage['mem_no'];
     let memberProfile =memRole(mymem_no);
     $('#memberProfile').html(memberProfile);

         let textMax = 350;
				$('#feedback').html('可輸入<span style="color:red">'+textMax+'</span>個字');
				$('#ansDetail').keyup(function(){
					let textLength = $(this).val().length;
					let textRemaining = textMax - textLength;
					$('#feedback').html('還剩餘<span style="color:red">'+textRemaining+'</span>個字可輸入');

        });

        if($id('bestProfile').getAttribute('name')=='none'){
           $id('bestProfile').innerHTML='';
        }else{
          let mem_No=parseInt($id('bestProfile').getAttribute('name'));
          let memRoleHtml = '';
          memRoleHtml += '<span>最佳解答</span>';
          memRoleHtml += memRole(mem_No);
          $id('bestProfile').innerHTML=memRoleHtml;
        }
      }  
  
     
      window.addEventListener('load',reportDoFirst);
      if(document.getElementById('ansSendBtn')){
      document.getElementById('ansSendBtn').addEventListener('click',()=>{
        sessionStorage['mem_no'] ==null? showLoginBox():sendaToDB();
      })}
      


// 活動報名

// Click

// mem_no session
// act_no loaction
// Insert into activity_history values( :mem_no,:act_no, now())
// Update activity set join_count=(SELECT count(*) FROM `activity_history` where act_no =2) where act_no=2;

  