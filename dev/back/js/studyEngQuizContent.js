function init(){
    $("#videoQAdd").click(() => {$(".videoQustAdd").toggleClass('d-none')});
    $('.cancleUpload').click(()=>{$(".videoQustAdd").toggleClass('d-none')});

}



window.addEventListener('load', init);