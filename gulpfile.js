const connect = require('gulp-connect');
const cowsay = require('cowsay');
const del = require('del');
const environment = process.env.NODE_ENV || 'development';
const gulp = require('gulp');
const history = require('connect-history-api-fallback');
const html5lint = require('gulp-html5-lint');
const less = require('gulp-less');
const lesshint = require('gulp-lesshint');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const template = require('gulp-template');
const webpack = require('gulp-webpack');

gulp.task('clean', () => (
  del(['dist'])
));

gulp.task('config', ['clean'], (callback) => {
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
    .pipe(gulp.dest('./src/js/actions'))
    .on('end', callback);
});

gulp.task('js', ['config'], (callback) => {
  gulp
    .src('./src/js/index.js')
    .pipe(webpack(
      {
        output: {
          filename: './js/bundle.js',
        },
        devtool: 'source-map',
        resolve: {
          modulesDirectories: ['node_modules', './src/js/'],
          extensions: ['', '.js', '.jsx'],
        },
        module: {
          loaders: [{
            test: /\.(js|jsx)/,
            exclude: /node_modules/,
            cacheable: true,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react'],
            },
          }, {
            test: /.json/,
            exclude: [/node_modules/, /config/],
            cacheable: true,
            loader: 'json-loader',
          }],
        },
      }
    ))
    .pipe(gulp.dest('./dist'))
    .on('end', callback);
});

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
  gulp.src('./src/less/**/*.less')
      .pipe(lesshint({
          // Options
      }))
      .pipe(lesshint.reporter())
));

gulp.task('clean-config', ['js'], () => (
  del([
    './src/js/actions/default.json',
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
