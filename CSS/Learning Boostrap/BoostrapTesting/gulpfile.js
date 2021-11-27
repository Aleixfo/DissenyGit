'use strict';

//Plugins a importar
var gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass'));


/* PRACTICA KITTENS */
//1- Tasca "sass". Compilar els arxius .scss de la carpeta "sass" i ficar-los dins una carpeta anomenada "css"
function buildStyles() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
};
exports.sass = buildStyles;

//2- Tasca "sass:watch". Crea un watcher que vigili que quan hi ha un canvi a un arxiu .scss de tot el projecte es cridi a la tasca "sass".
function watchsass() {
  return gulp.watch('./scss/*.scss', parallel('sass'))
};
exports.watchsass = watchsass;