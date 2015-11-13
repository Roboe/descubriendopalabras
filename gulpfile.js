var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var fs = require('fs');
var mkdirp = require('mkdirp');

var SRC = {
  root: 'src/',
  pages: 'src/**/*.html',
  stylesheets: 'src/css/**/*.css',
  scripts: ['node_modules/whatwg-fetch/fetch.js', 'src/js/**/*.js'],
  scripts_entry: 'src/js/app.js',

  emojione: 'node_modules/emojione/assets/png/*.png',
  words: 'db/*.json',
  extra: 'extra/**',
};
var DEST = {
  root: 'public/',
  pages: 'public/',
  stylesheets: 'public/css/',
  scripts: 'public/js/',
  scripts_concat_name: 'app.js',

  emojione: 'public/assets/emojione/',
  words: 'public/db/',
  words_index: 'public/db.json',
  extra: 'public/',
};

// Process HTML files
gulp.task('pages', function() {
  return gulp.src(SRC.pages)
    .pipe(gulp.dest(DEST.pages));
});

// Process CSS files
gulp.task('stylesheets', ['emojione'], function() {
  return gulp.src(SRC.stylesheets)
    .pipe(gulp.dest(DEST.stylesheets));
});

// Process JavaScript files
gulp.task('scripts', function() {
  return gulp.src(SRC.scripts)
    .pipe(plugins.stripDebug())
    .pipe(plugins.uglify())
    .pipe(plugins.concat(DEST.scripts_concat_name))
    .pipe(gulp.dest(DEST.scripts));
});

gulp.task('scripts-dev', function() {
  return gulp.src(SRC.scripts)
    .pipe(plugins.concat(DEST.scripts_concat_name))
    .pipe(gulp.dest(DEST.scripts));
});

// Copy EmojiOne images
gulp.task('emojione', function() {
  return gulp.src(SRC.emojione)
    .pipe(plugins.changed(DEST.emojione))
    .pipe(gulp.dest(DEST.emojione));
});

// Clean words dest folder and copy not hidden files to it
gulp.task('db_words', function() {
  try {
    fs.statSync(DEST.words);
  } catch (e) {
    mkdirp.sync(DEST.words);
  }

  fs.readdirSync(DEST.words)
    .forEach(function(filename) {
      fs.unlinkSync(DEST.words + filename);
    });

  return gulp.src(SRC.words, { dot: false })
    .pipe(gulp.dest(DEST.words));
});

// Generate words index
gulp.task('db_index', ['db_words'], function() {
  // Generate array with filenames
  var words = fs.readdirSync(DEST.words)
    .map(function(filename) {
      return filename.substr(0, filename.lastIndexOf('.'));
    });

  return fs.writeFileSync(DEST.words_index, JSON.stringify({
    date: new Date().toUTCString(),
    words: words,
  }));
});

// Tell GitHub this is not a Jekyll page
gulp.task('extra', function() {
  return gulp.src(SRC.extra)
    .pipe(gulp.dest(DEST.extra));
});

// Build project
gulp.task('default', ['pages', 'stylesheets', 'scripts', 'db_words', 'db_index', 'extra']);

// Watch for changes for easy development
gulp.task('watch', ['pages', 'stylesheets', 'scripts-dev', 'db_words', 'db_index'], function() {
  gulp.watch(SRC.pages, ['pages']);
  gulp.watch(SRC.stylesheets, ['stylesheets']);
  gulp.watch(SRC.scripts, ['scripts-dev']);
});
