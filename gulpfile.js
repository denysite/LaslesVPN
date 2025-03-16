const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const groupMedia = require('gulp-group-css-media-queries');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const fonter = require('gulp-fonter');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const autorpefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const htmlclean = require('gulp-htmlclean');
const webp = require('gulp-webp');
const webpHtml = require('gulp-webp-html');
const webpCss = require('gulp-webp-css');
const { format } = require('path');

const webpack = require('webpack-stream');
const babel = require('gulp-babel');

gulp.task('clean', function(done) {
    if(fs.existsSync('./dist')) {
        return gulp.src('./dist', {read: false})
            .pipe(clean({force: true}));
    } 
    done();
});

// HTML

gulp.task('devHtml', function() {
    return gulp.src(['src/html/*.html'])
        .pipe(changed('./dist/html/**/*.html'), { hasChanged: changed.compareContents })
        .pipe(plumber({
            errorHandler: notify.onError({
                title: 'HTML',
                message: "Error: <%= error.message %>",
                sound: false
            })
        }))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream());
});

gulp.task('buildHtml', function() {
    return gulp.src(['src/html/**/*.html'])
        .pipe(changed('./dist/'), { hasChanged: changed.compareContents })
        .pipe(plumber({
            errorHandler: notify.onError({
                title: 'HTML',
                message: "Error: <%= error.message %>",
                sound: false
            })
        }))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(webpHtml())
        .pipe(htmlclean())
        .pipe(gulp.dest('./dist/'))
});

// Styles

gulp.task('devSass', function() {
    return gulp.src(['src/scss/**/*.scss'])
        .pipe(changed('./dist/scss/**/*.scss'))
        .pipe(plumber({
            errorHandler: notify.onError({
                title: 'Styles',
                message: "Error: <%= error.message %>",
                sound: false
            })
        }))
        .pipe(sass())
        .pipe(sourceMaps.init())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream());
});

gulp.task('buildSass', function() {
    return gulp.src(['src/scss/*.scss'])
        .pipe(plumber({
            errorHandler: notify.onError({
                title: 'Styles',
                message: "Error: <%= error.message %>",
                sound: false
            })
        }))
        .pipe(autorpefixer())
        .pipe(groupMedia())
        .pipe(sass())
        .pipe(webpCss())
        .pipe(csso())
        .pipe(gulp.dest('./dist/css/'))
});

// Images

gulp.task('devImages', function() {
    return gulp.src(['src/img/**/*'], { encoding: false })
        .pipe(changed('./dist/img/**/*'), { hasChanged: changed.compareContents })
        .pipe(plumber({
            errorHandler: notify.onError({
                title: 'Images',
                message: "Error: <%= error.message %>",
                sound: false
            })
        }))
        .pipe(gulp.dest('./dist/img/'))
        .pipe(browserSync.stream());
});

gulp.task('buildImages', function() {
    return gulp.src(['src/img/**/*'], { encoding: false })
        .pipe(plumber({
            errorHandler: notify.onError({
                title: 'Images',
                message: "Error: <%= error.message %>",
                sound: false
            })
        }))
        .pipe(webp())
        .pipe(gulp.dest('./dist/img/'))
        .pipe(gulp.src(['src/img/**/*'], { encoding: false }))
        .pipe(imagemin({ verbose: true }))
        .pipe(gulp.dest('./dist/img/'))
});

// Fonts

gulp.task('fonts', async function() {
    const ttf2woff2 = (await import('gulp-ttf2woff2')).default;
    return gulp.src(['./src/fonts/', '!./src/fonts/1x1.ttf'])
        .pipe(plumber({
            errorHandler: notify.onError({
                title: 'Fonts',
                message: "Error: <%= error.message %>",
                sound: false
            })
        }))
        .pipe(fonter({
            formats: ['woff', 'ttf']
        }))
        .pipe(gulp.src(['./src/fonts/*.ttf', '!./src/fonts/1x1.ttf'], {
            encoding: false, // Important!
            removeBOM: false,
          }))
        .pipe(ttf2woff2())
        .pipe(gulp.dest('./dist/fonts/'));
});

// JS

gulp.task('js', function() {
    return gulp.src('./src/js/*.js')
        .pipe(changed('./dist/js/**/*.js'), { hasChanged: changed.compareContents })
        .pipe(plumber({
            errorHandler: notify.onError({
                title: 'JS',
                message: "Error: <%= error.message %>",
                sound: false
            })
        }))
        .pipe(babel())
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(browserSync.stream());
});

// Server

gulp.task('server', function() {
    browserSync.init({
        server: { baseDir: './dist' },
        open: true,
        notify: false
    });
});

gulp.task('watch', function() {
    gulp.watch(['src/**/*.html'], gulp.series('devHtml')).on('change', browserSync.reload);
    gulp.watch(['src/scss/**/*.scss'], gulp.series('devSass')).on('change', browserSync.reload);
    gulp.watch(['src/img/**/*'], gulp.series('devImages')).on('change', browserSync.reload);
    gulp.watch(['src/js/**/*.js'], gulp.series('js')).on('change', browserSync.reload);
});

// Starting

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('devHtml', 'devSass', 'devImages', 'js', 'fonts'),
    gulp.parallel('server', 'watch')
));

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('buildHtml', 'buildSass', 'buildImages', 'js', 'fonts'),
));