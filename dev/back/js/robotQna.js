$(document).ready(function(){
    $.ajax({    
        url: `robotQna.php?action=load`,
        data: {
            
        },
        type: 'GET',
        success: function(qnasRows){
            let qnas = JSON.parse(qnasRows);
            for(let i=0; i<qnas.length; i++){
                let htmlStr = "";
                htmlStr += `<div class="col-lg-4">`;
                htmlStr += `<div class="card" id="${qnas[i].keyword_no}">`;
                htmlStr += `<div class="card-header">常見問答${qnas[i].keyword_no}</div>`;
                htmlStr += `<div class="card-body">`;
                htmlStr += `<form action="" method="get" enctype="multipart/form-data">`;
                htmlStr += `<table class="table table-responsive-sm table-sm">`;
                htmlStr += `<tr><th>常見問題</th><td><input class="form-control qnaQ" type="text" value="${qnas[i].keyword_con}"></td></tr>`;
                htmlStr += `<tr><th>常見問題的回答</th><td><textarea class="form-control qnaA" rows="3" value="">${qnas[i].keyword_ans}</textarea></td></tr>`;
                if(qnas[i].keyword_status == 0){
                    htmlStr += `<tr><th>常見問答上架狀態</th><td><label class="switch switch-3d switch-success"><input class="switch-input qnaStatus" type="checkbox"><span class="switch-slider"></span></label></td></tr>`;
                }else{
                    htmlStr += `<tr><th>常見問答上架狀態</th><td><label class="switch switch-3d switch-success"><input class="switch-input qnaStatus" type="checkbox" checked="checked"><span class="switch-slider"></span></label></td></tr>`;
                }
                htmlStr += `</table>`;
                htmlStr += `<div class="row"><div class="col-6 col-sm-4 col-md-2 col-xl mb-3 mb-xl-0"><button class="btn btn-pill btn-block btn-success confirmModify" type="button">確認修改</button></div><div class="col-6 col-sm-4 col-md-2 col-xl mb-3 mb-xl-0"><button class="btn btn-pill btn-block btn-danger delete" type="button">刪除</button></div></div>`;
                htmlStr += `</form></div></div></div>`;
                $('.qnasRow').append(htmlStr);
            }
        }
    });
    $('.confirmInsert').click(function(){
        let qnaQ = $('.qnaQ').val();
        let qnaA = $('.qnaA').val();
        if($('.qnaStatus').prop('checked')){
            qnaStatus = 1;
        }else{
            qnaStatus = 0;
        }
        $.ajax({    
            url: `robotQna.php?action=confirmInsert`,
            data: {
                qnaQ:qnaQ, 
                qnaA:qnaA,
                qnaStatus:qnaStatus
            },
            type: 'GET',
            success: function(){
            },
        });
    });
    $('.qnasRow').on('click', '.confirmModify', function(){
        let $this = $(this).closest('.card');
        let qnaNo = $this.attr('id');
        let qnaQ = $this.find('.qnaQ').val();
        let qnaA = $this.find('.qnaA').val();
        if($this.find('.qnaStatus').prop('checked')){
            qnaStatus = 1;
        }else{
            qnaStatus = 0;
        }
        $.ajax({    
            url: `robotQna.php?action=confirmModify`,
            data: {
                qnaNo:qnaNo,
                qnaQ:qnaQ, 
                qnaA:qnaA,
                qnaStatus:qnaStatus
            },
            type: 'GET',
            success: function(){
            },
        });
    });
    $('.qnasRow').on('click', '.delete', function(){
        let $this = $(this).closest('.card');
        let qnaNo = $this.attr('id');
        $.ajax({    
            url: `robotQna.php?action=delete`,
            data: {
                qnaNo:qnaNo,
            },
            type: 'GET',
            success: function(){
            },
        });
    });
});