function loginInit() {
    //cookie檢查有沒有登入
    let storage = sessionStorage;
    console.log(storage.getItem('mem_name'));
    if (storage.getItem('mem_name') != null) {
        $('.memAfterLogin').css({
            'display': 'block'
        });
        $('#memStatusLogin').text(`登出`);
        $('#memStatusId').text(storage.getItem('mem_name') + '  您好!');
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
    $('#submitBtn').click(function () {
        $.ajax({
            url: 'login.php',
            dataType: 'text',
            data: {
                tpye: 'login',
                memId: $('#memId').val(),
                memPsw: $('#memPsw').val()
            },
            type: 'POST',
            success: function (response) {
                if (response == 0) {
                    window.alert('帳密錯誤，請重新輸入!')
                } else {
                    mem = JSON.parse(response);
                    for (const key in mem) {
                        storage.setItem(key, mem[key]);
                    }
                    window.alert(mem.mem_name + '，您好!')
                    $('#memStatusId').text(`${mem.mem_name} 您好!`);
                    $('#memStatusGEM').text(mem.mem_money)
                    $('.memAfterLogin').css({
                        'display': 'block'
                    });
                    $('#memStatusLogin').text(`登出`);

                    $('#loginBox').css({
                        'display': 'none'
                    })
                    $('.loginInfo input').val('');


                }

            },
            error: function () {
                console.log($('#memId').val())
            }
        });
    });
    //註冊頁面
    $('#registeredBtn').click(function () {
        $('.loginPage').css('display', 'none');
        $('#loginBox .roleCreate').css('display', 'block');
    })
    //驗證註冊資訊

    $('#memIdCheck').click(function () {
        if ($('#mem_id').val() == '' || /[a-zA-Z]\w{3,13}/.test($('#mem_id').val()) == false) {
            alert('帳號不得為空值或格式錯誤')
        } else {
            $.ajax({
                url: 'login.php',
                dataType: 'text',
                data: {
                    type: 'mem_id',
                    memId: $('#mem_id').val()
                },
                type: 'POST',
                success: function (response) {
                    memIdRow = JSON.parse(response);
                    $.each(memIdRow,function(i,n){
                        console.log(i,n)
                        if (n['mem_id'] == $('#mem_id').val()){
                            alert('帳號已被使用!')
                        }else{
                            $('#memIdCheck').css('color', 'green').text('可以使用!');
                        }
                    })
                    // if (response == true) {
                    //     window.alert('帳號已被使用!')
                    // } else {
                    //     $('#memIdCheck').css('color', 'green').text('可以使用!')
                    // }
                },
                error: function () {
                    console.log('沒連資料庫啦')
                }
            });
        }

    })
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
        }


    })
}
window.addEventListener('load', loginInit)