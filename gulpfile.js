var gulp = require('gulp');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');


gulp.task('clean', function() {
  return gulp.src('dist')
             .pipe(clean());
});

gulp.task('compile', function () {
  return tsProject.src()
      .pipe(tsProject())
      .js.pipe(gulp.dest('dist'));
});

gulp.task('copyAllFiles', function() {//Lembrar de corrigir caminho relativo do arquivo mocha ../../../../dist/tests/unit/config/helpers.js
  gulp.src(['src/core/swagger.json']).pipe(gulp.dest('dist/src/core/'));
  gulp.src('src/config/config.json').pipe(gulp.dest('dist/src/config'));
  gulp.src('src/config/database/migrations/*').pipe(gulp.dest('dist/src/config/database/migrations'));
  gulp.src('src/config/database/seenders/*').pipe(gulp.dest('dist/src/config/database/seenders'));
  return gulp.src('tests/unit/config/mocha.opts').pipe(gulp.dest('dist/tests/unit/config')).pipe(gulp.dest('dist/tests/integration/config'));
});

// gulp.task('default', gulp.series('compile', 'copyAllFiles'));
gulp.task('default', gulp.series('clean', 'compile', 'copyAllFiles'));
