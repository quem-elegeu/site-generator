'use strict';
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

const $path = require('path');
const $paths = require('./utils/paths');

const tplDefaults = require('./utils/template-defaults');
const optFactory = require('./utils/options-factory');

gulp.task('gen:parties', function () {
    let options = optFactory();
    let parties = {PT: ''};
    let template = {
            favor: [],
            undecided: [],
            against: []
        },
        keys = Object.keys(parties);
    tplDefaults(template);

    for (let i=0, len = keys.length; i<len; i++) {
        let party = keys[i],
            total = parties[party],
            fullName = party,
            data = {
                party,
                fullName,
                totalFavor: total[0],
                totalAgainst: total[2],
                totalUnd: total[1]
            };
        if (total[0] > total[1] && total[0] > total[2]) {
            template.favor.push(data);
        } else if (total[2] > total[0] && total[2] > total[1]) {
            template.against.push(data);
        } else {
            template.undecided.push(data);
        }
    }

    return gulp.src($path.join($paths.template, 'parties.html'))
        .pipe(plugins.compileHandlebars(template, options))
        .pipe(plugins.rename(`partidos.html`))
        .pipe(gulp.dest(`${$paths.www}`));
});
