'use strict';

//Plugins a importar
var gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    uglify = require("gulp-uglify"),
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
    .pipe(sass({outputStyle: 'compressed', sourceComments: true}).on('error', sass.logError))
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
