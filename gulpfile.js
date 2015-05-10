var gulp = require('gulp');
var del = require('del');
var wiredep = require('wiredep').stream;
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

var config = {
    app: "app",
    dist: "dist"
};

gulp.task('clean', function (cb) {
    del([config.dist], cb);
});

gulp.task('copy', ['clean'], function() {
    return gulp.src(config.app + '/view*/*.html')
        .pipe(gulp.dest(config.dist));
});

gulp.task('wire-and-minify', ['clean', 'copy'], function () {
    return gulp.src(config.app + '/index.html')
        .pipe(wiredep())
        .pipe(gulp.dest(config.app))
        .pipe(usemin({
            cssVendor: [minifyCss()],
            cssStyles: [minifyCss()],
            jsVendor: [uglify()],
            jsScripts: [uglify()]
        }))
        .pipe(gulp.dest(config.dist));
});

gulp.task('default', ['clean', 'copy', 'wire-and-minify']);