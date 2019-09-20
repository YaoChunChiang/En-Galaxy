function quizGameInit() {
    let storage = sessionStorage;
    if (storage['gameQuizPage'] == null) {
        storage.setItem('gameQuizPage', 1);
    }
    let questionPage = storage['gameQuizPage'];
    let questionAmount = 5;
    let questionNo = (questionPage - 1) * questionAmount + 1;
   
    let selection = $('#level_no').attr({'id':'','name':''}).clone();
    //內容資料
    function tableData() {
        $.ajax({
            url: "quizGame.php",
            data: {
                type: 'queryQuestion',
                page: storage['gameQuizPage'],
                amount: questionAmount
            },
            dataType: "text",
            success: function (response) {
                questionRow = JSON.parse(response);
                question = $('.questionRow').clone();
                pageBox = $('.page-item:first').clone();
                $('.template').remove();
                $('tbody').html('');
                $('.page-item').not('.page-item:first').not('.page-item:last').remove();
                for (let i = 0; i <= Math.floor((questionRow[1].count - 1) / questionAmount);i++){
                    pageBox.clone().insertBefore('.page-item:last').find('a').text(i+1);
                }                    
                questionRow[0].forEach(element => {
                    for (key in element) {
                        if (key == "question_status") {
                            question.find(`.${key}`).prop('value', element[key]);
                        }else if(key == "level_no") {
                            if (element[key] == '1'){
                                levelWord = '初級';
                            } else if (element[key] == '2'){
                                levelWord = '中級';
                            } else if (element[key] == '3'){
                                levelWord = '高級';
                            }
                            question.find(`.${key}`).text(levelWord);
                        }else {
                            question.find(`.${key}`).text(element[key]);
                        }
                    }
                    question.clone().appendTo('tbody');
                    questionNo++;
                });
                $('.question_status[value="1"]').prop('checked', true);
                $('.qustionAmount').text(`共 ${questionRow[1].count} 題`)
                activePage();
                alertBox();
            }
        })
    }
    tableData();
    
    //頁面
    function activePage() {
        $('.page-item').removeClass('active').removeClass('disabled');
        $(`.page-item:eq(${storage['gameQuizPage']})`).addClass('active');
        if (storage['gameQuizPage']==1){
            $('.page-item:first').addClass('disabled');
        } else if (storage['gameQuizPage'] == ($('.page-item:last').index() - 1)){
            $('.page-item:last').addClass('disabled');
        }
        $('.page-item').click(function (e) {
            let page = $(this).index();
            let last = $('.page-item:last').index();

            if (page == 0 && storage['gameQuizPage'] - 1 > 0) {
                storage['gameQuizPage']--;
            } else if (page == last && storage['gameQuizPage'] < last - 1) {
                // if (storage['gameQuizPage'] + 1 < last)
                storage['gameQuizPage']++;
            } else if (page != 0 && page!= last){
                storage['gameQuizPage'] = page;
            }
        })
    }
    
    //修改&刪除燈箱
    function getQuestionNo(target) {
        // $('#moveType').text($(target).text());
        // $('#moveTarget').text($(target).parents('.questionRow').find('.question_no').text());
    }
    function alertBox(){
        $('.questionModifyOpen').click(function () {
            $(this).addClass('d-none')
            $(this).prev().removeClass('d-none')
            let modified = $(this).parents('.questionRow').find('.modified');
            for (let i = 0; i < modified.length;i++){
                let data = $(modified[i]).html();
                let input = $('<input size="10" class="form-control form-control-sm">').val(data)
                $(modified[i]).html('')
                if(i==0){
                    $(modified[i]).append(selection);
                }else{
                    $(modified[i]).append(input);
                }
                
            }
        })
        
    }

    //修改和刪除
    $('#modifyConfirm').click(function () {
        $.ajax({
            url: "quizGame.php",
            data: {
                type: $('#moveType').text(),
                questionNo: $('#moveTarget').text()
            },
            dataType: "text",
            success: function (response) {
                window.location.href = "quizGame.html";
            }
        })
    })
    


    //表單驗證
    $('#answer').keyup(function () {
        let answerRow = [];
        console.log($('.form-control')[2]);
        for (let i = 0; i < $("input[id*='opt']").length; i++) {
            answerRow.push($("input[id*='opt']")[i].value);
        }
        if (answerRow.indexOf($('#answer').val()) == -1) {
            $('label[for="answer"] span').css('display', 'inline');
        } else {
            $('label[for="answer"] span').css('display', 'none');
        }
    })
    $('.quizGameConfirm').click(function (e) {
        if ($('.invalid-feedback').css('display') != 'none') {
            e.preventDefault();
        }
    })
    
}
window.addEventListener('load', quizGameInit);

$('#alertModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget)
    let recipient = button.data('whatever')
    let modal = $(this)
    modal.find('#moveTarget').text('')
    modal.find('#moveType').text('')
    modal.find('#moveTarget').text(button.parents('.questionRow').find('.question_no').text());
    modal.find('#moveType').text(button.text());
})

