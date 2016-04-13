import vSource from 'vinyl-source-stream';
import vBuffer from 'vinyl-buffer';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import vueify from 'vueify';
import gulp from 'gulp';
import gplugins from 'gulp-load-plugins';
import bSync from 'browser-sync';

const plugins = gplugins({
  debug: true,
  lazy: false,
});
const sync = bSync.create();

export function babel() {
  const b = browserify(watchify.args);
  b.add('./src/app/main.js');
  b.transform(babelify);
  b.transform(vueify);
  b.bundle()
  .pipe(vSource('dist.min.js'))
  .pipe(vBuffer())
  .pipe(plugins.sourcemaps.init())
  .pipe(plugins.sourcemaps.write('./'))
  .pipe(plugins.debug({ title: 'babel: built into' }))
  .pipe(gulp.dest('./dist'))
  .pipe(sync.stream());
  return b;
}
export function html() {
  return gulp.src('./src/index.html')
  .pipe(plugins.preprocess({ context: { NODE_ENV: 'development', DEBUG: true } }))
  .pipe(gulp.dest('./dist/'))
  .pipe(sync.stream());
}
export function watch() {
  return gulp.watch(['./src/**/*.*', 'src/index.html'], gulp.parallel(babel, html));
}

export function synchronize() {
  sync.init({
    browser: 'chromium',
    server: {
      baseDir: './dist',
    },
  });
}

const build = gulp.series(gulp.parallel(watch, synchronize));
export { build };
export default build;
