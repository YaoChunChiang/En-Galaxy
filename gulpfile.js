//引入套件
var gulp = require('gulp');
//var autoprefixer = require('gulp-autoprefixer');
let cleanCSS = require('gulp-clean-css');
var fileinclude = require('gulp-file-include');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
//路徑變數
const web = {
    sass: [
        "./dev/sass/*.scss",
        "./dev/sass/**/*.scss"
    ],
    backSass:[
        "./dev/back/sass/*.scss",
        "./dev/back/sass/**/*.scss"
    ],
    html: [
        "dev/*.html",
        "dev/**/*.html",
        "dev/*.php",
        "dev/**/*.php"
    ],
    backHtml:[
        "dev/back/*.html",
        "dev/back/**/*.html",
        "dev/back/*.php",
        "dev/back/**/*.php"
    ],
    js: [
        "dev/js/*.js"
    ],
    backJs:[
        "dev/back/js/*.js",
        "dev/back/js/**/*.js"
    ],
    img: [
        "dev/img/*.+(png|jpg|jpeg|gif|svg)",
        "dev/img/**/*.+(png|jpg|jpeg|gif|svg)"
    ],
    backImg: [
        "dev/back/img/*.+(png|jpg|jpeg|gif|svg)",
        "dev/back/img/**/*.+(png|jpg|jpeg|gif|svg)"
    ]
};
//圖片

gulp.task('images', function () {
    gulp.src(web.img).pipe(gulp.dest('dest/img'));
    gulp.src(web.backImg).pipe(gulp.dest('dest/back/img'));
});


//搬家
gulp.task('concat', function () {
    gulp.src(web.js).pipe(gulp.dest('dest/js'));
    gulp.src(web.backJs).pipe(gulp.dest('dest/back/js'));
})
//在終端機列印
// gulp.task('hello',function(){
// console.log("hello")
// })
//自動加前綴字
// gulp.task('auto',function(){
//     gulp.src('css/*.css')
//     .pipe(autoprefixer({
//         browsers: ['last 2 versions'],
//         cascade: false
//     }))
//     .pipe(gulp.dest('dest/css'))
// });
// //壓縮css
// gulp.task('mincss',['auto'],function(){
//     return gulp.src('dest/css/*.css')
//     .pipe(cleanCSS({compatibility: 'ie8'}))
//     .pipe(gulp.dest('dest/css/min'));

// });

//監看
// gulp.task('watch',function(){
//        gulp.watch('dest/*.css',['mincss']);
//        gulp.watch(['*.html' , '**/*.html'], ['template']);
// });
//html template
gulp.task('template', function () {
    gulp.src(['dev/*.html','dev/*.php'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dest'));
    gulp.src(['dev/back/*.html','dev/back/*.php'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dest/back'));
});

//sass轉譯
gulp.task('sass', function () {
    return gulp.src(web.sass)
        //壓縮sass檔用下面這句
        //.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dest/css'));
});
gulp.task('backsass', function () {
    return gulp.src(web.backSass)
        //壓縮sass檔用下面這句
        //.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dest/back/css'));
});

var connectPHP = require('gulp-connect-php'); // 結合 PHP
var phpreload = connectPHP.reload;
// 定義相關環境變數
var php_bin = './php/php.exe';
var php_ini = './php/php.ini'; // 手動產生
var web_host = '127.0.0.1';
var web_port = '3001';
var web_home = './dest';

gulp.task('connect-php', function () {
    connectPHP.server({
        // hostname: web_host,
        // bin: php_bin,
        // ini: php_ini,
        // port: web_port,
        base: web_home,
        debug:true
    });
});

//連接瀏覽器
gulp.task('default',  function () {
    browserSync.init({
        server: {
            baseDir: "./dest",
            index: "index.html",
            proxy:"127.0.0.1:8000"
        }
    });
});


gulp.watch([web.sass, web.backSass], ['sass', 'backsass']).on('change', reload);
gulp.watch([web.html, web.backHtml], ['template']).on('change', reload);
gulp.watch([web.js,web.backJs], ['concat']).on('change', reload);
   //gulp.watch("css/*.css" , ['auto']).on('change', reload);
gulp.watch([web.img, web.backImg],['images']).on('change', reload);

