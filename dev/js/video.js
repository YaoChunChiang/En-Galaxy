function videoInit(pageInfo){
    console.log(pageInfo)

    $('#videoTitle').html(pageInfo['video_name']);
    $('#videoType').html(pageInfo['video_type']);
    $('#videoLevel').html(pageInfo['level_name']);
    $('#videoSecondTitle').html(pageInfo['video_desc']);
}


(function(){
    let url = new URL(window.location.href);
    let sendUrl = url.searchParams.get('video_no');
    console.log(sendUrl)
    fetch(`video.php?video_no=${sendUrl}`)
    .then(data => data.json())
    .then(obj => {
        window.addEventListener('load', function(){videoInit(obj[0])});
    });
}())//立即執行



