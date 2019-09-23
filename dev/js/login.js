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
            $('.memAfterLogin').css({
                'display': 'block'
            });
            $('#memStatusLogin').text(`登出`);
            $('#memStatusId').text(storage.getItem('mem_name') + '  您好!');
            $('#memStatusGEM').text(storage['mem_money']);
            $('#loginStatusCheck').attr('value', true);
        } else {
            storage.clear();
            $('#loginStatusCheck').attr('value', false);
        }
    }
    loginCheck();


    //連續登入檢查
    function dateCheck(date) {
        console.log(getDay(0) != storage['mem_last_lgn'])
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
                },
                error: function () {
                    console.log('沒連資料庫啦');
                    console.log(storage['mem_last_lgn'], storage['mem_no']);
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
        storage.clear();
    })
    //顯示&隱藏重填
    $('.loginInfo input').focus(function () {
        $(this).next().css({
            'visibility': 'visible'
        })
    })
    $('.loginInfo input').focusout(function () {
        setTimeout(hideClose, 200)
    })
    function hideClose() {
        $('.memInfoClear').css({
            'visibility': 'hidden'
        })
    }
    //重填按鈕
    $('.memInfoClear').click(function () {
        $(this).prev().val('');
    })
    //登入更改會員資訊
    function getInfo() {
        let memId = $('#memId').val();
        let memPsw = $('#memPsw').val();
        if (storage.getItem('mem_name') != null) {
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
                    alert('帳密錯誤，請重新輸入!')
                } else {
                    mem = JSON.parse(response);
                    for (const key in mem[0]) {
                        storage.setItem(key, mem[0][key]);
                    }
                    // $('#memStatusId').text(`${mem[0]['mem_name']} 您好!`);
                    // $('#memStatusGEM').text(mem[0]['mem_money']);
                    // $('.memAfterLogin').css({
                    //     'display': 'block'
                    // });
                    // $('#memStatusLogin').text(`登出`);

                    // $('#loginBox').css({
                    //     'display': 'none'
                    // })
                    // if ($('#memId').val() != '') {
                    //     alert(storage['mem_name'] + '，您好!')
                    // }
                    $('.loginInfo input').val('');
                    window.location.reload();
                }
            },
            error: function () {
                alert('系統異常')
            }
        });
    }
    $('#submitBtn').click(function () {
        getInfo();
        loginCheck();
        setTimeout(dateCheck, 200);
        // dateCheck();
    });
    //註冊頁面
    $('#registeredBtn').click(function () {
        $('.loginPage').css('display', 'none');
        $('#loginBox .roleCreate').css('display', 'block');
    })
    //驗證註冊資訊
    $('#mem_id').keydown(function () {
        $('#memIdCheck').css({
            'color': 'white'
        }).val('檢查帳號是否可以使用');
    })
    $('#memIdCheck').click(function () {
        if ($('#mem_id').val() == '' || /\w{3,13}/.test($('#mem_id').val()) == false) {
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
                    $.each(memIdRow, function (i, n) {
                        if (n['mem_id'] == $('#mem_id').val()) {
                            alert('帳號已被使用!')
                        } else {
                            $('#memIdCheck').css({
                                'backgroundColor': 'green'
                            }).val('可以使用!');
                        }
                    });
                },
                error: function () {
                    console.log('沒連資料庫啦')
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
            storage.setItem('level_no', '1');
            storage.setItem('mem_money', '100');
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
                    alert('註冊成功!\n' + storage.getItem('mem_name') + '您好!');
                    loginCheck();
                    getInfo();
                },
                error: function () {
                    alert('系統異常');
                }
            })

        }


    })

}
window.addEventListener('load', loginInit)