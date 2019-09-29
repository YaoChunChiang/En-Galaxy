//未完成
//註冊後依舊獲得金幣,裝備
function gameInit() {
    let x = 0;
    let y = 0;
    let storage = sessionStorage;
    let width = $(window).width();
    let Blue = '#0b99fa';
    let DeepBlue = '#111e4e';
    let Yellow = '#f6d371';
    let gameInitTime = 15;
    let gameTime = gameInitTime;
    let alertTime = 2;
    let roleInitHp = 2;
    let bossInitHp = 2;
    let roleHp = roleInitHp;
    let bossHp = bossInitHp;
    let questionRow;
    let questionNo = 0;
    let pageNo = 0;
    let rewardAmount = 3;
    //隱藏主選單
    $('.gameScreen').click(function () {
        $('.gameMainarea .container').toggleClass('gameSreenFixed')

    })



    //載入遊戲角色形象
    function loadRole() {
        if (sessionStorage['mem_no']) {
            let memNo = sessionStorage['mem_no']
            let memRoleHtml = memRole(memNo);
            $('.gameRole .memberRole').remove()
            $(memRoleHtml).insertBefore('.gameRole .gameHp');
            $('.gameRole>img').remove();
        }
    }
    loadRole();
    //遊戲場景
    let container = $('.gameMainarea .container');
    function changeGameBg(bg) {
        container.css('backgroundImage', `url('img/game/game${bg}.png')`)
    }
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
                'd': `M15 6 H${barWidth / (gameInitTime + 1) * gameTime - 6} V24 L${barWidth / (gameInitTime + 1) * gameTime - 13} 30 H7 V12 Z`
            })
        }
        if (roleHp > 0 && bossHp > 0)
            reduce = setTimeout(gameTimeReduce, 10);
    }
    //UX
    $('.gameMainarea').mousemove(function (e) {
        x = e.pageX + 10;
        y = e.pageY + 10;
    })
    $('.blueButton').mousemove(function () {
        if ($(this).hasClass('disabledButton')) {
            msg('請先提升英文等級呦!');
        }
    })
    $('.blueButton').mouseleave(function () {
        $('#gameMessage').css('display', 'none')
    })
    function msg(text) {
        $('#gameMessage').text(text).css({
            'display': 'block',
            'top': y,
            'left': x
        });
    }

    //限制等級
    function levelLimit() {
        typeof (storage['level_no']) != 'undefined' ? userLevel = storage['level_no'] : userLevel = 1;
        $('.gameMenuPlay').click(function () {
            if (!sessionStorage['mem_no']){
                alertBoxShow(`登入/註冊 會員可以獲得遊戲獎賞喔<br>先去登入或註冊吧!`, '系統訊息', '#7d2c7c', function gameLogin(){
                    $('#loginBox').css('display','block')
                });
            }
                
            $(`.gameMenuLevel div`).removeClass('disabledButton');
            $('.gameMenuStart').css('display', 'none');;
            $('.gameMenuLevel').css('display', 'block');
            let gameMenuLevelAmount = 3;
            for (let i = userLevel; i < gameMenuLevelAmount; i++) {
                $(`.gameMenuLevel div:eq(${i})`).addClass('disabledButton');
            }
        })
    }
    levelLimit();
    // 開始遊戲
    $('.gameMenuLevel div').click(function () {
        if ($(this).index() < userLevel) {
            storage.setItem('game_level', $(this).index() + 1)
            $('.gameStart').css({
                'display': 'none'
            });
            $('.gameBattle').css('display', 'block')
            $('.gameRole').css('display', 'block')
            $('.gameBoss').css('display', 'block')
            $('.gameHp').css('display', 'block')
            gameStart($(this).index() + 1);
            //成就
            // $.post('game.php', { type: 'getAch', mem_no: mem_no }, responese => {});
        }
    })
    $('.gameMenuLevel div').mouseenter(function () {
        let index = $(this).index();
        changeGameBg(`Bg${index + 1}`)
    })

    //抓取題目與答案
    function gameStart(level) {
        $.ajax({
            url: "game.php",
            dataType: "text",
            data: {
                type: 'question',
                level: level,
                questionAmount: roleInitHp + bossInitHp - 1
            },
            type: 'POST',
            success: function (response) {
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
            error: function () {
                console.log('fail')
            }
        })
    }

    // 回答問題
    function Answer() {
        $('.gameBossQuestionText').text(questionRow[questionNo].question)
        gameAns = [questionRow[questionNo].opt_1, questionRow[questionNo].opt_2, questionRow[questionNo].opt_3, questionRow[questionNo].opt_4];
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
            roleHpHeight = $('.gameRole .gameHp').innerHeight() - (roleHp + 1) * 3;
            roleHpHeight = (roleHpHeight / roleHp);
            bossHpHeight = $('.gameBoss .gameHp').innerHeight() - (bossHp + 1) * 3;
            bossHpHeight = (bossHpHeight / bossHp);
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
    $('.gameRoleOptItem').click(function () {
        answer = questionRow[questionNo].answer;
        $("#timehp").text('1');
        window.clearTimeout(alert);
        gameTime = gameInitTime;
        window.clearInterval(alert);
        $('#gameBattleTimeBg').attr({
            'stroke': Blue,
        })
        if ($(this).text() == answer) {
            bossHpChange();
        } else {
            roleHpChange();
        }

        if (roleHp != 0 && bossHp != 0) {
            questionNo++;
            Answer();
        }

        alert = setTimeout(timeAlert, alertTime * 1000);

    });
    //結算
    function end(rewardRow) {
        $('.gameBattle').css('display', 'none');
        $('.gameRole').css('display', 'none');
        $('.gameBoss').css('display', 'none');
        $('.gameEnd').css('display', 'block');
        QAList();
        addPage();
        if (roleHp == 0) {
            changeGameBg('BgLose');
            $('.gameResult').css({
                'backgroundImage': 'url("img/game/lose.png")'
            })
            $('.gameReward').css('display', 'none')
        } else {
            changeGameBg('BgVictory');
            // storage['level_no']
            if (roleHp == roleInitHp && userLevel != 3 && storage['mem_no'] && storage['game_level'] == userLevel) {
                alertBoxShow(`英文等級提升，並且獲得100 G.E.M`, '恭喜獲勝', '#7d2c7c', '');
                storage.setItem('level_no', userLevel * 1 + 1)
                $.post('game.php', { type: 'getMoney', mem_no: storage['mem_no'], level: (userLevel * 1 + 1) }, responese => {});
            } else if (storage['mem_no']) {
                alertBoxShow(`獲得100 G.E.M`, '恭喜獲勝', '#7d2c7c', '');
                $.post('game.php', { type: 'getMoney', mem_no: storage['mem_no'], level: userLevel }, responese => {});
            } else {
                alertBoxShow(``, '恭喜獲勝', '#7d2c7c', function(){
                    $('.alertClose').off('click');
                    $('.alertButton').off('click');
                });
            }
            $('#memStatusGEM').text($('#memStatusGEM').text() * 1 + 100)
            for (let i = 0; i < rewardRow.length; i++) {
                $(`#gameRewardItem${i + 1}`).val(rewardRow[i].equip_no);
                $(`label[for=gameRewardItem${i + 1}]`).find('.gameRewardName').text(rewardRow[i].equip_name);
                $(`label[for=gameRewardItem${i + 1}]`).find('img').attr('src', rewardRow[i].equip_src);
            }
            $('.gameResult').css({
                'backgroundImage': 'url("img/game/victory.png")'
            })
            $('.gameReward').css('display', 'flex')
        }
        resultBlink = setInterval(blink, 700)
    }
    function blink() {
        let bg = $('.gameResult').css('backgroundImage');
        if (bg.indexOf('blink') == -1) {
            $('.gameResult').css('backgroundImage', bg.replace('.png', 'blink.png'))
        } else {
            $('.gameResult').css('backgroundImage', bg.replace('blink', ''))
        }
    }
    //獎賞選擇
    $('.gameRewardItem').click(function () {
        // if ($('input[name=reward]:checked').length == 0) {
        //     let item = $(this).attr('for');
        //     let name = $('h3', this).text();
        // }
        $('.gameRewardItem').not(this).addClass('none');
        $(this).addClass('gameRewardItemGet');
        let equip_no = $(`#${$(this).attr('for')}`).val();
        let mem_no = storage['mem_no'];
        $.post('game.php', { type: 'getReward', equip_no: equip_no, mem_no: mem_no }, responese => {});
        $('.gameRewardText').text('恭喜獲得:請至角色管理查看裝備');
    })
    //再玩一次
    $('.gameAgain').click(function () {
        levelLimit();
        if ($('input[name=reward]:checked').length == 0) {
            // alertBoxShow(``, '恭喜獲得100 G.E.M', '#7d2c7c', '');
        }
        window.clearTimeout(reduce)
        window.clearTimeout(alert)
        $('.gameStart').css('display', 'block');
        $('.gameMenuStart').css('display', 'block');
        $('.gameMenuLevel').css('display', 'none');
        $('.gameBoss').css('display', 'none');
        $('.gameEnd').css('display', 'none');
        if (window.innerWidth >= 768)
            $('.gameRole').css('display', 'block');
        $('.gameHp').css('display', 'none');
        questionNo = 0;
        $('input[name=reward]').prop('checked', false);
        $('.gameRewardItem').removeClass('gameRewardItemGet').removeClass('none');
        $('.gameRewardText').text('請選擇獎品:');
        changeGameBg('Bg');
        clearInterval(resultBlink);
        $('.gameQAPageSelect').html('')
        loadRole();
    })
    //全部問題與答案表格
    $('.gameQList').click(function () {
        $('.gameQAWrap').css('display', 'flex')
        pageNo = 0;
    })
    $('.gameQABoxClose').click(function () {
        $('.gameQAWrap').css('display', 'none')
    })

    $('.gameQAPageSelect').change(function () {
        let value = $(this).val();
        pageNo = value - 1;
        QAList();
    })
    $('.pagePrev').click(function () {
        if (pageNo > 0) {
            pageNo--
            QAList();

            addPage();
        }
    })
    $('.pageNext').click(function () {
        if (pageNo < questionNo) {
            pageNo++
            QAList();

            addPage();
        }

    })
    function addPage() {
        if ($('.gameQAPageSelect option').length > 0) {

        } else {
            for (let i = 0; i <= questionNo; i++) {
                let option = `<option value="${i + 1}">${i + 1}</option>`
                $('.gameQAPageSelect').append(option)
                if (i == pageNo) {
                    $(`.gameQAPageSelect option:eq(${i}})`).prop('selected', true)
                }
            }
        }


    }
    function QAList() {
        let QAListAnswer = questionRow[pageNo].answer;
        $('.gameQAQuestion').html('第 ' + (pageNo + 1) + ' 題<br>' + questionRow[pageNo].question)
        gameAns = [questionRow[pageNo].opt_1, questionRow[pageNo].opt_2, questionRow[pageNo].opt_3, questionRow[pageNo].opt_4];
        $(`.gameQAAnswer`).removeClass('corecrtAnswer')
        for (let i = 0; i < 4; i++) {
            if (QAListAnswer == gameAns[i])
                $(`.gameQAAnswer:eq(${i})`).addClass('corecrtAnswer')
            $(`.gameQAAnswer:eq(${i})`).text(i + 1 + '. ' + gameAns[i]);
        }

    }
    let windowW = $(window).width();
}
window.addEventListener('load', gameInit, false);