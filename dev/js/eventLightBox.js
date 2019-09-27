$(document).ready(function () {
  if(sessionStorage['mem_no'] == null){
    $('.launch').click(function(){
        $('#loginBox').fadeIn(100);
    })
   
    
}else{

    

    // $('.closeShow').click(function () {
    //     $('#showLaunch').slideToggle();
    // })
    
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
     
  }
  
});
