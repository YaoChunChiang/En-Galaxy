$(document).ready(function () {
    var storage = sessionStorage;
    $('.createColorBar').change(function () {
        let same = $(this).parents('.createRow');
        console.log(same.parents('#loginbox'))
        same.find('.partColored').css('filter', 'hue-rotate(' + $(this).val() + 'deg)');
    });
    $('.createRaceImg').click(function () {
        let same = $(this).parents('.createRow');

        same.find('.createLaser').css('display', 'block');
        same.find('.createRole').css('overflow', 'hidden');
        same.find('.createRole').css('height', '0');
        let srcBody = $(this).find('.raceBodyImg').attr('src');
        let srcPart = $(this).find('.racePartImg').attr('src');
        let srcLeftHand = $(this).find('.raceLeftHandImg').attr('src');
        let srcRightHand = $(this).find('.raceRightHandImg').attr('src');
        same.find('.createRoleNo').val($(this).parent().index() + 1);
        setTimeout(function () {
            same.find('.createBodyImg').attr('src', srcBody);
            same.find('.createPartImg').attr('src', srcPart);
            same.find('.createLeftHandImg').attr('src', srcLeftHand);
            same.find('.createRightHandImg').attr('src', srcRightHand);
            same.find('.createRole').css('height', '67%');
        }, 500);
        setTimeout(function () {
            same.find('.createRole').css('overflow', 'unset');
            same.find('.createLaser').css('display', 'none');
        }, 1000);
    });
    $('.createRaceImg').mouseenter(function () {
        $(this).find('.roleBody').addClass('roalFloat');
    });
    $('.createRaceImg').mouseleave(function () {
        $(this).find('.roleBody').removeClass('roalFloat');
    });
    $('.createConfirmBtn').click(function () {
        let same = $(this).parents('.createRow');
        if (same.find('.createNicknameText').val() == '') {
            alert('請輸入角色暱稱')
        } else {
            storage.setItem('set_nickname', same.find('.createNicknameText').val());
            storage.setItem('set_color', same.find('.createColorBar').val());
            storage.setItem('set_no', same.find('.createRoleNo').val());
            $('#loginBox .roleCreate').css('display', 'none');
            $('#loginBox .loginPage').css('display', 'none');
            $('#loginBox').css('display', 'block');
            $('#loginBox .registerPage').css('display', 'block');            
        }

    })
});