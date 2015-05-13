module.exports = {
  name: 'cordova:upgrade',
  description: 'Upgrades platforms and plugins of this project with the latest versions',
  works: 'insideProject',

  availableOptions: [
    {
      name: 'log',
      type: Boolean,
      default: false,
      aliases: ['l']
    }
  ],

  run: function(options) {
    var chalk = require('chalk');
    var cca = require('../../utils/cca');
    var cmd = require('../../utils/cmd');
    var _this = this;

    this.ui.startProgress(chalk.green('Upgrading'), chalk.green('.'));

    return cmd(cca, ['upgrade'], {
      cwd: this.project.root + '/external/cordova',
      logStdout: options.log
    }).then(function() {
      _this.ui.stopProgress();
      _this.ui.writeLine(chalk.green('Upgraded cordova app succesfully.'));
    }, function(e) {
      _this.ui.stopProgress();
      _this.ui.writeLine(chalk.red('Upgrading failed.' + (e ? ' ' + e.message : '')));
    });
  }
};
