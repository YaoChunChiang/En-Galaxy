function loginInit() {
    //cookie檢查有沒有登入
    let storage = sessionStorage;
    let date = new Date;
    let today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    function loginCheck() {
        if (storage.getItem('mem_name') != null) {
            $('.memAfterLogin').css({
                'display': 'block'
            });
            $('#memStatusLogin').text(`登出`);
            $('#memStatusId').text(storage.getItem('mem_name') + '  您好!');
            $('#loginStatusCheck').attr('value', true);
        } else {
            storage.clear();
            $('#loginStatusCheck').attr('value',false);
        }
    }
    loginCheck();

    
    //連續登入檢查
    function dateCheck(date){
        if (today != storage['mem_last_lgn']){
            $.ajax({
                url: 'login.php',
                dataType: 'text',
                data: {
                    type: 'dateCheck',
                    today: today,
                    memNo: storage['mem_no']
                },
                type: 'POST',
                success: function (response) {
                    console.log(response);
                    // memIdRow = JSON.parse(response);
                    // $.each(memIdRow, function (i, n) {
                    //     if (n['mem_id'] == $('#mem_id').val()) {
                    //         alert('帳號已被使用!')
                    //     } else {
                    //         $('#memIdCheck').css({
                    //             'color': 'green',
                    //             'borderColor': 'green'
                    //         }).val('可以使用!');
                    //     }
                    // });
                },
                error: function () {
                    console.log('沒連資料庫啦')
                }
            })
        }
    }
    //顯示燈箱或登出
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
    function getInfo(){
        let memId = $('#memId').val();
        let memPsw = $('#memPsw').val();
        if (storage.getItem('mem_name') != null){
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
                    window.alert('帳密錯誤，請重新輸入!')
                } else {
                    mem = JSON.parse(response);
                    // console.log(mem,mem[0].mem_id);
                    for (const key in mem[0]) {
                        storage.setItem(key, mem[0][key]);
                    }
                    
                    $('#memStatusId').text(`${mem[0]['mem_name']} 您好!`);
                    $('#memStatusGEM').text(mem[0]['mem_money']);
                    $('.memAfterLogin').css({
                        'display': 'block'
                    });
                    $('#memStatusLogin').text(`登出`);

                    $('#loginBox').css({
                        'display': 'none'
                    })
                    if ($('#memId').val()!=''){
                        window.alert(storage['mem_name'] + '，您好!')
                    }
                    $('.loginInfo input').val('');
                    
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
        // dateCheck();
    });
    //註冊頁面
    $('#registeredBtn').click(function () {
        $('.loginPage').css('display', 'none');
        $('#loginBox .roleCreate').css('display', 'block');
    })
    //驗證註冊資訊
    $('#mem_id').change(function () {
        $('#memIdCheck').css({
            'color': '#38227c',
            'borderColor': '#ccc'
        }).val('檢查帳號是否可以使用');
    })
    $('#memIdCheck').click(function () {
        if ($('#mem_id').val() == '' || /[a-zA-Z]\w{3,13}/.test($('#mem_id').val()) == false) {
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
                                'color': 'green',
                                'borderColor': 'green'
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
        } else if (/[a-zA-Z]\w{3,13}/.test($('#mem_psw').val()) == false) {
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
            storage.setItem('mem_last_lgn', today);
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