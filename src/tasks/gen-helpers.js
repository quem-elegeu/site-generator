'use strict';
const gulp = require('require');
const plugins = require('gulp-load-plugins')();

const paths = require('./utils/paths');

const tplDefaults = require('./utils/template-defaults');
const optFactory = require('./utils/options-factory');

gulp.task('gen:helpers', function () {
    let options = optFactory();

    let promises = [],
        templateNames = [
            {tpl: 'how-work', to: 'como-funciona', dir: ''},
            {tpl: 'help', to: 'achou-erro', dir: ''}
        ];
    for (let i=0, len=templateNames.length; i<len; i++) {
        let template = templateNames[i],
            tpl = tplDefaults();

        let prom = gulp.src(path.join(paths.template, `${template.tpl}.html`))
            .pipe(plugins.compileHandlebars(tpl, options))
            .pipe(plugins.rename(`${template.to}.html`))
            .pipe(gulp.dest(`${paths.www}/${tpl.dir}`));

        promises.push(prom);
    }

    return Promise.all(promises);
});