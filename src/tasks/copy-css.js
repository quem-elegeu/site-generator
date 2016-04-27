'use strict';

gulp.task('copy:css', function () {
    return gulp.src('src/css/*')
        // Perform minification tasks, etc here
        .pipe(gulp.dest(`www/css`));
});
