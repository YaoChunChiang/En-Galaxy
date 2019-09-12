function showImgSetBodySrc(){
    let fileChoose = this;
    modifyBodySrc = this.files[0];
    let readFile = new FileReader();
    readFile.readAsDataURL(modifyBodySrc);
    readFile.addEventListener('load',function(){
        let image = fileChoose.previousSibling;
        image.src = this.result;
    });
}
function showImgSetPartSrc(){
    let fileChoose = this;
    modifyPartSrc = this.files[0];
    let readFile = new FileReader();
    readFile.readAsDataURL(modifyPartSrc);
    readFile.addEventListener('load',function(){
        let image = fileChoose.previousSibling;
        image.src = this.result;
    });
}
function showImgSetLeftHandSrc(){
    let fileChoose = this;
    modifyLeftHandSrc = this.files[0];
    let readFile = new FileReader();
    readFile.readAsDataURL(modifyLeftHandSrc);
    readFile.addEventListener('load',function(){
        let image = fileChoose.previousSibling;
        image.src = this.result;
    });
}
function showImgSetRightHandSrc(){
    let fileChoose = this;
    modifyRightHandSrc = this.files[0];
    let readFile = new FileReader();
    readFile.readAsDataURL(modifyRightHandSrc);
    readFile.addEventListener('load',function(){
        let image = fileChoose.previousSibling;
        image.src = this.result;
    });
}
function confirmModify(){
    let $this = $(this).closest('.card');
    let setId = $this.attr('id');
    let setName = $this.find('.setName').val();
    let setBodySrc = `img/role/${modifyBodySrc.name}`;
    let setPartSrc = `img/role/${modifyPartSrc.name}`;
    let setLeftHandSrc = `img/role/${modifyLeftHandSrc.name}`;
    let setRightHandSrc = `img/role/${modifyRightHandSrc.name}`;
    if($this.find('.setStatus').prop('checked')){
        var setStatus = 1;
    }else{
        var setStatus = 0;
    }
    let setIntro = $this.find('.setIntro').val();
    $.ajax({
        url: `roleManage.php?action=setModify`,
		data: {
            setId:setId,
            setName:setName, 
            setBodySrc:setBodySrc,
            setPartSrc:setPartSrc,
            setLeftHandSrc:setLeftHandSrc,
            setRightHandSrc:setRightHandSrc,
            setStatus:setStatus,
            setIntro:setIntro
        },
		type: 'GET',
		success: function(){
		},
    });
}
function setDelete(){
    let setId = $(this).closest('.card').attr('id');
    $.ajax({
        url: `roleManage.php?action=setDelete`,
		data: {setId: setId},
		type: 'GET',
		success: function(){
		},
    });
}
function showSets(jsonStr){
    var sets = JSON.parse(jsonStr);
    for(var i=0; i<sets.length;i++){
        var row = document.getElementsByClassName('row')[0]
        var div = document.createElement("div");
        row.appendChild(div);
        div.setAttribute("class","col-lg-4");
        var htmlStr = "";
        htmlStr += `<div id="${sets[i].set_no}" class="card">`;
        htmlStr += `<div class="card-header">設定${sets[i].set_no}</div>`;
        htmlStr += `<div class="card-body">`;
        htmlStr += `<table class="table table-responsive-sm table-sm">`;
        htmlStr += `<tr><th>所屬等級</th><td>${sets[i].level_no}</td></tr>`;
        htmlStr += `<tr><th>設定名稱</th><td><input class="form-control setName" type="text" value="${sets[i].set_name}"></td></tr>`;
        htmlStr += `<tr><th>設定本體來源</th><td><img src="${sets[i].set_body_src}" class="imgSetBodySrc"><input type="file" class="fileSetBodySrc"></td></tr>`;
        htmlStr += `<tr><th>設定不上色部分來源</th><td><img src="${sets[i].set_part_src}"><input type="file" class="fileSetPartSrc"></td></tr>`;
        htmlStr += `<tr><th>設定左手來源</th><td><img src="${sets[i].set_lefthand_src}"><input type="file" class="fileSetLeftHandSrc"></td></tr>`;
        htmlStr += `<tr><th>設定右手來源</th><td><img src="${sets[i].set_righthand_src}"><input type="file" class="fileSetRightHandSrc"></td></tr>`;
        if(sets[i].set_status == 0){
            htmlStr += `<tr><th>設定上架狀態</th><td><label class="switch switch-3d switch-success"><input class="switch-input setStatus" type="checkbox"><span class="switch-slider"></span></label></td></tr>`;
        }else{
            htmlStr += `<tr><th>設定上架狀態</th><td><label class="switch switch-3d switch-success"><input class="switch-input setStatus" type="checkbox" checked="checked"><span class="switch-slider"></span></label></td></tr>`;
        }
        htmlStr += `<tr><th>設定簡介</th><td><textarea class="form-control setIntro" rows="3">${sets[i].set_intro}</textarea></td></tr>`;
        htmlStr += `</table>`;
        htmlStr += `<div class="row test"><div class="col-6 col-sm-4 col-md-2 col-xl mb-3 mb-xl-0"><button class="btn btn-pill btn-block btn-success confirmModify" type="button">確認修改</button></div><div class="col-6 col-sm-4 col-md-2 col-xl mb-3 mb-xl-0"><button class="btn btn-pill btn-block btn-danger" type="button">刪除</button></div></div>`;
        htmlStr += `</div>`;
        htmlStr += `</div>`;
        document.getElementsByClassName("col-lg-4")[i+1].innerHTML = htmlStr;
        document.getElementsByClassName('fileSetBodySrc')[i].addEventListener('change', showImgSetBodySrc, false);
        document.getElementsByClassName('fileSetPartSrc')[i].addEventListener('change', showImgSetPartSrc, false);
        document.getElementsByClassName('fileSetLeftHandSrc')[i].addEventListener('change', showImgSetLeftHandSrc, false);
        document.getElementsByClassName('fileSetRightHandSrc')[i].addEventListener('change', showImgSetRightHandSrc, false);
        document.getElementsByClassName('confirmModify')[i].addEventListener('click', confirmModify, false);
        document.getElementsByClassName('btn-danger')[i].addEventListener('click', setDelete, false);
        }
    }
