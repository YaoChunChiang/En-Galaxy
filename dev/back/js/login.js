function loginInit() {
    let storage = sessionStorage;

    //顯示&隱藏重填
    function hideClose() {
        $('.memInfoClear').css({
            'visibility': 'hidden'
        })
    }
    $('.loginInfo input').focus(function () {
        $(this).next().css({
            'visibility': 'visible'
        })
    })
    $('.loginInfo input').focusout(function () {
        setTimeout(hideClose, 200)
    })
    //重填按鈕
    $('.memInfoClear').click(function () {
        $(this).prev().val('');
    })
    //登入更改會員資訊
    $('#submitBtn').click(function () {
        admin_account = $('#memId').val();
        admin_psw = $('#memPsw').val();
        console.log(admin_account);
        console.log(admin_psw);
        $.ajax({
            type: 'GET',
            url: 'adminManage.php',
            data:{
                action: 'getAdmin',
                admin_account,
                admin_psw,
            },
            success: function (response) {
                console.log(response);
                if (response == 0) {
                    alert('帳密錯誤，請重新輸入!')
                } else {
                    admin = JSON.parse(response);
                    for (i = 0; i < admin.length; i++) {
                        storage.setItem("admin_account", `${admin[i].admin_account}`);
                        storage.setItem("admin_level", `${admin[i].admin_level}`);
                    }
                    $('.loginInfo input').val('');
                    window.location.href = "adminManage.html";
                    
                }
            },
            error: function () {
                alert('系統異常')
            }
        });
    })
}
window.addEventListener('load', loginInit)