function headerInit() {
    let width = window.innerWidth;
    console.log(width)
    detect();
    window.addEventListener('resize',detect)
    function bigSize(){
        $('.logo').css({
            'width': '84px'
        })
        $('.menuIcon').css({
            'display': 'flex'
        })
        $('.menu').css({
            'paddingTop': '40px'
        })
        $('header .container').css({
            'height': '133.34px',
            'backgroundColor': 'transparent'
        })
    }
    function smallSize() {
        $('.logo').css({
            'width': '50px'
        })
        $('.menuIcon').css({
            'display': 'none'
        })
        $('.menu').css({
            'paddingTop': '0px'
        })
        $('header .container').css({
            'height': '75px',
            'backgroundColor': 'rgba(0,0,0,.6)'
        })
    }
    function detect(){
        width = window.innerWidth;
        if (width > 767) {
            window.addEventListener('scroll', header);
            header();
            
        } else {
            window.removeEventListener('scroll', header);
            bigSize();
            $('header .container').css({
                'backgroundColor': 'rgba(0,0,0,.6)'
            });
        }
        
    } 
    function header(e){
        if (window.scrollY>=100){
            smallSize();
        } else if (window.scrollY==0){
            bigSize();
        }
    }
}
window.addEventListener('load',headerInit);