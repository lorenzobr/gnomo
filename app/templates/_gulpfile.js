var gulp      	= require('gulp');

var debug       = require('gulp-debug');
var del       	= require('del');

/**
 * Plugins loading
 */
var jade      	= require('gulp-jade');
var sass      	= require('gulp-sass');
var uglify      = require('gulp-uglify');
var minifyCSS   = require('gulp-minify-css');
var concat      = require('gulp-concat');
var ngAnnotate  = require('gulp-ng-annotate');
var watch     	= require('gulp-watch');

/**
 * Application files paths
 */
var path      	= require('path');

var paths       = {
					assets: './src/assets/',
					views: './src/views/',
					js: './src/assets/js/',
					styles: './src/assets/styles/'
				};

/**
 * Application build task
 */
gulp.task('build', function() 
{
	gulp.src(paths.views + '**/*.jade')
		.pipe(jade({
			pretty: false
		}))
		.pipe(gulp.dest('./build'));

	gulp.src(paths.styles + '**/*.scss')
		.pipe(sass({ errorLogToConsole: true }))
		.pipe(concat('style.min.css'))
		//.pipe(minifyCSS({ debug: true }))
		.pipe(gulp.dest('./build/public/css'));

	gulp.src([
		paths.js + 'app.js',
		paths.js + 'core/directives/**/*.js',
		paths.js + 'core/controllers/**/*.js'
	])
		.pipe(ngAnnotate())
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./build/public/js'));

	gulp.src(paths.assets + 'templates/**/*.jade')
		.pipe(jade({
			pretty: false
		}))
		.pipe(gulp.dest('./build/public/partials'));
});

/**
 * 3rd party libraries minification task
 */
gulp.task('compress:libs', function() {
	gulp.src([
		// Bower components
		paths.assets + 'components/jquery/dist/jquery.min.js',
		paths.assets + 'components/angular/angular.min.js',
		paths.assets + 'components/angular-route/angular-route.min.js',
		paths.assets + 'components/lodash/lodash.min.js',
		paths.assets + 'components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
		
		// Custom libs
		paths.assets + 'js/libs/**/*.js'
	])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./build/public/js'));
});

/**
 * Static files copying task
 */
gulp.task('copy', function() {
	// Font Awesome
	gulp.src(paths.assets + 'components/font-awesome/css/font-awesome.min.css')
		.pipe(gulp.dest('./build/public/css')); 
	gulp.src(paths.assets + 'components/font-awesome/fonts/**')
		.pipe(gulp.dest('./build/public/fonts'));
	
	// Images
	gulp.src(paths.assets + 'images/**')
		.pipe(gulp.dest('./build/public/images'));

	// Angular JS map file for debugging purposes
	gulp.src(paths.assets + 'components/angular/angular.min.js.map')
		.pipe(gulp.dest('./build/public/js'));  
});

/**
 * Clean build folder task
 */
gulp.task('clean', function(cb) 
{
	del([
		'./build/**'
	], cb);
});


gulp.task('watch', ['build'], function() {
	watch('./src/**/*.*', function() {
		gulp.run('build')
	});
});

gulp.task('default', ['watch']);