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
const rename = require('gulp-rename');
const cowsay = require('cowsay');
const argv = require('yargs').argv;

gulp.task('clean', () => (
  del(['dist'])
));

gulp.task('config', ['clean'], () => {
  const environment = argv.environment;
  console.log(cowsay.say({
    text: `Setting up configuration\nfor ${environment} environment.`,
    e: 'oO',
    T: 'U ',
  }));
  if (environment === 'production') {
    gulp.src('./config/production.js')
      .pipe(rename('config.js'))
      .pipe(gulp.dest('./dist/js'));
  } else {
    gulp.src('./config/development.js')
      .pipe(rename('config.js'))
      .pipe(gulp.dest('./dist/js'));
  }
});

gulp.task('js', ['clean'], () => (
  browserify({
    extensions: ['.jsx', '.js'],
    entries: 'src/js/index.js',
  })
  .transform(babelify.configure({ presets: ['es2015', 'react', 'stage-2'] }))
  .bundle()
  .on('error', (err) => {
    console.log(`Error: , ${err.message}`);
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

gulp.task('default', ['config', 'js', 'css', 'html']);
