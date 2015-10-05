var path = require('path');

module.exports = {
  name: 'ember-cli-mobile-chrome-apps',

  includedCommands: function() {
    return require('./lib/commands');
  },

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  }
};
