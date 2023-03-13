const gulp = require("gulp")
const babel = require("gulp-babel")
const nodemon = require("gulp-nodemon")

gulp.task('build', function() {
    return gulp.src("src/gulp_images/*.js")
        .pipe(babel(
            {
                presets: ['@babel/preset-env']
            }))
        .pipe(gulp.dest("dist"));
});

gulp.task('dev', gulp.series('build', function() {
    return nodemon({
        script: 'dist/round_image.js',
        ext: 'js',
        ignore: ['dist/'],
        env: { 'NODE_ENV': 'development' },
        tasks: ['build']
    });
}));