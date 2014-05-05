'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var sh = require('execSync');
var _s = require('underscore.string');


var AuroraExtrasGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    var _this = this;

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
    this.log(chalk.magenta('\nYou\'re installing extras for your Aurora based Drupal theme.\n' + chalk.grey('http://drupal.org/project/aurora') + ' - ' + chalk.grey('http://snugug.github.io/Aurora/\n')));

    var prompts = [
      {
	type: 'checkbox',
	name: 'projectOptions',
	message: 'What options would you like to include?',
	choices: ['Gulp', 'Bower']
      }
    ];

    this.prompt(prompts, function (props) {
      var config = this.config.getAll();

      for (var i in config) {
	this[i] = config[i];
      }

      this.projectOptions = props.projectOptions;

      done();
    }.bind(this));
  },

  options: function () {
    if (this.projectOptions.indexOf('Gulp') > -1) {
      this.template('../../app/templates/_package.json', 'package.json');
      this.template('../../app/templates/Gulpfile.js', 'Gulpfile.js');
    }

    if (this.projectOptions.indexOf('Bower') > -1) {
      this.template('../../app/templates/_bower.json', 'bower.json');
    }
  }

});

module.exports = AuroraExtrasGenerator;