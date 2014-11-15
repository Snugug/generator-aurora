'use strict';
var yeoman = require('yeoman-generator');

var AuroraGenerator = yeoman.generators.Base.extend({
  init: function () {
  },

  callDrupal: function () {
    this.composeWith('drupal-theme:app', { options: {
      baseTheme: 'aurora'
    }});
  }
});

module.exports = AuroraGenerator;
