var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');         // translates the jsx to js
var source = require('vinyl-source-stream') // converts string to stream for gulp-browserify interaction

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

gulp.task('default', ['browserify', 'copy'], function() {
  return gulp.watch('client/**/*.*', ['browserify', 'copy'])
});