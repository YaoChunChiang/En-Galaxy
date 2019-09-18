
function quizGameInit(){
    $.ajax({
        url:"quizGame.php",
        data:{},
        dataType:"text",
        success:function(response){            
            questionRow = JSON.parse(response);
            question = $('.questionRow').clone();
            questionRow.forEach( element => {
                for ( key in element) {
                    if (key == "question_status"){
                        question.find(`.${key}`).prop('value', element[key]);
                    }else{
                        question.find(`.${key}`).text(element[key]);
                    }                    
                }
                question.clone().appendTo('tbody');            
            });
            $('.question_status[value="1"]').prop('checked',true);
            $('.questionRow:eq(0)').remove();       
        }
    })
}
window.addEventListener('load',quizGameInit);
