function videoInit(pageInfo){
    let memNum = sessionStorage['mem_no']? sessionStorage['mem_no'] : 'notMem';
    // pageInfo[0] 影片資訊
    // pageInfo[1] 影片題目
    console.log(pageInfo)

    $('#videoTitle').html(pageInfo[0]['video_name']);
    $('#videoType').html(pageInfo[0]['video_type']);
    $('#videoLevel').html(pageInfo[0]['level_name']);
    $('#videoSecondTitle').html(pageInfo[0]['video_desc']);
    $('#video').attr('src', `video/${pageInfo[0]['video_src']}`)

    //製作重點單字
    function makeImportantVocab(){
            // $(".videoVoc").append();

    // <div class="vocText">
    //     <div class="vocP">
    //         <p>1. accord (v.) 一致,符合,和諧,協調;給予,使一致;自願,主動</p>
    //     </div>
    //     <div class="addImg">
    //         <a href="javascript:;"><img src="/img/video/add.png" alt="收藏單字"><span>&nbsp;&nbsp;字卡</span></a>
    //     </div>
    // </div>
    }
    //製作字幕
    function makeSubtitle(xml){
        console.log(xml)
        let sub = document.querySelector('.enFrame');
        let ps = xml.getElementsByTagName("p");
        // console.log(ps.innerHTML);
        // console.log();
        for(let i = 0; i < ps.length; i++){
            console.log(ps[i].innerHTML);
            // aaa = aaa.replace("<![CDATA[", "").replace("]]>", "");
            // aaa = preg_replace('~//<!\[CDATA\[\s*|\s*//\]\]>~', '', ps[i].nodeValue);
            // sub.innerHTML = ps[i];
            sub.appendChild(ps[i]);

            let p = document.createElement('p');
            sub.appendChild(p);
        }
    };

    //取得字幕檔
    function getSubtitle(){
        console.log(pageInfo[0].subtitles);
        fetch(`video/${pageInfo[0].subtitles}`)
        .then(obj=>obj.text())
        .then(data=>{
            // $.parseXML(txt)
            let parser = new DOMParser();
            let xml = parser.parseFromString(data, 'application/xml');
            // document.querySelector('.enFrame').innerHTML = data;
            makeSubtitle(xml);

        })
        // .then(xml=>{
        //     // console.log(xml);
        //     // 製作字幕
        //     makeSubtitle(xml);
        // });
    }
    getSubtitle();
    
    let questionNum = 0; //偵測在第幾題
    //製作題目的function
    function makeVideoQuestion(questions, qno = 0){
        $('.quizList').html(questionNum + 1);
        // console.log(questions[qno]['opt_1']);
        $('.quizPage').html(`Page ${qno + 1} of ${questions.length}`);
        $('#videoQTitle').html(questions[qno]['video_q']);
        $('.opt_1').html(`<input type="radio" name="myAns" value="0">&nbsp;&nbsp;${questions[qno]['opt_1']}`)
        $('.opt_2').html(`<input type="radio" name="myAns" value="1">&nbsp;&nbsp;${questions[qno]['opt_2']}`)
        $('.opt_3').html(`<input type="radio" name="myAns" value="2">&nbsp;&nbsp;${questions[qno]['opt_3']}`)
        $('.opt_4').html(`<input type="radio" name="myAns" value="3">&nbsp;&nbsp;${questions[qno]['opt_4']}`)
        // $('.quizAnsAll').append("");
    }
    makeVideoQuestion(pageInfo[1]);
    
    //檢查答案
    function checkAns(){
        console.log(selectedQuest);
        console.log(pageInfo[1]);
        let wrongQ = [];
        let message = '您答錯的題號為: ';
        pageInfo[1].forEach((obj, i)=> {
            let arr = [];
            let answer = obj['answer'];
            arr.push(obj['opt_1']);
            arr.push(obj['opt_2']);
            arr.push(obj['opt_3']);
            arr.push(obj['opt_4']);

            let rightAnsPos = arr.indexOf(answer);
            if(parseInt(selectedQuest[i]) === rightAnsPos){
                // wrongQ.push(true);
            }else{
                //答錯的題號放入陣列
                wrongQ.push(i + 1);
            }
            // console.log(arr.indexOf(answer));
        });
        message += wrongQ.join(", ");
        if(wrongQ.length === 0){
            if(memNum === 'notMem'){
                alertBoxShow("恭喜你全對</br>會員才可以獲得獎金哦", '恭喜', 'green',()=>{
                    $('#loginBox').css('display', 'block');
                });
            }else{
                $.post('video.php', {who: 'addMoney', memNum});
                alertBoxShow("恭喜你全對</br>獲得G幣10元", '恭喜', 'green',()=>{
                    // 會員才加錢
                    window.location.href = "videoList.html";
                });
            }
            
        }else{
            if(memNum === 'notMem'){
                alertBoxShow(message + '</br>可登入會員進行學習呦', '繼續加油', 'green',()=>{
                    $('#loginBox').css('display', 'block');
                })
            }else{
                alertBoxShow(message + '</br>可去單字或遊戲頁面繼續學習呦', '繼續加油', 'green', ()=>{
                    window.scrollTo(0,0);
                    location.reload();
                })
            }
        }
    }


    // 按下一題
    let selectedQuest = [];
    function nextQuiz(){
        
        if($('input:radio:checked[name="myAns"]').val() != undefined){
            // 玩家選的選項
            selectedQuest[questionNum] = $('input:radio:checked[name="myAns"]').val();
            // console.log((questionNum + 2) / pageInfo[1].length * 100);
            
            //移動進度條
            $('.progress-wrap').data('progress-percent', (questionNum + 2) / pageInfo[1].length * 100);
            moveProgressBar();

            // //更新進度數字
            // $('.quizPage').html(`Page ${questionNum + 1}} of ${pageInfo[1].length}`);


            if( $('.quizNext').html() === '送出'){
                checkAns();
                // alertBoxShow('WEEEEEEEEEEEEEE');
                
            }else{
                if(questionNum < pageInfo[1].length -1 ){
                    questionNum++;
                    $('.quizList').html(questionNum + 1);
                    makeVideoQuestion(pageInfo[1], questionNum);
                    //如果按上一題後又按下一題會記得之前的選擇
                    if(selectedQuest[questionNum]){
                        $('.quizAns input[name="myAns"]')[selectedQuest[questionNum]].setAttribute('checked','ckecked');
                    }
                }
                if(questionNum == pageInfo[1].length - 1){
                    $('.quizNext').html('送出');
                }
            }

        }else{
            alertBoxShow('必須填入回答');
        }
    }
    // 按上一題
    function preQuiz(){
        console.log(selectedQuest);
        if(questionNum != 0){
            //移動進度條
            console.log((questionNum + 2) / pageInfo[1].length * 100);
            $('.progress-wrap').data('progress-percent', (questionNum) / pageInfo[1].length * 100);
            moveProgressBar();



            questionNum--;
            $('.quizList').html(questionNum + 1);
            makeVideoQuestion(pageInfo[1], questionNum);


            // console.log()
            // console.log($('.quizAns input[name="myAns"]')[selectedQuest[questionNum]])
            //按上一題會記得之前的選擇
            $('.quizAns input[name="myAns"]')[selectedQuest[questionNum]].setAttribute('checked','ckecked');
            $('.quizNext').html('下一題');
        }
    }

    moveProgressBar();
    // on browser resize...
    $(window).resize(function() {
        moveProgressBar();
    });

    // SIGNATURE PROGRESS
    function moveProgressBar() {
        // console.log($('.progress-wrap').data('progress-percent'));
        var getPercent = ($('.progress-wrap').data('progress-percent') / 100);
        var getProgressWrapWidth = $('.progress-wrap').width();
        var progressTotal = getPercent * getProgressWrapWidth;
        var animationLength = 2500;
        
        // on page load, animate percentage bar to data percentage length
        // .stop() used to prevent animation queueing
        $('.progress-bar').stop().animate({
            left: progressTotal
        }, animationLength);
    }


    $('.quizNext').click(nextQuiz);
    $('.quizPre').click(preQuiz);

    $(".videoTestGame").click(()=>{location.href = 'game.html'});
    $(".videoTestCard").click(()=>{location.href = 'card.html'});
}

//一開始就撈資料
(function(){
    let url = new URL(window.location.href);
    let sendUrl = url.searchParams.get('video_no');
    console.log(sendUrl);
    fetch(`video.php?who=init&video_no=${sendUrl}`)
    .then(data => data.json(), error=>console.log(error))
    .then(obj => {
        // console.log(obj)
        window.addEventListener('load', function(){videoInit(obj)});
    })
    .catch(error=>{console.log(error)});
}())//立即執行



