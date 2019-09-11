function showImgSetBodySrc(){
    let fileChoose = this;
    let file = this.files[0];
    let readFile = new FileReader();
    readFile.readAsDataURL(file);
    readFile.addEventListener('load',function(){
        let image = fileChoose.previousSibling;
        image.src = this.result;
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
        htmlStr += `<div class="card-header">${sets[i].set_no}</div>`;
        htmlStr += `<div class="card-body">`;
        htmlStr += `<table class="table table-responsive-sm table-sm">`;
        htmlStr += `<tr><th>所屬等級</th><td>${sets[i].level_no}</td></tr>`;
        htmlStr += `<tr><th>設定名稱</th><td><input class="form-control" type="text" value="${sets[i].set_name}"></td></tr>`;
        htmlStr += `<tr><th>設定本體來源</th><td><img src="${sets[i].set_body_src}" class="imgSetBodySrc"><input type="file" class="fileSetBodySrc"></td></tr>`;
        htmlStr += `<tr><th>設定不上色部分來源</th><td><img src="${sets[i].set_part_src}"><input type="file"></td></tr>`;
        htmlStr += `<tr><th>設定左手來源</th><td><img src="${sets[i].set_lefthand_src}"><input type="file" class=></td></tr>`;
        htmlStr += `<tr><th>設定右手來源</th><td><img src="${sets[i].set_righthand_src}"><input type="file"></td></tr>`;
        htmlStr += `<tr><th>設定上架狀態</th><td><label class="switch switch-3d switch-success"><input class="switch-input" type="checkbox" checked="${sets[i].set_status}"><span class="switch-slider"></span></label></td></tr>`;
        htmlStr += `<tr><th>設定簡介</th><td><textarea class="form-control" rows="3" value="${sets[i].set_intro}"></textarea></td></tr>`;
        htmlStr += `</table>`;
        htmlStr += `<div class="row test"><div class="col-6 col-sm-4 col-md-2 col-xl mb-3 mb-xl-0"><button class="btn btn-pill btn-block btn-success" type="button">確認修改</button></div><div class="col-6 col-sm-4 col-md-2 col-xl mb-3 mb-xl-0"><button class="btn btn-pill btn-block btn-danger" type="button">刪除</button></div></div>`;
        htmlStr += `</div>`;
        htmlStr += `</div>`;
        document.getElementsByClassName("col-lg-4")[i+1].innerHTML = htmlStr;
        document.getElementsByClassName('fileSetBodySrc')[i].addEventListener('change', showImgSetBodySrc, false);
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
        let fileSetBody = this.files[0];
        let readFile = new FileReader();
        readFile.readAsDataURL(fileSetBody);
        readFile.addEventListener('load',function(){
            imgShowed = fileChoose.previousElementSibling;
            imgShowed.src = this.result;
        });
    });
    $('.confirmInsert').click(function(){
        let setName = $('.setName').val();
        let setBodySrc = imgShowed.src;
        $.ajax({    
            url: `roleManage.php?action=setInsert`,
            data: {setName: setName, setBodySrc:setBodySrc},
            type: 'GET',
            success: function(){
            },
        });
    });
}
window.addEventListener("load", init, false);
