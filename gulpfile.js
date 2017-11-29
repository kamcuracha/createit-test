'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	pump = require('pump'),
	imagemin = require('gulp-imagemin'),
	rename = require("gulp-rename"),
	gulpif = require('gulp-if'),
	runSequence = require('run-sequence');

var compressjs = false,
	compressimg = false;

gulp.task('sass', function () {
	return gulp.src([
			'./assets/scss/vendor/bootstrap/bootstrap-custom.scss',
			'./assets/scss/vendor/font-awesome/font-awesome.scss',
			'./assets/scss/main.scss'
		])
		.pipe(sourcemaps.init())
		// :nested, :expanded, :compact, :compressed
		.pipe(sass.sync({outputStyle: 'compact'}).on('error', sass.logError))
		.pipe(rename(function (path) {
			path.basename = path.basename.replace('-custom', '');
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./assets/css'));
});

gulp.task('sass:watch', function () {
	gulp.watch('./assets/scss/**/*.scss', ['sass']);
});

gulp.task('compressjs', function (cb) {
	pump([
			gulp.src('./assets/js/main.js'),
			gulpif(compressjs, sourcemaps.init()),
			gulpif(compressjs, uglify()),
			gulpif(compressjs, rename({ suffix: '.min' })),
			gulpif(compressjs, sourcemaps.write('./')),
			gulp.dest('./assets/js/')
		],
		cb
	);
});

gulp.task('compressimg', function() {
	return gulp.src('./assets/img/**/*.+(png|jpg|gif|svg)')
		.pipe(gulpif(compressimg, imagemin()))
		.pipe(gulp.dest('./assets/img'))
});
  
gulp.task('default', function (callback) {
	runSequence(
		'compressjs',
		'compressimg',
		['sass', 'sass:watch'],
		callback
	)
});