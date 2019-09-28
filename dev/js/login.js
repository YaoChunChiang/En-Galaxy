function loginInit() {
    //取得日期
    function getDay(day) {
        let today = new Date();
        let Year = today.getFullYear();
        let Month = today.getMonth();
        let Day = today.getDate();
        let finDate = new Date(Year, Month, Day);
        let nYear = finDate.getFullYear();
        let nMonth = finDate.getMonth() + 1;
        if (nMonth < 10)
            nMonth = "0" + nMonth;
        let nDay = finDate.getDate() + day;
        if (nDay < 10)
            nDay = "0" + nDay;
        return nYear + "-" + nMonth + "-" + nDay;
    }
    //cookie檢查有沒有登入
    let storage = sessionStorage;

    function loginCheck() {
        if (storage.getItem('mem_name') != null) {

            // $('.memAfterLogin').css({
            //     'display': 'block'
            // });
            // $('#memStatusLogin').text(`登出`);
            // $('#memStatusId').text(storage.getItem('mem_name') + '  您好!');
            // $('#memStatusGEM').text(storage['mem_money']);
            // $('#loginStatusCheck').attr('value', true);
            getInfo('autoCheck')

            setTimeout(dateCheck, 200);
        } else {
            storage.clear();
            $('#loginStatusCheck').attr('value', false);
            if (window.location.pathname.indexOf('/role.html') != -1 || window.location.pathname.indexOf('/member.html') != -1) {
                window.location.href = 'home.html';
            }
        }
    }
    loginCheck();


    //連續登入檢查
    function dateCheck(date) {
        if (getDay(0) != storage['mem_last_lgn']) {
            let memContinue = storage['mem_continue'];
            if (getDay(-1) == storage['mem_last_lgn']) {
                memContinue = memContinue * 1 + 1;
            } else {
                memContinue = '1'
            }

            $.ajax({
                url: 'login.php',
                dataType: 'text',
                data: {
                    type: 'dateCheck',
                    today: getDay(0),
                    memContinue: memContinue,
                    memNo: storage['mem_no']
                },
                type: 'POST',
                success: function (response) {
                    storage['mem_last_lgn'] = getDay(0);
                    storage['mem_continue'] = memContinue;
                }
            })
        }
    }
    //顯示燈箱或登出
    let location = window.location.href;
    $('#memStatusLogin').click(function () {
        if ($('#memStatusLogin').text() == '註冊 / 登入') {
            $('#loginBox').css('display', 'block');
            $('.loginPage').css('display', 'block');
            $('#loginBox .roleCreate').css('display', 'none');
            $('.registerPage').css('display', 'none');
            $('#loginBox').find('.createRaceImg').removeClass('createRaceImgChecked')
            $('#loginBox').find('.createRaceImg:eq(0)').addClass('createRaceImgChecked')
        } else {
            $('#memStatusId').text('');
            $('.memAfterLogin').css({
                'display': 'none'
            });
            $('#memStatusLogin').text('註冊 / 登入');
            storage.clear();
            if (location.indexOf('member.html') != -1 || location.indexOf('role.html') != -1) {
                window.location.href = 'home.html';
            } else {
                window.location.reload();
            }

        }

    })
    //關閉燈箱
    $('#loginBoxClose').click(function () {
        $('#loginBox').css('display', 'none');
        $('.loginPage').css('display', 'block');
        $('#loginBox .roleCreate').css('display', 'none');
        $('.registerPage').css('display', 'none');
        $('#loginBox input').not('#memIdCheck').val('');
        storage.clear();
    })
    //顯示&隱藏重填
    let inputTarget;
    $('.loginInfo input').focus(function () {
        inputTarget = $(this)
        $(this).next().css({
            'visibility': 'visible'
        })
    })
    $('.loginInfo input').focusout(function (target) {
        hideClose(inputTarget)
    })
    function hideClose(target) {
        let clear = $(target).parent().find('.memInfoClear')
        console.log(clear)
        setTimeout(function () {
            $(clear).css({
                'visibility': 'hidden'
            })
        }, 200)
    }
    //重填按鈕
    $('.memInfoClear').click(function () {
        $(this).prev().val('');
    })
    //登入更改會員資訊
    function getInfo(move) {
        if (move == 'login') {
            memId = $('#memId').val();
            memPsw = $('#memPsw').val();
        } else if (move == 'registered' || move == 'autoCheck') {
            memId = storage.getItem('mem_id');
            memPsw = storage.getItem('mem_psw');
        };

        $.ajax({
            url: 'login.php',
            dataType: 'text',
            data: {
                type: 'getInfo',
                memId: memId,
                memPsw: memPsw
            },
            type: 'POST',
            success: function (response) {
                if (response == 0) {
                    alertBoxShow(`帳密錯誤`, '系統訊息', '#7d2c7c', '');
                    // $('.loginInfo input').val('');
                } else {
                    mem = JSON.parse(response);
                    for (const key in mem[0]) {
                        storage.setItem(key, mem[0][key]);
                    }
                    console.log(storage['mem_status'])
                    if(storage['mem_status']==0){
                        alertBoxShow('已被停權，請聯絡管理員','系統訊息','#7d2c7c',()=>{storage.clear();window.location.reload()})
                        return;
                    }
                    $('.loginInfo input').val('');
                    if (move == 'autoCheck') {
                        $('.memAfterLogin').css({
                            'display': 'block'
                        });
                        $('#memStatusLogin').text(`登出`);
                        $('#memStatusId').text(storage.getItem('mem_name') + '  您好!');
                        $('#memStatusGEM').text(storage['mem_money']);
                        $('#loginStatusCheck').attr('value', true);
                    }
                    if (move == 'login') {
                        window.location.reload();
                        console.log(response)
                    } else if (move == 'registered') {
                        achGet(0, '註冊成功<br><br>', () => { window.location.reload() })
                    }
                    $('#loginBox').css('display', 'none');

                }
            },
            error: function () {
                alert('系統異常')
            }
        });
    }
    $('#submitBtn').click(function () {
        getInfo('login');
        // dateCheck();
    });
    //選擇角色和顏色
    $('#loginBox').find('.createRace').click(function () {
        //顏色、邊框初始化
        $('#loginBox').find('.createRaceImg').removeClass('createRaceImgChecked')
        $('#loginBox').find('.createColorBar').val('0')
        $('#loginBox').find('.createRaceImg').find('img').css('filter', 'hue-rotate(0deg)')
        //click後增加邊框
        $(this).find('.createRaceImg').addClass('createRaceImgChecked')
    })
    //數值改變變換顏色
    $('#loginBox').find('.createColorBar').change(function () {
        let value = $(this).val()
        $('#loginBox').find('.createRaceImgChecked').find('img').not('img[src*="Part"]').css('filter', `hue-rotate(${value}deg)`)
    })
    //按下滑鼠增加拖動事件
    $('#loginBox').find('.createColorBar').mousedown(function () {
        $(window).mousemove(function () {
            let value = $('#loginBox').find('.createColorBar').val()
            //排除不變色的部分
            $('#loginBox').find('.createRaceImgChecked').find('img').not('img[src*="Part"]').css('filter', `hue-rotate(${value}deg)`)
        })
    })
    //取消事件
    $(window).mouseup(function () {
        $(window).off('mousemove')
    })

    //註冊頁面
    $('#registeredBtn').click(function () {
        $('.loginPage').css('display', 'none');
        $('#loginBox .roleCreate').css('display', 'block');
    })
    //驗證註冊資訊
    $('#mem_id').keydown(function () {
        $('#memIdCheck').css({
            'color': 'white',
            'backgroundColor': '#38227c'
        }).val('檢查帳號是否可以使用');
    })
    $('#memIdCheck').click(function () {
        if ($('#mem_id').val() == '' || /\w{4,13}/.test($('#mem_id').val()) == false) {
            alert('帳號不得為空值或格式錯誤')
        } else {
            $.ajax({
                url: 'login.php',
                dataType: 'text',
                data: {
                    type: 'mem_id'
                },
                type: 'POST',
                success: function (response) {
                    memIdRow = JSON.parse(response);
                    let mem = [];
                    for (let i = 0; i < memIdRow.length; i++) {
                        mem.push(memIdRow[i].mem_id)
                    }
                    if (mem.indexOf($('#mem_id').val()) != -1) {
                        alertBoxShow(`帳號已被使用`, '系統訊息', '#7d2c7c', '');
                    } else {
                        $('#memIdCheck').css({
                            'backgroundColor': 'green'
                        }).val('可以使用!');
                    }
                }
            });
        };
    });
    $('#registerSubmit').click(function () {
        console.log(/^\w+@{1}\w+.\w+.\w*/.test($('#mem_email').val()))
        if ($('#memIdCheck').val() != '可以使用!') {
            alert('請先檢查帳號是否可以使用')
        } else if (/\w{3,13}/.test($('#mem_psw').val()) == false) {
            alert('密碼不得為空值或格式錯誤')
        } else if ($('#mem_psw').val() != $('#pswChecked').val()) {
            alert('確認密碼與密碼不同')
        } else if (/^09[0-9]{8}/.test($('#mem_cell').val()) == false) {
            alert('手機電話不得為空值或格式錯誤')
        } else if (/^\w+@{1}\w+.\w+.\w*/.test($('#mem_email').val()) == false) {
            alert('email不得為空值或格式錯誤')
        } else {
            $('#loginBox').css('display', 'none');
            registerInfo = $('.registerInfo input[type=text]').not('#pswChecked');
            for (let i = 0; i < registerInfo.length; i++) {
                let info = $('.registerInfo input[type=text]').not('#pswChecked')[i]
                storage.setItem(info.getAttribute('id'), info.value)
            }
            storage.setItem('mem_psw', $("#mem_psw").val())
            storage.setItem('level_no', '1');
            storage.setItem('mem_money', '3333');
            storage.setItem('mem_status', '1');
            storage.setItem('mem_continue', '1');
            storage.setItem('mem_last_lgn', getDay(0));
            let memData = new Object();
            for (let i = 0; i < storage.length; i++) {
                memData[storage.key(i)] = storage.getItem(storage.key(i));
            }
            $.ajax({
                url: 'login.php',
                dataType: 'text',
                data: {
                    type: 'registered',
                    data: memData
                },
                type: 'POST',
                success: function (response) {
                    console.log(response)
                    let mem_name = storage.getItem('mem_name');
                    loginCheck();
                    getInfo('registered');
                },
                error: function () {
                    alert('系統異常');
                }
            })

        }


    })

}
window.addEventListener('load', loginInit)