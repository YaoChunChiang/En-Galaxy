$("#calendar").fullCalendar({
    // 參數設定[註1]
    header: { // 頂部排版
        left: "prev,next today", // 左邊放置上一頁、下一頁和今天
        center: "title", // 中間放置標題
        right: "month,basicWeek,basicDay" // 右邊放置月、周、天
    },
    defaultDate: "2019-09-08", // 起始日期
    weekends: true, // 顯示星期六跟星期日
    // editable: true, // 啟動拖曳調整日期
    events: [ // 事件
        { // 事件(包含開始時間、結束時間)
            title: "會議",
            start: "2018-02-12T10:30:00",
            end: "2018-02-12T12:30:00"
        },

    ]
});

// var today = new Date();
// var years = today.getFullYear();
// var months = 1 + today.getMonth();
// var dates = today.getDate();
// var dayone = new Date(years, today.getMonth(), 1);
// var weeks = dayone.getDay();
// var tdynum = weeks + 7 + dates - 1;
// var days;
// // document.write(years, "<br>");
// // document.write(months, "<br>");
// // document.write(dates, "<br>");
// // document.write(weeks, "<br>");

// if (months == 1 || months == 3 || months == 5 || months == 7 || months == 8 || months ==
//     10 || months == 12) {
//     days = 31;
// }
// if (months == 4 || months == 6 || months == 9 || months == 11) {
//     days = 30;
// }
// if (months == 2) {
//     if (years % 4 == 0) {
//         days = 29;
//     } else {
//         days = 28;
//     }
// }
// console.log(document.getElementsByTagName("td")[0].innerHTML);
// console.log(dayone);
// console.log(dates);
// console.log(weeks + 7);
// for (i = 1; i <= days; i++) {
//     document.getElementsByTagName("td")[weeks + 7].innerHTML = i;
//     weeks++;
// }

// tdy = document.getElementsByTagName("td")[tdynum];
// console.log(tdynum);
// console.log(tdy);
// tdy.setAttribute("bgColor", "aqua");