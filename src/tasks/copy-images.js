'use strict';
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

const $paths = require('./utils/paths');

gulp.task('copy:images', function () {
    return gulp.src('src/images/*')
        .pipe(plugins.rename({
            suffix: `-${$paths.pack.version}`
        }))
        .pipe(gulp.dest(`www/images`));
});
