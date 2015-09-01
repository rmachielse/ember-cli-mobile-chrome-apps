var chalk = require('chalk');
var cca = require('../../utils/cca');
var cmd = require('../../utils/cmd');

module.exports = {
  name: 'cordova:run',
  description: 'Deploys app on specified platform devices / emulators',
  works: 'insideProject',

  availableOptions: [
    {
      name: 'platform',
      type: String,
      default: 'android',
      aliases: [
        'p',
        { 'android': 'android' },
        { 'ios': 'ios' }
      ]
    },
    {
      name: 'target',
      type: String,
      default: 'emulate',
      aliases: [
        't',
        { 'device': 'device' },
        { 'emulate': 'emulate' }
      ]
    },
    {
      name: 'log',
      type: Boolean,
      default: false,
      aliases: ['l']
    }
  ],

  run: function(options) {
    var _this = this;

    this.ui.startProgress(chalk.green('Running'), chalk.green('.'));

    var target;
    switch(options.target) {
      case 'device':
      case 'emulate':
        target = '--' + options.target;
        break;
      default:
        target = '--target=' + options.target;
    }

    return cmd(cca, ['run', options.platform, target], {
      cwd: this.project.root + '/apps/cordova',
      logStdout: options.log
    }).then(function() {
      _this.ui.stopProgress();
      _this.ui.writeLine(chalk.green('Ran ' + options.platform + ' app succesfully.'));
    }, function(e) {
      _this.ui.stopProgress();
      _this.ui.writeLine(chalk.red('Running failed.' + (e ? ' ' + e.message : '')));
    });
  }
};
