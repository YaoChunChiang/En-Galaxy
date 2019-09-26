$(document).ready(function () {
    //登入資訊初始化
    let storage = sessionStorage;
    let mem_no = storage.getItem('mem_no');
    let memRoleHtml = memRole(mem_no);
    $('.avatarImage').append(memRoleHtml);

    function memberInit() {
        let storage = sessionStorage;
        let mem_no = storage.getItem('mem_no');
        console.log(mem_no);
        let mem_status
        if (storage.getItem('mem_status') == 1) {
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
            $('.titleWrap .set_nicknameText').text(storage.getItem('set_nickname'));
            $('.mem_id').text(storage.getItem('mem_id'));
            $('.mem_psw').val(storage.getItem('mem_psw'));
            $('.mem_email').val(storage.getItem('mem_email'));
            $('.mem_cell').val(storage.getItem('mem_cell'));
            $('.mem_status').text(mem_status);
            $('.mem_continue').text(storage.getItem('mem_continue') + '天');
            $('.mem_last_lgn').text(storage.getItem('mem_last_lgn'));
        }
        $.ajax({
            url: `member.php`,
            data: {
                action: 'loadTitleOnEquip',
                mem_no,
            },
            type: 'GET',
            success: function (titleEquipRows) {
                let titleEquip = JSON.parse(titleEquipRows);
                console.log(titleEquip);
                for (let i = 0; i < titleEquip.length; i++) {
                    if (`${titleEquip[i].ach_status}` == 1) {
                        $('.titleOnEquip').text(`${titleEquip[i].ach_title}`);
                        storage.setItem('equipAch', `${titleEquip[i].ach_no}`);
                        $(`#ach_n${titleEquip[i].ach_no}`).addClass('onEquip');
                        console.log(`#ach_n${titleEquip[i].ach_no}`);
                    }
                }
            },
        });
        // else {
        //     $(window).attr('location', 'home.html');
        //     $('#loginBox').css('display', 'block');
        // }
    }

    function videoColInit() {
        let storage = sessionStorage;
        let mem_no = storage.getItem('mem_no');
        $.ajax({
            url: `member.php`,
            data: {
                action: 'loadVideoCol',
                mem_no,
            },
            type: 'POST',
            success: function (videoRows) {
                let video = JSON.parse(videoRows);
                for (let i = 0; i < video.length; i++) {
                    if (video.length != 0) {
                        let htmlStr = "";
                        htmlStr += `<div id="videoCol_${video[i].video_no}" class="videoItem col-12 col-md-3">`
                        htmlStr += `<a href="video.html?video_no=${video[i].video_src}">`;
                        htmlStr += `<div class="imgWrap"><img src="video/${video[i].video_pic}" alt=""></div>`;
                        htmlStr += `<h3>${video[i].video_name}</h3>`;
                        htmlStr += `</a>`;
                        htmlStr += `<div class="videoBtnWrap">`;
                        if (`${video[i].level_no}` == 1) {
                            htmlStr += `<span class="videoLv">初級</span>`;
                        } else if (`${video[i].level_no}` == 2) {
                            htmlStr += `<span class="videoLv">中級</span>`;
                        } else if (`${video[i].level_no}` == 3) {
                            htmlStr += `<span class="videoLv">高級</span>`;
                        }
                        htmlStr += `<button class="videoCancell">取消收藏</button></div>`;
                        htmlStr += `</div>`;
                        $('.videoAll').append(htmlStr);
                    } else {
                        let htmlStr = "";
                        htmlStr += `<div>你還沒有收藏影片</div>`;
                        $('.videoAll').append(htmlStr);
                    }
                }
            },
        });
    }

    function achInit() {
        let storage = sessionStorage;
        let mem_no = storage.getItem('mem_no');
        $.ajax({
            url: `member.php`,
            data: {
                action: 'loadAchList',
                mem_no,
            },
            type: 'GET',
            success: function (videoRows) {
                let video = JSON.parse(videoRows);
                for (let i = 0; i < video.length; i++) {
                    if (video.length != 0) {
                        let htmlStr = "";
                        htmlStr += `<div id="ach_n${video[i].ach_no}" class="achItem col-6 col-md-3 gray">`;
                        htmlStr += `<img src="${video[i].ach_pic}" alt="ach_pic">`;
                        htmlStr += `<p>${video[i].ach_title}</p>`;
                        htmlStr += `<div id="ach_${video[i].ach_no}" class="achCondition achHide" >`;
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

    function memAchLoad() {
        let storage = sessionStorage;
        let mem_no = storage.getItem('mem_no');
        $.ajax({
            url: `member.php`,
            data: {
                action: 'loadMemAch',
                mem_no,
            },
            type: 'GET',
            success: function (videoRows) {
                let video = JSON.parse(videoRows);
                for (let i = 0; i < video.length; i++) {
                    $(`#ach_n${video[i].ach_no}`).removeClass('gray');
                }
            },
        });
    }

    function actContentInit() {
        let storage = sessionStorage;
        let mem_no = storage.getItem('mem_no');
        let today = storage.getItem('mem_last_lgn');
        $.ajax({
            url: `member.php`,
            data: {
                action: 'loadDefaultAct',
                mem_no,
                today,
            },
            type: 'GET',
            success: function (actContentRows) {
                let actContent = JSON.parse(actContentRows);
                $('.actContent').html("");
                if (actContent.length > 0) {
                    for (let i = 0; i < actContent.length; i++) {
                        console.log(today);
                        // if(today == `${actContent[i].act_date}`){
                        let htmlStr = "";
                        htmlStr += `<h2>活動主題 :${actContent[i].act_name}</h2>`;
                        htmlStr += `<ul class="col-12 col-md-10">`;
                        htmlStr += `<li class="col-12 col-md-12"><p class="col-12 col-md-6"> 發起人員 : </p><span class="col-12 col-md-12">${actContent[i].act_holder}</span></li>`;
                        htmlStr += `<li class="col-12 col-md-12"><p class="col-12 col-md-6"> 活動時間 : </p><span class="col-12 col-md-12 actContentDate">${actContent[i].act_date}</span></li>`;
                        htmlStr += `<li class="col-12 col-md-12"><p class="col-12 col-md-6"> 活動地點 : </p><span class="col-12 col-md-12">${actContent[i].act_place}</span></li>`;
                        htmlStr += `<li class="col-12 col-md-12"><p class="col-12 col-md-6"> 活動內容 : </p><span class="col-12 col-md-12">${actContent[i].act_detail}</span></li>`;
                        htmlStr += `<li class="col-12 col-md-12"><p class="col-12 col-md-6"> 報名人數 : </p><span class="col-12 col-md-12">${actContent[i].join_count}/${actContent[i].act_max}</span></li>`;
                        htmlStr += `</ul>`;
                        htmlStr += `<div class="wrapBtnActCancell"><button class="btnActCancell">取消報名</button></div>`;
                        $('.actContent').append(htmlStr);
                        storage.setItem('actContent_no', actContent[i].act_no);
                        // }
                    }
                } else {
                    let noAct = $('<h2></h2>').text('這天還沒有活動喔');
                    $('.actContent').append(noAct);
                }
            },
        });
    }


    function actContentPointer() {
        let storage = sessionStorage;
        let mem_no = storage.getItem('mem_no');
        let day = storage.getItem('pointerDate');
        $.ajax({
            url: `member.php`,
            data: {
                action: 'loadPointerAct',
                mem_no,
                day,
            },
            type: 'GET',
            success: function (actContentRows) {
                let actContent = JSON.parse(actContentRows);
                $('.actContent').html("");
                // day == `${actContent[i].act_date}
                if (actContent.length > 0) {
                    for (let i = 0; i < actContent.length; i++) {
                        let htmlStr = "";
                        htmlStr += `<h2>活動主題 :${actContent[i].act_name}</h2>`;
                        htmlStr += `<ul class="col-12 col-md-10">`;
                        htmlStr += `<li class="col-12 col-md-12"><p class="col-12 col-md-6"> 發起人員 : </p><span class="col-12 col-md-12">${actContent[i].act_holder}</span></li>`;
                        htmlStr += `<li class="col-12 col-md-12"><p class="col-12 col-md-6"> 活動時間 : </p><span class="col-12 col-md-12 actContentDate">${actContent[i].act_date}</span></li>`;
                        htmlStr += `<li class="col-12 col-md-12"><p class="col-12 col-md-6"> 活動地點 : </p><span class="col-12 col-md-12">${actContent[i].act_place}</span></li>`;
                        htmlStr += `<li class="col-12 col-md-12"><p class="col-12 col-md-6"> 活動內容 : </p><span class="col-12 col-md-12">${actContent[i].act_detail}</span></li>`;
                        htmlStr += `<li class="col-12 col-md-12"><p class="col-12 col-md-6"> 報名人數 : </p><span class="col-12 col-md-12">${actContent[i].join_count}/${actContent[i].act_max}</span></li>`;
                        htmlStr += `</ul>`;
                        htmlStr += `<div class="wrapBtnActCancell"><button class="btnActCancell">取消報名</button></div>`;
                        $('.actContent').append(htmlStr);
                        storage.setItem('actContent_no', actContent[i].act_no);
                    }
                } else {
                    let h2 = $('<h2></h2>').text('這天還沒有活動喔');
                    $('.actContent').append(h2);
                }


            },
            error: function () {}
        });
    }

    function getDate(start, end) {
        start = new Date(start).getTime();
        end = new Date(end).getTime();
        var date = [];
        for (; start <= end; start += 86400000) {
            var tmp = new Date(start);
            console.log(tmp.getMonth() + 1);
            if (tmp.getMonth() + 1 < 10) {
                date.push(tmp.getFullYear() + '-0' + (tmp.getMonth() + 1) + '-' + tmp.getDate());
            } else {
                date.push(tmp.getFullYear() + '-' + (tmp.getMonth() + 1) + '-' + tmp.getDate());
            }
        }
        return date;
    }

    function actCalendarInitCheck() {
        let storage = sessionStorage;
        let today = storage.getItem('mem_last_lgn');
        let continueCheck = storage.getItem('mem_continue');
        continueCheck = parseInt(continueCheck) - 1;
        console.log(continueCheck);
        let continueStart = moment(today).subtract(continueCheck, 'day').format('YYYY-MM-DD');
        console.log(continueStart);
        let dateDue = `${continueStart}--${today}`.split('--');
        console.log(dateDue);
        let datesDraw = getDate(dateDue[0], dateDue[1]);
        console.log(datesDraw);

        for (i = 0; i < $('.fc-day').length; i++) {
            for (j = 0; j < datesDraw.length; j++) {
                if ($('.fc-day').eq(i).attr(`data-date`) == `${datesDraw[j]}`) {
                    // $('.fc-day').eq(i).addClass('datesDraw');
                    // $('.fc-day').eq(i).html(htmlStr);
                    let htmlStr = "";
                    htmlStr += `<div class="checkImg"><img src="img/member/check.svg" alt="check"></div>`;
                    $('.fc-day').eq(i).append(htmlStr);
                }
            }
        }
    }

    function actCalendarInitEvent() {
        let storage = sessionStorage;
        let mem_no = storage.getItem('mem_no');
        // let day = storage.getItem('pointerDate');
        $.ajax({
            url: `member.php`,
            data: {
                action: 'loadmemAct',
                mem_no,
            },
            type: 'GET',
            success: function (actContentRows) {
                let actContent = JSON.parse(actContentRows);
                console.log(actContent);
                if (actContent.length > 0) {

                    for (i = 0; i < $('.fc-day').length; i++) {
                        for (j = 0; j < actContent.length; j++) {
                            if ($('.fc-day').eq(i).attr(`data-date`) == `${actContent[j].act_date}`) {
                                $('.fc-day').eq(i).addClass('datesDraw');
                                // let htmlStr = "";
                                // htmlStr +=`<div class="checkImg"><img src="img/member/check.svg" alt="check"></div>`;
                                // $('.fc-day').eq(i).append(htmlStr);
                            }
                        }
                    }
                    // for (let i = 0; i < actContent.length; i++) {
                    //     `${act_date}`
                    // }
                } else {

                }


            },
            error: function () {}
        });
    }

    function qaInit() {}
    achInit();
    memberInit();
    actCalendarInitCheck();
    actCalendarInitEvent();
    actContentInit();
    memAchLoad();
    videoColInit();
    qaInit();

    $('body').on('click', '.memDataEdit', function () {
        if ($(this).siblings('input').hasClass('memDatalock')) {
            $(this).siblings('input').removeAttr('disabled').removeClass('memDatalock')
            $(this).addClass('memEditing');
        }
        // else {
        //     $(this).siblings('input').attr('disabled')
        //     $(this).siblings('input').addClass('memDatalock')
        //     $(this).removeClass('memEditing');
        // }
    })
    $('body').on('click', '.dataContentButtonConfirm', function () {
        let mem_no = $('.mem_no').text();
        let mem_name = $('.mem_name').val();
        let set_nickname = $('.set_nickname').val();
        let mem_psw = $('.mem_psw').val();
        let mem_email = $('.mem_email').val();
        let mem_cell = $('.mem_cell').val();
        let storage = sessionStorage;
        console.log(mem_name);
        console.log(set_nickname);
        console.log(mem_psw);
        console.log(mem_email);
        console.log(mem_cell);
        alertBoxShow('確定要變更會員資料嗎?', "注意", "red");
        $('body').on('click', '.alertButton', function () {
            storage.setItem('mem_name', mem_name);
            storage.setItem('set_nickname', set_nickname);
            storage.setItem('mem_psw', mem_psw);
            storage.setItem('mem_email', mem_email);
            storage.setItem('mem_cell', mem_cell);
            $.ajax({
                url: `member.php`,
                data: {
                    action: `memDataEdit`,
                    mem_no,
                    mem_name: mem_name,
                    set_nickname,
                    mem_psw,
                    mem_email,
                    mem_cell,
                },
                type: 'POST',
                success: function (memEditRows) {
                    var afterEdit = JSON.parse(memEditRows);
                    console.log(afterEdit);
                },
                complete:function(){
                    alertBoxShow('會員資料已變更', "注意", "red");
                    $('.mem_name').attr('disabled');
                    $('.mem_name').addClass('memDatalock');
                    $('.set_nickname').attr('disabled');
                    $('.set_nickname').addClass('memDatalock');
                    $('.mem_psw').attr('disabled');
                    $('.mem_psw').addClass('memDatalock');
                    $('.mem_email').attr('disabled');
                    $('.mem_email').addClass('memDatalock');
                    $('.mem_cell').attr('disabled');
                    $('.mem_cell').addClass('memDatalock');
                    for (i = 0; i < $('.memDataEdit').length; i++) {
                        $('.memDataEdit').eq(i).removeClass('memEditing');
                    }
                    memberInit();
                },
                error: function (action) {
                    alert(action);
                }
            })
        })
    })
    $('body').on('click', '.dataContentButtonCancel', function () {
        // alert('123123');
        alertBoxShow('確定要取消目前變更的會員資料嗎?', "注意", "red");
        $('body').on('click', '.alertButton', function () {
            memberInit();
            $('.mem_name').attr('disabled');
            $('.mem_name').addClass('memDatalock');
            $('.set_nickname').attr('disabled');
            $('.set_nickname').addClass('memDatalock');
            $('.mem_psw').attr('disabled');
            $('.mem_psw').addClass('memDatalock');
            $('.mem_email').attr('disabled');
            $('.mem_email').addClass('memDatalock');
            $('.mem_cell').attr('disabled');
            $('.mem_cell').addClass('memDatalock');
            for (i = 0; i < $('.memDataEdit').length; i++) {
                $('.memDataEdit').eq(i).removeClass('memEditing');
            }
            alertBoxShow('已取消目前變更的會員資料', "注意", "red");
        })
    });
    $('body').on('mouseover', '.achItem', function () {
        $(this).find('.achCondition').removeClass('achHide');
    });
    $('body').on('mouseout', '.achItem', function () {
        $(this).find('.achCondition').addClass('achHide');
    });
    $('body').on('click', '.fc-day-top', function () {
        let storage = sessionStorage;
        let date = $(this).attr('data-date');
        storage.setItem('pointerDate', date);
        actContentPointer();
    });
    $('body').on('click', '.achItem', function () {
        let storage = sessionStorage;
        let achReadyChange = storage.getItem('equipAch');
        storage.setItem('achReadyChange', achReadyChange);
        let ach_noPre = $(this).find('.achCondition').attr('id').split('_');
        storage.setItem('equipAch', ach_noPre[1]);
        let mem_no = storage.getItem('mem_no');
        let ach_no = storage.getItem('equipAch');
        // let achReadyChange = storage.getItem('achReadyChange');
        console.log(ach_no);
        console.log(achReadyChange);
        alertBoxShow('確定要變更稱號嗎?', "注意", "red");
        $('body').on('click', '.alertButton', function () {
            $.ajax({
                url: `member.php`,
                data: {
                    action: 'equipMemAch',
                    mem_no,
                    ach_no,
                    achReadyChange,
                },
                type: 'POST',
                success: function (videoRows) {
                    console.log(videoRows);
                    memberInit();
                },
                complete:function(){
                    alertBoxShow('稱號已變更', "注意", "red");
                },
            });
        })

        $(this).addClass('onEquip').siblings('.achItem').removeClass('onEquip');
    });
    $('body').on('click', '.fc-prev-button', function () {
        memberInit();
        actContentInit();
        actCalendarInitCheck();
        actCalendarInitEvent();
    });
    $('body').on('click', '.fc-next-button', function () {
        memberInit();
        actContentInit();
        actCalendarInitCheck();
        actCalendarInitEvent();
    });
    $('body').on('click', '.btnActCancell', function () {
        let storage = sessionStorage;
        let mem_no = storage.getItem('mem_no');
        let act_no = storage.getItem('actContent_no');
        let date = $('.actContentDate').text();
        console.log(date);
        console.log(mem_no);
        console.log(act_no);
        alertBoxShow('確定要取消這個活動嗎?', "注意", "red");
        $('body').on('click', '.alertButton', function () {
            $.ajax({
                url: `member.php`,
                data: {
                    action: 'actCancell',
                    mem_no,
                    act_no,
                },
                type: 'POST',
                success: function (actContentRows) {
                    console.log(actContentRows);
                    $('.actContent').html("");
                    let h2 = $('<h2></h2>').text('這天還沒有活動喔');
                    $('.actContent').append(h2);
                    for (j = 0; j < 49; j++) {
                        if ($('.fc-day').eq(j).attr(`data-date`) == date) {
                            $('.fc-day').eq(j).removeClass('datesDraw');
                        }
                    }
                },
                complete: function () {
                    alertBoxShow('活動已取消', "注意", "red");
                },
                error: function () {}
            });

        })

    });
    $('body').on('click', '.videoCancell', function () {
        // let thisBtn = this;
        let storage = sessionStorage;
        let mem_no = storage.getItem('mem_no');
        let canCellId = $(this).closest('.videoItem').attr("id");
        canCellReady = canCellId.split('_');
        let video_no = canCellReady[1];
        console.log(mem_no);
        console.log(video_no);
        alertBoxShow('確定要刪除這支影片嗎?', "注意", "red");
        $('body').on('click', '.alertButton', function () {
            $.ajax({
                url: `member.php`,
                data: {
                    action: 'videoColCancell',
                    mem_no,
                    video_no,
                },
                type: 'POST',
                success: function (actContentRows) {
                    // let actContent = JSON.parse(actContentRows);
                    console.log(actContentRows);
                    $(`#videoCol_${video_no}`).remove();

                },
                complete: function () {
                    alertBoxShow('影片已刪除', "注意", "red");
                },
                error: function () {
                    // $(`videoCol_1${video_no}`).remove();
                }
            });
        });

    });

})