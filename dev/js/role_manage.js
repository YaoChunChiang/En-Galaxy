$(document).ready(function(){
    $('closetsTitle').click(function(){
        $('.closetsTitle img').css('display', 'none');
        $('.closetsTitle h3').css('background-color', '#666');
        $('closetsTitle').css('width', '100%');
        $('closets').css('animation', 'unset');
        $('closetsTitle').css('animation', 'unset');
        $('closetsTitle').css('transform', 'rotate(0deg)');
        $('closetClothes').css('display', 'flex');
        $('closets').css('width', '50%');
        $('closets').css('padding', '20px');
        $('closets').css('bottom', '14%');
        $('closetsTabs').css('display', 'flex');
        
    });
});