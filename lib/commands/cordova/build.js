var chalk = require('chalk');
var cca = require('../../utils/cca');
var cmd = require('../../utils/cmd');

module.exports = {
  name: 'cordova:build',
  description: 'Builds for the given platform(s)',
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
      name: 'debug',
      type: Boolean,
      default: false,
      aliases: ['d']
    },
    {
      name: 'release',
      type: Boolean,
      default: true,
      aliases: ['r']
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

    this.ui.startProgress(chalk.green('Building'), chalk.green('.'));

    return new Promise(function(resolve, reject){
      cmd(cca, ['prepare'], {
        cwd: _this.project.root + '/apps/cordova',
        logStdout: options.log
      }).then(function(){
        var args = ['build', options.platform];
        if (options.debug) args.push('--debug');
        if (options.release) args.push('--release');

        cmd(cca, args, {
          cwd: _this.project.root + '/apps/cordova',
          logStdout: options.log
        }).then(function(){
          _this.ui.stopProgress();
          _this.ui.writeLine(chalk.green('Built ' + options.platform + ' app succesfully. Stored in "apps/cordova/platforms/' + options.platform + '/build/outputs/apk"'));

          resolve();
        }, function(e) {
          _this.ui.stopProgress();
          _this.ui.writeLine(chalk.red('Building failed.' + (e ? ' ' + e.message : '')));
        });
      }, function(e) {
        _this.ui.stopProgress();
        _this.ui.writeLine(chalk.red('Building failed.' + (e ? ' ' + e.message : '')));
      });
    });
  }
};
