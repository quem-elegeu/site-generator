'use strict';
const $pack = require('./package'),
    prjName = `${$pack.name}-saopaulo`;
var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');

var xlsx = require('node-xlsx'),
    diacritics = require('diacritics');
var obj = xlsx.parse(__dirname + '/data/VEREADORES SP INFOS PLACAR.xlsx'),
    parties = {},
    data = obj[0].data.filter((o, i) => i !== 0 && o[0]).map(o => {
        let name = o[0],
            fileName = diacritics.remove(name).trim().replace(/ /g, '-').toLocaleLowerCase(),
            vote = o[10] && o[10].trim().toLowerCase(),
            party = o[1].trim().toUpperCase();
        if (!parties[party]) {
            parties[party] = [0,0,0];
        }
        if (!vote || ~vote.indexOf('indec')) {
            vote = undefined;
            parties[party][1]++;
        } else if (~vote.indexOf('favor')) {
            vote = true;
            parties[party][0]++;
        } else if (~vote.indexOf('contr')) {
            vote = false;
            parties[party][2]++;
        }
        return {
            fullName: name,
            fileName,
            party,
            phone: o[2],
            email: o[3],
            facebook: o[4] ? o[4].trim() : '',
            twitter: o[5] ? o[5].trim() : '',
            cabinet: o[6],
            site: o[7] ? o[7].trim() : '',
            photo: o[8],
            gender: o[9],
            vote,
            class: vote ? 'favor' : vote === false ? 'contra' : 'indeciso',
            panelColor: 'panel-'+(vote ? 'primary' : vote === false ? 'red' : 'yellow')
        }
    });
console.log('length', data.length);

function setDefaults(template) {
    let baseUrl = `http://movimento-brasil-livre.github.io/${prjName}`,
        baseTitle = 'Placar da Mobilidade de São Paulo';
    template.baseTile = baseTitle;
    template.title = baseTitle;
    template.baseUrl = baseUrl;
    template.url = baseUrl;
    template.desc = '';
    template.imageUrl = `${template.url}/images/quem-elegeu-1.jpg`;
    if (template.fullName) {
        let isMale = template.gender.trim() === 'M',
            vote = template.vote;
        template.title += ` - Vereador ${template.fullName}`;
        template.url += `/vereador/${template.fileName}.html`;

        template.pos = vote ? 'a favor' : vote === false ? 'contra' : isMale ? 'indeciso' : 'idencisa';
        template.type = isMale ? 'vereador' : 'vereadora';
        template.art = isMale ? 'o' : 'a';
    }
}

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
            .pipe(gulp.dest(`www/${prjName}/${path}`));
        promises.push(prom);
    }

    return Promise.all(promises)
});


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
            .pipe(gulp.dest(`www/${prjName}/vereador`));
        promises.push(prom);
    }
    return Promise.all(promises);
});

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
        .pipe(gulp.dest(`www/${prjName}`));
});

gulp.task('gen:helpers', function () {
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
    let template = {};
    setDefaults(template);

    let work = gulp.src('src/template/how-work.html')
        .pipe(handlebars(template, options))
        .pipe(rename(`como-funciona.html`))
        .pipe(gulp.dest(`www/${prjName}`));

    let err = gulp.src('src/template/help.html')
        .pipe(handlebars(template, options))
        .pipe(rename(`achou-erro.html`))
        .pipe(gulp.dest(`www/${prjName}`));

    return Promise.all([work, err]);
});

gulp.task('copy:images', function () {
    return gulp.src('src/images/*')
        // Perform minification tasks, etc here
        .pipe(gulp.dest(`www/${prjName}/images`));
});

gulp.task('copy:js', function () {
    return gulp.src('src/js/*')
        // Perform minification tasks, etc here
        .pipe(gulp.dest(`www/${prjName}/js`));
});

gulp.task('copy:css', function () {
    return gulp.src('src/css/*')
        // Perform minification tasks, etc here
        .pipe(gulp.dest(`www/${prjName}/css`));
});

gulp.task('dev:watch', () => {
    gulp.watch('src/**/*.html', generators).on('error', e => console.error(e));
    gulp.watch('src/js/*', ['copy:js']).on('error', e => console.error(e));
    gulp.watch('src/css/*', ['copy:css']).on('error', e => console.error(e));
    gulp.watch('src/images/*', ['copy:images']).on('error', e => console.error(e));
});

let generators = ['gen:persons', 'gen:index', 'gen:parties', 'gen:helpers'],
    defaults = ['dev:watch', 'copy:js', 'copy:css', 'copy:images'].concat(generators);


gulp.task('default', defaults);