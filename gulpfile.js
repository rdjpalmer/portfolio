// global
var gulp = require('gulp');
var replace = require('gulp-replace');
var livereload = require('gulp-livereload');

// html
var include = require('gulp-file-include');
var preprocess = require('gulp-preprocess');
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
var uglify = require('gulp-uglify');

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
  var env = 'production';

  if(opts.development) {
    env = 'development';
  }

  gulp.src(opts.src)
    .pipe(include(includeConfiguration))
    .on('error', handleError)
    // cache buster
    .pipe(replace('?v=', '?v=' + UUID()))
    .on('error', handleError)
    .pipe(preprocess({
      'extension': opts.extension,
      'context': {
        'NODE_ENV': env
      }
    }))
    .on('error', handleError)
    .pipe(minifyHTML())
    .on('error', handleError)
    .pipe(gulp.dest(opts.dest))
    .pipe(livereload());
}


function buildCSS(opts) {
  var css = gulp.src(opts.src)
    // .pipe(sourcemaps.init())
    .pipe(less({
      'plugins': opts.plugins,
      'paths': [path.join(__dirname, 'less', 'includes')]
    }))
    .on('error', handleError);

  if(opts.development) {
    css = css.pipe(livereload());
  } else {
    css = css.pipe(sourcemaps.write(opts.mapLocation));
  }

  css.pipe(gulp.dest(opts.dest));
}

function buildJS(opts) {
  // add minification
  var js = gulp.src(opts.fileList)
    .pipe(concat(opts.dist))
    .on('error', handleError);

  if(!opts.development) {
    js = js.pipe(uglify({
      mangle: true,
      compress: {
        unsafe        : true, // some unsafe optimizations (see below)
        conditionals  : false,  // optimize if-s and conditional expressions
      }
    }))
      .on('error', handleError);
  }

    js.pipe(gulp.dest(opts.dest))
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
    dest: './dist',
    extension: 'html'
  });
});

gulp.task('css', function() {
  buildCSS({
    development: true,
    src: './src/less/rdjpalmer.less',
    dest: './dist/assets/css/',
    plugins: [
      // autoprefix
      // cleancss
    ]
  });

  buildCSS({
    development: true,
    src: './src/less/case-study.less',
    dest: './dist/assets/css',
    plugins: [
      // autoprefix,
      // cleancss
    ]
  })
});

gulp.task('javascript', function() {
  var filePrefix = './src/javascript';

  buildJS({
    development: true,
    fileList: [
      filePrefix + '/blog.js'
    ],
    dist: 'rdjpalmer-blog.js',
    dest: './dist/assets/scripts/'
  });

  buildJS({
    development: true,
    fileList: [
      filePrefix + '/position-fixed.js',
      filePrefix + '/jsonp.js',
      filePrefix + '/app.js'
    ],
    dist: 'rdjpalmer.js',
    dest: './dist/assets/scripts/'
  });
});

gulp.task('assets', function() {
  moveStaticAsset({
    development: true,
    src: './src/images/**/*',
    dest: './dist/assets/images'
  });
});

gulp.task('blog', function() {
  buildHTML({
    development: true,
    src: ['./src/blog/**/*.html'],
    dest: './blog'
  });
});

gulp.task('deploy', function() {
  var jsFilePrefix = './src/javascript';

  buildHTML({
    development: false,
    src: ['./src/html/**/*.html', '!src/html/includes/**/*.html'],
    dest: './dist',
    extension: 'html'
  });

  buildHTML({
    development: false,
    src: ['./src/blog/**/*.html'],
    dest: './blog'
  });

  moveStaticAsset({
    development: true,
    src: './src/images/**/*',
    dest: './dist/assets/images'
  });

  moveStaticAsset({
    development: true,
    src: './src/root-assets/**/*',
    dest: './dist/'
  });

  buildCSS({
    development: false,
    src: './src/less/rdjpalmer.less',
    dest: './dist/assets/css',
    mapLocation: './',
    plugins: [
      autoprefix,
      cleancss
    ]
  });

  buildJS({
    development: false,
    fileList: [
      jsFilePrefix + '/blog.js'
    ],
    dist: 'rdjpalmer-blog.js',
    dest: './dist/assets/scripts'
  });

  buildJS({
    development: false,
    fileList: [
      jsFilePrefix + '/position-fixed.js',
      jsFilePrefix + '/jsonp.js',
      jsFilePrefix + '/app.js'
    ],
    dist: 'rdjpalmer.min.js',
    dest: './dist/assets/scripts'
  });
});

gulp.task('watch', function() {
  livereload.listen();

  function logChange(e) {
    console.log('File ' + e.path + ' was ' + e.type + ', running tasks...');
  }

  var htmlWatcher = gulp.watch('./src/html/**/*.html', ['html']);
  htmlWatcher.on('change', logChange);

  var blogWatcher = gulp.watch('./src/blog/**/*.html', ['blog']);
  blogWatcher.on('change', logChange);

  var cssWatcher = gulp.watch('./src/less/**/*.less', ['css']);
  cssWatcher.on('change', logChange);

  var jsWatcher = gulp.watch('./src/javascript/**/*.js', ['javascript']);
  jsWatcher.on('change', logChange);
});

gulp.task(
  'with-blog',
  ['html', 'css', 'javascript', 'assets', 'blog', 'watch']
);

gulp.task('default', ['html', 'css', 'javascript', 'assets', 'watch']);
