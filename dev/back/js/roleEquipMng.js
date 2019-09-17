$(document).ready(function(){
    $.ajax({    
        url: `roleEquipMng.php?action=load`,
        data: {
            
        },
        type: 'GET',
        success: function(equipsRows){
            let equips = JSON.parse(equipsRows);
            for(let i=0; i<equips.length; i++){
                let htmlStr = "";
                htmlStr += `<div class="col-lg-4">`;
                htmlStr += `<div class="card" id="${equips[i].equip_no}">`;
                htmlStr += `<div class="card-header">裝備${equips[i].equip_no}</div>`;
                htmlStr += `<div class="card-body">`;
                htmlStr += `<form action="" method="get" enctype="multipart/form-data">`;
                htmlStr += `<table class="table table-responsive-sm table-sm">`;
                if(equips[i].equip_class == '武器'){
                    htmlStr += `<tr><th>裝備類別</th><td><select class="form-control equipClass"><option value="0" selected>武器</option><option value="1">防具</option><option value="2">飾品</option></select></td></tr>`;
                }else if(equips[i].equip_class == '防具'){
                    htmlStr += `<tr><th>裝備類別</th><td><select class="form-control equipClass"><option value="0">武器</option><option value="1"  selected>防具</option><option value="2">飾品</option></select></td></tr>`;
                }else{
                    htmlStr += `<tr><th>裝備類別</th><td><select class="form-control equipClass"><option value="0">武器</option><option value="1">防具</option><option value="2" selected>飾品</option></select></td></tr>`;
                }
                htmlStr += `<tr><th>裝備名稱</th><td><input class="form-control equipName" type="text" value="${equips[i].equip_name}"></td></tr>`;
                htmlStr += `<tr><th>裝備來源</th><td><img src="${equips[i].equip_src}}"><input type="file" class="equipSrc"></td></tr>`;
                htmlStr += `<tr><th>裝備價格</th><td><input class="form-control equipPrice" type="text" value="${equips[i].equip_price}"></td></tr>`;
                if(equips[i].equip_status == 0){
                    htmlStr += `<tr><th>裝備上架狀態</th><td><label class="switch switch-3d switch-success"><input class="switch-input equipStatus" type="checkbox"><span class="switch-slider"></span></label></td></tr>`;
                }else{
                    htmlStr += `<tr><th>裝備上架狀態</th><td><label class="switch switch-3d switch-success"><input class="switch-input equipStatus" type="checkbox" checked="checked"><span class="switch-slider"></span></label></td></tr>`;
                }
                htmlStr += `<tr><th>裝備簡介</th><td><textarea class="form-control equipIntro" rows="3" value="">${equips[i].equip_intro}</textarea></td></tr>`;
                htmlStr += `</table>`;
                htmlStr += `<div class="row"><div class="col-6 col-sm-4 col-md-2 col-xl mb-3 mb-xl-0"><button class="btn btn-pill btn-block btn-success confirmModify" type="button">確認修改</button></div><div class="col-6 col-sm-4 col-md-2 col-xl mb-3 mb-xl-0"><button class="btn btn-pill btn-block btn-danger delete" type="button">刪除</button></div></div>`;
                htmlStr += `</form></div></div></div>`;
                $('.equipsRow').append(htmlStr);
            }
        },
    });
    $('.equipsRow').on('change','.equipSrc',function(){
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
        let equipSrc = `img/role/${fileEquipSrc.name}`;
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
                equipSrc:equipSrc,
                equipPrice:equipPrice,
                equipStatus:equipStatus,
                equipIntro:equipIntro
            },
            type: 'GET',
            success: function(){
            },
        });
        location.reload();
    });
    $('.cancelClear').click(function(){
        $(this).parents('form').find('img').attr('src','') ;
    });
    $('.equipsRow').on('click', '.confirmModify', function(){
        let $this = $(this).closest('.card');
        let equipNo = $this.attr('id');
        if($this.find('.equipClass').val()==0){
            equipClass = '武器';
        }else if($this.find('.equipClass').val()==1){
            equipClass = '防具';
        }else{
            equipClass = '飾品';
        }
        let equipName = $this.find('.equipName').val();
        let equipSrc = `img/role/${fileEquipSrc.name}`;
        let equipPrice = $this.find('.equipPrice').val();
        if($this.find('.equipStatus').prop('checked')){
            equipStatus = 1;
        }else{
            equipStatus = 0;
        }
        let equipIntro = $this.find('.equipIntro').val();
        $.ajax({    
            url: `roleEquipMng.php?action=confirmModify`,
            data: {
                equipNo:equipNo,
                equipClass:equipClass, 
                equipName:equipName,
                equipSrc:equipSrc,
                equipPrice:equipPrice,
                equipStatus:equipStatus,
                equipIntro:equipIntro
            },
            type: 'GET',
            success: function(){
            },
        });
        location.reload();
    });
    $('.equipsRow').on('click', '.delete', function(){
        let $this = $(this).closest('.card');
        let equipNo = $this.attr('id');
        $.ajax({    
            url: `roleEquipMng.php?action=delete`,
            data: {
                equipNo:equipNo,
            },
            type: 'GET',
            success: function(){
            },
        });
        location.reload();
    });
});