const leadingLoad = () => {
    const width  = window.innerWidth || document.documentElement.clientWidth ||document.body.clientWidth;
    const height = window.innerHeight|| document.documentElement.clientHeight||document.body.clientHeight;

    console.log(width, height);
    
    let path = [{x: 0,y: height / -100.27}, 
                {x: width / 4.756,y: height / -100.27}, 
                {x: width / 2.378333,y: height / -9.27}, 
                {x: width / 2.21538, y: height / -4.635,},
                {x: width / 2.19538, y: height / -2.06}];
    TweenMax.to(".char", 1, {
        bezier: {
            curviness: 1.5,
            values: path,
            autoRotate: true,
            ease: Bounce.easeOut,
            autoRotate: 90,
        }
    });

    TweenMax.from(".char", 1.5, {
        width: 300
    })

    // TweenMax.to(".char", 1, {
    //     bezier: {
    //         curviness: 1.5,
    //         values: path,
    //         autoRotate: true,
    //         ease: Bounce.easeOut,
    //         autoRotate: 90,
    //     }
    // });
    let pathCircle = [
                    // 右半圈
                    {x: width / 2.19538,y: height / -2.06}, 
                    {x: width / 2.19538 + 300,y: height / -2.06 - 200}, 
                    {x: width / 2.19538 + 600,y: height / -2.06}, 
                    {x: width / 2.19538 + 300, y:height / -2.06 + 450},
                    {x: width / 2.19538, y: height / -2.06},

                      //左半圈
                    {x: width / 2.19538 -300, y: height / -2.06 - 200}, 
                    {x: width / 2.19538 -600, y: height / -2.06}, 
                    {x: width / 2.19538 -300, y:height / -2.06 + 450},
                    {x: width / 2.19538,      y: height / -2.06},
                    ];
    TweenMax.to(".char", 8, {
        bezier: {
            curviness: 1.5,
            values: pathCircle,
            autoRotate: true,
            ease: Bounce.easeOut,
            autoRotate: 90,
        },  
        delay: 2,
    }).repeat(-1);

    // 上下移動
    // TweenMax.to(".char", 2, {
    //     y: height / -2.2,
    //     yoyo: true,
    //     delay: 1.5
    // }).repeat(-1)


    // let pathForSpeed = [{x: -1500,y: 1500 }];
    // TweenMax.from(".speed", 1.5, {
    //     bezier: {
    //         curviness: 1.5,
    //         values: pathForSpeed,
    //         // autoRotate: true,
    //         ease: Bounce.easeOut, y: -500,
    //     },
    //     rotation: 100
    // });

}//init





window.addEventListener('load',leadingLoad);