$(document).ready(function(){
    $('.createColorBar').change(function(){
        $('.partColored').css('filter', 'hue-rotate('+$('.createColorBar').val()+'deg)');
    });
    $('.createRaceImg').click(function(){
        $('.createLaser').css('display','block');
        $('.createRole').css('overflow', 'hidden');
        $('.createRole').css('height', '0');
        let srcBody = $(this).find('.raceBodyImg').attr('src');
        let srcPart = $(this).find('.racePartImg').attr('src');
        let srcLeftHand = $(this).find('.raceLeftHandImg').attr('src');
        let srcRightHand = $(this).find('.raceRightHandImg').attr('src');
        setTimeout(function(){
            $('.createBodyImg').attr('src', srcBody);
            $('.createPartImg').attr('src', srcPart);
            $('.createLeftHandImg').attr('src', srcLeftHand);
            $('.createRightHandImg').attr('src', srcRightHand);
            $('.createRole').css('height', '67%');
        },500);
        setTimeout(function(){
            $('.createRole').css('overflow', 'unset');
            $('.createLaser').css('display','none');
        },1000);
    }); 
    $('.createRaceImg').mouseenter(function(){
        $(this).find('.roleBody').addClass('roalFloat');
    });   
    $('.createRaceImg').mouseleave(function(){
        $(this).find('.roleBody').removeClass('roalFloat');
    }); 
});