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
        "dev/**/*.html"
    ],
    backHtml:[
        "dev/back/*.html",
        "dev/back/**/*.html"
    ],
    js: [
        "dev/js/*.js"
    ],
    backJs:[
        "dev/back/js/*.js",
        "dev/back/js/**/*.js"
    ]
};
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
    gulp.src(['dev/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dest'));
    gulp.src(['dev/back/*.html'])
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

//連接瀏覽器
gulp.task('default', function () {
    browserSync.init({
        server: {
            baseDir: "./dest",
            index: "index.html"
        }
    });
});


gulp.watch([web.sass,web.backSass], ['sass', 'backsass']).on('change', reload);
gulp.watch(web.html, ['template']).on('change', reload);
gulp.watch([web.js,web.backJs], ['concat']).on('change', reload);
   //gulp.watch("css/*.css" , ['auto']).on('change', reload);
   // gulp.watch("images/*").on('change', reload);