function init(){
    var xhr = new XMLHttpRequest();
    xhr.onload=function(){
        if( xhr.status == 200 ){
            showSets(xhr.responseText);
        }else{
            alert( xhr.status );
        }
    }
    var url = "roleManage.php?action=load";
    xhr.open("Get", url, true);
    xhr.send(null);
    $('.setBodySrc').change(function(){
        let fileChoose = this;
        fileSetBody = this.files[0];
        let readFile = new FileReader();
        readFile.readAsDataURL(fileSetBody);
        readFile.addEventListener('load',function(){
            imgShowed = fileChoose.previousElementSibling;
            imgShowed.src = this.result;
        });
    });
    $('.setPartSrc').change(function(){
        let fileChoose = this;
        fileSetPart = this.files[0];
        let readFile = new FileReader();
        readFile.readAsDataURL(fileSetPart);
        readFile.addEventListener('load',function(){
            imgShowed = fileChoose.previousElementSibling;
            imgShowed.src = this.result;
        });
    });
    $('.setLeftHandSrc').change(function(){
        let fileChoose = this;
        fileSetLeftHand = this.files[0];
        let readFile = new FileReader();
        readFile.readAsDataURL(fileSetLeftHand);
        readFile.addEventListener('load',function(){
            imgShowed = fileChoose.previousElementSibling;
            imgShowed.src = this.result;
        });
    });
    $('.setRightHandSrc').change(function(){
        let fileChoose = this;
        fileSetRightHand = this.files[0];
        let readFile = new FileReader();
        readFile.readAsDataURL(fileSetRightHand);
        readFile.addEventListener('load',function(){
            imgShowed = fileChoose.previousElementSibling;
            imgShowed.src = this.result;
        });
    });
    $('.confirmInsert').click(function(){
        let setName = $('.setName').val();
        let setBodySrc = `img/role/${fileSetBody.name}`;
        let setPartSrc = `img/role/${fileSetPart.name}`;
        let setLeftHandSrc = `img/role/${fileSetLeftHand.name}`;
        let setRightHandSrc = `img/role/${fileSetRightHand.name}`;
        if($('.setStatus').prop('checked')){
            setStatus = 1;
        }else{
            setStatus = 0;
        }
        let setIntro = $('.setIntro').val();
        $.ajax({    
            url: `roleManage.php?action=setInsert`,
            data: {
                setName:setName, 
                setBodySrc:setBodySrc,
                setPartSrc:setPartSrc,
                setLeftHandSrc:setLeftHandSrc,
                setRightHandSrc:setRightHandSrc,
                setStatus:setStatus,
                setIntro:setIntro
            },
            type: 'GET',
            success: function(){
            },
        });
    });
    $('.cancelClear').click(function(){
        $(this).parents('form').find('img').attr('src','') ;
    });
}
window.addEventListener("load", init, false);
