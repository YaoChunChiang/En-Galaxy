$('document').ready(function () {
    function memberAccountInit() {
        let storage = sessionStorage;
        let level = storage.getItem('admin_level');
        $.ajax({
            type: 'GET',
            url: `accountManage.php`,
            data: {
                action: 'loadAccount',
            },
            success: function (data) {
                let dataString = JSON.parse(data);
                console.log(dataString);
                for (i = 0; i < dataString.length; i++) {
                    let htmlStr = '';
                    htmlStr += `<tr>`;
                    htmlStr += `<td class="mem_noForChange">${dataString[i].mem_no}</td>`;
                    htmlStr += `<td>${dataString[i].level_no}</td>`;
                    htmlStr += `<td>${dataString[i].mem_name}</td>`;
                    htmlStr += `<td>${dataString[i].set_nickname}</td>`;
                    htmlStr += `<td>${dataString[i].mem_money}</td>`;
                    htmlStr += `<td>${dataString[i].mem_id}</td>`;
                    htmlStr += `<td>${dataString[i].mem_psw}</td>`;
                    htmlStr += `<td>${dataString[i].mem_email}</td>`;
                    htmlStr += `<td>${dataString[i].mem_cell}</td>`;
                    if (level == 1) {
                        htmlStr += `<td><label class="switch switch-3d switch-success">`;
                        if (`${dataString[i].mem_status}` == 1) {
                            htmlStr += `<input type="checkbox" class="switch-input switchMemStatus" checked>`;
                        } else if (`${dataString[i].mem_status}` == 0) {
                            htmlStr += `<input type="checkbox" class="switch-input switchMemStatus">`;
                        }
                        htmlStr += `<span class="switch-slider" data-checked="" data-unchecked=""></span>
                        </label></td>`;
                    } else {
                        htmlStr += `<td><label class="noAuthority switch switch-3d switch-success">`;
                        if (`${dataString[i].mem_status}` == 1) {
                            htmlStr += `<input type="checkbox" class="switch-input switchMemStatus" checked>`;
                        } else if (`${dataString[i].mem_status}` == 0) {
                            htmlStr += `<input type="checkbox" class="switch-input switchMemStatus">`;
                        }
                        htmlStr += `<span class="switch-slider" data-checked="" data-unchecked=""></span>
                        </label></td>`;
                    }
                    console.log(dataString[i].mem_status);
                    htmlStr += `</tr>`;
                    $('.accountSwitch').append(htmlStr);
                }
            },
            complete: function () {

            }

        })
    }
    memberAccountInit();
    $('body').on('change', '.switchMemStatus', function () {
        let storage = sessionStorage;
        let level = storage.getItem('admin_level');
        let mem_no = $(this).parent().parent().parent().children('.mem_noForChange').text();
        console.log(mem_no);
        let check = $(this).prop('checked');
        console.log(check);
        console.log(mem_no);
        console.log(check);
        $.ajax({
            type: 'POST',
            url: `accountManage.php`,
            data: {
                mem_no,
                check,
                action: 'changeAuthority',
            },
            success: function (data) {
                let dataString = JSON.parse(data);
                console.log(dataString);
                if (dataString == 1) {
                    alert('已復權');
                }
                if (dataString == 0) {
                    alert('已停權');
                }
                // console.log(data);
            },
            complete: function () {

            }

        })
    });
    $('body').on('click', '.noAuthority', function () {
        alert('無權限');
    })
})