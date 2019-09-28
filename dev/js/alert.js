function alertCloseWindow(callback){
    // e.stopPropagation();
    // $('.alertWindowWrap').css('display', 'none');
    $('.alertWindowWrap').fadeOut(100);
    
    // $(this).parentsUntil('.alertWindowWrap').fadeOut(100);
    if( callback){
        callback();
    }
}
function alertBoxShow(content = '這是一個警告', title = '警告', color = 'red', callback){
    $('.alertWindowWrap').css('display', 'flex');
    $('.alertTitle').html(title).css('color', color);
    $('.alertContent').html(content);
    $('.alertClose').off();
    $('.alertButton').off();

    $('.alertClose').click(() => {alertCloseWindow(callback)});
    $('.alertButton').click(() => { alertCloseWindow(callback)});
    $('.cancelButton').click(() => { alertCloseWindow(callback)});
    // callback();
}