'use strict';

gulp.task('gen:parties', function () {
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
    let template = {
            favor: [],
            undecided: [],
            against: []
        },
        keys = Object.keys(parties);
    setDefaults(template);

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

    return gulp.src('src/template/parties.html')
        .pipe(handlebars(template, options))
        .pipe(rename(`partidos.html`))
        .pipe(gulp.dest(`www`));
});
