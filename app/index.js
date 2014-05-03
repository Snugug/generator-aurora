'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var sh = require('execSync');
var _s = require('underscore.string');


var AuroraGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    var _this = this;

    this.on('end', function () {
      process.chdir(this.projectSlug);

      //////////////////////////////
      // Install dependencies unless --skip-install is passed
      //////////////////////////////
      if (!this.options['skip-install']) {
        var bower = this.projectOptions.indexOf('Bower') > -1 ? true : false;
        var npm = this.projectOptions.indexOf('Task Runner') > -1 ? true : false;

        sh.run('bundle install --path vendor');

        if (bower || npm) {
          this.installDependencies({
            bower: bower,
            npm: npm
          });
        }
      }

      //////////////////////////////
      // If the --git flag is passed, initialize git and add for initial commit
      //////////////////////////////
      sh.run('git init');
      sh.run('git add . && git commit -m "Aurora Generation"');
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    // this.log(this.yeoman);

    var welcome = '\n' + chalk.grey('____________________________________________________________________________________________        ') +
'\n' + chalk.grey(' ____________________________________________________________________________________________       ') +
'\n' + chalk.grey('  ____________________________________________________________________________________________      ') +
'\n' + chalk.grey('   __') + '/\\\\\\\\\\\\\\\\\\' + chalk.grey('______') + '/\\\\\\' + chalk.grey('____') + '/\\\\\\' + chalk.grey('___') + '/\\\\/\\\\\\\\\\\\\\' + chalk.grey('_______') + '/\\\\\\\\\\' + chalk.grey('______') + '/\\\\/\\\\\\\\\\\\\\' + chalk.grey('____') + '/\\\\\\\\\\\\\\\\\\' + chalk.grey('____') + '     ' +
'\n' + chalk.grey('    _') + '\\////////\\\\\\' + chalk.grey('____') + '\\/\\\\\\' + chalk.grey('___') + '\\/\\\\\\' + chalk.grey('__') + '\\/\\\\\\/////\\\\\\' + chalk.grey('____') + '/\\\\\\///\\\\\\' + chalk.grey('___') + '\\/\\\\\\/////\\\\\\' + chalk.grey('__') + '\\////////\\\\\\' + chalk.grey('___') + '    ' +
'\n' + chalk.grey('     ___') + '/\\\\\\\\\\\\\\\\\\\\' + chalk.grey('___') + '\\/\\\\\\' + chalk.grey('___') + '\\/\\\\\\' + chalk.grey('__') + '\\/\\\\\\' + chalk.grey('___') + '\\///' + chalk.grey('____') + '/\\\\\\' + chalk.grey('__') + '\\//\\\\\\' + chalk.grey('__') + '\\/\\\\\\' + chalk.grey('___') + '\\///' + chalk.grey('_____') + '/\\\\\\\\\\\\\\\\\\\\' + chalk.grey('__') + '   ' +
'\n' + chalk.grey('      __') + '/\\\\\\/////\\\\\\' + chalk.grey('___') + '\\/\\\\\\' + chalk.grey('___') + '\\/\\\\\\' + chalk.grey('__') + '\\/\\\\\\' + chalk.grey('__________') + '\\//\\\\\\' + chalk.grey('__') + '/\\\\\\' + chalk.grey('___') + '\\/\\\\\\' + chalk.grey('___________') + '/\\\\\\/////\\\\\\' + chalk.grey('__') + '  ' +
'\n' + chalk.grey('       _') + '\\//\\\\\\\\\\\\\\\\/\\\\' + chalk.grey('__') + '\\//\\\\\\\\\\\\\\\\\\' + chalk.grey('___') + '\\/\\\\\\' + chalk.grey('___________') + '\\///\\\\\\\\\\/' + chalk.grey('____') + '\\/\\\\\\' + chalk.grey('__________') + '\\//\\\\\\\\\\\\\\\\/\\\\' + chalk.grey('_') + ' ' +
'\n' + chalk.grey('        __') + '\\////////\\//' + chalk.grey('____') + '\\/////////' + chalk.grey('____') + '\\///' + chalk.grey('______________') + '\\/////' + chalk.grey('______') + '\\///' + chalk.grey('____________') + '\\////////\\//' + chalk.grey('__');

    this.log(welcome);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('\nYou\'re creating an Aurora based Drupal theme.\n' + chalk.grey('http://drupal.org/project/aurora') + ' - ' + chalk.grey('http://snugug.github.io/Aurora/\n')));

    var prompts = [
      {
        type: 'string',
        name: 'projectName',
        message: 'What\'s your theme\'s name?' + chalk.red(' (Required)'),
        validate: function (input) {
          if (input === '') {
            return 'Please enter your theme\'s name';
          }
          return true;
        }
      },
      {
        type: 'list',
        name: 'projectType',
        message: 'What Aurora base would you like to use?',
        choices: ['Aurora', 'Corona', 'Polaris', 'North'],
        default: 'Aurora'
      },
      {
        type: 'checkbox',
        name: 'projectOptions',
        message: 'What options would you like to include?',
        choices: ['Task Runner', 'Bower']
      }
    ];





    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.projectSlug = _s.slugify(props.projectName);
      this.projectType = props.projectType;
      this.projectOptions = props.projectOptions;

      done();
    }.bind(this));
  },

  core: function () {
    this.copy('editorconfig', this.projectSlug + '/.editorconfig');
    this.copy('jshintrc', this.projectSlug + '/.jshintrc');
    this.copy('gitignore', this.projectSlug + '/.gitignore');

    this.copy('Gemfile', this.projectSlug + '/Gemfile');
    this.copy('config.rb', this.projectSlug + '/config.rb');

    this.copy('README-Sass.md', this.projectSlug + '/sass/README.md');
    this.copy('README-Partials.md', this.projectSlug + '/sass/partials/README.md');

    var keep = ['images', 'fonts', 'js'];
    for (var i in keep) {
      this.copy('gitkeep', this.projectSlug + '/' + keep[i] + '/.gitkeep');
    }
  },

  drupal: function () {
    this.template('_aurora.info', this.projectSlug + '/' + this.projectSlug + '.info');

    this.template('_template.php', this.projectSlug + '/template.php');
    this.copy('README-templates.md', this.projectSlug + '/templates/README.md');
  },

  options: function () {
    if (this.projectOptions.indexOf('Task Runner') > -1) {
      this.template('_package.json', this.projectSlug + '/package.json');
      this.template('Gulpfile.js', this.projectSlug + '/Gulpfile.js');
    }

    if (this.projectOptions.indexOf('Bower') > -1) {
      this.template('_bower.json', this.projectSlug + '/bower.json');
    }
  },

  type: function () {
    switch (_s.slugify(this.projectType)) {
      case 'aurora':
        this.directory('aurora', this.projectSlug + '/sass');
        break;
      case 'corona':
        this.directory('corona', this.projectSlug + '/sass');
        break;
      case 'polaris':
        this.directory('polaris', this.projectSlug + '/sass');
        break;
      case 'north':
        this.copy('north/style.scss', this.projectSlug + '/sass/style.scss');

        //////////////////////////////
        // North Globals
        //////////////////////////////
        var globals = ['variables', 'functions', 'mixins', 'extends'];
        for (var i in globals) {
          this.copy('all.scss', this.projectSlug + 'sass/partials/global/_' + globals[i] + '.scss');
          this.copy('gitkeep', this.projectSlug + 'sass/partials/global/' + globals[i] + '/.gitkeep');
        }

        //////////////////////////////
        // North Keep
        //////////////////////////////
        var keep = ['sass/partials', 'sass/partials/components', 'sass/partials/layouts', 'sass/enhancements', 'sass/fallbacks'];
        for (var i in keep) {
          this.copy('gitkeep', this.projectSlug + '/' + keep[i] + '/.gitkeep');
        }
        break;
    }
  }

});

module.exports = AuroraGenerator;