//未完成: 
// 會員獲得武器
// 角色動畫
// 血條MARGIN
// END場景配置
function gameInit() {
    let x = 0;
    let y = 0;
    let storage = sessionStorage;
    let width = $(window).width();
    let Blue = '#0b99fa';
    let DeepBlue = '#111e4e';
    let Yellow = '#f6d371';
    let gameInitTime = 5;
    let gameTime = gameInitTime;
    let alertTime = 2;
    let roleInitHp = 2;
    let bossInitHp = 1;
    let roleHp = roleInitHp;
    let bossHp = bossInitHp;
    let questionRow;
    let questionNo = 0;
    let rewardAmount = 3;
    typeof (storage['level_no']) != 'undefined' ? userLevel = storage['level_no'] : userLevel = 1;
    //svg
    function gameTimeBar() {
        let barWidth = $(window).width() / 10 * 7;
        if (barWidth > 840)
            barWidth = 840;
        // $('#gameBattleTimeBar').attr({
        //     'width': width / 10 * 7
        // });
        $('#gameBattleTimeBar svg').attr({
            'width': barWidth
        });
        $('#gameBattleTimeBg').attr({
            'd': `M15 0 H${barWidth} V24 L${barWidth - 13} 36 H0 V15 Z`,
            'fill': DeepBlue,
            'stroke': Blue,
            'stroke-width': 2,
            'stroke-linecap': "butt"
        })
        $('#gameBattleTime').attr({
            'd': `M15 6 H${barWidth - 6} V24 L${barWidth - 13} 30 H7 V12 Z`,
            'fill': Yellow
        })
        $('#gameBattleTimeWhite').attr({
            'd': `M15 0 L${barWidth} 0 L${barWidth} 18 L 0 18 L0 12 L15 0`,
            'fill': 'rgba(255,255,255,.2)'
        })
    }
    // rwd
    $(window).resize(function () {
        gameTimeBar();
    })
    //時間條
    gameTimeBar();
    function timeAlert() {
        let stroke = $('#gameBattleTimeBg').attr('stroke');
        if (stroke == 'red') {
            $('#gameBattleTimeBg').attr({
                'stroke': Blue,
            })
        } else {
            $('#gameBattleTimeBg').attr({
                'stroke': 'red',
            })
        }
        if (roleHp > 0 && bossHp > 0)
            alert = setTimeout(timeAlert, 500);
    }
    function gameTimeReduce() {
        let barWidth = $(window).width() / 10 * 7;
        if (barWidth > 840)
            barWidth = 840;
        $('.gameBattleTimeText span').text(Math.round(gameTime));
        if (gameTime < 0.1) {
            window.clearTimeout(alert);
            $('#gameBattleTimeBg').attr({
                'stroke': Blue,
            })
            alert = setTimeout(timeAlert, alertTime * 1000);
            if ($('#timehp').text() == 0) {
                roleHpChange();
            }
            Answer();
            gameTime = gameInitTime;
        } else {
            gameTime -= 0.01;
            $('#gameBattleTime').attr({
                'd': `M15 6 H${barWidth / gameInitTime * gameTime - 6} V24 L${barWidth / gameInitTime * gameTime - 13} 30 H7 V12 Z`
            })
        }
        if (roleHp > 0 && bossHp > 0)
            reduce = setTimeout(gameTimeReduce, 10);
    }
    //UX
    $('.gameMainarea').mousemove(function(e){
        x = e.pageX;
        y = e.pageY;
    })
    $('.gameVolume').mousemove(function(){
        msg('音量');
    })
    $('.gameVolume').mouseleave(function () {
        $('#gameMessage').css('display', 'none')
    })
    $('.blueButton').mousemove(function(){
        if ($(this).attr('class').indexOf('disabledButton')!=-1){
            msg('請先提升英文等級呦!');
        }
    })
    $('.blueButton').mouseleave(function(){
        $('#gameMessage').css('display','none')
    })
    function msg(text){
        $('#gameMessage').text(text).css({
            'display':'block',
            'top':y,
            'left':x
        });
    }
        
    //限制等級
    $('.gameMenuPlay').click(function () {
        $('.gameMenuStart').css('display', 'none');;
        $('.gameMenuLevel').css('display', 'block');
        let gameMenuLevelAmount = 3;
        for (let i = userLevel; i <= gameMenuLevelAmount ; i++){
            $(`.gameMenuLevel div:eq(${i})`).addClass('disabledButton');
        }
    })
    // 開始遊戲
    $('.gameMenuLevel div').click(function () {
        
        if ($(this).index()< userLevel){
            $('.gameStart').css({
                'display': 'none'
            });
            $('.gameBattle').css('display', 'block')
            $('.gameRole').css('display', 'block')
            $('.gameBoss').css('display', 'block')
            $('.gameHp').css('display', 'block')
            gameStart($(this).index() + 1);
        }
    })
    //抓取題目與答案
    function gameStart(level){
        $.ajax({
            url: "game.php",
            dataType: "text",
            data:{
                type: 'question',
                level: level,
                questionAmount:roleInitHp + bossInitHp - 1
            },
            type:'POST',
            success:function(response){
                questionRow = JSON.parse(response);
                Answer();
                roleHp = roleInitHp;
                bossHp = bossInitHp;
                Hp();
                gameTime = gameInitTime;
                gameTimeBar();
                gameTimeReduce();
                alert = setTimeout(timeAlert, alertTime * 1000);
            },
            error:function(){
                console.log('fail')
            }
        })
    }

    // 回答問題
    function Answer() {
        $('.gameBossQuestionText').text(questionRow[questionNo].question)
        gameAns = [questionRow[questionNo].opt_1,questionRow[questionNo].opt_2,questionRow[questionNo].opt_3,questionRow[questionNo].opt_4];
        for (let i = 1; i <= 4; i++) {
            let Num = Math.round(Math.random() * (4 - i));
            let AnsTxt = gameAns[Num];
            gameAns.splice(Num, 1);
            $(`#Ans${i}`).val(AnsTxt);
            $(`#Ans${i}`).prop("checked", false);
            $(`#Ans${i} + label`).text(AnsTxt);
        }
        $("#timehp").text(0);
    }
    //血量
    function Hp() {
        if ($('.gameHpBlock').length == 0) {
            gameHpHeight = $('.gameHp').innerHeight() - 12;
            roleHpHeight = (gameHpHeight / roleHp);
            bossHpHeight = (gameHpHeight / bossHp);
            for (let i = 0; i < roleHp; i++) {
                $('.gameRole .gameHp').append(`<div class='gameHpBlock'></div>`);
                $('.gameRole .gameHpBlock').css({
                    'height': roleHpHeight,
                });
                $('.gameRole .gameHpText').text(roleHp);
            }
            for (let i = 0; i < bossHp; i++) {
                $('.gameBoss .gameHp').append(`<div class='gameHpBlock'></div>`);
                $('.gameBoss .gameHpBlock').css({
                    'height': bossHpHeight,
                });
                $('.gameBoss .gameHpText').text(bossHp);
            }
        } else {
            $('.gameBoss .gameHpText').text(bossHp);
            $('.gameRole .gameHpText').text(roleHp);
            $('.gameHpBlock').css({
                'opacity': 1
            })
        }
    }
    //角色血量
    function roleHpChange() {
        $('.gameRole img').addClass('hitted');
        setTimeout(() => {
            $('.gameRole img').removeClass('hitted');
        }, 1000);
        roleHp -= 1;
        let total = $('.gameRole .gameHpBlock').length;
        $('.gameRole .gameHpText').text(roleHp);
        $(`.gameRole .gameHpBlock:eq(${total - roleHp - 1})`).css({
            'opacity': 0
        });
        if (roleHp == 0) {
            end();
        }
    }
    //魔王血量
    function bossHpChange() {
        $('.gameBoss img').addClass('hitted');
        setTimeout(() => {
            $('.gameBoss img').removeClass('hitted');
        }, 1000);
        bossHp -= 1;
        let total = $('.gameBoss .gameHpBlock').length;
        $('.gameBoss .gameHpText').text(bossHp);
        $(`.gameBoss .gameHpBlock:eq(${total - bossHp - 1})`).css('opacity', 0);
        if (bossHp == 0) {
            $.ajax({
                url: "game.php",
                dataType: "text",
                data: {
                    type: 'reward',
                    rewardAmount: rewardAmount
                },
                type: 'POST',
                success: function (response) {
                    rewardRow = JSON.parse(response);
                    end(rewardRow);
                },
                error: function () {
                    console.log('fail')
                }
            })
        }
    }
    // 下一題
    $('.gameRoleBtn').click(function(){
        answer = questionRow[questionNo].answer;
        if ($('input[name=Ans]:checked').length > 0) {
            $("#timehp").text('1');
            window.clearTimeout(alert);
            gameTime = gameInitTime;
            window.clearInterval(alert);
            $('#gameBattleTimeBg').attr({
                'stroke': Blue,
            })
            if ($(':checked').val() == answer) {
                bossHpChange();
            } else {
                roleHpChange();
            }
            questionNo++;
            if (roleHp != 0 && bossHp != 0)
            Answer();
            alert = setTimeout(timeAlert, alertTime * 1000);
        }
    });
    //結算
    function end(rewardRow) {
        $('.gameBattle').css('display', 'none');
        $('.gameRole').css('display', 'none');
        $('.gameBoss').css('display', 'none');
        $('.gameEnd').css('display', 'block');
        if (roleHp == 0) {
            $('.gameResult').css({
                'backgroundImage':'url("img/game/lose.png")'
            })
            $('.gameReward').css('display', 'none')
        } else {
            for (let i = 0; i < rewardRow.length;i++){
                $(`#gameRewardItem${i+1}`).val(rewardRow[i].equip_no);
                $(`label[for=gameRewardItem${i+1}]`).find('.gameRewardName').text(rewardRow[i].equip_name);
                $(`label[for=gameRewardItem${i + 1}]`).find('img').attr('src',rewardRow[i].equip_src);
            }
            $('.gameResult').css({
                'backgroundImage':'url("img/game/victory.png")'
            })
            $('.gameReward').css('display', 'flex')
        }
    }
    //獎賞選擇
    $('.gameRewardItem').click(function () {
        if ($('input[name=reward]:checked').length == 0) {
            let item = $(this).attr('for');
            let name = $('h3', this).text();
            console.log($(this).val())
            $('.gameRewardItem').not(this).addClass('none');
            $(this).addClass('gameRewardItemGet');
        }
    })
    //再玩一次
    $('.gameAgain').click(function () {
        window.clearTimeout(reduce)
        window.clearTimeout(alert)
        $('.gameStart').css('display', 'block');
        $('.gameMenuStart').css('display', 'block');
        $('.gameMenuLevel').css('display', 'none');
        $('.gameBoss').css('display', 'none');
        $('.gameEnd').css('display', 'none');
        if(window.innerWidth>=768)
        $('.gameRole').css('display', 'block');
        $('.gameHp').css('display', 'none');
        questionNo = 0;
        $('input[name=reward]').prop('checked',false);
        $('.gameRewardItem').removeClass('gameRewardItemGet');
        $('.gameRewardItem').removeClass('none');
    })
}
window.addEventListener('load', init, false);