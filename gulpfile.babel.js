import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import sourcemaps from 'gulp-sourcemaps';
import {log } from 'gulp-util';
import eslint from 'gulp-eslint';
import browserify from 'browserify';
import babel from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';
import config from './src/private/js/components/Config'

const $ = gulpLoadPlugins();
const dest = './build/public';
const jsDest = dest + '/js';
const cssDest = dest + '/css';
gulp.task('js:browserify', () => {
  var b = browserify('./src/public/js/index.js').transform(babel);
  return b.bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe($.uglify())
    .on('error', log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(jsDest))
});

gulp.task('js:lint', () => {
  return gulp.src('./src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('js', ['js:lint', 'js:browserify']);

gulp.task('html', () => {
  return gulp.src('src/public/index.html')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe($.if('*.html', $.htmlmin({
      collapseWhitespace: true
    }).on('error', $.sass.logError)))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest));
});

gulp.task('css:sass', () => {
  return gulp.src('./src/public/sass/main.scss')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe($.sass({
      outputStyle: 'compressed'
    }).on('error', $.sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(cssDest));
});

gulp.task('css', ['css:sass']);

gulp.task('build', ['js', 'html', 'css']);

gulp.task('browsersync', () => {
  browserSync({
    notify: false,
    proxy: config.host,
    middleware: [historyApiFallback()]
  });

  gulp.watch([
    'build/**/*.html',
    'build/**/*.js',
    'build/**/*.css'
  ]).on('change', browserSync.reload);

  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/**/*.scss', ['css']);
});

gulp.task('serve', ['build', 'browsersync']);

gulp.task('default', ['serve']);
