var commands = require('./lib/commands');

module.exports = {
  name: 'ember-cli-mobile-chrome-apps',

  includedCommands: function() {
    return commands;
  }
}
