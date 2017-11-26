'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	pump = require('pump'),
	imagemin = require('gulp-imagemin'),
	rename = require("gulp-rename");

gulp.task('sass', function () {
	return gulp.src([
			'./assets/scss/vendor/bootstrap/bootstrap-custom.scss',
			'./assets/scss/vendor/basscss/basscss-custom.scss',
			'./assets/scss/vendor/font-awesome/font-awesome.scss',
			'./assets/scss/main.scss'
		])
		.pipe(sourcemaps.init())
		// :nested, :expanded, :compact, :compressed
		.pipe(sass.sync({outputStyle: 'compact'}).on('error', sass.logError))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./assets/css'));
});

gulp.task('sass:watch', function () {
	gulp.watch('./assets/scss/**/*.scss', ['sass']);
});

gulp.task('uglify', function (cb) {
	pump([
			gulp.src('./assets/js/main.js'),
			sourcemaps.init(),
			uglify(),
			rename({ suffix: '.min' }),
			sourcemaps.write('./'),
			gulp.dest('./assets/js/')
		],
		cb
	);
});

gulp.task('imagemin', function(){
	return gulp.src('./assets/img/**/*.+(png|jpg|gif|svg)')
		.pipe(imagemin())
		.pipe(gulp.dest('./assets/img'))
});