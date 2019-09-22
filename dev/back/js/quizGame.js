function quizGameInit() {
    let storage = sessionStorage;
    if (storage['gameQuizPage'] == null) {
        storage.setItem('gameQuizPage', 1);
    }
    let questionPage = storage['gameQuizPage'];
    //單頁顯示數量
    let questionAmount = 6;
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
                statusChange();
                checkEvent();
            }
        })
    }
    tableData();

    //清除頁面SESSION
    $('.nav-link').click(function(){
        sessionStorage.clear();
    })

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


    //修改
    function alertBox() {
        let lastQuestionRow;
        let lastBtn;
        $('.questionModifyStart').click(function () {
            $(this).addClass('d-none')
            $(this).next().removeClass('d-none')
            let modified = $(this).parents('.questionRow').find('.modified');
            for (let i = 0; i < modified.length; i++) {
                if (lastQuestionRow != undefined) {
                    $(lastQuestionRow[i]).attr('disabled', true).css('border', 'none')
                    $(lastQuestionRow[i]).attr('readonly', true).css('border', 'none')
                }
                $(modified[i]).attr('disabled', false).css('border', '1px solid #ccc')
                $(modified[i]).attr('readonly', false).css('border', '1px solid #ccc')
            }
            if (lastBtn != undefined) {
                $(lastBtn).removeClass('d-none')
                $(lastBtn).next().addClass('d-none')
            }
            lastBtn = $(this);
            lastQuestionRow = modified;
        })

    }

    //刪除&修改
    function statusChange() {
        $('.switch').click(function () {
            let status = $(this).find('input').prop('checked');
            if (status == true) {
                $(this).find('input').val('1')
            } else {
                $(this).find('input').val('0')
            }
        })
    }

    $('#confirmBtn').click(function () {
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
                },
                error: function () {
                    console.log('a');
                }
            })
        } else if (type == '確認修改') {
            let modified = $(`#question${questionNo}`).find('.modified');
            let modifyData = {};
            for (let i = 0; i < modified.length; i++) {
                let key = $(modified[i]).parent().attr('class');
                if (i == modified.length - 1)
                    key = $(modified[i]).attr('name')
                modifyData[key] = $(modified[i]).val();
            }
            $.ajax({
                url: 'quizGame.php',
                dataType: 'text',
                data: {
                    type: 'modify',
                    questionNo: questionNo,
                    modifyData: modifyData
                },
                success: function (response) {
                    window.location.reload("quizGame.html");
                }
            })
        }
    })

    //表單驗證
    function modifyCheck(targetWrap, opt) {
        let answerRow = [];
        for (let i = 0; i < opt.length; i++) {
            let value = $(opt[i]).find('input').val();
            let index = answerRow.indexOf(value);
            //空值
            if (value == '') {
                $(opt[i]).find('.invalid-feedback').css('display', 'inline').text('不得為空值')
            }
            //重複 
            else if (index != -1) {
                $(opt[i]).find('.invalid-feedback').css('display', 'inline').text('選項重複')
                $(opt[index]).find('.invalid-feedback').css('display', 'inline').text('選項重複')
            } else {
                $(opt[i]).find('.invalid-feedback').css('display', 'none').text('')
                $(opt[index]).find('.invalid-feedback').css('display', 'none').text('')
            }
            answerRow.push($(opt[i]).find('input').val());
        }
        //正確答案
        let answer = $(targetWrap).find('input[name="answer"]');
        if (answerRow.indexOf($(answer).val()) == -1) {
            $(answer).parent().find('.invalid-feedback').css('display', 'inline');
            // $(targetWrap).find('.answer .invalid-feedback').css('display', 'inline')
        } else {
            $(answer).parent().find('.invalid-feedback').css('display', 'none');
        }
        //傳送確認
        let feedback = $(targetWrap).find('.invalid-feedback');
        let btn = $(targetWrap).find('button[class*=Confirm]')
        for (let i = 0; i < feedback.length; i++) {
            if ($(feedback[i]).css('display') != 'none') {
                $(btn).prop('disabled', true)
                break;
            } else {
                $(btn).prop('disabled', false)
            }
        }
    }

    //新增題目表單驗證
    let addForm = $('#questionAddForm');
    let addformOpt = $("input[id*='opt']").parent();
    $("input[id*='opt']").keyup(function () {
        modifyCheck(addForm, addformOpt);
    })
    $('#answer').keyup(function () {
        modifyCheck(addForm, addformOpt);
    })

    //修改題目表單驗證   
    function checkEvent() {
        $("td[class*='opt'] input").keyup(function () {
            let targetWrap = $(this).parents('.questionRow');
            let opt = $(this).parents('.questionRow').find("td[class*='opt']");
            modifyCheck(targetWrap, opt);
        })
        $('.answer input').keyup(function () {
            let targetWrap = $(this).parents('.questionRow');
            let opt = $(this).parents('.questionRow').find("td[class*='opt']");
            modifyCheck(targetWrap, opt);
        })
    }


}
window.addEventListener('load', quizGameInit);


// $('#questionModal').on('show.bs.modal', function (event) {
//     let button = $(event.relatedTarget)
//     let recipient = button.data('whatever')
//     let modal = $(this)
//     if (recipient == '@modify') {
//         $('#exampleModalLabel').text('修改題庫資料')
//         for (let i = 0; i < $(this).find('label').length; i++) {
//             let target = $(this).find(`label:eq(${i})`).attr('for');
//             let data = button.parents('.questionRow').find(`.${target}`).text();
//             if (target == 'level_no') {
//                 for (let j = 0; j < $(`#${target} option`).length; j++) {
//                     if ($(`#${target} option:eq(${j})`).text() == data) {
//                         $(`#${target} option:eq(${j})`).prop('selected', true)
//                     }
//                 }
//             } else {
//                 $(`#${target}`).val(data)
//             }
//         }
//     } else {
//         $('#exampleModalLabel').text('新增題庫資料')
//         // $('#questionModal input').val('');
//     }


// })


$('#alertModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget)
    let recipient = button.data('whatever')
    let modal = $(this)
    modal.find('#moveTarget').text('')
    modal.find('#moveType').text('')
    modal.find('#moveTarget').text(button.parents('.questionRow').find('.question_no').text());
    modal.find('#moveType').text(button.text());
    if (button.text() == '確認')
        modal.find('#moveType').text(button.text() + '修改');
})

