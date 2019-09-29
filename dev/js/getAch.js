function achGet(ach_no,text = '',callback = '') {
    $.post('getAch.php', { mem_no: sessionStorage['mem_no'], ach_no: ach_no }, responese => {
        if (responese != 'alreadyGet') {
            let ach = JSON.parse(responese);
            title = ach['ach_title'];
            alertBoxShow(`${text}恭喜獲得成就： <span style="color:#fa0">${title}</span>`, '提示', '#7d2c7c', callback);
        }
    });
}
function achInit() {
    if (sessionStorage['mem_no']) {
        let locationPath = location.pathname;
        if (locationPath.indexOf('/game.html') != -1) {
            $('.gameMenuPlay').click(function () {
                achGet(1)
            })
        } 
        // else if (locationPath.indexOf('/card.html') != -1) {
            // achGet(2)
        // } else if (locationPath.indexOf('/role.html') != -1) {
        //     $('.purchaseBtn').click(function () {
        //         achGet(3)
        //     })
        else if (locationPath.indexOf('/video.html') != -1) {
            $('#favorateVideoAdd').click(function () {
                achGet(4,'成功加入最愛<br><br>')
            })
        }
    }
}
window.addEventListener('load', achInit, false)


