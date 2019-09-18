let memNum = sessionStorage['mem_no'] ? sessionStorage['mem_no'] : 'notMem';
let memLevel = sessionStorage['level_no'] ? sessionStorage['level_no'] : 'notMem';
// console.log(memNum,',',memLevel);
function init(){


    $.get('videoList.php', {who: 'start'}, data => {makeVideoList(JSON.parse(data))});





    function levelSelector(){
        if($(this).hasClass('tagRed')){
            $('.mid').css('display', 'none');
            $('.high').css('display', 'none');
            $('.basic').fadeIn(200)
        }else if($(this).hasClass('tagBlue')){
            $('.basic').css('display', 'none');
            $('.high').css('display', 'none');
            $('.mid').fadeIn(200)
        }else if($(this).hasClass('tagGreen')){
            $('.basic').css('display', 'none');
            $('.mid').css('display', 'none');
            $('.high').fadeIn(200)
        }else{
            $('.basic').fadeIn(200);
            $('.mid').fadeIn(200);
            $('.high').fadeIn(200);
        }
    }

    function clearVideoList(){
        document.getElementById('musicVideos').innerHTML = "";
        document.getElementById('showVideos').innerHTML = "";
        document.getElementById('newsVideos').innerHTML = "";    
    }


    $('.tagRed').click(levelSelector);
    $('.tagBlue').click(levelSelector);
    $('.tagGreen').click(levelSelector);
    $('.tagYellow').click(levelSelector);
}//init end

function connotWatch(){
    // alert('您沒有權限看此部影片，請加入會員或進行遊戲成為高級會員');
    alertBoxShow('您沒有權限看此部影片，請加入會員或進行遊戲成為高級會員');
    if(memNum == 'notMem'){
        $('#loginBox').css('display', 'block');
    }
}



//判斷是否有資格看中高級影片
function canYouWatch(){
    switch(memLevel){
        case 'notMem':
        case '1':
            $('.mid').children('a').attr('href', 'javascript:;');
            $('.high').children('a').attr('href', 'javascript:;');
            $('.mid').addClass('videoToBlur');
            $('.high').addClass('videoToBlur');
            $('.mid').removeClass('videoToBig');
            $('.high').removeClass('videoToBig');
            $('.mid').click(connotWatch);
            $('.high').click(connotWatch);
        break;
        //     $('.mid').children('a').attr('href', 'javascript:;');
        //     $('.high').children('a').attr('href', 'javascript:;');
        //     $('.mid').click(connotWatch);
        //     $('.high').click(connotWatch);
        // break;
        case '2':
            $('.high').children('a').attr('href', 'javascript:;');
            $('.high').addClass('videoToBlur');
            $('.high').removeClass('videoToBig');
            $('.high').click(connotWatch);
        break;
    }
}

function clearVideoList(){
    document.getElementById('musicVideos').innerHTML = "";
    document.getElementById('showVideos').innerHTML = "";
    document.getElementById('newsVideos').innerHTML = "";    
}

let makeVideoList = (videosArr) =>{
    //從等級低到高排序
    videosArr.sort((a,b) => a['level_no'] - b['level_no']);
    // console.log(videosArr);

    //動態新增影片清單
    videosArr.forEach(obj => {
        let level = '';
        let levelEng = '';
        switch(obj['level_no']){
            case '1':
                level = "初級";
                levelEng = 'basic';
            break;
            case '2':
                level = "中級";
                levelEng = 'mid';
            break;
            case '3':
                level = "高級";
                levelEng = 'high';
            break;
        }
        let divVideoFrame = document.createElement('div');
        let a = document.createElement('a');
        let divVideoImg = document.createElement('div');
        let content = `<img src="img/video/${obj['video_pic']}" alt="我是影片">
                        <p>${obj['video_name']}</p>
                        <div class="video_tag">${level}</div>
                        `;
        divVideoFrame.setAttribute('class', 'videoFrame videoToBig ' + levelEng);
        // divVideoFrame.setAttribute('class', levelEng);
        
        a.setAttribute('href', 'video.html');
        divVideoImg.setAttribute('class', 'videoImg');

        divVideoImg.innerHTML = content;
        a.appendChild(divVideoImg);
        divVideoFrame.appendChild(a);

        switch(obj['video_type']){
            case '音樂':
                document.getElementById('musicVideos').appendChild(divVideoFrame);
            break;
            case '影劇':
                document.getElementById('showVideos').appendChild(divVideoFrame);
            break;
            case '新聞':
                document.getElementById('newsVideos').appendChild(divVideoFrame);
            break;
        }
    });//動態新增影片清單結束
    canYouWatch();
}
    // <div class="videoFrame">
    //     <a href="video.html">
    //         <div class="videoImg">
    //             <img src="img/video/video.png" alt="我是影片">
    //             <p>這位名人喜愛的帽子設計師如何創造了如何創</p>
    //             <div class="video_tag">初級</div>
    //         </div>
    //     </a>
    // </div>

window.addEventListener('load', init);