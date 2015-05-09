module.exports = {
  name: 'cordova:checkenv',
  description: 'Ensures that your environment is setup correctly',
  works: 'insideProject',

  availableOptions: [],

  run: function(options) {
    var cca = require('../../utils/cca');
    var cmd = require('../../utils/cmd');

    return cmd(cca, ['checkenv']);
  }
}
