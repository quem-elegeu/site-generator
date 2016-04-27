'use strict';
const gulp = require('gulp');

gulp.task('copy:js', function () {
    return gulp.src('src/js/*')
        .pipe(gulp.dest(`www/js`));
});
