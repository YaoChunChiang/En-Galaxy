function memRole(memNo){
    let htmlStr = '';
    $.ajax({    
        url: `memRole.php?action=loadMem`,
        data: {
            memNo:memNo
        },
        type: 'GET',
        async: false,
        success: function(rows){
            let mems = JSON.parse(rows);
            console.log(rows);
            if(mems[2] == ''){
                memRoleClothStr = `<div class="clothEquip"><img src="" alt="我來組成防具" class="memRoleCloth" style="display:none;"></div>`;
            }else{
                memRoleClothStr = `<div class="clothEquip"><img src="${mems[2][0].equip_src.replace('.png','Wear.png')}" alt="我來組成防具" class="memRoleCloth"></div>`;
            }
            if(mems[3] == ''){
                memRoleAccessoryStr = `<div class="roleAccessory"><img src="" alt="我來組成飾品" class="memRoleAccessory" style="display:none;"></div>`;
            }else{
                memRoleAccessoryStr = `<div class="roleAccessory"><img src="${mems[3][0].equip_src.replace('.png','Wear.png')}" alt="我來組成飾品" class="memRoleAccessory"></div>`;
            }
            if(mems[1] == ''){
                memRoleWeaponStr = `<div class="weaponEquip"><img src="" alt="我來組成武器" class="memRoleWeapon" style="display:none;"></div>`;
            }else{
                memRoleWeaponStr = `<div class="weaponEquip"><img src="${mems[1][0].equip_src.replace('.png','Wear.png')}" alt="我來組成武器" class="memRoleWeapon"></div>`;
            }
            htmlStr += `<div class="memberRole"><div class="roleBody">`;
            htmlStr += `<img src="${mems[0][0].set_body_src}" alt="我來組成身體" class="memRoleBody" style="filter:hue-rotate(${mems[0][0].set_color}deg);">`;
            htmlStr += memRoleClothStr;
            htmlStr += `<div class="rolePart"><img src="${mems[0][0].set_part_src}" alt="我來組成不變色的部分" class="memRolePart"></div>`;
            htmlStr += memRoleAccessoryStr;
            htmlStr += `<div class="roleLeftHand">
            <img src="${mems[0][0].set_lefthand_src}" alt="我來組成左手" class="memRoleLeftHand"  style="filter:hue-rotate(${mems[0][0].set_color}deg);"></div>`;
            htmlStr += `<div class="roleRightHand"><img src="${mems[0][0].set_righthand_src}" alt="我來組成右手" class="memRoleRightHand"  style="filter:hue-rotate(${mems[0][0].set_color}deg);">${memRoleWeaponStr}</div>`;
            htmlStr += `<div class="roleVehicle"><img src="${mems[4][0].level_vehicle_src}" alt="我來組成載具" class="memRoleVehicle"></div>`;
            htmlStr += `</div>
            </div>`;
        }        
    });
    return htmlStr;
}
// ex.
// let memRoleHtml = memRole(memNo);
// $(memRoleHtml).insertBefore('.roleShadow');