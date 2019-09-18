function alertInit(){
    function closeWindow(e){
        e.stopPropagation();
        // $('.alertWindowWrap').css('display', 'none');
        $('.alertWindowWrap').fadeOut(100);
    }

    $('.alertClose').click(closeWindow);
    $('.alertButton').click(closeWindow);
    // $('.alertWindowWrap').click(closeWindow);
}

function alertBoxShow(content = '這是一個警告', title = '警告', color = 'red'){
    $('.alertWindowWrap').css('display', 'flex');
    $('.alertTitle').text(title).css('color', color);
    $('.alertContent').text(content);
}




window.addEventListener('load', alertInit);