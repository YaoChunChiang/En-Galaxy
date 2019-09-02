function loginInit() {
    //顯示燈箱或登出
    $('#memStatusLogin').click(function () {
        if ($('#memStatusLogin').text() =='註冊 / 登入'){
            $('#loginBox').css({
                'display': 'block'
            })
        }else{
            $('#memStatusId').text('');
            $('.memAfterLogin').css({
                'display':'none'
            });
            $('#memStatusLogin').text('註冊 / 登入');
        }
        
    })
    //關閉燈箱
    $('#loginBoxClose').click(function () {
        $('#loginBox').css({
            'display': 'none'
        })
    })
    //顯示&隱藏重填
    $('.loginInfo input').focus(function () {
        $(this).next().css({
            'visibility': 'visible'
        })
    })
    $('.loginInfo input').focusout(function () {
        setTimeout(hideClose,200)  
    })
    function hideClose(){
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
        // $.ajax({
        //     url: 'C:/inetpub/wwwroot/phpLab/project/login.php',
        //     dataType: 'text',
        //     data: {
        //         memId: $('#memId').val(),
        //         memPsw: $('#memPsw').val()
        //     },
        //     type: 'POST',
        //     success: function (response) {
        //         window.alert(response)
        //     }
        // });
        let memId = $('#memId').val();
        // $('#memStatus').append(
        //     `<span id="memStatusId">${memId} 您好!</span>
        //     <div class="memStatusGEMPic">
        //         <img src="img/GEM.png" alt="">
        //     </div>
        //     <span id="memStatusGEM">8888</span>
        //     <div id="memStatusAlarm">
        //         <img src="img/alarm.png" alt="">
        //     </div>`
        // )
        $('.memAfterLogin').css({
            'display':'flex'
        });
        $('#memStatusLogin').text(`登出`);
        $('#memStatusId').text(`${memId} 您好!`);
        $('#loginBox').css({
            'display': 'none'
        })
        $('.loginInfo input').val('');
        console.log($('#memId').val());
    })
}
window.addEventListener('load', loginInit)