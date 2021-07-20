'use strict';
const path = require('path');
const { src, dest, parallel, series, watch } = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const postcss = require('gulp-postcss');
const csso = require("gulp-csso");
const autoprefixer = require('autoprefixer');
const sass = require("gulp-sass");
const rollup = require('gulp-better-rollup');
const imagemin = require('gulp-imagemin');
const sourcemap = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();
const ghPages = require('gh-pages');

function js() {
  return src([
    'src/js/script.js'])
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(rollup({}, 'iife'))
    .pipe(dest("build/js"))
    .pipe(sourcemap.write(''))
    .pipe(rename('script.min.js'))
    .pipe(uglify())
    .pipe(dest('build/js'))
    .pipe(browserSync.stream())
}

function scss() {
  return src("src/scss/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(dest("build/css"))
    .pipe(browserSync.stream());
}

function img() {
  return src('src/img/*.{jpg,png,gif,svg,webp}')
    .pipe(imagemin({ optimizationLevel: 1 }))
    .pipe(dest('build/img/'))
    .pipe(browserSync.stream());
}

function font() {
  return src('src/font/**/*.{woff,woff2}')
    .pipe(dest('build/font/'))
    .pipe(browserSync.stream());
}

function html() {
  return src('src/*.{html,ico}')
    .pipe(dest('build/'))
    .pipe(browserSync.stream());
}

function browsersync() {
  browserSync.init({
    server: { baseDir: './build/' },
    notify: false,
    online: true
  })
}

function startwatch() {
  watch('src/js/**/*.js', js);
  watch('src/scss/**/*.scss', scss);
  watch('src/font/**/*.{woff,woff2}', font);
  watch('src/img/**/*', img);
  watch('src/*.html', html);
}

function cleandist() {
  return del('build/**/*', { force: true })
}

function deploy(cb) {
  ghPages.publish(path.join(process.cwd(), './build'), cb);
}

exports.browserSync = browserSync;
exports.js = js;
exports.scss = scss;
exports.img = img;
exports.font = font;
exports.html = html;
exports.start = parallel(scss, js, img, html, font, browsersync, startwatch);
exports.build = series(cleandist, scss, js, img, html, font);
exports.deploy = deploy;
