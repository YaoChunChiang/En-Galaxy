$(document).ready(function () {
    var storage = sessionStorage;
    if(storage.getItem('mem_no') != null){
        let setNo = storage.getItem('set_no');
        let setColor = storage.getItem('set_color');
        let setNickname = storage.getItem('set_nickname');
        $.ajax({    
            url: `roleCreate.php?action=loadMemRole`,
            data: {
                setNo:setNo 
            },
            type: 'GET',
            success: function(memRoleRow){
                let memRole = JSON.parse(memRoleRow);
                $('.memRoleBody').attr('src',memRole[0].set_body_src).css('filter',`hue-rotate(${setColor}deg)`);
                $('.memRolePart').attr('src',memRole[0].set_part_src);
                $('.memRoleLeftHand').attr('src',memRole[0].set_lefthand_src).css('filter',`hue-rotate(${setColor}deg)`);
                $('.memRoleRightHand').attr('src',memRole[0].set_righthand_src).css('filter',`hue-rotate(${setColor}deg)`);
                $('.createOptsTitle').text('重生你的角色');
                $('.createConfirmBtn').text('重生價 100 G.E.M.').append(`<img src="img/GEM.png" alt="GEMpng" style="width: 24px; vertical-align: text-bottom;">`);
                $('.createNicknameText').val(setNickname);
                $('.createColorBar').val(setColor);
            }
        });
    }
    $.ajax({    
        url: `roleCreate.php?action=load`,
        data: {
            
        },
        type: 'GET',
        success: function(rolesRows){
            let roles = JSON.parse(rolesRows);
            for(let i = 0;i<roles.length;i++){
                let htmlStr = '';
                htmlStr += `<div class="createRace" id="createRaceOpt${roles[i].set_no}"><div class="createRaceImg"><div class="roleBody">`;
                htmlStr += `<img src="${roles[i].set_body_src}" alt="我來組成身體" class="raceBodyImg">`;
                htmlStr += `<div class="rolePart">`;
                htmlStr += `<img src="${roles[i].set_part_src}" alt="我來組成不變色的部分" class="racePartImg">`;
                htmlStr += `</div>
                <div class="roleLeftHand">`;
                htmlStr += `<img src="${roles[i].set_lefthand_src}" alt="我來組成左手" class="raceLeftHandImg">`;
                htmlStr += `</div>
                <div class="roleRightHand">`;
                htmlStr += `<img src="${roles[i].set_righthand_src}" alt="我來組成右手" class="raceRightHandImg">`;
                htmlStr += `</div>
                </div>`;
                htmlStr += `<h5>${roles[i].set_name}</h5>`;
                htmlStr += `</div>
                </div>`;
                $('.createRaceOpts').append(htmlStr);
            }
            $('.createRaceOpts').append(`<input type="hidden" class="createRoleNo" value="${storage.getItem('set_no')}">`);
        }
    });
    $('.createColorBar').change(function () {
        let same = $(this).parents('.createRow');
        console.log(same.parents('#loginbox'))
        same.find('.partColored').css('filter', 'hue-rotate(' + $(this).val() + 'deg)');
    });
    $('.createRaceOpts').on('click','.createRaceImg',function () {
        let same = $(this).parents('.createRow');
        same.find('.createLaser').css('display', 'block');
        same.find('.createRole').css('overflow', 'hidden');
        same.find('.createRole').css('height', '0');
        let srcBody = $(this).find('.raceBodyImg').attr('src');
        let srcPart = $(this).find('.racePartImg').attr('src');
        let srcLeftHand = $(this).find('.raceLeftHandImg').attr('src');
        let srcRightHand = $(this).find('.raceRightHandImg').attr('src');
        same.find('.createRoleNo').val($(this).parent().attr('id').replace('createRaceOpt', ''));
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
    $('.createRaceOpts').on('mouseenter','.createRaceImg', function () {
        $(this).find('.roleBody').addClass('roalFloat');
    });
    $('.createRaceOpts').on('mouseleave','.createRaceImg', function () {
        $(this).find('.roleBody').removeClass('roalFloat');
    });
    $('.createConfirmBtn').click(function () {
        let same = $(this).parents('.createRow');
        if (same.find('.createNicknameText').val() == '') {
            alert('請輸入角色暱稱')
        } else {
            if(storage.getItem('mem_no') == null){
                storage.setItem('set_nickname', same.find('.createNicknameText').val());
                storage.setItem('set_color', same.find('.createColorBar').val());
                storage.setItem('set_no', same.find('.createRoleNo').val());
                $('#loginBox .roleCreate').css('display', 'none');
                $('#loginBox .loginPage').css('display', 'none');
                $('#loginBox').css('display', 'block');
                $('#loginBox .registerPage').css('display', 'block'); 
            }else{
                let nickNameChanged = same.find('.createNicknameText').val()
                let raceChanged = same.find('.createRoleNo').val();
                let colorChanged = same.find('.createColorBar').val();
                let memNo = storage.getItem('mem_no');
                let memMoney = storage.getItem('mem_money') - 100;
                $.ajax({    
                    url: `roleCreate.php?action=rebirthPrice`,
                    data: {
                        nickNameChanged:nickNameChanged,
                        raceChanged:raceChanged,
                        colorChanged:colorChanged,
                        memNo:memNo,
                        memMoney:memMoney
                    },
                    type: 'GET',
                    success: function(){
                        storage.setItem('set_color',colorChanged);
                        storage.setItem('set_no',raceChanged);
                        storage.setItem('set_nickname',nickNameChanged);
                        storage.setItem('mem_money',memMoney);
                        location.reload();
                    }
                });
            }
        }
    })
});