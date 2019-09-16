const gulp = require('gulp');
const sass = require('gulp-sass');
const bs = require('browser-sync').create();
const minify = require('gulp-clean-css');
const autoPrefixer = require('gulp-autoprefixer');
const iconFont = require('gulp-iconfont');
const sourceMap = require('gulp-sourcemaps');
const timeStamp = Math.round(Date.now()/1000);
const SVG = require('gulp-svg-sprites');
const fileInclude = require('gulp-file-include');
const cheerio = require('gulp-cheerio');
const svgmin = require('gulp-svgmin');

function scss(){
    return gulp.src('./scss/**/main.scss')
        .pipe(sourceMap.init())
        .pipe(sass())
        .pipe(autoPrefixer({
            cascade: false
        }))
        .pipe(minify({compactability:'ie8'}))
        .pipe(sourceMap.write())
        .pipe(gulp.dest('./css/'))
        .pipe(bs.stream());
}

function watch(){
    bs.init({
        server:{
            baseDir:'./'
        }
    });
    
    gulp.watch('./scss/**/*.scss',scss);
    gulp.watch('./*.html').on('change',bs.reload);
    gulp.watch('./js/*.js').on('change',bs.reload);
}

function iconfont(){
    return gulp
        .src('./svg/*.svg')
        .pipe(iconFont({
            fontName: 'Icon',
            prependUnicode: true,
            formats: ['svg','ttf','woff','eot'],
            timestamp: timeStamp
        }))
        .pipe(gulp.dest('./fonts/'));
}

function svgSprite(){
    return gulp.src('./SVG/*.svg')
    .pipe(SVG({
        mode: "defs",
        svgId: "icon-%f"
    }))
    .pipe(cheerio({
        run: function($){
            $('[height]').removeAttr('height');
            $('[width]').removeAttr('width');
        }
    }))
    .pipe(svgmin())
    .pipe(gulp.dest("./SVG/"));
}

function includeSVG(){
    return gulp.src('./index.html')
            .pipe(prepend.prependFile('./SVG/svg/defs.svg'))
            .pipe(gulp.dest('./'))
}

function include(){
    return gulp.src('./index.html')
            .pipe(fileInclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest('./'));
}
exports.scss = scss;
exports.watch = watch;
exports.iconfont = iconfont;
exports.svgSprite = svgSprite;
exports.includeSVG = includeSVG;
exports.include = include;