var path = require('path');

module.exports = {
  name: 'ember-cli-mobile-chrome-apps',

  included: function(app) {
    if (process.argv[2] === 'chrome:build') {
      app.options.fingerprint = {
        enabled: false
      };
    }
  },

  includedCommands: function() {
    return require('./lib/commands');
  },

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  }
};
