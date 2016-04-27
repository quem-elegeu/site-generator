'use strict';
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

gulp.task('copy:js', function () {
    return gulp.src('src/js/*.js')
        .pipe(plugins.uglify())
        .pipe(gulp.dest(`www/js`));
});
