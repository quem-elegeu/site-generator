'use strict';
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

const $path = require('path');
const $paths = require('./utils/paths');

const tplDefaults = require('./utils/template-defaults');
const optFactory = require('./utils/options-factory');

gulp.task('gen:candidates', function () {
    let options = optFactory();
    let data = [{fileName: ''}];
    let promises = [];
    for (let i=0; i<data.length; i++) {
        let template = data[i];
        tplDefaults(template);
        let prom = gulp.src($path.join($paths.template, 'candidate.html'))
            .pipe(plugins.compileHandlebars(template, options))
            .pipe(plugins.rename(`${template.fileName}.html`))
            .pipe(gulp.dest(`${$paths.www}/candidates`));
        promises.push(prom);
    }
    return Promise.all(promises);
});

