'use strict';

gulp.task('copy:js', function () {
    return gulp.src('src/js/*')
        // Perform minification tasks, etc here
        .pipe(gulp.dest(`www/js`));
});
