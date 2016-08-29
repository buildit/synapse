const babelify = require('babelify');
const browserify = require('browserify');
const connect = require('gulp-connect');
const del = require('del');
const gulp = require('gulp');
const html5lint = require('gulp-html5-lint');
const less = require('gulp-less');
const lesshint = require('gulp-lesshint');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const cowsay = require('cowsay');
const template = require('gulp-template');
const rename = require('gulp-rename');
const environment = process.env.NODE_ENV || 'development';
const history = require('connect-history-api-fallback');

gulp.task('clean', () => (
  del(['dist'])
));

gulp.task('config', ['clean'], () => {
  const midasApiUrl = process.env.MIDAS_API_URL || 'http://localhost:6565/';

  /* eslint-disable no-console */
  /* eslint-disable max-len */
  console.log(cowsay.say({
    text: `Setting up configuration\nfor ${environment} environment with midas-api url of ${midasApiUrl}.`,
    e: 'oO',
    T: 'U ',
  }));
  /* eslint-enable max-len */
  /* eslint-enable no-console */

  gulp.src('./config/gulp-template.json')
    .pipe(template({ midasapiurl: `${midasApiUrl}` }))
    .pipe(rename('default.json'))
    .pipe(gulp.dest('./dist/config'))
    .pipe(gulp.dest('./config'));
});

gulp.task('js', ['clean'], () => (
  browserify({
    extensions: ['.jsx', '.js'],
    entries: 'src/js/index.js',
    ignoreMissing: true,
  })
  .transform(babelify.configure({ presets: ['es2015', 'react', 'stage-2'] }))
  .bundle()
  .on('error', (err) => {
    /* eslint-disable no-console */
    console.log(`Error: , ${err.message}`);
    /* eslint-enable no-console */
  })
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist/js'))
));

gulp.task('html', ['clean'], () => (
  gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'))
));

gulp.task('html-lint', () => (
  gulp.src('src/**/*.html')
    .pipe(html5lint())
));

gulp.task('css', ['clean', 'less-lint'], () => (
  gulp.src('./src/less/main.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/css'))
));

gulp.task('less-lint', () => (
  gulp.src('./src/less/*.less')
      .pipe(lesshint({
          // Options
      }))
      .pipe(lesshint.reporter())
));

gulp.task('clean-config', ['js'], () => (
  del([
    'config/default.json',
  ])
));

gulp.task('watch', () => {
  gulp.watch('./src/less/**/*.less', ['css']);
  gulp.watch('./src/js/**/*.jsx', ['js']);
});

gulp.task('server', () => {
  connect.server({
    root: 'dist',
    port: 3000,
    livereload: true,
    middleware: () => (
      [
        history({}),
      ]
    ),
  });
});

gulp.task('default', ['config', 'js', 'css', 'html', 'clean-config']);
