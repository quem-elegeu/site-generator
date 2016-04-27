

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

    let work = gulp.src('src/template/help.html')
        .pipe(handlebars(template, options))
        .pipe(rename(`como-funciona.html`))
        .pipe(gulp.dest(`www/${$pack.name}`));

    let err = gulp.src('src/template/help.html')
        .pipe(handlebars(template, options))
        .pipe(rename(`achou-erro.html`))
        .pipe(gulp.dest(`www/${$pack.name}`));

    return Promise.all([work, err]);
});