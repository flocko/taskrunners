/**
 * ---------------------------
 * Available Tasks
 * ---------------------------
 * gulp      - development tasks for css/js/php files
 * gulp exec - install bower dependencies and copy files
 */

/**
 * ---------------------------
 * Plugins
 * ---------------------------
 * gulp
 * bower
 * browser-sync
 * gulp-plumber
 * gulp-bower
 * run-sequence
 * gulp-load-plugins
 */

var gulp           = require('gulp');
var plugins        = require('gulp-load-plugins')();
var browserSync    = require('browser-sync');
var reload         = browserSync.reload;
var runSequence    = require('run-sequence');
var mainBowerFiles = require('main-bower-files');

/**
 * ---------------------------
 * Paths and Options
 * ---------------------------
 */

var theme = {
  name : 'slouchy',
  url  : 'wp-content/themes/slouchy/'
}

var options = {
  sass  : {
    files : 'sass/**/*.scss',
    dest  : 'sass/'
  },
  css   : {
    file  : 'style.css',
    dest : 'css/'
  },
  img   : {
    files : 'img/**/*.*',
    dest  : 'img/'
  },
  php   : {
    files : '**/*.php'
  },
  js    : {
    files : 'js/**/*.js',
    file  : 'app.js',
    dest  : 'js/'
  },
  fonts : {
    files: 'fonts/**/*',
    dest : 'fonts/'
  }
}

var vendor = {
  mdi : {
    sass : 'sass/vendor/mdi'
  }
}

/**
 * ---------------------------
 * Main Tasks
 * ---------------------------
 */

gulp.task('default', ['dev']);

gulp.task('exec', function(done) {
  runSequence('bower:install', 'bower:copy', done);
});


/**
 * ---------------------------
 * Development Tasks
 * ---------------------------
 */

// start dev server and watch for file changes
gulp.task('dev', ['sass', 'minify:js'], function() {
  browserSync({
    proxy: "http://localhost/wpbeta"
  });

  gulp.watch(theme.url + options.sass.files, ['sass']);
  gulp.watch(theme.url + options.php.files).on('change', reload);
  gulp.watch(theme.url + options.js.files, ['minify:js']);
  //gulp.watch(theme.url + options.js.files).on('change', reload);

});

// compile sass
gulp.task('sass', function() {
  gulp.src( theme.url + options.sass.files )
  .pipe( plugins.plumber() )
  .pipe( plugins.sass( { outputStyle : 'compressed' }).on('error', plugins.sass.logError))
  .pipe( plugins.autoprefixer( {
    browsers: ['last 2 versions'],
      cascade: false
    }))
  .pipe(gulp.dest( theme.url ))
  .pipe(reload({stream: true}));
});

// concat all js files for build
gulp.task('minify:js', function() {
  return gulp.src(theme.url + options.js.files)
  .pipe( plugins.plumber() )
  .pipe( plugins.concat( options.js.file ) )
  .pipe( plugins.uglify() )
  .pipe( gulp.dest( theme.url ) )
  .pipe(reload({stream:true}));

});

/**
 * ---------------------------
 * Exec Tasks
 * ---------------------------
 **/

// install bower components
gulp.task('bower:install', function() {
  return plugins.bower({ cmd: 'install'});
});

// copy bower files
gulp.task('bower:copy', function() {
  var jsFilter   = plugins.filter('*.js', {restore:true});
  var scssFilter = plugins.filter('*.scss', {restore:true});
  var fontFilter = plugins.filter(['*.eot', '*.woff', '*.svg', '*.ttf', '*.woff2'], {restore:true});

  return gulp.src( mainBowerFiles({includeDev:true}) )
  .pipe( plugins.plumber() )
  .pipe( fontFilter )
  .pipe( gulp.dest( theme.url + options.fonts.dest ) )
  .pipe( fontFilter.restore )

  .pipe( scssFilter )
  .pipe( gulp.dest (theme.url + vendor.mdi.sass ))
  .pipe( scssFilter.restore )

  .pipe( jsFilter )
  .pipe( gulp.dest (theme.url + options.js.dest ));
});
