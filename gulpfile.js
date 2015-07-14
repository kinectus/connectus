var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');         // translates the jsx to js
var source = require('vinyl-source-stream') // converts string to stream for gulp-browserify interaction
var less = require('gulp-less');
var path = require('path');

gulp.task('browserify', function(){
  browserify('./client/js/app.js')          // grabs the jsx...
    .transform('reactify')                 // translates to js
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function(){
  gulp.src('client/index.html')
    .pipe(gulp.dest('dist'));
  gulp.src('client/assets/**/*.*')
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('less', function () {
  return gulp.src('./client/assets/less/**.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./client/assets/css'));
});

gulp.task('default', ['browserify', 'copy'], function() {
  return gulp.watch(['client/**/*.*'], ['browserify', 'copy']);
});

gulp.task('build', ['less'], function() {
  return gulp.watch('client/**/*.less', ['less']);
});


 