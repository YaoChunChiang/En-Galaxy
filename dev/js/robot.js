$(document).ready(function () {
    let storage = sessionStorage;
    if(storage.getItem('mem_no') != null){
        let setNo = storage.getItem('set_no');
        let setColor = storage.getItem('set_color');
        $.ajax({    
            url: `robot.php?action=loadMemRole`,
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
            }
        });
    }
    $.ajax({    
        url: `robot.php?action=load`,
        data: {
            
        },
        type: 'GET',
        success: function(qnasRows){
            qnas = JSON.parse(qnasRows);
            for(let i=0; i<qnas.length; i++){
                let htmlStr = "";
                htmlStr += `<div id="qOpt${i}" class="qOpt">${qnas[i].keyword_con}</div>`;
                $('.qOpts').append(htmlStr);
            }
        }
    });
    $('.robotConversation').click(function () {
        $('.conversationQ').css('display', 'none');
        $('.conversationSlider').css('display', 'flex');
        $('.conversationClose').css('display', 'block');
        $('.conversationSlider').css('height', '300px');
        if ($(window).width() >= 768) {
            $('.robotConversation').css('top', '39%');
            $('.memberRole').css('bottom', '5%');
        } else {
            $('.robotConversation').css('top', 'calc(100vh - 301px)');
        }
    });
    $('.memberRole').click(function () {
        $('.conversationQ').css('display', 'none');
        $('.conversationSlider').css('display', 'flex');
        $('.conversationClose').css('display', 'block');
        $('.conversationSlider').css('height', '300px');
        if ($(window).width() >= 768) {
            $('.robotConversation').css('top', '39%');
            $('.memberRole').css('bottom', '5%');
        } else {
            $('.robotConversation').css('top', 'calc(100vh - 301px)');
        }
    });
    $('.conversationClose').click(function () {
        if ($(window).width() >= 768) {
            $('.robotConversation').css('top', '79%');
            $('.memberRole').css('bottom', '-12%');
        } else {
            $('.robotConversation').css('top', 'calc(100vh - 77px)');
        }
        $('.conversationSlider').css('height', '0');
        $('.conversationClose').css('display', 'none');
        $('.conversationSlider').css('display', 'none');
        $('.conversationSlider').css('left', '-100%');
        $('.conversationQ').css('display', 'block');
        $('.optChosen').text('');
        $('.answerWithOpt').text('');
        $('.wordInput').text('');
        $('.resultWithInput').text('');
        $('.addToCard').css('display', 'none');
        $('.robotCardClasses').remove();
        $('.addToCard').text('加入字卡');
    });
    $('.translateVocabulary').click(function () {
        $('.conversationSlider').css('left', '0');
    });
    $('.rightToOpts').click(function () {
        $('.conversationSlider').css('left', '-100%');
        $('.wordInput').text('');
        $('.resultWithInput').text('');
        $('.addToCard').css('display', 'none');
        $('.robotCardClasses').remove();
        $('.addToCard').text('加入字卡');
    });
    $('.translateBtn').click(function () {
        if (/^[A-Za-z]+$/.test($('.inputEnglish').val()) == true && $('.inputEnglish').val() != '') {
            $.ajax({
                url: 'translate.php',
                dataType: 'text',
                data: {
                    text: $('.inputEnglish').val()
                },
                type: 'POST',
                success: function (response) {
                    if (/[A-Z]+/.test(response)==1) {
                        $('.resultWithInput').text('查無結果');
                    } else {
                        $('.resultWithInput').text(response);
                    }
                },
                error: function () {
                    $('.resultWithInput').text('系統異常');
                }
            });
            $('.addToCard').css('display', 'inline-block');
            $('.wordInput').text($('.inputEnglish').val());
            $('.inputEnglish').val('');
        }
    });
    //翻譯檢測
    $('.inputEnglish').keyup(function(){
        $('.wordInput').text(' ');
        $('.addToCard').css('display', 'none');
        if (/^[A-Za-z]+$/.test($('.inputEnglish').val()) == false && $('.inputEnglish').val() != ''){
            console.log(/^[A-Za-z]+$/.test($('.inputEnglish').val()))
           $('.resultWithInput').text('只能輸入英文呦!'); 
        }else{
           $('.resultWithInput').text(' '); 
        }
        $('.robotCardClasses').remove();
        $('.addToCard').text('加入字卡');
    })
    $('.qNA').click(function () {
        $('.conversationSlider').css('left', '-200%');
    });
    $('.leftToOpts').click(function () {
        $('.conversationSlider').css('left', '-100%');
        $('.optChosen').text('');
        $('.answerWithOpt').text('');
    });
    // $('.qOpt1').click(function () {
    //     $('.optChosen').text($('.qOpt1').text());
    //     $('.answerWithOpt').text('鄧紫棋，又名G.E.M.，本名鄧詩穎，是一名香港創作歌手。');
    // });
    // $('.qOpt2').click(function () {
    //     $('.optChosen').text($('.qOpt2').text());
    //     $('.answerWithOpt').text('快速動眼期是動物睡眠的一個階段，又稱快速動眼睡眠。');
    // });
    // $('.qOpt3').click(function () {
    //     $('.optChosen').text($('.qOpt3').text());
    //     $('.answerWithOpt').text('阿部瑪利亞是日本偶像藝人，為女子偶像團體AKB48 Team TP成員，神奈川縣出身，所屬經紀公司為日本音樂娛樂。');
    // });
    $('.qOpts').on('click','.qOpt', function(){
        let qnaNo = $(this).attr('id').charAt(4);
        $('.optChosen').text($(this).text());
        $('.answerWithOpt').text(qnas[qnaNo].keyword_ans);
    });
    $('.addToCard').click(function(){
        if(storage.getItem('mem_no') == null){
            alert('請登入!!!')
            $('#loginBox').css('display', 'block');
        }else if($('.addToCard').text() == '加入字卡'){
            let memNo = storage.getItem('mem_no');
            $.ajax({    
                url: `robot.php?action=addToCard`,
                data: {
                    memNo:memNo
                },
                type: 'GET',
                success: function(cardClassesRows){
                    cardClasses = JSON.parse(cardClassesRows);
                    let htmlStr = "";
                    htmlStr += `
                    <div class="robotCardClasses"><label for="cardClasses">字卡類別</label>`;
                    htmlStr += `<select id="cardClasses">`;
                    for(let i=0; i<cardClasses.length; i++){
                        htmlStr += `<option value="${cardClasses[i].mem_no}">${cardClasses[i].card_class}</option>` 
                    }
                    htmlStr += `</select></div>`;
                    $(htmlStr).insertBefore('.addToCard');
                    $('.addToCard').text('確定加入');
                }
            });
        }else{
            let cardClass = $('#cardClasses').val();
            let cardVocabulary = $('.wordInput').text();
            $.ajax({    
                url: `robot.php?action=comfirmAdd`,
                data: {
                    cardClass:cardClass,
                    cardVocabulary:cardVocabulary
                },
                type: 'GET',
                success: function(){
                    
                }
            });
        }
    });
});