$(document).ready(function () {

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

});
    