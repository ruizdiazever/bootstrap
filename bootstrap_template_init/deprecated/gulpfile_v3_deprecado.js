/* Voy a requerir gulp */
const gulp = require('gulp');
/* Tambien voy a requerir un modulo llamado browser-sync
que se encarga de reiniciar el navegador por mi*/
const BrowserSync = require('browser-sync');
/* Este modulo se encarga de convertir el codigo */
const sass = require('gulp-sass');



/* TAREA */
/* Ejecuta una funcion, retorna algo, va a ejecutar.. un arreglo */
gulp.task('sass', () => {
    return gulp.src([
            'node_modules/bootstrap/scss/bootstrap.scss',
            /* Aca toma todos los archivos de scss */
            'src/scss/*.scss'
        ])
        /* Ejecuta la tarea sass, usando la opcion compressed se comprime el codigo */
        .pipe(sass({ outputStyle: 'compressed' }))
        /* Donde es el destino de los archivos convertidos */
        .pipe.apply(gulp.dest('src/css'))
        .pipe(BrowserSync());
});



/* Lo llamamos js, despues ejecutamos una funcion.. decimos que archivos vamos a copiar..
    Decimos donde estan los archivos..
     */
gulp.task('js', () => {
    return gulp.src([
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/jquery/dist/jquery.min.js',
            /* Ayuda con los modales o con los componentes de bootstrap*/
            'node_modules/popper.js/dist/umd/popper.min.js'
        ])
        /* Aca le decimos donde lo tiene que copiar */
        .pipe(gulp.dest('src/js'))
        /* Aca le decimos que refresque el navegador.. si hacemos algun cambio */
        .pipe(BrowserSync.stream());
})



/* TAREA de GULP: un servidor de desarrollo */
/*  */
gulp.task('serve', ['sass'], () => {
    /* Es para inicializar un modulo */
    BrowserSync.init({
        server: './src'
    });

    /* Esto es para que se quede escuchando los cambios */
    gulp.watch([
        'node_modules/bootstrap/scss/bootstrap.min.scss',
        'src/scss/*.scss'
    ], ['sass']);
    gulp.watch('src/.html').on('change', BrowserSync.reload);
});



gulp.task('font-awesome', () => {
    return gulp.src('node_modules/font-awesome/css/font-awessome.min.css')
        .pipe(gulp.dest('src/css'));
});

gulp.task('font', () => {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('src/fonts'));
})



/* Cuando ejecutemos el comando gulp vamos a ejecutar las siguientes tareas */
gulp.task('default', ['js', 'serve', 'font-awesome', 'fonts']);