// import { TimelineMax } from "gsap";

function indexInit(){
    let memNum = sessionStorage['mem_no'] ? sessionStorage['mem_no'] : 'notMem';

    //塞問題資料
    let putQuestionOnPage = (questions) =>{
        questions.forEach((question, i) => {
            console.log(question)
            $(`.questionTitle h4:eq(${i})`).text(question['que_title']);
            $(`.bounty span:eq(${i})`).text(question['money']);
            $(`.ansNum span:eq(${i})`).text(question['ans_no']);
            let role = memRole(question['mem_no']);
            $(`.qnaListContent .imgWrap.memPic:eq(${i})`).html(role);
            $(`.qnaListContent .yellowBtn:eq(${i})`).click(()=> {window.location.href = `forumQA.php?no=${question['que_no']}`})
        })
        $('.indexForum').click(() => {window.location.href = 'forum.html'})
    }

    //撈問題資料
    const getQuestionData = async () => {
        try{
            // const response = await fetch(`home.php`,{
            //     method: "POST",
            //     body: JSON.stringify({who: 'getQuestion'})
            // });
            const response = await fetch(`home.php?who=getQuestion`);
            if(response.ok){
                const jsonResponse = await response.json();
                // console.log(jsonResponse);
                putQuestionOnPage(jsonResponse);
            }else{
                throw new Error('Request Fail!');
            }
        }catch(error){
            console.log(error);
        }
    };
    getQuestionData();



    let putActivityDataOnPage = (activitys) => {
        activitys.forEach((act, i) => {
            $(`.hostName:eq(${i})`).text(`舉辦會員: ${act['mem_name']}`);
            $(`.eventInfo .infoList li:eq(${0})`).text(`張貼日期: ${act['act_publish']}`);
            $(`.eventInfo .infoList li:eq(${1})`).text(`活動時間: ${act['act_date']}`);
            $(`.eventInfo .infoList li:eq(${2})`).text(`活動地點: ${act['act_place']}`);
            $(`.eventInfo .infoList li:eq(${3})`).text(`活動名稱: ${act['act_name']}`);
            $(`.eventInfo .infoList li:eq(${4})`).text(`活動內容: ${act['act_detail']}`);
            $(`.eventInfo .infoList li:eq(${5})`).text(`報名人數: ${act['join_count']} / ${act['act_max']}`);
            let role = memRole(act['mem_no']);
            $(`.eventProfile .imgWrap.memPic:eq(${i})`).html(role);
            $(`.indexActivity .yellowBtn:eq(${i})`).click(() => {window.location.href = `forumEvent.php?no=${act['act_no']}`})
        })
    }

    // 撈活動
    const getActivityData = async () => {
        try{
            const response = await fetch('home.php?who=getActivityData');
            if(response.ok){
                let activitys = await response.json();
                console.log(activitys);
                putActivityDataOnPage(activitys);
            }else{
                throw new Error("Wrong");
            }
        }catch(error){
            console.log(error);
        }
    }
    getActivityData();

    let path = [{x: 0,y: 0}, {x: 300,y: -80}, {x: 600,y: 0}, {x: 300,y: 80,},{x: 0,y: 0}];
    TweenMax.to(".indexIntro .title img:first-child", 10, {
        bezier: {
            curviness: 1.5,
            values: path,
            autoRotate: true,
            ease: Elastic,
            autoRotate: 90,
        }
    }).repeat(-1);


    let pathright = [{x: 0,y: 0}, {x: -300,y: 80}, {x: -600,y: 0}, {x: -300,y: -80,},{x: 0,y: 0}];
    TweenMax.to(".indexIntro .title img:last-child", 10, {
        bezier: {
            curviness: 1.5,
            values: pathright,
            autoRotate: true,
            ease: Elastic,
            autoRotate: 90,
        }
    }).repeat(-1);


    let video = $(".book img:nth-of-type(1)");
    let pencil = $(".book img:nth-of-type(2)");
    let atom = $(".book img:nth-of-type(3)");
    let indexCard = $(".book img:nth-of-type(4)");
    let abc = $(".book img:nth-of-type(5)");
    let caractor = $(".book img:nth-of-type(6)");
    let telepscope = $(".book img:nth-of-type(7)");
    let book = $(".book img:nth-of-type(8)");

    let tl = new TimelineMax();

    tl
    .from(video, 1, {x:0, y: 100, autoAlpha: 0,})
    .from(pencil, 1, {x:0, y: 100, autoAlpha: 0} ,"-=.6")
    .from(atom, 1, {x:0, y: 100, autoAlpha: 0} ,"-=.7")
    .from(indexCard, 1, {x:0, y: 100, autoAlpha: 0} ,"-=.8")
    .from(abc, 1, {x:0, y: 100, autoAlpha: 0} ,"-=.8")
    .from(caractor, 1, {x:0, y: 100, autoAlpha: 0} ,"-=.9")
    .from(telepscope, 1, {x:0, y: 100, autoAlpha: 0} ,"-=.9")
    .from(book, 1, {x:0, y: 100, autoAlpha: 0} ,"-=.9")

    $(".cardSystem .button:last-child").click(function(){
        let tlCard = new TimelineMax();
        tlCard
        .to(".cardSystem .card:last-child", 1, {x:100, y: -100, autoAlpha: 0, rotation: 20})
        .to(".cardSystem .card:last-child", 1, {x: 0, y: 0,autoAlpha: 1,rotation: 0})
        .restart();
    })
    // TweenMax.to(".cardSystem .card:last-child", 2, {x:-100, y: -100, autoAlpha: 0, rotation: 20, delay: 2})
    $(".cardSystem .button:first-child").click(function(){
        let tlCard = new TimelineMax();
        tlCard
        .to(".cardSystem .card:last-child", 1, {x:-100, y: -100, autoAlpha: 0, rotation: -20})
        .to(".cardSystem .card:last-child", 1, {x: 0, y: 0,autoAlpha: 1,rotation: 0});
    })



    let bookScene = document.querySelector(".indexIntro .book");
    let bookparallax = new Parallax(bookScene);





    var controller = new ScrollMagic.Controller();
    var animation2 = TweenMax.to('.indexChange .banner', 1, {
        x: -800
    });
    
    
    var scene2 = new ScrollMagic.Scene({
        triggerElement: '#indexTriggerBanner',
        // reverse :false,
        duration: '100%',
        offset :' -200px',
        // triggerHook: 0,
    }).setTween(animation2).addTo(controller)
    // .addIndicators()
}



window.addEventListener("load" , indexInit);