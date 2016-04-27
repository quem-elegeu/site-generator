'use strict';
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

const $path = require('path');
const $paths = require('./utils/paths');

const tplDefaults = require('./utils/template-defaults');
const optFactory = require('./utils/options-factory');

gulp.task('gen:index', function () {
    let template = tplDefaults();

    let options = optFactory();

    let promises = [],
        paths = ['', 'vereador'];
    for (let i=0, len = paths.length; i<len; i++) {
        let path = paths[i];
        let templ = JSON.parse(JSON.stringify(template));
        if (path !== '') {
            templ.url += `/${path}`;
        }
        let prom = gulp.src($path.join($paths.template, 'index.html'))
            .pipe(plugins.compileHandlebars(templ, options))
            .pipe(plugins.rename(`index.html`))
            .pipe(gulp.dest(`${$paths.www}/${path}`));
        promises.push(prom);
    }

    return Promise.all(promises)
});
