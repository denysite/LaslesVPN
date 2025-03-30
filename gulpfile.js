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



// Functions

const fontsStyle = () => {
    let fontsFile = `src/scss/base/_fonts.scss`;

    // Якщо передано флаг --rewrite, видаляємо файл
    if (process.argv.includes('--rewrite') && fs.existsSync(fontsFile)) {
        fs.unlinkSync(fontsFile);
    }

    // Перевіряємо, чи існує папка з шрифтами
    if (fs.existsSync(`dist/fonts/`)) {
        fs.readdir(`dist/fonts/`, function (err, fontsFiles) {
            if (err) {
                console.error("Помилка читання папки шрифтів:", err);
                return;
            }

            if (fontsFiles && fontsFiles.length > 0) {
                // Якщо файл стилів не існує, створюємо його
                if (!fs.existsSync(fontsFile)) {
                    fs.writeFileSync(fontsFile, '');
                    let processedFonts = new Set();

                    fontsFiles.forEach((file) => {
                        let fontFileName = file.split('.')[0];
                        if (!processedFonts.has(fontFileName)) {
                            let fontName = fontFileName.split('-')[0] || fontFileName;
                            let fontWeight = fontFileName.split('-')[1] || 'regular';

                            // Визначаємо вагу шрифту
                            switch (fontWeight.toLowerCase()) {
                                case 'thin': fontWeight = 100; break;
                                case 'extralight': fontWeight = 200; break;
                                case 'light': fontWeight = 300; break;
                                case 'medium': fontWeight = 500; break;
                                case 'semibold': fontWeight = 600; break;
                                case 'bold': fontWeight = 700; break;
                                case 'extrabold':
                                case 'heavy': fontWeight = 800; break;
                                case 'black': fontWeight = 900; break;
                                default: fontWeight = 400;
                            }

                            // Додаємо CSS для шрифту
                            fs.appendFileSync(fontsFile, 
                                `@font-face {
    font-family: '${fontName}';
    font-display: swap;
    src: url("../fonts/${fontFileName}.woff2") format("woff2");
    font-weight: ${fontWeight};
    font-style: normal;
}\r\n`);
                            processedFonts.add(fontFileName);
                        }
                    });
                } else {
                    console.log("Файл scss/base/_fonts.scss вже існує. Для оновлення видаліть його вручну або використовуйте флаг --rewrite.");
                }
            } else {
                console.log("Шрифти не знайдено в папці dist/fonts/");
                if (fs.existsSync(fontsFile)) {
                    fs.unlinkSync(fontsFile);
                }
            }
        });
    } else {
        console.log("Папка dist/fonts/ не існує.");
    }

    return gulp.src(`src/`);
};

function cb() { }

// Clean

gulp.task('devClean', function(done) {
    if(fs.existsSync('./dist/css')) {
        gulp.src('./dist/css', {read: false})
            .pipe(clean({force: true}));
    }
    if(fs.existsSync('./dist/img')) {
        gulp.src('./dist/img', {read: false})
            .pipe(clean({force: true}));
    } 
    if(fs.existsSync('./dist/js')) {
        gulp.src('./dist/js', {read: false})
            .pipe(clean({force: true}));
    }
    if(fs.existsSync('./dist')) {
        gulp.src('./dist/*.html', {read: false})
            .pipe(clean({force: true}));
    }
    done();
});

gulp.task('buildClean', function(done) {
    if(fs.existsSync('./dist')) {
        gulp.src('./dist', {read: false})
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

gulp.task('buildFonts', async function() {
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

gulp.task('devFonts', gulp.series('buildFonts', fontsStyle));

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
    gulp.watch(['src/js/**/*.js'], gulp.series('js'));
});

// Starting

gulp.task('default', gulp.series(
    'devClean',
    gulp.parallel('devHtml', 'devSass', 'devImages', 'js'),
    gulp.parallel('server', 'watch')
));

gulp.task('build', gulp.series(
    'buildClean',
    gulp.parallel('buildHtml', 'buildSass', 'buildImages', 'js', 'buildFonts'),
));