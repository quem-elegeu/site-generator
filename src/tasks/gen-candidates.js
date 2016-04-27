'use strict';

gulp.task('gen:persons', function () {
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

    let promises = [];
    for (let i=0; i<data.length; i++) {
        let template = data[i];
        setDefaults(template);
        let prom = gulp.src('src/template/person.html')
            .pipe(handlebars(template, options))
            .pipe(rename(`${template.fileName}.html`))
            .pipe(gulp.dest(`www/vereador`));
        promises.push(prom);
    }
    return Promise.all(promises);
});

