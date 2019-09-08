function headerInit() {
    let width = window.innerWidth;
    console.log(width)
    detect();
    header();
    window.addEventListener('resize',detect)
    function detect(){
        width = window.innerWidth;
        if (width > 767) {
            window.addEventListener('scroll', header);
        } else {
            window.removeEventListener('scroll', header);
        }
    }    
    function header(e){
        if (window.scrollY>=100){
            $('.logo').css({
                'width': '50px',
                'bottom':'auto'
            })
            $('.menuIcon').css({
                'display':'none'
            })
            $('.menu').css({
                'paddingTop': '0px'
            })
            $('header .container').css({
                'height':'75px',
                'backgroundColor':'rgba(0,0,0,.6)'
            })
        } else if (window.scrollY==0){
            $('.logo').css({
                'width':'84px',
                'bottom': '0'
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
    }
}
window.addEventListener('load',headerInit);