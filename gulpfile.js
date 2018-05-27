var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');
var browser = require('browser-sync').create();

gulp.task('bundleJS', () =>
  gulp.src('src/js/app.js')
  .pipe(webpack({
    output: {
      filename: 'app.bundle.js'
    }
  }))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js/'))
  .pipe(browser.stream()));

gulp.task('bundleCSS', () =>
  gulp.src('src/scss/style.scss')
  .pipe(sass())
  .pipe(csso())
  .pipe(gulp.dest('dist/css/'))
  .pipe(browser.stream()));

gulp.task('cleanHTML', () =>
  gulp.src('src/**/*.html')
  .pipe(gulp.dest('dist/'))
  .pipe(browser.stream()));

gulp.task('serve', gulp.parallel(['bundleCSS', 'bundleJS', 'cleanHTML'], () => {
  browser.init({
    server: './dist'
  });

  gulp.watch('src/scss/**/*.scss', gulp.series('bundleCSS'));
  gulp.watch('src/js/**/*.js', gulp.series('bundleJS'));
  gulp.watch('src/**/*.html', gulp.series('cleanHTML'));
}));

gulp.task('default', gulp.series('serve'));
gulp.task('build', gulp.parallel('bundleCSS', 'bundleJS', 'cleanHTML'));