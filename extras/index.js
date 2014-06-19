'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _s = require('underscore.string');

var shared = require('../shared.js');


var AuroraExtrasGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      //////////////////////////////
      // Install dependencies unless --skip-install is passed
      //////////////////////////////
      if (!this.options['skip-install']) {
        var bower = this.projectOptions.indexOf('Bower') > -1 ? true : false;
        var npm = this.projectOptions.indexOf('Gulp') > -1 ? true : false;

        if (bower || npm) {
          this.installDependencies({
            bower: bower,
            npm: npm
          });
        }
      }
    });
  },

  askFor: function () {
    var done = this.async();

    this.log(shared.welcome());

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('\nYou\'re installing extras for your Aurora based Drupal theme.' + shared.links()));


    var config = this.config.getAll();

    for (var i in config) {
      this[i] = config[i];
    }

    var prompts = [];
    var askProjectName = false;

    if (typeof(this.projectSlug) === 'undefined') {
      prompts.push(shared.projectName());
      askProjectName = true;
    }

    prompts.push(shared.extras());

    this.prompt(prompts, function (props) {

      if (askProjectName) {
        this.projectName = props.projectName;
        this.projectSlug = _s.underscored(props.projectName);

        this.config.set('projectName', this.projectName);
        this.config.set('projectSlug', this.projectSlug);
      }

      this.projectOptions = props.projectOptions;

      done();
    }.bind(this));
  },

  options: function () {
    if (this.projectOptions.indexOf('Gulp') > -1) {
      this.template('../../app/templates/_gulp.package.json', 'package.json');
      this.template('../../app/templates/Gulpfile.js', 'gulpfile.js');
    }

    if (this.projectOptions.indexOf('Grunt') > -1) {
      this.template('../../app/templates/_grunt.package.json', 'package.json');
      this.template('../../app/templates/Gruntfile.js', 'Gruntfile.js');
    }

    if (this.projectOptions.indexOf('Bower') > -1) {
      this.template('../../app/templates/_bower.json', 'bower.json');
    }
  }

});

module.exports = AuroraExtrasGenerator;
