function init(){
    let memNum = sessionStorage['mem_no'] ? sessionStorage['mem_no'] : 'notMem';
    let memLevel = sessionStorage['level_no'] ? sessionStorage['level_no'] : 'notMem';
    console.log(memNum,',',memLevel);


    $.get('videoList.php', {who: 'start'}, data => {makeVideoList(JSON.parse(data))});
}
let makeVideoList = (videosArr) =>{
    console.log(videosArr);
    let newsVideos = videosArr.filter(obj => obj['video_type'] === '新聞');
    let musicVideos = videosArr.filter(obj => obj['video_type'] === '音樂');
    let showVideos = videosArr.filter(obj => obj['video_type'] === '影劇');

    //從等級低到高排序
    videosArr.sort((a,b) => a['level_no'] - b['level_no']);
    console.log(videosArr);

    //動態新增影片清單
    videosArr.forEach(obj => {
        let level = '';
        switch(obj['level_no']){
            case '1':
                level = "初級";
            break;
            case '2':
                level = "中級";
            break;
            case '3':
                level = "高級";
            break;
        }
        let divVideoFrame = document.createElement('div');
        let a = document.createElement('a');
        let divVideoImg = document.createElement('div');
        let content = `<img src="img/video/video.png" alt="我是影片">
                        <p>${obj['video_name']}</p>
                        <div class="video_tag">${level}</div>
                        `;
        divVideoFrame.setAttribute('class', 'videoFrame');
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
    console.log(newsVideos ,",", musicVideos,"," , showVideos);
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