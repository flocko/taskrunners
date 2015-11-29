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
var plugins        = require('gulp-load-plugins');
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
  url  : 'wp-content/themes/slouchy'
}

var options = {
  sass  : {
    files : 'scss/**/*.scss',
    dest  : 'scss/'
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
