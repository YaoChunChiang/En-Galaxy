$("#calendar").fullCalendar({
    header: { // 頂部排版
        left: "prev,next", // 左邊放置上一頁、下一頁和今天
        center: "title", // 中間放置標題
        right: "today" // 右邊放置月、周、天
        
    },
    height:"auto",
    defaultDate: "2019-09-08", // 起始日期
    weekends: true, // 顯示星期六跟星期日
    // editable: true, // 啟動拖曳調整日期
    events: [ // 事件
        { // 事件(包含開始時間、結束時間)
            title: "期末驗收",
            start: "2019-09-24",
            end: "2019-09-24"
        },
        { // 事件(包含開始時間、結束時間)
            title: "成果發表",
            start: "2019-09-30",
            end: "2019-09-30"
        },

    ]
});
