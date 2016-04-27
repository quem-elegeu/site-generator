'use strict';
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

gulp.task('copy:css', function () {
    return gulp.src('src/css/*')
        .pipe(plugins.cleanCss())
        .pipe(gulp.dest(`www/css`));
});
