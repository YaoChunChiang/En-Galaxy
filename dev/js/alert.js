function alertInit(){
    function closeWindow(e){
        e.stopPropagation();
        $('.alertWindowWrap').css('display', 'none');
    }

    $('.alertClose').click(closeWindow);
    $('.alertButton').click(closeWindow);
    // $('.alertWindowWrap').click(closeWindow);
}

function alertBoxShow(content = '這是一個警告', title = '警告'){
    $('.alertWindowWrap').css('display', 'flex');
    $('.alertTitle').text(title);
    $('.alertContent').text(content);
}




window.addEventListener('load', alertInit);