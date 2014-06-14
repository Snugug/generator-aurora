'use strict';
var chalk = require('chalk');

module.exports.welcome = function () {
  return '\n' + chalk.grey('____________________________________________________________________________________________        ') +
'\n' + chalk.grey(' ____________________________________________________________________________________________       ') +
'\n' + chalk.grey('  ____________________________________________________________________________________________      ') +
'\n' + chalk.grey('   __') + '/\\\\\\\\\\\\\\\\\\' + chalk.grey('______') + '/\\\\\\' + chalk.grey('____') + '/\\\\\\' + chalk.grey('___') + '/\\\\/\\\\\\\\\\\\\\' + chalk.grey('_______') + '/\\\\\\\\\\' + chalk.grey('______') + '/\\\\/\\\\\\\\\\\\\\' + chalk.grey('____') + '/\\\\\\\\\\\\\\\\\\' + chalk.grey('____') + '     ' +
'\n' + chalk.grey('    _') + '\\////////\\\\\\' + chalk.grey('____') + '\\/\\\\\\' + chalk.grey('___') + '\\/\\\\\\' + chalk.grey('__') + '\\/\\\\\\/////\\\\\\' + chalk.grey('____') + '/\\\\\\///\\\\\\' + chalk.grey('___') + '\\/\\\\\\/////\\\\\\' + chalk.grey('__') + '\\////////\\\\\\' + chalk.grey('___') + '    ' +
'\n' + chalk.grey('     ___') + '/\\\\\\\\\\\\\\\\\\\\' + chalk.grey('___') + '\\/\\\\\\' + chalk.grey('___') + '\\/\\\\\\' + chalk.grey('__') + '\\/\\\\\\' + chalk.grey('___') + '\\///' + chalk.grey('____') + '/\\\\\\' + chalk.grey('__') + '\\//\\\\\\' + chalk.grey('__') + '\\/\\\\\\' + chalk.grey('___') + '\\///' + chalk.grey('_____') + '/\\\\\\\\\\\\\\\\\\\\' + chalk.grey('__') + '   ' +
'\n' + chalk.grey('      __') + '/\\\\\\/////\\\\\\' + chalk.grey('___') + '\\/\\\\\\' + chalk.grey('___') + '\\/\\\\\\' + chalk.grey('__') + '\\/\\\\\\' + chalk.grey('__________') + '\\//\\\\\\' + chalk.grey('__') + '/\\\\\\' + chalk.grey('___') + '\\/\\\\\\' + chalk.grey('___________') + '/\\\\\\/////\\\\\\' + chalk.grey('__') + '  ' +
'\n' + chalk.grey('       _') + '\\//\\\\\\\\\\\\\\\\/\\\\' + chalk.grey('__') + '\\//\\\\\\\\\\\\\\\\\\' + chalk.grey('___') + '\\/\\\\\\' + chalk.grey('___________') + '\\///\\\\\\\\\\/' + chalk.grey('____') + '\\/\\\\\\' + chalk.grey('__________') + '\\//\\\\\\\\\\\\\\\\/\\\\' + chalk.grey('_') + ' ' +
'\n' + chalk.grey('        __') + '\\////////\\//' + chalk.grey('____') + '\\/////////' + chalk.grey('____') + '\\///' + chalk.grey('______________') + '\\/////' + chalk.grey('______') + '\\///' + chalk.grey('____________') + '\\////////\\//' + chalk.grey('__');
};

module.exports.extras = function () {
  return {
    type: 'checkbox',
    name: 'projectOptions',
    message: 'What options would you like to include?',
    choices: ['Gulp', 'Bower', 'Grunt'],
    validate: function(value) {
      if (value.indexOf('Gulp') > -1 && value.indexOf('Grunt') > -1) {
        return "You may only select either Gulp or Grunt, not both.";
      }
      else {
        return true;
      }
    }
  };
};

module.exports.links = function () {
  return chalk.grey('\nhttp://drupal.org/project/aurora') + ' - ' + chalk.grey('http://snugug.github.io/Aurora/\n');
};
