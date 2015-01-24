// global
var gulp = require('gulp');
var replace = require('gulp-replace');
var livereload = require('gulp-livereload');

// html
var include = require('gulp-file-include');
var minifyHTML = require('gulp-minify-html');

// css
var less = require('gulp-less');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');

// initialise cleanCSS & autoprefixer
var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
  autoprefix = new LessPluginAutoPrefix({browsers: ["last 2 versions"]});

var LessPluginCleanCSS = require("less-plugin-clean-css"),
  cleancss = new LessPluginCleanCSS({advanced: true});

// js
var concat = require('gulp-concat');

var includeConfiguration = {
  prefix: '@',
  basepath: '@file'
};

function UUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g,
    function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x7|0x8)).toString(16);
  });

  return uuid;
}

function handleError(err) {
  console.error(err.message);
}

function buildHTML(opts) {
  // add preprocess here
  // add minification here
  // add development check before minifing
  gulp.src(opts.src)
    .pipe(include(includeConfiguration))
    .on('error', handleError)
    // cache buster
    .pipe(replace('?v=', '?v=' + UUID()))
    .on('error', handleError)
    .pipe(minifyHTML())
    .on('error', handleError)
    .pipe(gulp.dest(opts.dest))
    .pipe(livereload());
}


function buildCSS(opts) {
  var css = gulp.src(opts.src)
    .pipe(sourcemaps.init())
    .pipe(less({
      'plugins': opts.plugins,
      'paths': [path.join(__dirname, 'less', 'includes')]
    }))
    .on('error', handleError);

  if(opts.development) {
    css = css.pipe(sourcemaps.write())
      .on('error', handleError)
      .pipe(livereload());
  } else {
    css = css.pipe(sourcemaps.write(opts.mapLocation));
  }

  css.pipe(gulp.dest(opts.dest));
}

function buildJS(opts) {
  // add minification
  gulp.src(opts.fileList)
    .pipe(concat(opts.dist))
    .on('error', handleError)
    .pipe(gulp.dest(opts.dest))
    .pipe(livereload());
}

var moveStaticAsset = function(opts) {
  var run = function ()  {
    gulp.src(opts.src)
    .on('error', handleError)
    .pipe(gulp.dest(opts.dest))
    .pipe(livereload());
  };

  run();

  if(opts.development) {
    gulp.watch(opts.src, run);
  }
};

gulp.task('html', function() {
  buildHTML({
    development: true,
    src: ['./src/html/**/*.html', '!src/html/includes/**/*.html'],
    dest: './dist'
  });
});

gulp.task('css', function() {
  buildCSS({
    development: true,
    src: './src/less/rdjpalmer.less',
    dest: './dist',
    plugins: [
      autoprefix,
      // cleancss
    ]
  });
});

gulp.task('javascript', function() {
  var filePrefix = './src/javascript';

  buildJS({
    development: true,
    fileList: [
      filePrefix + '/position-fixed.js',
      filePrefix + '/jsonp.js',
      filePrefix + '/app.js'
    ],
    dist: 'rdjpalmer.js',
    dest: './dist'
  });
});

gulp.task('assets', function() {
  moveStaticAsset({
    development: true,
    src: './src/images/**/*',
    dest: './dist/images'
  });
});

gulp.task('watch', function() {
  livereload.listen();

  function logChange(e) {
    console.log('File ' + e.path + ' was ' + e.type + ', running tasks...');
  }

  var htmlWatcher = gulp.watch('./src/html/**/*.html', ['html']);
  htmlWatcher.on('change', logChange);

  var cssWatcher = gulp.watch('./src/less/**/*.less', ['css']);
  cssWatcher.on('change', logChange);

  var jsWatcher = gulp.watch('./src/javascript/**/*.js', ['javascript']);
  jsWatcher.on('change', logChange);
});

gulp.task('default', ['html', 'css', 'javascript', 'assets', 'watch']);