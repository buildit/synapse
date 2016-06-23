const gulp = require('gulp');
const del = require('del');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const html5lint = require('gulp-html5-lint');
const connect = require('gulp-connect');
const lesshint = require('gulp-lesshint');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', () => (
  del(['dist'])
));

gulp.task('js', ['clean'], () => (
  browserify({
    extensions: ['.jsx', '.js'],
    entries: 'src/js/app.jsx',
  })
  .transform(babelify.configure({ presets: ['es2015', 'react'] }))
  .bundle()
  .on('error', (err) => {
    console.log(`Error: , ${err.message}`);
  })
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist/js'))
));

gulp.task('html', ['clean', 'html-lint'], () => (
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

gulp.task('watch', () => {
  gulp.watch('./src/less/**/*.less', ['css']);
  gulp.watch('./src/js/**/*.jsx', ['js']);
});

gulp.task('server', () => {
  connect.server({
    root: 'dist',
    port: 3000,
    livereload: true,
  });
});

gulp.task('default', ['js', 'css', 'html']);
