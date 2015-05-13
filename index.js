module.exports = {
  name: 'ember-cli-mobile-chrome-apps',

  included: function(app) {
    if (process.argv[2] === 'chrome:build') {
      app.options.fingerprint.enabled = false;
    }
  },

  includedCommands: function() {
    var commands = require('./lib/commands');

    return commands;
  },

  blueprintsPath: function() {
    var path = require('path');

    return path.join(__dirname, 'blueprints');
  }
};
