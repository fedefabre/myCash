var gulp = require('gulp');
var pump = require('pump');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify');
var concat  = require('gulp-concat');

gulp.task('less', function (cb) {
    pump([
        gulp.src('app/styles/styles.less'),
        less(),
        gulp.dest('dist/styles')
    ], cb);

});

gulp.task('concatJs', function (cb) {
    pump([
        gulp.src('app/**/*.js'),
        concat('main.js'),
        //minify(),
        uglify(),
        gulp.dest('dist/js')
    ], cb);
});

gulp.task('copyHtml', function (cb) {
    pump([
        gulp.src('app/**/*.html'),
        gulp.dest('dist/templates/')
    ], cb);
});

gulp.task('compress', ['copyHtml','less','concatJs']);

gulp.task('watch', function () {
    gulp.watch('app/styles/styles.less', ['compress']);
    gulp.watch('app/**/*.js', ['compress']);
    gulp.watch('app/**/*.html', ['compress']);
});

/*
//// Commands

gulp.task
gulp.src - points to the files we want to user
gulp.dest
gulp.watch - watch files and folder for changes

//// Optimize images

npm install gulp image-min

//// Optimize  javascript

npm install --save-dev gulp-uglify

//// Concat Javascript files

npm install --save-dev gulp-concat
*/

//gulp.task('minifyJs', function (cb) {
//    pump([
//        gulp.src('app/**/*.js'),
//        uglify(),
//        gulp.dest('dist/js')
//    ], cb);
//});