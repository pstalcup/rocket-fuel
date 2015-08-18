/**
 * Created by pstalcup on 8/18/15.
 */

var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('serve',function(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});