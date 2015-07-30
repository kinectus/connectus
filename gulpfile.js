var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');         // translates the jsx to js
var source = require('vinyl-source-stream') // converts string to stream for gulp-browserify interaction
var less = require('gulp-less');
var path = require('path');
// var uglify = require('gulp-uglify')
var babelify = require('babelify');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var shim = require('browserify-shim');
var streamify = require('gulp-streamify');

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
  gulp.src('bower_components/**/*.*')
    .pipe(gulp.dest('dist/bower_components'))
});

gulp.task('less', function () {
  return gulp.src('./client/assets/less/**.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./client/assets/css'));
});

gulp.task('build', ['less'], function() {
  return gulp.watch('client/**/*.less', ['less']);
});

gulp.task('default', ['browserify', 'copy', 'build'], function() {
  return gulp.watch(['client/**/*.*'], ['browserify', 'copy']);
});

////////////////////////////////////////////////////////////////////////////
//    for deploy - run uglify and point index.html to connectus.min.js    //
////////////////////////////////////////////////////////////////////////////

// gulp.task('uglify', function () {
//     var standalone = browserify('./client/js/app.js', {
//       standalone: 'app'
//     })
//     .transform('reactify') 
//     .transform(babelify.configure({
//       plugins: [require('babel-plugin-object-assign')]
//     }))
//     .transform(shim);

//     return standalone.bundle()
//       .on('error', function (e) {
//         gutil.log('Browserify Error', e);
//       })
//       .pipe(source('connectus.js'))
//       .pipe(gulp.dest('dist/js'))
//       .pipe(rename('connectus.min.js'))
//       .pipe(streamify(uglify()))
//       .pipe(gulp.dest('dist/js'));
//   });
//  