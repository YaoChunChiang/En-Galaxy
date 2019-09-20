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
    function actInit(){}
    function achInit(){}
    function videoColInit(){}
    function forumInit(){}
    memberInit();
    actInit();
    achInit();
    videoColInit();
    forumInit();
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
})