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
      process.chdir(this.projectSlug);

      //////////////////////////////
      // Install dependencies unless --skip-install is passed
      //////////////////////////////
      if (!this.options['skip-install']) {
        var bower = this.projectOptions.indexOf('Bower') > -1 ? true : false;
        var npm = this.projectOptions.indexOf('Gulp') > -1 ? true : false;

        sh.run('bundle install --path vendor/bundle');

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
      // Move Yo Storage
      //////////////////////////////
      fs.renameSync('../.yo-rc.json', '.yo-rc.json');

      //////////////////////////////
      // If the --git flag is passed, initialize git and add for initial commit
      //////////////////////////////
      if (this.options['git']) {
        sh.run('git init');
        sh.run('git add . && git commit -m "Aurora Generation"');
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    // this.log(this.yeoman);

    this.log(shared.welcome());

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('\nYou\'re creating an Aurora based Drupal theme.' + shared.links()));

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
      shared.extras()
    ];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.projectSlug = _s.slugify(props.projectName);
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
    if (this.projectOptions.indexOf('Gulp') > -1) {
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
	  this.copy('north/all.scss', this.projectSlug + '/sass/partials/global/_' + globals[i] + '.scss');
	  this.copy('gitkeep', this.projectSlug + '/sass/partials/global/' + globals[i] + '/.gitkeep');
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
