$(document).ready(function () {

    $('#launch').click(function () {
        $('#showLaunch').slideToggle();
        $('.showLaunchBg').slideToggle();
        $('.closeShow').slideToggle();
    })


    $('.showLaunchBg').click(function () {
        $('#showLaunch').slideToggle();
        $('.showLaunchBg').slideToggle();
        $('.closeShow').slideToggle();
    })

    $('.closeShow').click(function () {
        $('#showLaunch').slideToggle();
        $('.showLaunchBg').slideToggle();
        $('.closeShow').slideToggle();
    })

    $('#actFormBtn').click(function () {
        $('#showLaunch').slideToggle();
        $('.showLaunchBg').slideToggle();
        $('.closeShow').slideToggle();
    })
});
    // //改變活動名稱
    // $('#createName').change(function(){
    //     var name = $(this).val();
    //     $("#user-evt-name").val(name);
    // });
    
    // $('.hold-act').change(function () {
    //     var name = $(this).val();
    //     $("#user-evt-name").val(name);
    // });
    

    //首頁表單改變時，燈箱的表單也跟著改變
//     function assignChange(eventNode1, eventNode2) {
//         $(eventNode1).change(function () {
//             // console.log($(this).children('option:selected').index());
//             var ind = $(this).children('option:selected').index();
//             ind = parseInt(ind) + 1;
//             $(eventNode2).children(':nth-child(n)').attr('selected', false);
//             $(eventNode2).children(':nth-child(' + ind + ')').attr('selected', true);
//         });
//     }
//     assignChange('#createType', '#boxType');//改變類型
//     assignChange('#createPeople', '#boxPeople');//改變店鋪
//     assignChange('#createStore', '#boxStore');//改變人數

//     if (document.querySelector('.mobile-create')){
//         $('.mobile-create').click(function(){
//                 $('#show-launch').slideToggle();
//                 $('.show-launch-bg').slideToggle();
//                 $('.close-show-launch').slideToggle();
//         });
//     }
// });