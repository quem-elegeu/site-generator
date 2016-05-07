'use strict';
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

const $paths = require('./utils/paths');

gulp.task('copy:css', function () {
    return gulp.src('src/css/*')
        .pipe(plugins.cleanCss())
        .pipe(plugins.rename({
            suffix: `-${$paths.pack.version}.min`
        }))
        .pipe(gulp.dest(`www/css`));
});
