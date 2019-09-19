function quizGameInit() {
    let storage = sessionStorage;
    if (storage['gameQuizPage'] == null) {
        storage.setItem('gameQuizPage', 1);
    }
    let questionPage = storage['gameQuizPage'];
    let questionAmount = 5;
    let questionNo = (questionPage - 1) * questionAmount + 1;
   
    
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
                        } else {
                            question.find(`.${key}`).text(element[key]);
                        }
                    }
                    question.clone().appendTo('tbody');
                    questionNo++;
                });
                $('.question_status[value="1"]').prop('checked', true);
                $('.qustionAmount').text(`共 ${questionRow[1].count} 題`)
                activePage();
            }
        })
    }
    tableData();
    
    //頁面
    function activePage() {
        $('.page-item').removeClass('active');
        $(`.page-item:eq(${storage['gameQuizPage']})`).addClass('active');
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
            console.log(storage['gameQuizPage'], $(this).index())

            // tableData();
        })
    }
    
    



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
        // e.preventDefault();

        // if ($('.form-control')){
        //     console.log('no');
        // }
        // if($('#answer').val())
    })

    //燈箱關閉&顯示
    $('.quizGameCancel').click(function () {
        $('.questionAddBox').toggleClass('d-none');
    })
    $('.quizGameUpload').click(function () {
        $('.questionAddBox').toggleClass('d-none');
    })
}
window.addEventListener('load', quizGameInit);
