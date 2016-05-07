'use strict';
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

const $paths = require('./utils/paths');

gulp.task('copy:js', function () {
    return gulp.src('src/js/*.js')
        .pipe(plugins.uglify())
        .pipe(plugins.rename({
            suffix: `-${$paths.pack.version}.min`
        }))
        .pipe(gulp.dest(`www/js`));
});
