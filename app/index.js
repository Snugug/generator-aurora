'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var sh = require('execSync');
var _s = require('underscore.string');
var fs = require('fs');

var shared = require('../shared.js');


var AuroraGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      //////////////////////////////
      // Move Yo Storage
      //////////////////////////////
      fs.renameSync('../.yo-rc.json', '.yo-rc.json');

      //////////////////////////////
      // Install dependencies unless --skip-install is passed
      //////////////////////////////
      if (!this.options['skip-install']) {
        var bower = this.projectOptions.indexOf('Bower') > -1 ? true : false;
        var npm = this.projectOptions.indexOf('Gulp') > -1 ? true : false;

        sh.run('bundle install --path .vendor/bundle');

        if (bower || npm) {
          this.installDependencies({
            bower: bower,
            npm: npm
          });
        }
      }

      if (!this.options['skip-compass']) {
        sh.run('bundle exec compass compile');
      }

      //////////////////////////////
      // If the --git flag is passed, initialize git and add for initial commit
      //////////////////////////////
      if (this.options['git']) {
        sh.run('git init');
        sh.run('git add . && git commit -m "Aurora Generation"');
      }
    });
  },

  welcome: function () {
    this.log(shared.welcome());

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('\nYou\'re creating an Aurora based Drupal theme.' + shared.links()));
  },

  askFor: function () {
    var done = this.async();

    var prompts = [
      shared.projectName(),
      {
        type: 'list',
        name: 'projectType',
        message: 'What Aurora base would you like to use?',
        choices: ['Aurora', 'Corona', 'Polaris', 'North'],
        default: 'Aurora',
        filter: function( val ) { return val.toLowerCase(); }
      },
      shared.extras()
    ];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.projectSlug = _s.underscored(props.projectName);
      this.projectType = props.projectType;
      this.projectOptions = props.projectOptions;

      this.config.set('projectName', this.projectName);
      this.config.set('projectSlug', this.projectSlug);
      this.config.set('projectType', this.projectType);
      this.config.set('projectOptions', this.projectOptions);

      done();
    }.bind(this));
  },

  core: function () {
    // Create our theme directory
    this.mkdir(this.projectSlug);
    // Set our destination to be the new directory.
    this.destinationRoot(this.projectSlug);


    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
    this.copy('ruby-version', '.ruby-version');

    this.copy('Gemfile', 'Gemfile');
    this.copy('config.rb', 'config.rb');

    this.copy('README-Sass.md', 'sass/README.md');
    this.copy('README-Partials.md', 'sass/partials/README.md');

    var keep = ['images', 'fonts', 'js'];
    for (var i in keep) {
      this.copy('gitkeep', '' + keep[i] + '/.gitkeep');
    }
  },

  drupal: function () {
    this.template('_aurora.info', '' + this.projectSlug + '.info');

    this.template('_template.php', 'template.php');
    this.copy('README-templates.md', 'templates/README.md');
  },

  options: function () {
    if (this.projectOptions.indexOf('Gulp') > -1) {
      this.template('_gulp.package.json', 'package.json');
      this.template('Gulpfile.js', 'gulpfile.js');
    }

    if (this.projectOptions.indexOf('Grunt') > -1) {
      this.template('_grunt.package.json', 'package.json');
      this.template('Gruntfile.js', 'Gruntfile.js');
    }

    if (this.projectOptions.indexOf('Bower') > -1) {
      this.template('_bower.json', 'bower.json');
    }
  },

  type: function () {
    switch (this.projectType) {
      case 'aurora':
        this.directory('aurora', 'sass');
        break;
      case 'corona':
        this.directory('corona', 'sass');
        break;
      case 'polaris':
        this.directory('polaris', 'sass');
        break;
      case 'north':
        this.copy('north/style.scss', 'sass/style.scss');

        //////////////////////////////
        // North Globals
        //////////////////////////////
        var globals = ['variables', 'functions', 'mixins', 'extends'];
        for (var i in globals) {
	  this.copy('north/all.scss', 'sass/partials/global/_' + globals[i] + '.scss');
	  this.copy('gitkeep', 'sass/partials/global/' + globals[i] + '/.gitkeep');
        }

        //////////////////////////////
        // North Keep
        //////////////////////////////
        var keep = ['sass/partials', 'sass/partials/components', 'sass/partials/layouts', 'sass/enhancements', 'sass/fallbacks'];
        for (var i in keep) {
          this.copy('gitkeep', keep[i] + '/.gitkeep');
        }
        break;
    }
  }

});

module.exports = AuroraGenerator;
