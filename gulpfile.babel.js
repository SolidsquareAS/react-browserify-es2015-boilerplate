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
const jsDest = dest + '/js';
const cssDest = dest + '/css';
const sassFolder = './src/sass/**/*.scss';

gulp.task('js:browserify', () => {
  var b = browserify('./src/js/index.js').transform(babel);
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
  return gulp.src('./src/js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('html', () => {
  return gulp.src('src/*.html')
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest(dest));
});


gulp.task('css:sass', function () {
  return gulp.src(sassFolder)
    .pipe($.sass({
      outputStyle: 'compressed'
    }).on('error', $.sass.logError))
    .pipe(gulp.dest(cssDest));
});

gulp.task('css', ['css:sass']);
gulp.task('js', ['js:lint', 'js:browserify']);

gulp.task('build', ['js', 'html', 'css']);

gulp.task('serve', ['build'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: [dest]
    }
  });

  gulp.watch([
    'src/**/*.html',
    'build/**/*.js',
    'build/**/*.css'
  ]).on('change', browserSync.reload);

  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/**/*.scss', ['css']);
});

gulp.task('default', ['serve']);
