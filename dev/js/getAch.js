function achGet(ach_no) {
    $.post('getAch.php', { mem_no: sessionStorage['mem_no'], ach_no: ach_no }, responese => {
        console.log(responese)
        if (responese != 'alreadyGet') {
            let ach = JSON.parse(responese);
            title = ach['ach_title'];
            alertBoxShow(`恭喜獲得成就： <span style="color:#fa0">${title}</span>`, '系統訊息', '#7d2c7c', '');
        }
    });
}
function achInit() {
    if (sessionStorage['mem_no'] != null) {
        let locationPath = location.pathname;
        if (locationPath.indexOf('/game.html') != -1) {
            $('.gameMenuPlay').click(function () {
                achGet(1)
            })
        } else if (locationPath.indexOf('/card.html') != -1) {
            // achGet(2)
        } else if (locationPath.indexOf('/role.html') != -1) {
            $('.purchaseBtn').click(function () {
                achGet(3)
            })
        } else if (locationPath.indexOf('/video.html?video_no') != -1) {
            $('#favorateVideoAdd').click(function () {
                achGet(4)
            })
        }
    }
}
window.addEventListener('load', achInit, false)


