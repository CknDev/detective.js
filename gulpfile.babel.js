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
  rename: {
    'gulp-markdown-docs': 'mdDoc',
  },
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
 */
export function html() {
  return gulp.src('./src/*.html')
  .pipe(plugins.debug({ title: 'html: build into' }))
  .pipe(gulp.dest('./dist/'));
}

/**
 * Lint file
 * @method lint
 */
export function lint() {
  return gulp.src(['./src/app/**/*.js', '!node_modules/**'])
  .pipe(plugins.eslint())
  .pipe(plugins.eslint.format())
  .pipe(plugins.eslint.failAfterError());
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
 * Compile scss components documentation
 * @method cssComponentDoc
 */
export function cssComponentDoc() {
  return gulp.src('./src/wiki/components/component.scss')
  .pipe(plugins.sass())
  .pipe(gulp.dest('./docs/components/'));
}

/**
 * Compile component md into docs
 * @method componentDoc
 */
export function componentDoc() {
  return gulp.src('./src/wiki/components/**/*.md')
  .pipe(plugins.mdDoc('index.html', {
    stylesheetUrl: 'component.css',
    layoutStylesheetUrl: false,
  }))
  .pipe(plugins.debug({ title: 'component doc: built into' }))
  .pipe(gulp.dest('./docs/components/'));
}

/**
 * Compile tasks md into docs
 * @method taskDoc
 */
export function taskDoc() {
  return gulp.src('./src/wiki/tasks/**/*.md')
  .pipe(plugins.mdDoc('index.html'))
  .pipe(plugins.debug({ tile: 'tasks doc: built into' }))
  .pipe(gulp.dest('./docs/tasks/'));
}

/**
 * Compile guide md into docs
 * @method guideDoc
 */
export function guideDoc() {
  return gulp.src('./src/wiki/guide/**/*.md')
  .pipe(plugins.mdDoc('index.html'))
  .pipe(plugins.debug({ title: 'guide doc: built into' }))
  .pipe(gulp.dest('./docs/guide'));
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

const wiki = gulp.series(
  doc,
  cssComponentDoc,
  gulp.parallel(taskDoc, guideDoc, componentDoc, wikiDoc, htmlDoc),
  serverDoc
);

const build = gulp.series(html, sass, lint, babel, gulp.parallel(watch, synchronize));

export { build, wiki };
export default build;
