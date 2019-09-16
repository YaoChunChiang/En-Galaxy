$(document).ready(function () {
    $.ajax({    
        url: `robot.php?action=load`,
        data: {
            
        },
        type: 'GET',
        success: function(qnasRows){
            let qnas = JSON.parse(qnasRows);
            for(let i=0; i<qnas.length; i++){
                let htmlStr = "";
                htmlStr += `<div class="col-lg-4">`;
                htmlStr += `<div class="card" id="${qnas[i].keyword_no}">`;
                htmlStr += `<div class="card-header">常見問答${qnas[i].keyword_no}</div>`;
                htmlStr += `<div class="card-body">`;
                htmlStr += `<form action="" method="get" enctype="multipart/form-data">`;
                htmlStr += `<table class="table table-responsive-sm table-sm">`;
                htmlStr += `<tr><th>常見問題</th><td><input class="form-control qnaQ" type="text" value="${qnas[i].keyword_con}"></td></tr>`;
                htmlStr += `<tr><th>常見問題的回答</th><td><textarea class="form-control qnaA" rows="3" value="">${qnas[i].keyword_ans}</textarea></td></tr>`;
                if(qnas[i].keyword_status == 0){
                    htmlStr += `<tr><th>常見問答上架狀態</th><td><label class="switch switch-3d switch-success"><input class="switch-input qnaStatus" type="checkbox"><span class="switch-slider"></span></label></td></tr>`;
                }else{
                    htmlStr += `<tr><th>常見問答上架狀態</th><td><label class="switch switch-3d switch-success"><input class="switch-input qnaStatus" type="checkbox" checked="checked"><span class="switch-slider"></span></label></td></tr>`;
                }
                htmlStr += `</table>`;
                htmlStr += `<div class="row"><div class="col-6 col-sm-4 col-md-2 col-xl mb-3 mb-xl-0"><button class="btn btn-pill btn-block btn-success confirmModify" type="button">確認修改</button></div><div class="col-6 col-sm-4 col-md-2 col-xl mb-3 mb-xl-0"><button class="btn btn-pill btn-block btn-danger delete" type="button">刪除</button></div></div>`;
                htmlStr += `</form></div></div></div>`;
                $('.qnasRow').append(htmlStr);
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
    });
    $('.translateVocabulary').click(function () {
        $('.conversationSlider').css('left', '0');
    });
    $('.rightToOpts').click(function () {
        $('.conversationSlider').css('left', '-100%');
        $('.wordInput').text('');
        $('.resultWithInput').text('');
        $('.addToCard').css('display', 'none')
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
        
    })
    $('.qNA').click(function () {
        $('.conversationSlider').css('left', '-200%');
    });
    $('.leftToOpts').click(function () {
        $('.conversationSlider').css('left', '-100%');
        $('.optChosen').text('');
        $('.answerWithOpt').text('');
    });
    $('.qOpt1').click(function () {
        $('.optChosen').text($('.qOpt1').text());
        $('.answerWithOpt').text('鄧紫棋，又名G.E.M.，本名鄧詩穎，是一名香港創作歌手。');
    });
    $('.qOpt2').click(function () {
        $('.optChosen').text($('.qOpt2').text());
        $('.answerWithOpt').text('快速動眼期是動物睡眠的一個階段，又稱快速動眼睡眠。');
    });
    $('.qOpt3').click(function () {
        $('.optChosen').text($('.qOpt3').text());
        $('.answerWithOpt').text('阿部瑪利亞是日本偶像藝人，為女子偶像團體AKB48 Team TP成員，神奈川縣出身，所屬經紀公司為日本音樂娛樂。');
    });
});