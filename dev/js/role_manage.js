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
                $('.equippedWeapon').attr('id',`equip${mems[1][0].equip_no}`);
                $('.equippedWeapon').find('img').attr('src',mems[1][0].equip_src);
                $('.equippedWeapon').find('h5').text(mems[1][0].equip_name);
                $('.equippedWeapon').append(`<div class="equipIntro">${mems[1][0].equip_intro}</div>`);
                $('.equippedCloth').attr('id',`equip${mems[2][0].equip_no}`);
                $('.equippedCloth').find('img').attr('src',mems[2][0].equip_src);
                $('.equippedCloth').find('h5').text(mems[2][0].equip_name);
                $('.equippedCloth').append(`<div class="equipIntro">${mems[2][0].equip_intro}</div>`);
                $('.equippedAccessory').attr('id',`equip${mems[3][0].equip_no}`);
                $('.equippedAccessory').find('img').attr('src',mems[3][0].equip_src);
                $('.equippedAccessory').find('h5').text(mems[3][0].equip_name);
                $('.equippedAccessory').append(`<div class="equipIntro">${mems[3][0].equip_intro}</div>`);
            }
         });
    }
    $('.equippedItem').mouseenter(function(){
        $(this).find('.equipIntro').css('display','block');
    });
    $('.equippedItem').mouseleave(function(){
        $(this).find('.equipIntro').css('display','none');
    });
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
            $('.closets').css('height','300%');
        }else{
            $('.closets').css('left', '-10vw');
            $('.closetsClose').css('display','block');
            $('.closets').css('z-index','1');
        }
        var storage = sessionStorage;
        if(storage.getItem('mem_no') != null){
            let memNo = storage.getItem('mem_no');
            $.ajax({    
                url: `roleEquip.php?action=loadMemClosets`,
                data: {
                    memNo:memNo
                },
                type: 'GET',
                success: function(rows){
                    let equips = JSON.parse(rows);
                    console.log(equips);
                    for(let i=0;i<equips[0].length;i++){
                        let htmlStr = '';
                        htmlStr += `<div class="clothItem item item${equips[0][i].equip_no}"><img src="${equips[0][i].equip_src}" alt="已有的武器"><h5>${equips[0][i].equip_name}</h5><div class="equipBack"><span class="equipIntro">${equips[0][i].equip_intro}</span></div></div>`;
                        $('.closetClothes').append(htmlStr);
                    }
                    for(let j=0;j<equips[1].length;j++){
                        let htmlStr = '';
                        htmlStr += `<div class="weaponItem item item${equips[1][j].equip_no}"><img src="${equips[1][j].equip_src}" alt="已有的防具"><h5>${equips[1][j].equip_name}</h5><div class="equipBack"><span class="equipIntro">${equips[1][j].equip_intro}</span></div></div>`;
                        $('.closetWeapons').append(htmlStr);
                    }
                    for(let k=0;k<equips[2].length;k++){
                        let htmlStr = '';
                        htmlStr += `<div class="accessoryItem item item${equips[2][k].equip_no}"><img src="${equips[2][k].equip_src}" alt="已有的飾品"><h5>${equips[2][k].equip_name}</h5><div class="equipBack"><span class="equipIntro">${equips[2][k].equip_intro}</span></div></div>`;
                        $('.closetAccessories').append(htmlStr);
                    }
                }
            });
        }
    });
    $('.closetFrame').on('mouseenter','.item',function(){
        $(this).find('.equipBack').css('display','block');
    });
    $('.closetClothes').on('click', '.clothItem',function(){
        let memNo = storage.getItem('mem_no');
        let itemWearNo = $(this).attr('class').replace('clothItem item item','');
        let ItemEquippedNo = $('.equippedWeapon').attr('id').replace('equip','');
        $('.memRoleWeapon').attr('src',$(this).find('img').attr('src').replace('.png','Wear.png'));
        $('.equippedWeapon').attr('id',`equip${itemWearNo}`);
        $('.equippedWeapon').find('img').attr('src',$(this).find('img').attr('src'));
        $('.equippedWeapon').find('h5').text($(this).find('h5').text());
        $('.equippedWeapon').find('.equipIntro').text($(this).find('.equipIntro').text());
        $.ajax({    
            url: `roleEquip.php?action=itemWear`,
            data: {
                memNo:memNo,
                itemWearNo:itemWearNo,
                ItemEquippedNo:ItemEquippedNo
            },
            type: 'GET',
        });
    });
    $('.closetWeapons').on('click', '.weaponItem',function(){
        let memNo = storage.getItem('mem_no');
        let itemWearNo = $(this).attr('class').replace('weaponItem item item','');
        let ItemEquippedNo = $('.equippedCloth').attr('id').replace('equip','');
        $('.memRoleCloth').attr('src',$(this).find('img').attr('src').replace('.png','Wear.png'));
        $('.equippedCloth').attr('id',`equip${itemWearNo}`);
        $('.equippedCloth').find('img').attr('src',$(this).find('img').attr('src'));
        $('.equippedCloth').find('h5').text($(this).find('h5').text());
        $('.equippedCloth').find('.equipIntro').text($(this).find('.equipIntro').text());
        $.ajax({    
            url: `roleEquip.php?action=itemWear`,
            data: {
                memNo:memNo,
                itemWearNo:itemWearNo,
                ItemEquippedNo:ItemEquippedNo
            },
            type: 'GET',
        });
    });
    $('.closetAccessories').on('click', '.accessoryItem',function(){
        let memNo = storage.getItem('mem_no');
        let itemWearNo = $(this).attr('class').replace('accessoryItem item item','');
        let ItemEquippedNo = $('.equippedAccessory').attr('id').replace('equip','');
        $('.memRoleAccessory').attr('src',$(this).find('img').attr('src').replace('.png','Wear.png'));
        $('.equippedAccessory').attr('id',`equip${itemWearNo}`);
        $('.equippedAccessory').find('img').attr('src',$(this).find('img').attr('src'));
        $('.equippedAccessory').find('h5').text($(this).find('h5').text());
        $('.equippedAccessory').find('.equipIntro').text($(this).find('.equipIntro').text());
        $.ajax({    
            url: `roleEquip.php?action=itemWear`,
            data: {
                memNo:memNo,
                itemWearNo:itemWearNo,
                ItemEquippedNo:ItemEquippedNo
            },
            type: 'GET',
        });
    });
    $('.closetFrame').on('mouseleave','.item',function(){
        $(this).find('.equipBack').css('display','none');
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
            $('.closets').css('height','unset');
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
            $('.stores').css('height','300%');
        }else{
            $('.stores').css('right', '-10vw');
            $('.storesClose').css('display','block');
        }
        var storage = sessionStorage;
        if(storage.getItem('mem_no') != null){
            let memNo = storage.getItem('mem_no');
            $.ajax({    
                url: `roleEquip.php?action=loadMemStores`,
                data: {
                    memNo:memNo
                },
                type: 'GET',
                success: function(rows){
                    let products = JSON.parse(rows);
                    console.log(products);
                    for(let i=0;i<products[0].length;i++){
                        let equipClass = '1';
                        let htmlStr = '';
                        htmlStr += `<div class="item item${equipClass}" id="item${products[0][i][0]}"><img src="${products[0][i].equip_src}" alt="沒有的武器" class="equipImg"><h5>${products[0][i].equip_name}</h5><div class="productBack"><span class="productIntro">${products[0][i].equip_intro}</span><span class="productPrice">${products[0][i].equip_price} G.E.M.<img src="img/GEM.png" alt="GEMpng" style="width: 24px; vertical-align: text-bottom; display: inline-block;
                        margin-bottom: unset;"></span><div class="purchaseBtn">購買</div></div></div>`;
                        $('.storeClothes').append(htmlStr);
                    }
                    for(let j=0;j<products[1].length;j++){
                        let equipClass = '2';
                        let htmlStr = '';
                        htmlStr += `<div class="item item${equipClass}" id="item${products[1][j][0]}"><img src="${products[1][j].equip_src}" alt="沒有的防具" class="equipImg"><h5>${products[1][j].equip_name}</h5><div class="productBack"><span class="productIntro">${products[1][j].equip_intro}</span><span class="productPrice">${products[1][j].equip_price} G.E.M.<img src="img/GEM.png" alt="GEMpng" style="width: 24px; vertical-align: text-bottom; display: inline-block;
                        margin-bottom: unset;"></span><div class="purchaseBtn">購買</div></div></div>`;
                        $('.storeWeapons').append(htmlStr);
                    }
                    for(let k=0;k<products[2].length;k++){
                        let equipClass = '3';
                        let htmlStr = '';
                        htmlStr += `<div class="item item${equipClass}" id="item${products[2][k][0]}"><img src="${products[2][k].equip_src}" alt="沒有的飾品" class="equipImg"><h5>${products[2][k].equip_name}</h5><div class="productBack"><span class="productIntro">${products[2][k].equip_intro}</span><span class="productPrice">${products[2][k].equip_price} G.E.M.<img src="img/GEM.png" alt="GEMpng" style="width: 24px; vertical-align: text-bottom; display: inline-block;
                        margin-bottom: unset;"></span><div class="purchaseBtn">購買</div></div></div>`;
                        $('.storeAccessories').append(htmlStr);
                    }
                }
            });
        }
    });
    $('.storeFrame').on('mouseenter','.item',function(){
        $(this).find('.productBack').css('display','block');
    });
    $('.storeFrame').on('mouseleave','.item',function(){
        $(this).find('.productBack').css('display','none');
    });
    $('.storeFrame').on('click','.purchaseBtn',function(){
        let memNo  = storage.getItem('mem_no');
        let memMoney = storage.getItem('mem_money');
        let equipPrice = $(this).prev('.productPrice').text().replace(' G.E.M.','');
        let balance = memMoney - equipPrice;
        let purchasedItem = $(this).closest('.item')
        let equipNo = $(this).closest('.item').attr('id').replace('item','');
        let equipClass = $(this).closest('.item').attr('class').replace('item item','');
        let purchasedImg = $(this).closest('.item').find('.equipImg').attr('src');
        let purchasedH5 = $(this).closest('.item').find('h5').text();
        let purchasedIntro = $(this).closest('.item').find('.productIntro').text();
        if(equipClass == 1){
            equipChanged = $('.equippedWeapon').attr('id').replace('equip','');
        }else if(equipClass == 2){
            equipChanged = $('.equippedCloth').attr('id').replace('equip','');
        }else{
            equipChanged = $('.equippedAccessory').attr('id').replace('equip','');
        }
        alert(equipChanged);
        $.ajax({    
            url: `roleEquip.php?action=purchase`,
            data: {
                memNo:memNo,
                balance:balance,
                equipNo:equipNo,
                equipChanged:equipChanged
            },
            type: 'GET',
            success: function(){
                if(equipClass == 1){
                    $('.equippedWeapon').attr('id',`equip${equipNo}`);
                    $('.equippedWeapon').find('img').attr('src',purchasedImg);
                    $('.equippedWeapon').find('h5').text(purchasedH5);
                    $('.memRoleWeapon').attr('src', purchasedImg.replace('.png','Wear.png'));
                    $('.equippedWeapon').find('.equipIntro').text(purchasedIntro);
                    purchasedItem.remove();
                    let htmlStr = '';
                    htmlStr += `<div class="clothItem item item${equipNo}"><img src="${purchasedImg}" alt="已有的武器"><h5>${purchasedH5}</h5><div class="equipBack"><span class="equipIntro">${purchasedIntro}</span></div></div>`;
                    $('.closetClothes').append(htmlStr);
                }else if(equipClass == 2){
                    $('.equippedCloth').attr('id',`equip${equipNo}`);
                    $('.equippedCloth').find('img').attr('src',purchasedImg);
                    $('.equippedCloth').find('h5').text(purchasedH5);
                    $('.memRoleCloth').attr('src', purchasedImg.replace('.png','Wear.png'));
                    $('.equippedCloth').find('.equipIntro').text(purchasedIntro);
                    purchasedItem.remove();
                    let htmlStr = '';
                    htmlStr += `<div class="weaponItem item item${equipNo}"><img src="${purchasedImg}" alt="已有的防具"><h5>${purchasedH5}</h5><div class="equipBack"><span class="equipIntro">${purchasedIntro}</span></div></div>`;
                    $('.closetWeapons').append(htmlStr);
                }else{
                    $('.equippedAccessory').attr('id',`equip${equipNo}`);
                    $('.equippedAccessory').find('img').attr('src',purchasedImg);
                    $('.equippedAccessory').find('h5').text(purchasedH5);
                    $('.memRoleAccessory').attr('src', purchasedImg.replace('.png','Wear.png'));
                    $('.equippedAccessory').find('.equipIntro').text(purchasedIntro);
                    purchasedItem.remove();
                    let htmlStr = '';
                    htmlStr += `<div class="accessoryItem item item${equipNo}"><img src="${purchasedImg}" alt="已有的飾品"><h5>${purchasedH5}</h5><div class="equipBack"><span class="equipIntro">${purchasedIntro}</span></div></div>`;
                    $('.closetAccessories').append(htmlStr);
                }
                alert(balance);
                $('#memStatusGEM').text(balance);
                storage.setItem('mem_money',balance);
            }
        });
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
            $('.stores').css('height','unset');
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