function headerInit() {
    let width = window.innerWidth;
    console.log(width)
    detect();
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
            $('.menuIcon').css({
                'display':'none'
            })
            $('.menu').css({
                'paddingTop': '0px'
            })
            $('header .container').css({
                'justifyContent':'center',
                'backgroundColor':'rgba(0,0,0,.6)'
            })
        } else if (window.scrollY==0){
            $('.menuIcon').css({
                'display': 'flex'
            })
            $('.menu').css({
                'paddingTop': '40px'
            })
            $('header .container').css({
                'justifyContent': 'center',
                'backgroundColor': 'transparent'
            })
        }
        console.log(window.scrollY);
    }
}
window.addEventListener('load',headerInit);