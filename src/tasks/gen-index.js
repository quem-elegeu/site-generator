'use strict';

gulp.task('gen:index', function () {
    let template = {
        favor: data.filter(o => o.vote === true),
        undecided: data.filter(o => o.vote === undefined),
        against: data.filter(o => o.vote === false)
    };
    setDefaults(template);

    template.favorEmails = template.favor.map(o => o.email).join(',');
    template.undecidedEmails = template.undecided.map(o => o.email).join(',');
    template.againstEmails = template.against.map(o => o.email).join(',');

    template.favorPct = Math.round(template.favor.length * 100 / data.length);
    template.undecidedPct = Math.round(template.undecided.length * 100 / data.length);
    template.againstPct = Math.round(template.against.length * 100 / data.length);

    let options = {
        ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
        partials: {},
        batch: ['./src/partials'],
        helpers: {
            capitals: function(str){
                return str.toUpperCase();
            }
        }
    };

    let promises = [],
        paths = ['', 'vereador'];
    for (let i=0, len = paths.length; i<len; i++) {
        let path = paths[i];
        let templ = JSON.parse(JSON.stringify(template));
        if (path !== '') {
            templ.url += `/${path}`;
        }
        let prom = gulp.src('src/template/index.html')
            .pipe(handlebars(templ, options))
            .pipe(gulp.dest(`www/${path}`));
        promises.push(prom);
    }

    return Promise.all(promises)
});
