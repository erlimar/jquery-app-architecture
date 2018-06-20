var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('dist', function () {
    return gulp.src(['app.js', 'core.js', 'utils.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('e5r-jquery-arch.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
});

