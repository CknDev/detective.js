import vSource from 'vinyl-source-stream';
import vBuffer from 'vinyl-buffer';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import vueify from 'vueify';
import partialify from 'partialify';
import gulp from 'gulp';
import gplugins from 'gulp-load-plugins';
import bSync from 'browser-sync';

const pkg = require('./package.json');

const plugins = gplugins({
  debug: true,
  lazy: false,
});
const sync = bSync.create();

/**
 * Package app
 * @method babel
 */
export function babel() {
  const b = browserify(watchify.args);
  b.add('./src/app/main.js');
  b.transform(babelify);
  b.transform(vueify);
  b.transform(partialify);
  return b.bundle()
  .pipe(vSource('dist.min.js'))
  .pipe(vBuffer())
  .pipe(plugins.sourcemaps.init())
  .pipe(plugins.sourcemaps.write('./'))
  .pipe(plugins.debug({ title: 'babel: built into' }))
  .pipe(gulp.dest('./dist'));
}

/**
 * Sass to css components
 * @method sass
 */
export function sass() {
  return gulp.src('./src/app/components/**/*.scss')
  .pipe(plugins.debug({ title: 'sass: build from' }))
  .pipe(plugins.sass())
  .pipe(plugins.debug({ title: 'sass: build into' }))
  .pipe(gulp.dest('./src/app/components'));
}

/**
 * Preprocess html
 * @method html
 * @param {String} env environment
 */
export function html() {
  return gulp.src('./src/*.html')
  .pipe(plugins.debug({ title: 'html: build into' }))
  .pipe(gulp.dest('./dist/'));
}

/**
 * Generate wiki
 * @method wikiDoc
 */
export function wikiDoc() {
  const b = browserify(watchify.args);
  b.add('./src/wiki/src/wiki.js');
  b.transform(babelify);
  b.transform(vueify);
  return b.bundle()
  .pipe(vSource('wiki.min.js'))
  .pipe(vBuffer())
  .pipe(plugins.sourcemaps.init())
  .pipe(plugins.sourcemaps.write('./'))
  .pipe(plugins.debug({ title: 'babel: built into' }))
  .pipe(gulp.dest('./docs/web/src'));
}

/**
 * Preprocess doc html
 * @method htmlDoc
 */
export function htmlDoc() {
  return gulp.src('./src/wiki/index.html')
  .pipe(plugins.debug({ title: 'html: build into' }))
  .pipe(gulp.dest('./docs/web'));
}

/**
 * Generate esdocs for app modules
 * @method doc
 */
export function doc() {
  return gulp.src('./src/app/modules')
  .pipe(plugins.esdoc({ destination: './docs/modules' }));
}

/**
 * Start server for wiki
 * @method serverDoc
 */
export function serverDoc() {
  return plugins.connect.server({
    root: ['docs/web/', 'docs'],
    port: 4040,
  });
}

/**
 * Package dist for production
 * @method compress
 */
export function compress() {
  return gulp.src('./dist/*')
  .pipe(plugins.tar(`release-${pkg.version}.tar`))
  .pipe(plugins.gzip())
  .pipe(gulp.dest('./release'));
}

/**
 * Watch and recompile
 * @method watch
 */
export function watch() {
  return gulp.watch(
    ['./src/**/*.*', 'src/index.html'],
    gulp.parallel(html, sass, babel)
  );
}

/**
 * Watch and reload
 * @method synchronize
 */
export function synchronize() {
  sync.init({
    browser: 'chromium',
    server: {
      baseDir: './dist',
    },
  });
}

const wiki = gulp.series(doc, gulp.parallel(wikiDoc, htmlDoc), serverDoc);
const build = gulp.series(html, sass, babel, gulp.parallel(watch, synchronize));

export { build, wiki };
export default build;
