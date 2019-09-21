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
                for (let i = 0; i <= Math.floor((questionRow[1].count - 1) / questionAmount); i++) {
                    pageBox.clone().insertBefore('.page-item:last').find('a').text(i + 1);
                }
                questionRow[0].forEach(element => {
                    for (key in element) {
                        if (key == 'question_no') {
                            question.find(`.${key}`).text(element[key]);
                            question.prop('id', 'question' + element[key])
                        } else if (key == "question_status") {
                            question.find(`.${key}`).prop('value', element[key]);
                        } else if (key == "level_no") {
                            let level = element[key];
                            for (let i = 0; i < $(`.${key} option`).length; i++) {
                                let option = question.find(`.${key} option`)[i];
                                $(option).attr('selected', false)
                                if ($(option).attr('value') == level) {
                                    $(option).attr('selected', true)
                                }
                                console.log(level, option)
                            }
                        } else {
                            question.find(`.${key} input`).val(element[key]);
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
        if (storage['gameQuizPage'] == 1) {
            $('.page-item:first').addClass('disabled');
        } else if (storage['gameQuizPage'] == ($('.page-item:last').index() - 1)) {
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
            } else if (page != 0 && page != last) {
                storage['gameQuizPage'] = page;
            }
        })
    }
    //新增題目


    //修改
    function alertBox() {
        $('.questionModifyStart').click(function () {
            $(this).addClass('d-none')
            $(this).next().removeClass('d-none')
            // console.log($(this).closest());
            let modified = $(this).parents('.questionRow').find('.modified');
            for (let i = 0; i < modified.length; i++) {
                // let data = $(modified[i]).html();
                $(modified[i]).attr('disabled', false).css('border', '1px solid #ccc')
                $(modified[i]).attr('readonly', false).css('border', '1px solid #ccc')
            }
        })

    }

    //刪除&修改
    $('#deleteConfirm').click(function () {
        let type = $('#moveType').text();
        let questionNo = $('#moveTarget').text();
        if (type == '刪除') {
            $.ajax({
                url: "quizGame.php",
                data: {
                    type: 'delete',
                    questionNo: questionNo
                },
                dataType: "text",
                success: function (response) {
                    window.location.href = "quizGame.html";
                }
            })
        } else if (type == '修改') {       
            let modified = $(`#question${questionNo}`).find('.modified');
            let modifyData = {};
            for (let i = 0; i < modified.length; i++) {
                let key = $(modified[i]).parent().attr('class');
                if (i == modified.length - 1)
                    key = $(modified[i]).attr('name')
                modifyData[key] = $(modified[i]).val();
            }
            $.ajax({
                url:'test.php',
                type: 'POST',
                dataType:'text',
                data:{
                    type:'modify',
                    questionNo: questionNo,
                    modifyData: modifyData
                },
                success:function(response){
                    console.log(response)
                }
            })
            
            // a = $(modified[i]).val();
        }
    })



    //表單驗證
    $('#answer').keyup(function () {
        let answerRow = [];
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


$('#questionModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget)
    let recipient = button.data('whatever')
    let modal = $(this)
    if (recipient == '@modify') {
        $('#exampleModalLabel').text('修改題庫資料')
        for (let i = 0; i < $(this).find('label').length; i++) {
            let target = $(this).find(`label:eq(${i})`).attr('for');
            let data = button.parents('.questionRow').find(`.${target}`).text();
            if (target == 'level_no') {
                for (let j = 0; j < $(`#${target} option`).length; j++) {
                    if ($(`#${target} option:eq(${j})`).text() == data) {
                        $(`#${target} option:eq(${j})`).prop('selected', true)
                    }
                }
            } else {
                $(`#${target}`).val(data)
            }
        }
    } else {
        $('#exampleModalLabel').text('新增題庫資料')
        // $('#questionModal input').val('');
    }


})


$('#alertModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget)
    let recipient = button.data('whatever')
    let modal = $(this)
    modal.find('#moveTarget').text('')
    modal.find('#moveType').text('')
    modal.find('#moveTarget').text(button.parents('.questionRow').find('.question_no').text());
    modal.find('#moveType').text(button.text());
})

