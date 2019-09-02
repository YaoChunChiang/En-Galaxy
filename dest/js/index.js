// import { TimelineMax } from "gsap";

function indexInit(){
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


    // let scene = document.getElementById('indexCardDecorations');
    // let parallax = new Parallax(scene);

    // let bookScene = document.querySelector(".indexIntro .book");
    // let bookparallax = new Parallax(bookScene);





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
    }).setTween(animation2).addIndicators().addTo(controller)
}



window.addEventListener("load" , indexInit);