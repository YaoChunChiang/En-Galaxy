function loginInit() {
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
        $('.loginInfo input').val('');
        console.log($('#memId').val());
        $('loginInfo').index()
    })
}
window.addEventListener('load', loginInit)