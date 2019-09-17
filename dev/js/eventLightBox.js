$(document).ready(function () {
  if(sessionStorage['mem_no'] == null){
    $('#launch').click(function(){
        $('#loginBox').fadeIn(100);
    })
    // $('.askQuestion').click(function(){
    //     $('#loginBox').fadeIn(100);
    // })
}else{
    
    $('#launch').click(function () {
        $('#showLaunch').slideToggle();
        $('.showLaunchBg').slideToggle();
        $('.closeShow').slideToggle();
    })

    $('.showLaunchBg').click(function () {
        $('#showLaunch').slideToggle();
        $('.showLaunchBg').slideToggle();
        $('.closeShow').slideToggle();
    })

    $('.closeShow').click(function () {
        $('#showLaunch').slideToggle();
        $('.showLaunchBg').slideToggle();
        $('.closeShow').slideToggle();
    })

    $('#actFormBtn').click(function () {
        $('#showLaunch').slideToggle();
        $('.showLaunchBg').slideToggle();
        $('.closeShow').slideToggle();
    })
    $('.askQuestion').click(function(){ 
        let questionFormInfo = document.querySelectorAll('#questionForm textarea,#questionForm input');
         for(let i = 0; i < questionFormInfo.length;i++){
            questionFormInfo[i].value='';
                    }
       $('#forumQAddWindow').slideToggle();
    })
    $('.close').click(function(){  
        $('#forumQAddWindow').slideToggle();
     })
     $('.cancel').click(function(){
        $('#forumQAddWindow').slideToggle();
     })
     $('#questionAdd').click(function(){ 
        $('#forumQAddWindow').slideToggle();
     })
  }
});
