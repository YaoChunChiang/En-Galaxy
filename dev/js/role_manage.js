$(document).ready(function(){
    var storage = sessionStorage;
    if(storage.getItem('mem_no') != null){
        let memNo = storage.getItem('mem_no');
        let setNo = storage.getItem('set_no');
        let setColor = storage.getItem('set_color');
        // let memRoleHtml = memRole(memNo);
        // console.log(memRoleHtml);
        // $(memRoleHtml).insertBefore('.roleShadow');    
        $.ajax({    
            url: `roleEquip.php?action=loadMem`,
            data: {
                memNo:memNo,
                setNo:setNo 
            },
            type: 'GET',
            success: function(rows){
                let mems = JSON.parse(rows);
                console.log(mems);
                $('.memRoleBody').attr('src',mems[0][0].set_body_src).css('filter',`hue-rotate(${setColor}deg)`);
                $('.memRolePart').attr('src',mems[0][0].set_part_src);
                $('.memRoleAccessory').attr('src',mems[3][0].equip_src);
                $('.memRoleLeftHand').attr('src',mems[0][0].set_lefthand_src).css('filter',`hue-rotate(${setColor}deg)`);
                $('.memRoleRightHand').attr('src',mems[0][0].set_righthand_src).css('filter',`hue-rotate(${setColor}deg)`);
                $('.memRoleWeapon').attr('src',mems[1][0].equip_src);
                $('.equippedWeapon').find('img').attr('src',mems[1][0].equip_src);
                $('.equippedWeapon').find('h5').text(mems[1][0].equip_name);
                $('.equippedCloth').find('img').attr('src',mems[2][0].equip_src);
                $('.equippedCloth').find('h5').text(mems[2][0].equip_name);
                $('.equippedAccessory').find('img').attr('src',mems[3][0].equip_src);
                $('.equippedAccessory').find('h5').text(mems[3][0].equip_name);
            }
         });
    }
    $('.closetsTitle').mouseenter(function(){
        $(this).find('img').css('filter', 'drop-shadow(5px 5px 10px #fff)');
    });
    $('.closetsTitle').mouseleave(function(){
        $(this).find('img').css('filter', 'unset');
    });
    $('.closetsTitle').click(function(){
        if($(window).width()>=768){
            $('.closetsTitle img').css('display', 'none');
            $('.closetsTitle h3').css('background-color', '#929292');
            $('.closetsTitle').css('width', '100%');
            $('.closets').css('animation', 'unset');
            $('.closetsTitle').css('animation', 'unset');
            $('.closetsTitle').css('transform', 'rotate(0deg)');
            $('.closetClothes').css('display', 'flex');
            $('.closets').css('width', '50%');
            $('.closets').css('padding', '20px');
            $('.closets').css('top', '-200%');
            $('.closetsTabs').css('display', 'flex');
            $('.closetsClose').css('display', 'block');
            $('.closetClothesTab').css('background-color','#929292');
            $('.closetWeaponsTab').css('background-color','#656565');
            $('.closetAccessoriesTab').css('background-color','#656565');
            $('.closetClothesTab').css('box-shadow','unset');
            $('.closetWeaponsTab').css('box-shadow','0 5px 5px #383838 inset');
            $('.closetAccessoriesTab').css('box-shadow','0 5px 5px #383838 inset');
            $('.closetClothesTab').css('color','#ffe64d');
            $('.closetWeaponsTab').css('color','#383838');
            $('.closetAccessoriesTab').css('color','#383838');
            $('.closetsTitleForHover').css('display', 'none');
            $('.closetsTitleForNormal').css('display', 'block');
        }else{
            $('.closets').css('left', '-10vw');
            $('.closetsClose').css('display','block');
            $('.closets').css('z-index','1');
        }
    });
    $('.closetsClose').click(function(){
        if($(window).width()>=768){
            $('.closetsTitle img').css('display', 'block');
            $('.closetsTitle h3').css('background-color', 'unset');
            $('.closetsTitle').css('width', '50%');
            $('.closets').css('animation', 'closetsFloat 6s infinite');
            $('.closetsTitle').css('animation', 'rotate 9s infinite');
            $('.closetsTitle').css('transform', 'rotate(-9deg)');
            $('.closet').css('display', 'none');
            $('.closets').css('width', '66.7%');
            $('.closets').css('padding', 'unset');
            $('.closets').css('top', '-70%');
            $('.closetsTabs').css('display', 'none');
            $('.closetsClose').css('display', 'none');
            $('.closetsTitleForHover').css('display', 'block');
            $('.closetsTitleForNormal').css('display', 'none');
        }else{
            $('.closets').css('left', '-110vw');
            $('.closetsClose').css('display','none');
            $('.closets').css('z-index','unset');
        }
    });
    $('.closetClothesTab').click(function(){
        $('.closetClothes').css('display', 'flex');
        $('.closetWeapons').css('display', 'none');
        $('.closetAccessories').css('display', 'none');
        $('.closetClothesTab').css('background-color','#929292');
        $('.closetWeaponsTab').css('background-color','#656565');
        $('.closetAccessoriesTab').css('background-color','#656565');
        $('.closetClothesTab').css('color','#ffe64d');
        $('.closetWeaponsTab').css('color','#383838');
        $('.closetAccessoriesTab').css('color','#383838');
        if($(window).width()>=768){
            $('.closetClothesTab').css('box-shadow','unset');
            $('.closetWeaponsTab').css('box-shadow','0 5px 5px #383838 inset');
            $('.closetAccessoriesTab').css('box-shadow','0 5px 5px #383838 inset');
        }else{
            $('.closetClothesTab').css('box-shadow','unset');
            $('.closetWeaponsTab').css('box-shadow','3px -3px 5px #383838 inset');
            $('.closetAccessoriesTab').css('box-shadow','3px -3px 5px #383838 inset');
        }
    });
    $('.closetWeaponsTab').click(function(){
        $('.closetClothes').css('display', 'none');
        $('.closetWeapons').css('display', 'flex');
        $('.closetAccessories').css('display', 'none');
        $('.closetWeaponsTab').css('background-color','#929292');
        $('.closetClothesTab').css('background-color','#656565');
        $('.closetAccessoriesTab').css('background-color','#656565');
        $('.closetClothesTab').css('color','#383838');
        $('.closetWeaponsTab').css('color','#ffe64d');
        $('.closetAccessoriesTab').css('color','#383838');
        if($(window).width()>=768){
            $('.closetClothesTab').css('box-shadow','0px -5px 5px #383838 inset');
            $('.closetWeaponsTab').css('box-shadow','unset');
            $('.closetAccessoriesTab').css('box-shadow','0px 5px 5px #383838 inset');
        }else{
            $('.closetClothesTab').css('box-shadow','-3px -3px 5px #383838 inset');
            $('.closetWeaponsTab').css('box-shadow','unset');
            $('.closetAccessoriesTab').css('box-shadow','3px -3px 5px #383838 inset');
        }
    });
    $('.closetAccessoriesTab').click(function(){
        $('.closetClothes').css('display', 'none');
        $('.closetWeapons').css('display', 'none');
        $('.closetAccessories').css('display', 'flex');
        $('.closetClothesTab').css('background-color','#656565');
        $('.closetWeaponsTab').css('background-color','#656565');
        $('.closetAccessoriesTab').css('background-color','#929292');
        $('.closetClothesTab').css('color','#383838');
        $('.closetWeaponsTab').css('color','#383838');
        $('.closetAccessoriesTab').css('color','#ffe64d');
        if($(window).width()>=768){
            $('.closetClothesTab').css('box-shadow','0px -5px 5px #383838 inset');
            $('.closetWeaponsTab').css('box-shadow','0px -5px 5px #383838 inset');
            $('.closetAccessoriesTab').css('box-shadow','unset');
        }else{
            $('.closetClothesTab').css('box-shadow','-3px -3px 5px #383838 inset');
            $('.closetWeaponsTab').css('box-shadow','-3px -3px 5px #383838 inset');
            $('.closetAccessoriesTab').css('box-shadow','unset');
        }
    });
    $('.storesTitle').mouseenter(function(){
        $(this).find('img').css('filter', 'drop-shadow(5px 5px 10px #fff)');
    });
    $('.storesTitle').mouseleave(function(){
        $(this).find('img').css('filter', 'unset');
    });
    $('.storesTitle').click(function(){
        if($(window).width()>=768){
            $('.storesTitle img').css('display', 'none');
            $('.storesTitle h3').css('background-color', '#f1f1f1');
            $('.storesTitle').css('width', '100%');
            $('.stores').css('animation', 'unset');
            $('.storesTitle').css('animation', 'unset');
            $('.storesTitle').css('transform', 'rotate(0deg)');
            $('.storeClothes').css('display', 'flex');
            $('.stores').css('width', '50%');
            $('.stores').css('padding', '20px');
            $('.stores').css('top', '-200%');
            $('.storesTabs').css('display', 'flex');
            $('.storesClose').css('display', 'block');
            $('.storeClothesTab').css('background-color','#f1f1f1');
            $('.storeWeaponsTab').css('background-color','#c4c4c4');
            $('.storeAccessoriesTab').css('background-color','#c4c4c4');
            $('.storeClothesTab').css('box-shadow','unset');
            $('.storeWeaponsTab').css('box-shadow','0 5px 5px #969696 inset');
            $('.storeAccessoriesTab').css('box-shadow','0 5px 5px #969696 inset');
            $('.storeClothesTab').css('color','#18cae6');
            $('.storeWeaponsTab').css('color','#969696');
            $('.storeAccessoriesTab').css('color','#969696');
            $('.storesTitleForHover').css('display', 'none');
            $('.storesTitleForNormal').css('display', 'block');
        }else{
            $('.stores').css('right', '-10vw');
            $('.storesClose').css('display','block');
        }
    });
    $('.storesClose').click(function(){
        if($(window).width()>=768){
            $('.storesTitle img').css('display', 'block');
            $('.storesTitle h3').css('background-color', 'unset');
            $('.storesTitle').css('width', '50%');
            $('.stores').css('animation', 'storesFloat 6s infinite');
            $('.storesTitle').css('animation', 'storeRotate 9s infinite');
            $('.storesTitle').css('transform', 'rotate(9deg)');
            $('.store').css('display', 'none');
            $('.stores').css('width', '66.7%');
            $('.stores').css('padding', 'unset');
            $('.stores').css('top', '-70%');
            $('.storesTabs').css('display', 'none');
            $('.storesClose').css('display', 'none');
            $('.storesTitleForHover').css('display', 'block');
            $('.storesTitleForNormal').css('display', 'none');
        }else{
            $('.stores').css('right', '-110vw');
            $('.storesClose').css('display','none');
        }
    });
    $('.storeClothesTab').click(function(){
        $('.storeClothes').css('display', 'flex');
        $('.storeWeapons').css('display', 'none');
        $('.storeAccessories').css('display', 'none');
        $('.storeClothesTab').css('background-color','#f1f1f1');
        $('.storeWeaponsTab').css('background-color','#c4c4c4');
        $('.storeAccessoriesTab').css('background-color','#c4c4c4');
        $('.storeClothesTab').css('color','#18cae6');
        $('.storeWeaponsTab').css('color','#969696');
        $('.storeAccessoriesTab').css('color','#969696');
        if($(window).width()>=768){
            $('.storeClothesTab').css('box-shadow','unset');
            $('.storeWeaponsTab').css('box-shadow','0 5px 5px #969696 inset');
            $('.storeAccessoriesTab').css('box-shadow','0 5px 5px #969696 inset');
        }else{
            $('.storeClothesTab').css('box-shadow','unset');
            $('.storeWeaponsTab').css('box-shadow','3px -3px 5px #969696 inset');
            $('.storeAccessoriesTab').css('box-shadow','3px -3px 5px #969696 inset');
        }
    });
    $('.storeWeaponsTab').click(function(){
        $('.storeClothes').css('display', 'none');
        $('.storeWeapons').css('display', 'flex');
        $('.storeAccessories').css('display', 'none');
        $('.storeWeaponsTab').css('background-color','#f1f1f1');
        $('.storeClothesTab').css('background-color','#c4c4c4');
        $('.storeAccessoriesTab').css('background-color','#c4c4c4');
        $('.storeClothesTab').css('color','#969696');
        $('.storeWeaponsTab').css('color','#18cae6');
        $('.storeAccessoriesTab').css('color','#969696');
        if($(window).width()>=768){
            $('.storeClothesTab').css('box-shadow','0px -5px 5px #969696 inset');
            $('.storeWeaponsTab').css('box-shadow','unset');
            $('.storeAccessoriesTab').css('box-shadow','0 5px 5px #969696 inset');
        }else{
            $('.storeClothesTab').css('box-shadow','-3px -3px 5px #969696 inset');
            $('.storeWeaponsTab').css('box-shadow','unset');
            $('.storeAccessoriesTab').css('box-shadow','3px -3px 5px #969696 inset');
        }
    });
    $('.storeAccessoriesTab').click(function(){
        $('.storeClothes').css('display', 'none');
        $('.storeWeapons').css('display', 'none');
        $('.storeAccessories').css('display', 'flex');
        $('.storeClothesTab').css('background-color','#c4c4c4');
        $('.storeWeaponsTab').css('background-color','#c4c4c4');
        $('.storeAccessoriesTab').css('background-color','#f1f1f1');
        $('.storeClothesTab').css('box-shadow','0px -5px 5px #969696 inset');
        $('.storeWeaponsTab').css('box-shadow','0px -5px 5px #969696 inset');
        $('.storeAccessoriesTab').css('box-shadow','unset');
        $('.storeClothesTab').css('color','#969696');
        $('.storeWeaponsTab').css('color','#969696');
        $('.storeAccessoriesTab').css('color','#18cae6');
        if($(window).width()>=768){
            $('.storeClothesTab').css('box-shadow','0px -5px 5px #969696 inset');
            $('.storeWeaponsTab').css('box-shadow','0px -5px 5px #969696 inset');
            $('.storeAccessoriesTab').css('box-shadow','unset');
        }else{
            $('.storeClothesTab').css('box-shadow','-3px -3px 5px #969696 inset');
            $('.storeWeaponsTab').css('box-shadow','-3px -3px 5px #969696 inset');
            $('.storeAccessoriesTab').css('box-shadow','unset');
        }
    });
});