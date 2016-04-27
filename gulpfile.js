'use strict';
var gulp = require('gulp');

gulp.task('dev:watch', () => {
    gulp.watch('src/**/*.html', generators).on('error', e => console.error(e));
    gulp.watch('src/js/*', ['copy:js']).on('error', e => console.error(e));
    gulp.watch('src/css/*', ['copy:css']).on('error', e => console.error(e));
    gulp.watch('src/images/*', ['copy:images']).on('error', e => console.error(e));
});

let generators = ['gen:persons', 'gen:index', 'gen:parties', 'gen:helpers'],
    defaults = ['dev:watch', 'copy:js', 'copy:css', 'copy:images'].concat(generators);


gulp.task('default', defaults);