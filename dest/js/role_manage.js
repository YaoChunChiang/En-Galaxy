$(document).ready(function(){
    //櫃子
    $('.closetExpand').click(function(){
        $('.closets').css('left', '0');
    });
    $('.closetClose').click(function(){
        $('.closets').css('left', '-100%');
        $('.clothEquipped').css('z-index', '6');
        $('.weaponEquipped').css('z-index', '5');
        $('.accessoryEquipped').css('z-index', '4');
    });
    $('.tabClothes').click(function(){
        $('.clothEquipped').css('z-index', '6');
        $('.weaponEquipped').css('z-index', '5');
        $('.accessoryEquipped').css('z-index', '4');
    });
    $('.tabWeapons').click(function(){
        $('.clothEquipped').css('z-index', '4');
        $('.weaponEquipped').css('z-index', '6');
        $('.accessoryEquipped').css('z-index', '5');
    });
    $('.tabAccessories').click(function(){
        $('.clothEquipped').css('z-index', '5');
        $('.weaponEquipped').css('z-index', '4');
        $('.accessoryEquipped').css('z-index', '6');
    });
    $('.weaponFire').click(function(){
        $('.weaponEquip img').attr('src', 'img/weaponFire.png');
    });
    $('.weaponGuitar').click(function(){
        $('.weaponEquip img').attr('src', 'img/weaponGuitar.png');
    });
    $('.closetClothesExpand').click(function(){
        if($('.closetClothesExpand').text() == '展開衣櫃'){
            $('.closetClothesExpand').css('left', '100%');
            $('.closetClothes').css('width', '100%');
            $('.clothEquipped').css('width', '100%');
            setTimeout(function(){
                $('.closetClothesExpand').text('X');
                $('.closetClothesExpand').css('width', '10%');
            }, 667);
        }else{
            $('.closetClothes').css('width', '300%');
            $('.clothEquipped').css('width', '33.3%');
            $('.closetClothesExpand').css('left', '33.3%');
            setTimeout(function(){
                $('.closetClothesExpand').text('展開衣櫃');
                $('.closetClothesExpand').css('width', '33.3%');
            }, 667);
        }
    });
    $('.closetWeaponsExpand').click(function(){
        if($('.closetWeaponsExpand').text() == '展開武器櫃'){
            $('.closetWeaponsExpand').css('left', '100%');
            $('.closetWeapons').css('width', '100%');
            $('.weaponEquipped').css('width', '100%');
            setTimeout(function(){
                $('.closetWeaponsExpand').text('X');
                $('.closetWeaponsExpand').css('width', '10%');
            }, 667);
        }else{
            $('.closetWeapons').css('width', '300%');
            $('.weaponEquipped').css('width', '33.3%');
            $('.closetWeaponsExpand').css('left', '33.3%');
            setTimeout(function(){
                $('.closetWeaponsExpand').text('展開武器櫃');
                $('.closetWeaponsExpand').css('width', '33.3%');
            }, 667);
        }
    });
    $('.closetAccessoriesExpand').click(function(){
        if($('.closetAccessoriesExpand').text() == '展開飾品櫃'){
            $('.closetAccessoriesExpand').css('left', '100%');
            $('.closetAccessories').css('width', '100%');
            $('.accessoryEquipped').css('width', '100%');
            setTimeout(function(){
                $('.closetAccessoriesExpand').text('X');
                $('.closetAccessoriesExpand').css('width', '10%');
            }, 667);
        }else{
            $('.closetAccessories').css('width', '300%');
            $('.accessoryEquipped').css('width', '33.3%');
            $('.closetAccessoriesExpand').css('left', '33.3%');
            setTimeout(function(){
                $('.closetAccessoriesExpand').text('展開飾品櫃');
                $('.closetAccessoriesExpand').css('width', '33.3%');
            }, 667);
        }
    });
    //商店
    $('.storesExpand').click(function(){
        $('.stores').css('right', '0');
    });
    $('.storesClose').click(function(){
        $('.stores').css('right', '-100%');
        $('.storeClothes').css('z-index', '3');
        $('.storeWeapons').css('z-index', '2');
        $('.storeAccessories').css('z-index', '1');
    });
    $('.storeTabClothes').click(function(){
        $('.storeClothes').css('z-index', '3');
        $('.storeWeapons').css('z-index', '2');
        $('.storeAccessories').css('z-index', '1');
    });
    $('.storeTabWeapons').click(function(){
        $('.storeClothes').css('z-index', '1');
        $('.storeWeapons').css('z-index', '3');
        $('.storeAccessories').css('z-index', '2');
    });
    $('.storeTabAccessories').click(function(){
        $('.storeClothes').css('z-index', '2');
        $('.storeWeapons').css('z-index', '1');
        $('.storeAccessories').css('z-index', '3');
    });
    $('.storeClothesExpand').click(function(){
        if($('.storeClothesExpand').text() == '展開衣服商店'){
            $('.storeClothesExpand').css('z-index', '9');
            $('.storeClothesExpand').css('left', '0%');
            setTimeout(function(){
                $('.closetClothesExpand').css('display', 'none');
            }, 333);
            setTimeout(function(){
                $('.storeClothesExpand').css('left', '100%');
                $('.storeClothes').css('z-index', '9');
                $('.storeClothes').css('width', '100%');
                $('.clothesInStore').css('width', '100%');
            }, 1000);
            setTimeout(function(){
                $('.storeClothesExpand').text('X');
                $('.storeClothesExpand').css('width', '10%');
            }, 1667);
        }else{
            $('.storeClothesExpand').css('left', '33.3%');
            $('.storeClothes').css('width', '33.3%');
            $('.clothesInStore').css('width', '300%');
            setTimeout(function(){
                $('.storeClothes').css('z-index', '3');
                $('.closetClothesExpand').css('display', 'block');
                $('.storeClothesExpand').css('left', '66.6%');
                $('.storeClothesExpand').text('展開衣服商店');
                $('.storeClothesExpand').css('width', '33.3%');
            }, 500);
            setTimeout(function(){
                $('.storeClothesExpand').css('z-index', '3');
            }, 1500);
        }
    });
    $('.storeWeaponsExpand').click(function(){
        if($('.storeWeaponsExpand').text() == '展開武器商店'){
            $('.storeWeaponsExpand').css('z-index', '8');
            $('.storeWeaponsExpand').css('left', '0%');
            setTimeout(function(){
                $('.closetWeaponsExpand').css('display', 'none');
            }, 333);
            setTimeout(function(){
                $('.storeWeaponsExpand').css('left', '100%');
                $('.storeWeapons').css('z-index', '8');
                $('.storeWeapons').css('width', '100%');
                $('.weaponsInStore').css('width', '100%');
            }, 1000);
            setTimeout(function(){
                $('.storeWeaponsExpand').text('X');
                $('.storeWeaponsExpand').css('width', '10%');
            }, 1667);
        }else{
            $('.storeWeaponsExpand').css('left', '33.3%');
            $('.storeWeapons').css('width', '33.3%');
            $('.weaponsInStore').css('width', '300%');
            setTimeout(function(){
                $('.storeWeapons').css('z-index', '2');
                $('.closetWeaponsExpand').css('display', 'block');
                $('.storeWeaponsExpand').css('left', '66.6%');
                $('.storeWeaponsExpand').text('展開武器商店');
                $('.storeWeaponsExpand').css('width', '33.3%');
            }, 500);
            setTimeout(function(){
                $('.storeWeaponsExpand').css('z-index', '2');
            }, 1500);
        }
    });
    $('.storeAccessoriesExpand').click(function(){
        if($('.storeAccessoriesExpand').text() == '展開飾品商店'){
            $('.storeAccessoriesExpand').css('z-index', '7');
            $('.storeAccessoriesExpand').css('left', '0%');
            setTimeout(function(){
                $('.closetAccessoriesExpand').css('display', 'none');
            }, 333);
            setTimeout(function(){
                $('.storeAccessoriesExpand').css('left', '100%');
                $('.storeAccessories').css('z-index', '7');
                $('.storeAccessories').css('width', '100%');
                $('.accessoriesInStore').css('width', '100%');
            }, 1000);
            setTimeout(function(){
                $('.storeAccessoriesExpand').text('X');
                $('.storeAccessoriesExpand').css('width', '10%');
            }, 1667);
        }else{
            $('.storeAccessoriesExpand').css('left', '33.3%');
            $('.storeAccessories').css('width', '33.3%');
            $('.AccessoriesInStore').css('width', '300%');
            setTimeout(function(){
                $('.storeAccessories').css('z-index', '1');
                $('.closetAccessoriesExpand').css('display', 'block');
                $('.storeAccessoriesExpand').css('left', '66.6%');
                $('.storeAccessoriesExpand').text('展開飾品商店');
                $('.storeAccessoriesExpand').css('width', '33.3%');
            }, 500);
            setTimeout(function(){
                $('.storeAccessoriesExpand').css('z-index', '1');
            }, 1500);
        }
    });
});