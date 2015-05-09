module.exports = {
  name: 'cordova:upgrade',
  description: 'Upgrades platforms and plugins of this project with the latest versions',
  works: 'insideProject',

  availableOptions: [],

  run: function(options) {
    var cca = require('../../utils/cca');
    var cmd = require('../../utils/cmd');

    return cmd(cca, ['upgrade'], {
      cwd: this.project.root + '/external/cordova'
    });
  }
}
