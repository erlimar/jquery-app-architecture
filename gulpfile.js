var fs = require('fs'),
    del = require('del'),
    gulp = require('gulp'),
    concat = require('gulp-concat-util'),
    uglify = require("gulp-uglify"),
    pkg = require('./package.json');

var headerTxt = fs.readFileSync('./header.txt'),
    bannerTxt = fs.readFileSync('./banner.txt');

// A ordem eh crucial para o funcionamento da biblioteca
var libs = [
    'lib/utils.js',
    'lib/core.js',
    'lib/app.js'
]

gulp.task('clean', function () {
    return del('dist/**/*');
});

gulp.task('js', function () {
    return gulp.src(libs)
        .pipe(concat.header(bannerTxt, { pkg: pkg }))
        .pipe(concat('e5r-jquery-arch.js'))
        .pipe(concat.header(headerTxt, { pkg: pkg }))
        .pipe(gulp.dest('dist'))
});

gulp.task('js-min', function () {
    return gulp.src(libs)
        .pipe(concat('e5r-jquery-arch.min.js'))
        .pipe(uglify())
        .pipe(concat.header(headerTxt, { pkg: pkg }))
        .pipe(gulp.dest('dist'))
});

gulp.task('dist', ['js', 'js-min'])
