/**
 * Created by pstalcup on 8/18/15.
 */

var gulp = require('gulp');
var inject = require('gulp-inject');
var browserSync = require('browser-sync').create();

gulp.task('index', function(){
    var target = gulp.src('./index.html');
    var sources = gulp.src('./app/**/*.js', {read:false});

    console.log(sources);

    return target.pipe(inject(sources)).pipe(gulp.dest('./'));
});

gulp.task('serve',function(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});


gulp.watch('./app/**/*.js', browserSync.reload);
