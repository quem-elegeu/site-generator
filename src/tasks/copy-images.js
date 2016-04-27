'use strict';
const gulp = require('gulp');

gulp.task('copy:images', function () {
    return gulp.src('src/images/*')
        .pipe(gulp.dest(`www/images`));
});
