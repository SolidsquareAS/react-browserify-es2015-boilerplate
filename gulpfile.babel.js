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

const $ = gulpLoadPlugins();
const dest = './build';

gulp.task('browserify', () => {
  var b = browserify('./src/js/index.js').transform(babel);
  return b.bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe($.uglify())
    .on('error', log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest + '/js'))
});

gulp.task('lint', () => {
  return gulp.src('./src/js/**/*')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('html', () => {
  return gulp.src('src/*.html')
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest(dest));
});


gulp.task('serve', ['lint', 'browserify', 'html'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: [dest]
    }
  });

  gulp.watch([
    'src/**/*.html',
    'build/**/*.js'
  ]).on('change', browserSync.reload);

  gulp.watch('src/js/**/*.js', ['browserify']);
});

gulp.task('default', ['serve']);
