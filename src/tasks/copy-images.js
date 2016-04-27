'use strict';

gulp.task('copy:images', function () {
    return gulp.src('src/images/*')
        // Perform minification tasks, etc here
        .pipe(gulp.dest(`www/images`));
});
