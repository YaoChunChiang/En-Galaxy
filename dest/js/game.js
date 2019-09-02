function init() {

    let width = $(window).width();
    let Blue = '#0b99fa';
    let DeepBlue = '#111e4e';
    let Yellow = '#f6d371';
    let gameInitTime = 3;
    let gameTime = gameInitTime;
    let alertTime = 2;
    let roleHp = 3;
    let bossHp = 1;
    $('.test').click(function () {
        window.clearTimeout(reduce)
        window.clearTimeout(alert)
        $('.gameStart').css({
            'display': 'block'
        });
        $('.gameMenuStart').css({
            'display': 'block'
        });
        $('.gameMenuLevel').css({
            'display': 'none'
        })
        $('.gameBattle').css({
            'display': 'none'
        })
        $('.gameBoss').css({
            'display': 'none'
        })
        $('.gameEnd').css({
            'display': 'none'
        })
        gameTime = gameInitTime;
    })
    //svg
    function gameTimeBar() {
        let barWidth = $(window).width() / 10 * 7;
        if (barWidth > 840)
            barWidth = 840;
        $('#gameBattleTimeBar').attr({
            'width': width / 10 * 7
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
        console.log('start')
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
            if ($('#timehp').text()==0) {
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
    $('.gameMenuPlay').click(function () {
        $('.gameMenuStart').css({
            'display': 'none'
        });
        $('.gameMenuLevel').css({
            'display': 'block'
        })
    })
    // 開始遊戲
    $('.gameMenuLevel div').click(function () {
        $('.gameStart').css({
            'display': 'none'
        });
        $('.gameBattle').css({
            'display': 'block'
        });
        $('.gameBoss').css({
            'display': 'block'
        });
        
        Answer();
        roleHp = 3;
        bossHp = 1;
        Hp();
        gameTime = gameInitTime;
        gameTimeBar();
        gameTimeReduce();
        alert = setTimeout(timeAlert, alertTime * 1000);
    })
    // 回答問題
    function Answer() {
        gameAns = ['yes', 'no', 'no', 'no'];
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
        if ($('.box').length == 0) {
            roleHpHeight = ($('.gameHp').innerHeight() / roleHp) - 4;
            bossHpHeight = ($('.gameHp').innerHeight() / bossHp) - 4;
            for (let i = 0; i < roleHp; i++) {
                $('.gameRoleBox .gameHp').append(`<div class='box'></div>`);
                $('.gameRoleBox .box').css({
                    'height': roleHpHeight,
                });
                $('.gameRoleBox .gameHpText').text(roleHp);
            }
            for (let i = 0; i < bossHp; i++) {
                $('.gameBossBox .gameHp').append(`<div class='box'></div>`);
                $('.gameBossBox .box').css({
                    'height': bossHpHeight,
                });
                $('.gameBossBox .gameHpText').text(bossHp);
            }
        } else {
            $('.gameBossBox .gameHpText').text(bossHp);
            $('.gameRoleBox .gameHpText').text(roleHp);
            $('.box').css({
                'opacity': 1
            })
        }

    }
    //角色血量
    function roleHpChange() {
        roleHp -= 1;
        let total = $('.gameRoleBox .box').length;
        $('.gameRoleBox .gameHpText').text(roleHp);
        $(`.gameRoleBox .box:eq(${total - roleHp - 1})`).css({
            'opacity': 0
        });
        if (roleHp == 0) {
            end();
        }
    }
    //魔王血量
    function bossHpChange() {
        bossHp -= 1;
        let total = $('.gameBossBox .box').length;
        $('.gameBossBox .gameHpText').text(bossHp);
        $(`.gameBossBox .box:eq(${total - bossHp - 1})`).css({
            'opacity': 0
        });
        if (bossHp == 0) {
            end();
        }
    }
    // 下一題
    $('.gameRoleBtn').click(function next() {
        if ($('input[name=Ans]:checked').length > 0) {
            $("#timehp").text('1');
            window.clearTimeout(alert);
            gameTime = gameInitTime;
            window.clearInterval(alert);
            $('#gameBattleTimeBg').attr({
                'stroke': Blue,
            })
            if ($(':checked').val() == 'yes') {
                bossHpChange();
            } else {
                roleHpChange();
            }
            Answer();
            alert = setTimeout(timeAlert, alertTime * 1000);
            
        }
    })
    //結算
    function end() {
        $('.gameBattle').css({
            'display': 'none'
        })
        $('.gameRole').css({
            'display': 'none'
        })
        $('.gameBoss').css({
            'display': 'none'
        })
        $('.gameEnd').css({
            'display': 'block'
        })
        if (roleHp == 0) {
            $('.gameResult').addClass('lose');
            $('.gameReward').css({
                'display': 'none'
            })
        } else {
            $('.gameResult').addClass('victory')
        }
    }
    //獎賞選擇
    $('.gameRewardItem').click(function () {
        // $('.gameRewardItem').not(this).css({
        //     'opacity':0
        // });
        if ($('input[name=reward]:checked').length == 0) {
            let item = $(this).attr('for');
            let name = $('h3', this).text();
            $('.gameRewardItem').not(this).addClass('none');
            $(this).css({
                'width': $(this).width() * 1.2,
                'paddingBottom': $(this).css('paddingBottom').replace('px', '') * 1.2,
            })
            // $(`#${item}`).text() = name;
        }
    })
    //再玩一次
    $('.gameAgain').click(function () {
        window.clearTimeout(reduce)
        window.clearTimeout(alert)
        $('.gameStart').css({
            'display': 'block'
        });
        $('.gameMenuStart').css({
            'display': 'block'
        });
        $('.gameMenuLevel').css({
            'display': 'none'
        })
        $('.gameBoss').css({
            'display': 'none'
        })
        $('.gameEnd').css({
            'display': 'none'
        })
        $('.gameRole').css({
            'display': 'block'
        })
    })
}
window.addEventListener('load', init, false);