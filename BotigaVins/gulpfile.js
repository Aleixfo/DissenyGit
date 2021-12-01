'use strict';

//Plugins a importar
var gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    uglify = require("gulp-uglify"),
    babel = require("gulp-babel"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    { series, parallel } = require('gulp');


/* PRACTICA KITTENS */
//1- Tasca "sass". Compilar els arxius .scss de la carpeta "sass" i ficar-los dins una carpeta anomenada "css"
function buildStyles() {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
};
exports.sass = buildStyles;

//2- Tasca "sass:watch". Crea un watcher que vigili que quan hi ha un canvi a un arxiu .scss de tot el projecte es cridi a la tasca "sass".
function watchsass() {
    return gulp.watch('./scss/*.scss', parallel('sass'))
};
exports.watchsass = watchsass;

//3- Tasca "minimitzacss". Minimitza els arxius de la carpeta .css i deixa'ls dins la carpeta "dist/css". Prerequisit: tasca "sass".
function minimitzacss() {
    return gulp.src('./css/*.css')
        .pipe(sass({ outputStyle: 'compressed', sourceComments: false }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
};
exports.mincss = minimitzacss;

//4- Tasca "minimitzajs". Minimitza els arxius de la carpeta "js" i deixa'ls dins "dist/js".
function minimitzajs() {
    return gulp.src('./js/*.js')
        .pipe(uglify().on('error', sass.logError))
        .pipe(gulp.dest('./dist/js'));
};
exports.minjs = minimitzajs;

//5- Tasca "concatcss". Concatena tots els arxius de la carpeta "dist/css" en ORDRE i crea un fitxer "all.css" a "dist/css/all.css". Prerequisit: "minimitzacss"
function concatcss() {
    return gulp.src('./dist/css/**/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./dist/css/'));
};
exports.concatcss = concatcss;

//6- Tasca "concatjs". Concatena tots els arxius de la carpeta "dist/js" en ORDRE i crea un fitxes "all.js" a "dist/js/all.js". Prerequisit: "minimitzajs".
function concatjs() {
    return gulp.src('./dist/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/js/'));
};
exports.concatjs = concatjs;

//7- Tasca "babel". Executa "babel" a l'arxiu "dist/js/all.js" i crea l'arxiu "all-babel.js". Prerequisit: "concatjs".
function babeling() {
    return gulp.src('dist/js/all.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename('all-babel.js'))
        .pipe(gulp.dest('dist/js/babel'))
};
exports.babel = babeling;

//8- Crea una tasca "kittens" que executi totes les tasques (excepte els watchers), és a dir, executant la tasca "kittens" s'hauria de deixar preparat el projecte per pujar a producció.
gulp.task('kittens', series(buildStyles, minimitzacss, minimitzajs, concatcss, concatjs, babeling));