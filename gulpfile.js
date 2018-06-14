const gulp = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
// var uglify = require('gulp-uglify');
const webpackStream = require('webpack-stream');
const browser = require('browser-sync').create();
const historyApi = require('connect-history-api-fallback');
require('dotenv').config();

gulp.task('bundleJS', () =>
  gulp
  .src('src/js/app.js')
  .pipe(
    webpackStream({
      output: {
        filename: 'app.bundle.js'
      },
      node: {
        fs: 'empty'
      },
      plugins: [
        new webpackStream.webpack.EnvironmentPlugin([
          'FIREBASE_API_KEY',
          'FIREBASE_AUTH_DOMAIN'
        ])
      ]
    })
  )
  /* .pipe(uglify()) */
  .pipe(gulp.dest('dist/js/'))
  .pipe(browser.stream())
);

gulp.task('bundleCSS', () =>
  gulp
  .src('src/scss/style.scss')
  .pipe(sass())
  .pipe(csso())
  .pipe(gulp.dest('dist/css/'))
  .pipe(browser.stream())
);

gulp.task('cleanHTML', () =>
  gulp
  .src('src/**/*.html')
  .pipe(gulp.dest('dist/'))
  .pipe(browser.stream())
);

gulp.task(
  'serve',
  gulp.parallel(['bundleCSS', 'bundleJS', 'cleanHTML'], () => {
    browser.init({
      server: {
        baseDir: './dist',
        middleware: [
          historyApi()
        ]
      }
    });

    gulp.watch('src/scss/**/*.scss', gulp.series('bundleCSS'));
    gulp.watch('src/js/**/*.js', gulp.series('bundleJS'));
    gulp.watch('src/**/*.html', gulp.series('cleanHTML'));
  })
);

gulp.task('default', gulp.series('serve'));
gulp.task('build', gulp.parallel('bundleCSS', 'bundleJS', 'cleanHTML'));
