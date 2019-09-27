$(document).ready(function () {
    function adminInit() {
        let storage = sessionStorage;
        let level = storage.getItem('admin_level');
        $('.adminName').text(storage.getItem('admin_account') + ' 您好');
        if (level == 0) {
            $('#btnNewAdmin').addClass('noAuthority');
            $('.noAuthority').css('cursor', 'pointer');
        }
        console.log(level);
        $.ajax({
            url: `adminManage.php`,
            data: {
                action: 'load',
            },
            type: 'GET',
            success: function (adminRows) {
                let admin = JSON.parse(adminRows);
                console.log(admin);
                for (let i = 0; i < admin.length; i++) {
                    let htmlStr = "";
                    htmlStr += `<tr>`;
                    htmlStr += `<td>${admin[i].admin_no}</td>`;
                    htmlStr += `<td><input type="text" class="adminName" disabled value=${admin[i].admin_account}></td>`;
                    htmlStr += `<td><input type="password" class="adminPsw" disabled value=${admin[i].admin_psw}></td>`;

                    if (`${admin[i].admin_level}` == '0') {
                        htmlStr += `<td><select class="form-control adminAuthority" disabled><option selected value="0">唯讀</option><option value="1">管理員</option></select></td>`;
                    } else if (`${admin[i].admin_level}` == '1') {
                        htmlStr += `<td><select class="form-control adminAuthority" disabled><option value="1">唯讀</option><option selected value="1">管理員</option></select></td>`;
                    };
                    if (level == 1) {
                        htmlStr += `<td><button type="button" class="btn btn-pill btn-primary btn-xl btnEditadmin">編輯</button></td><td><button type="button" class="btn btn-pill btn-danger btn-xl btnDelladmin">刪除</button></td>`;
                    } else if (level == 0) {
                        htmlStr += `<td><button type="button" class="btn btn-pill btn-primary btn-xl btnEditadmin noAuthority">編輯</button></td><td><button type="button" class="btn btn-pill btn-danger btn-xl btnDelladmin noAuthority">刪除</button></td>`;
                    }
                    htmlStr += `</tr>`;
                    $('#adminTable').append(htmlStr);
                }

            },
            error: function () {

            }
        }); //initialize via ajax ; transfer by json ; method:GET 
    }
    adminInit();

    if (level == 1) {

        //---------------------------------without php data process
        $('body').on('click', '.btnEditadmin', function () {
            if (this.classList.contains('btn-primary')) {
                $(this.parentElement.parentElement.children).find('.adminName').removeAttr("disabled");
                $(this.parentElement.parentElement.children).find('.adminPsw').removeAttr("disabled");
                $(this.parentElement.parentElement.children).find('.adminAuthority').removeAttr("disabled");
                $(this).text("儲存");
                this.classList.add('adminEditing')
                this.classList.add('btn-success')
                this.classList.remove('btn-primary');
            } else {
                $(this.parentElement.parentElement.children).find('.adminName').attr("disabled", "disabled");
                $(this.parentElement.parentElement.children).find('.adminPsw').attr("disabled", "disabled");
                $(this.parentElement.parentElement.children).find('.adminAuthority').attr("disabled", "disabled");
                $(this).text('編輯');
                this.classList.remove('adminEditing')
                this.classList.add('btn-primary');
                this.classList.remove('btn-success')
            }
        }) //change text & btnColor //unlock & lock edit data column
        $('body').on('click', '#btnNewAdmin', function () {
            let newAdmin = $("<tr class='newAdmin'></tr>").html(
                `<td></td>
        <td><input id="newAdminName" type="text" value="" name="mng"></td>
        <td><input id="newAdminPsw" type="text" value="" name="mng"></td>
        <td>
            <select id="adminAuthority" class="form-control">
                <option value="0">唯讀</option>
                <option value="1">管理員</option>
            </select>
        </td>
        <td>
            <button type="button" class="btn btn-pill btn-primary btn-sm" id="btnAddAdmin">新增</button>
            <button type="button" class="btn btn-pill btn-danger btn-sm" id="btnNoCreateAdmin">取消</button>
        </td>`);
            if ($('.newAdmin').length == 0) {
                $('#adminTable').append(newAdmin);
            }
        }) //create new dataRow for create new admin
        $('body').on('click', '#btnNoCreateAdmin', function () {
            this.parentElement.parentElement.remove();
        }) //cancell for create new admin
        //---------------------------------without php data process

        //---------------------------------within php data process
        $('body').on('click', '#btnAddAdmin', function () {
            let admin_account = $('#newAdminName').val();
            let admin_psw = $('#newAdminPsw').val();
            let admin_level = $('#adminAuthority').val();
            // console.log(admin_no);
            console.log(admin_account);
            console.log(admin_psw);
            console.log(admin_level);
            if ((admin_account && admin_psw)) {
                // let data = {};
                // let jsonStr = JSON.stringify(data);

                $.ajax({
                    type: 'POST',
                    url: `adminManage.php`,
                    data: {
                        admin_account,
                        admin_psw,
                        admin_level,
                        action: 'addAdmin',
                    },
                    success: function (getNoRows) {
                        console.log(getNoRows);
                        let getNo = JSON.parse(getNoRows);
                        let newAdmin = "";
                        newAdmin += `<tr>`;
                        newAdmin += `<td>${getNo[0]}</td>`;
                        newAdmin += `<td><input class="adminName" type="text" value="${admin_account}" disabled></td>`;
                        newAdmin += `<td><input class="adminPsw" type="text" value="${admin_psw}" disabled></td>`;
                        if (`${admin_level}` == '0') {
                            newAdmin += `<td><select class="form-control adminAuthority" disabled><option selected value="0">唯讀</option><option value="1">管理員</option></select></td>`;
                        } else if (`${admin_level}` == '1') {
                            newAdmin += `<td><select class="form-control adminAuthority" disabled><option value="1">唯讀</option><option selected value="1">管理員</option></select></td>`;
                        };
                        newAdmin += `<td><button type="button" class="btn btn-pill btn-primary btn-sm btnEditadmin">編輯</button><button type="button" class="btn btn-pill btn-danger btn-sm btnDelladmin">刪除</button></td>`;
                        newAdmin += `</tr>`;
                        $('#adminTable').append(newAdmin);
                        $('.newAdmin').remove();
                        alert('新增成功');
                    },

                    // error: (e) => handleAjaxError(e, '管理員名稱重複，請重新再試')
                });
            } else {
                alert('帳號或密碼不能為空白');
            }
        }) //add admin into DB
        $('body').on('click', '.btnDelladmin', function () {
            let admin_no = $(this.parentElement.parentElement.children[0]).text();
            console.log(admin_no);
            let btn_this = this;
            let data = {
                admin_no,
            }
            let dellJsonStr = JSON.stringify(data);

            console.log(dellJsonStr);
            $.ajax({
                type: "POST",
                url: `adminManage.php`,
                data: {
                    dellJsonStr,
                    action: 'dellAdmin'
                },
                success: function (deleteBack) {
                    // deleteEcho = parse(deleteBack);
                    // console.log(deleteEcho);
                    $(btn_this.parentElement.parentElement).remove();
                    alert('成功刪除')
                },
                error: function () {
                    alert('fail');
                }
            })
        }) //dell admin from DB
        $('body').on('click', '.adminEditing', function () {
            let admin_no = $(this.parentElement.parentElement.children[0]).text();
            let admin_account = $(this.parentElement.parentElement.children).find('.adminName').val();
            let admin_psw = $(this.parentElement.parentElement.children).find('.adminPsw').val();
            let admin_level = $(this.parentElement.parentElement.children).find('.adminAuthority').find(':selected').val();
            $.ajax({
                type: "POST",
                url: `adminManage.php`,
                data: {
                    admin_no,
                    admin_account,
                    admin_psw,
                    admin_level,
                    action: 'editAdmin',
                },
                success: function (response) {
                    let editResult = JSON.parse(response);
                    console.log(editResult);
                    alert('修改成功');
                    window.location.reload();
                },
            })
        })
    }
    $('body').on('click', '.noAuthority', function () {
        alert('無權限');
    });
    $('body').on('click','.logOut',function(){
        sessionStorage.clear();
    });
});