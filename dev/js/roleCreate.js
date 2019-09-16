$(document).ready(function () {
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
        let type = srcBody.replace('Body.png', '').replace('img/role/race', '');
        same.find('.createRoleNo').val(`${type}`);
        console.log(same.find('.createRoleNo').val())
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
        console.log(1);
        let same = $(this).parents('.createRow');
        if (same.find('.createNicknameText').val() == '') {
            alert('請輸入角色暱稱')
        } else {
            sessionStorage.setItem('setnick', same.find('.createNicknameText').val());
            sessionStorage.setItem('setColor', same.find('.createColorBar').val());
            sessionStorage.setItem('setRace', same.find('.createRoleNo').val());
            $('#loginBox .roleCreate').css('display', 'none');
            $('#loginBox .loginPage').css('display', 'none');
            $('#loginBox').css('display', 'block');
            $('#loginBox .registerPage').css('display', 'block');
        }

    })
});