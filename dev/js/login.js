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
                    window.alert(mem.mem_name+'，您好!')
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
    $('#registeredBtn').click(function(){
        $('.loginPage').css('display','none');
        $('#loginBox .roleCreate').css('display', 'block');
    })
}
window.addEventListener('load', loginInit)