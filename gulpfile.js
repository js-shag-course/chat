
const { watch, series, parallel } = require('gulp')
const { src, dest } = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')

const webserver = require('gulp-webserver')

function html () {
  return src('src/*.html')
    .pipe(dest('app/'))
}

function js () {
  return src('src/scripts/**/*.js')
    .pipe(babel({ presets: ['@babel/env'] }))
    // .pipe(uglify())
    .pipe(dest('app/assets/script'))
}

function scss () {
  return src('src/styles/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('app/assets/style'))
}

function assets () {
  return src('src/assets/**/*.*')
    .pipe(dest('app/assets'))
}

function serve (cb) {
  src('./app')
  .pipe(webserver({
    host: '0.0.0.0',
    livereload: true,
    path: '/'
  }))
  cb()
}

function watching (cb) {
  watch('src/styles/**/*.*', scss)
  watch('src/scripts/**/*.js', js)
  watch('src/*.html', html)
  watch('src/assets/**/*', assets)
  cb()
}

exports.default = parallel(serve, watching)

// TODO : закончить таску сборки
// https://www.npmjs.com/package/gulp-clean-css - плагин минификации CSS
exports.build = parallel(buildStyle, buildScript)