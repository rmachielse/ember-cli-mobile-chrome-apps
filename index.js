var path = require('path');
var commands = require('./lib/commands');

module.exports = {
  name: 'ember-cli-mobile-chrome-apps',

  includedCommands: function() {
    return commands;
  },

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  }
}
