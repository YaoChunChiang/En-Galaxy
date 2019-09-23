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
            console.log(mems);
            htmlStr += `<div class="memberRole"><div class="roleBody">`;
            htmlStr += `<img src="${mems[0][0].set_body_src}" alt="我來組成身體" class="memRoleBody" style="filter:hue-rotate(${mems[0][0].set_color}deg);">`;
            htmlStr += `<div class="clothEquip">
            <img src="img/role/weaponFire.png" alt="我來組成防具" class="memRoleCloth">
        </div>`;
            htmlStr += `<img src="${mems[0][0].set_body_src}" alt="我來組成身體" class="memRoleBody${mems[0][0].set_no}" style="filter:hue-rotate(${mems[0][0].set_color}deg);">`;
            htmlStr += `<div class="rolePart"><img src="${mems[0][0].set_part_src}" alt="我來組成不變色的部分" class="memRolePart${mems[0][0].set_no}"></div>`;
            htmlStr += `<div class="roleAccessory"><img src="${mems[3][0].equip_src}" alt="我來組成飾品" class="memRoleAccessory${mems[0][0].set_no}"></div>`;
            htmlStr += `<div class="roleLeftHand">
            <img src="${mems[0][0].set_lefthand_src}" alt="我來組成左手" class="memRoleLeftHand${mems[0][0].set_no}"  style="filter:hue-rotate(${mems[0][0].set_color}deg);"></div>`;
            htmlStr += `<div class="roleRightHand"><img src="${mems[0][0].set_righthand_src}" alt="我來組成右手" class="memRoleRightHand${mems[0][0].set_no}"  style="filter:hue-rotate(${mems[0][0].set_color}deg);"><div class="weaponEquip"><img src="${mems[1][0].equip_src}" alt="我來組成武器" class="memRoleWeapon${mems[0][0].set_no}"></div></div>`;
            htmlStr += `<div class="roleVehicle"><img src="${mems[4][0].level_vehicle_src}" alt="我來組成載具" class="memRoleVehicle${mems[0][0].set_no}"></div>`;
            htmlStr += `</div>
            </div>`;
        }        
    });
    console.log(htmlStr);
    return htmlStr;
}
// ex.
// let memRoleHtml = memRole(memNo);
// $(memRoleHtml).insertBefore('.roleShadow');