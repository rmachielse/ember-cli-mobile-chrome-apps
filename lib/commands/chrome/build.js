module.exports = {
  name: 'chrome:build',
  description: 'Build and package the chrome app',
  works: 'insideProject',

  availableOptions: [
    {
      name: 'environment',
      type: String,
      default: 'development',
      aliases: [
        'e',
        { 'dev': 'development' },
        { 'prod': 'production' }
      ],
    },
    {
      name: 'key',
      type: String,
      default: 'external/key.pem',
      aliases: ['k']
    },
    {
      name: 'output-path',
      type: String,
      default: 'external/chrome',
      aliases: ['o']
    },
    {
      name: 'skip-build',
      type: Boolean,
      default: false,
      aliases: ['sb']
    },
    {
      name: 'log',
      type: Boolean,
      default: false,
      aliases: ['l']
    }
  ],

  clean: function(options) {
    var fs = require('fs');
    var dasherize = require('../../utils/dasherize');
    var _this = this;

    return new Promise(function(resolve, reject){
      fs.unlink(_this.project.root + '/' + options.outputPath + '/' + dasherize(_this.project.pkg.name) + '.zip', function() {
        fs.unlink(_this.project.root + '/' + options.outputPath + '/' + dasherize(_this.project.pkg.name) + '.crx', function() {
          resolve();
        });
      });
    });
  },

  build: function(options) {
    if (options.skipBuild) {
      return Promise.resolve();
    } else {
      var BuildTask = this.tasks.Build;
      var buildTask = new BuildTask({
        ui: this.ui,
        analytics: this.analytics,
        project: this.project
      });

      return buildTask.run({
        environment: options.environment,
        outputPath: 'dist/'
      });
    }
  },

  package: function(options) {
    var chalk = require('chalk');
    var crx = require('../../utils/crx');
    var cmd = require('../../utils/cmd');
    var dasherize = require('../../utils/dasherize');
    var _this = this;

    this.ui.startProgress(chalk.green('Packaging'), chalk.green('.'));

    return cmd(crx, [
      'pack ' + this.project.root + '/external/chrome',
      '--output=' + this.project.root + '/' + options.outputPath + '/' + dasherize(_this.project.pkg.name) + '.crx',
      '--zip-output=' + this.project.root + '/' + options.outputPath + '/' + dasherize(_this.project.pkg.name) + '.zip',
      '--private-key=' + this.project.root + '/' + options.key
    ], {
      useExec: true,
      logStdout: options.log
    }).then(function(){
      _this.ui.stopProgress();
      _this.ui.writeLine(chalk.green('Packaged Chrome app succesfully. Stored in "' + options.outputPath + '" as "' + dasherize(_this.project.pkg.name) + '.zip" and "' + dasherize(_this.project.pkg.name) + '.crx"'));
    }, function(e){
      _this.ui.stopProgress();
      _this.ui.writeLine(chalk.red('Packaging failed.' + (e ? ' ' + e.message : '')));
    });
  },

  run: function(options) {
    var _this = this;
    return this.clean(options).then(function() {
      return _this.build(options).then(function() {
        return _this.package(options);
      });
    });
  }
}
