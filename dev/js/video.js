function videoInit(pageInfo){
    // pageInfo[0] 影片資訊
    // pageInfo[1] 影片題目
    console.log(pageInfo)

    $('#videoTitle').html(pageInfo[0]['video_name']);
    $('#videoType').html(pageInfo[0]['video_type']);
    $('#videoLevel').html(pageInfo[0]['level_name']);
    $('#videoSecondTitle').html(pageInfo[0]['video_desc']);
    $('#video').attr('src', `video/${pageInfo[0]['video_src']}`)
}

//一開始就撈資料
(function(){
    let url = new URL(window.location.href);
    let sendUrl = url.searchParams.get('video_no');
    console.log(sendUrl);
    fetch(`video.php?who=init&video_no=${sendUrl}`)
    .then(data => data.json())
    .then(obj => {
        // console.log(obj)
        window.addEventListener('load', function(){videoInit(obj)});
    });
}())//立即執行



