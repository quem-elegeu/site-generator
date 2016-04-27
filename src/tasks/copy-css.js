'use strict';
const gulp = require('gulp');

gulp.task('copy:css', function () {
    return gulp.src('src/css/*')
        .pipe(gulp.dest(`www/css`));
});
