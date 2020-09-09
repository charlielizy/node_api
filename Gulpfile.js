var gulp = require('gulp');
var jsdoc = require('gulp-jsdoc3');

//Gulp create document task
gulp.task('docs:app', function (cb) {
  gulp.src(['README.md', './app/**/*.js'], { read: false })
    .pipe(jsdoc(
      {
        'opts':{'destination': './docs/app'}
      }, cb));
});