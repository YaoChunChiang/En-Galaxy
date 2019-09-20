$(document).ready(function () {
    //登入資訊初始化
    function memberInit() {
        let storage = sessionStorage;
        let mem_status
        if (storage.getItem('mem_status' == 1)) {
            mem_status = '正常';
        } else {
            mem_status = '停權';
        }
        if (storage.getItem('mem_name') != null) {
            $('.mem_money').text(storage.getItem('mem_money'));
            $('.mem_no').text(storage.getItem('mem_no'));
            $('.level_no').text(storage.getItem('level_no'));
            $('.mem_name').val(storage.getItem('mem_name'));
            $('.set_nickname').val(storage.getItem('set_nickname'));
            $('.titleWrap .set_nickname').text(storage.getItem('set_nickname'));
            $('.mem_id').text(storage.getItem('mem_id'));
            $('.mem_psw').val(storage.getItem('mem_psw'));
            $('.mem_email').val(storage.getItem('mem_email'));
            $('.mem_cell').val(storage.getItem('mem_cell'));
            $('.mem_status').text(mem_status);
            $('.mem_continue').text(storage.getItem('mem_continue') + '天');
            $('.mem_last_lgn').text(storage.getItem('mem_last_lgn'));
        }
        // else {
        //     $(window).attr('location', 'home.html');
        //     $('#loginBox').css('display', 'block');
        // }
    }
    function videoColInit(){
        let storage = sessionStorage;
        let mem_no = storage.getItem('mem_no');
        console.log(mem_no);
        $.ajax({
            url: `member.php`,
            data: {
                action: 'loadVideoCol',
                mem_no,
            },
            type: 'POST',
            success: function (videoRows) {
                let video = JSON.parse(videoRows);
                console.log(video);
                for (let i = 0; i < video.length; i++) {
                    if(video.length!=0){
                        let htmlStr = "";
                        htmlStr += `<a href="${video[i].video_src}" class="videoItem col-12 col-md-3">`;
                        htmlStr += `<div class="imgWrap"><img src="${video[i].video_pic}" alt=""></div>`;
                        htmlStr += `<h3>${video[i].video_name}</h3>`;
                        if(`${video[i].level_no}`==1){
                            htmlStr += `<span class="videoLv">初級</span>`;    
                        }
                        else if(`${video[i].level_no}`==2){
                            htmlStr += `<span class="videoLv">中級</span>`;    
                        }
                        else if(`${video[i].level_no}`==3){
                            htmlStr += `<span class="videoLv">高級</span>`;    
                        }
                        // htmlStr += `<span class="videoLv">${video[i].level_no}</span>`;
                        htmlStr += `</a>`;
                        $('.videoAll').append(htmlStr);
                    }else{
                        let htmlStr = "";
                        htmlStr +=`<div>你還沒有收藏影片</div>`;
                        $('.videoAll').append(htmlStr);
                    }
                }
            },
        }); 
    }
    function achInit(){
        let storage = sessionStorage;
        let mem_no = storage.getItem('mem_no');
        console.log(mem_no);
        $.ajax({
            url: `member.php`,
            data: {
                action: 'loadAchList',
                mem_no,
            },
            type: 'GET',
            success: function (videoRows) {
                let video = JSON.parse(videoRows);
                console.log(video);
                for (let i = 0; i < video.length; i++) {
                    if(video.length!=0){
                        let htmlStr = "";
                        htmlStr += `<div id="ach_${video[i].ach_no}" class="achItem col-6 col-md-3 gray">`;
                        htmlStr += `<img src="${video[i].ach_pic}" alt="ach_pic">`;
                        htmlStr += `<p>${video[i].ach_title}</p>`;
                        htmlStr += `<div class="achCondition achHide" >`;
                        htmlStr += `<span class="ach_con">達成條件</span>`;
                        htmlStr += `<p class="ach_conContent">${video[i].ach_con}</p>`;
                        htmlStr += `</div>`;
                        $('.achAll').append(htmlStr);
                        // style="display:none;"
                    }
                }
            },
        }); 
    }
    function memAchLoad(){
        let storage = sessionStorage;
        let mem_no = storage.getItem('mem_no');
        console.log(mem_no);
        $.ajax({
            url: `member.php`,
            data: {
                action: 'loadMemAch',
                mem_no,
            },
            type: 'GET',
            success: function (videoRows) {
                let video = JSON.parse(videoRows);
                console.log(video);
                for (let i = 0; i < video.length; i++){
                    $(`#ach_${video[i].ach_no}`).removeClass('gray');
                }
            },
        }); 
    }
    function actInit(){}
    function qaInit(){}
    memberInit();
    actInit();
    achInit();
    memAchLoad();
    videoColInit();
    qaInit();

    $('body').on('click', '.memDataEdit', function () {
        if ($(this).siblings('input').hasClass('memDatalock')) {
            $(this).siblings('input').removeAttr('disabled').removeClass('memDatalock')
            $(this).addClass('memEditing');
        } else {
            $(this).siblings('input').attr('disabled')
            $(this).siblings('input').addClass('memDatalock')
            $(this).removeClass('memEditing');
        }
    })
    $('body').on('click', '.memEditing', function () {
        let mem_no = $('.mem_no').text();
        let mem_name = $('.mem_name').val();
        let set_nickname = $('.set_nickname').val();
        let mem_psw = $('.mem_psw').val();
        let mem_email = $('.mem_email').val();
        let mem_cell = $('.mem_cell').val();
        let storage = sessionStorage;
        storage.setItem('mem_name',mem_name);
        storage.setItem('set_nickname',set_nickname);
        storage.setItem('mem_psw',mem_psw);
        storage.setItem('mem_email',mem_email);
        storage.setItem('mem_cell',mem_cell);

        console.log(mem_no);
        console.log(mem_name);
        console.log(set_nickname);
        console.log(mem_psw);
        console.log(mem_email);
        console.log(mem_cell);
        console.log({
            action: `memDataEdit`,
            mem_no,
            mem_name:mem_name,
            set_nickname,
            mem_psw,
            mem_email,
            mem_cell,
        });
        $.ajax({
            url: `member.php`,
            data: {
                action: `memDataEdit`,
                mem_no,
                mem_name:mem_name,
                set_nickname,
                mem_psw,
                mem_email,
                mem_cell,
            },
            type: 'POST',
            success: function (memEditRows) {
                alert('success');
                console.log(memEditRows);
                // var afterEdit = JSON.parse(memEditRows);
                // console.log(afterEdit);
            },
            error: function (action) {
                alert(action);
            }
        })

    })
    $('.achItem').mouseover(function(){
        $(this).find('.achCondition').toggleClass('achHide');
        // alert('OKKOKOKOKO');
    });
})