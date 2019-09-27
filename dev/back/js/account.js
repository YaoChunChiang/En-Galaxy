function memBan() {
    $('body').on('click', '.switchMemStatus', function(){
        let mem_no = $(this.parentElement.parentElement.children[0]).text();
        let mem_status = $(this.parentElement.parentElement.children).find('.switchMemStatus').text();
        let mem_status = $.trim(mem_status) === '正常' ? 1 : 0;
        let data = {
            table_name: `mem_main`,
            mem_no: mem_no,
            mem_status_boolean: mem_status,
        };
        let jsonStr = JSON.stringify(memberMainRow);
        let switch_this = this;
        $.ajax({
            type: "POST",
            url: `accountAuthority.php`,
            success: function(jsonStr) {
                console.log(jsonStr);
                if($(switch_this).children.hasClass('switchAvaliable')) {
                    $('.switchAvaliable').addClass('switchBan').removeClass('switchAvaliable');
                    alert('已將此會員已停權');
                } else if($(switch_this).children.hasClass('switchBan')) {
                    $(switch_this).addClass('switchAvaliable').removeClass('switchBan');
                    alert('已將此會員已復權');
                }
            },
        })
    })
}