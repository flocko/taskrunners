# gulp-magento
Taskrunner for watching scss/xml/phtml files based on magento's 1.9 rwd theme.
Starts a server on a vagrant box with browserSync for style injection and reload.

## prerequisites
* [node](https://nodejs.org/en/)
* [gulp](http://gulpjs.com/)
* [ruby](https://www.ruby-lang.org/)
* [compass](http://compass-style.org/)

## installation
Copy files gulpfile.js and package.json to your magento directory and run
    npm install

## configuration
In gulpfile.js change the name of your template
    var theme = 'devel';
edit server configuration to reflect the ip of your vagrant box
    var server = {
      url : '192.168.33.10',
      path: 'magento/'
    }

## running tasks
open a terminal on your host-vm and navigate to your public directory

### gulp start
    gulp start
Makes a 1:1 copy of the content from your fallback theme (rwd) to the theme name you specified in your gulfile.js.
Since you would probably use magento's fallback system and only start with ```scss/styles.scss``` and ```scss/_var.scss``` for production this task is for demonstration purpose only (needs a bunch of deletes after copy).

### gulp dev
    gulp dev
Connects browserSync to your development server and watches for file changes. Magento current rwd theme uses compass and ruby-sass to compile your stylesheets so the injections won't be instant but take 2-3 seconds.
BrowserSync provides you with internal and external url's for connecting multiple devices to your server and reload them as you make changes in your code.
