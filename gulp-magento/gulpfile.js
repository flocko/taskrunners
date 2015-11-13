/**
 * ---------------------------
 * Available Tasks
 * ---------------------------
 * gulp dev   - development task for sass and phtml files
 * gulp start - copy files from fallback template
 */

 /**
 * ---------------------------
 * Plugins
 * ---------------------------
 * gulp
 * browser-sync
 * gulp-compass
 * gulp-load-plugins
 * gulp-plumber
 */

var gulp        = require('gulp');
var plugins     = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

/**
 * ---------------------------
 * Paths and Options
 * ---------------------------
 */

// name of your new theme
var theme = 'devel';
// name of your fallback theme
var theme_fb = 'rwd';

// edit config from vm
var server = {
  url : '192.168.33.10',
  path: 'magento/'
}

// no need for changes from this on
var path = {
  theme    : {
    skin : 'skin/frontend/' + theme + '/default/',
    app  : 'app/design/frontend/' + theme + '/default/',
  },
  theme_fb : {
    skin : 'skin/frontend/' + theme_fb + '/default/',
    app  : 'app/design/frontend/' + theme_fb + '/default/'
  }
}

var app = {
  phtml : {
    files: 'template/**/*.phtml'
  },
  xml   : {
    files: '**/*.xml'
  }
}

var skin = {
  sass : {
    file  : 'scss/style.scss',
    files : 'scss/**/*.scss'
  },
  css  : {
    file  : 'css/style.css',
    files : 'css/**/*.css'
  },
  js   : {
    files : 'js/**/*.js'
  },
  img  : {
    files : 'img/**/*.*'
  }
}

/**
 * ---------------------------
 * Main tasks
 * ---------------------------
 */
gulp.task('default', ['browser-sync', 'watch:dev', 'compass:dev']);
gulp.task('start', ['copy:dev']);

/**
 * ---------------------------
 * Dev Tasks
 * ---------------------------
 */

// watch for file changes
gulp.task('watch:dev', function() {
  gulp.watch([path.theme.skin + skin.css.files]).on('change', function(file) {
    reload(file.path);
  });
  gulp.watch(path.theme.app + app.phtml.files).on('change', reload);
  gulp.watch(path.theme.app + app.xml.files).on('change', reload);
});

// connect to server
gulp.task('browser-sync', function() {
  browserSync({
    proxy     : server.url,
    startPath : server.path
  });
});

// compass development task
gulp.task('compass:dev', function() {
  gulp.src(skin.sass.files)
  .pipe( plugins.plumber() )
  .pipe( plugins.compass({
    css: path.theme.skin + 'css',
    sass: path.theme.skin + 'scss',
    import_path: path.theme_fb.skin + 'scss',
    task: 'watch'
  }))
  .pipe(gulp.dest(path.theme.skin + 'css/'));
});


/**
 * ---------------------------
 * Copy Tasks
 * ---------------------------
 */

// copy all files and folders into the new template directory
// TODO: replace the whole thing
gulp.task('copy:dev', function() {
  gulp.src('skin/frontend/' + theme_fb + '/**/*.*')
  .pipe( plugins.plumber() )
  .pipe( gulp.dest('skin/frontend/' + theme) );

  gulp.src('app/design/frontend/' + theme_fb + '/**/*.*')
  .pipe( plugins.plumber() )
  .pipe( gulp.dest('app/design/frontend/' + theme) );
});
