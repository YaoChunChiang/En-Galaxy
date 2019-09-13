$(document).ready(function(){
    $('.equipSrc').change(function(){
        let equipSrc = this;
        fileEquipSrc = this.files[0];
        let readFile = new FileReader();
        readFile.readAsDataURL(fileEquipSrc);
        readFile.addEventListener('load',function(){
            let imgRead = equipSrc.previousElementSibling;
            imgRead.src = this.result;
        });
    });
    $('.confirmInsert').click(function(){
        if($('.equipClass').val() == 0){
            equipClass = '武器';
        }else if($('.equipClass').val() == 1){
            equipClass = '防具';
        }else{
            equipClass = '飾品';
        }
        let equipName = $('.equipName').val();
        let equipPrice = $('.equipPrice').val();
        if($('.equipStatus').prop('checked')){
            equipStatus = 1;
        }else{
            equipStatus = 0;
        }
        let equipIntro = $('.equipIntro').val();
        $.ajax({    
            url: `roleEquipMng.php?action=confirmInsert`,
            data: {
                equipClass:equipClass, 
                equipName:equipName,
                equipSrc:fileEquipSrc,
                equipPrice:equipPrice,
                equipStatus:equipStatus,
                equipIntro:equipIntro
            },
            type: 'GET',
            success: function(){
            },
        });
    });
});