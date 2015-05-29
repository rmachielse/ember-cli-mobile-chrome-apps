var fs = require('fs');
var chalk = require('chalk');
var capitalize = require('../../../lib/utils/capitalize');
var crx = require('../../utils/crx');
var cmd = require('../../utils/cmd');

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
      name: 'update-version',
      type: Boolean,
      default: true,
      aliases: ['uv']
    },
    {
      name: 'log',
      type: Boolean,
      default: false,
      aliases: ['l']
    }
  ],

  clean: function(options) {
    var _this = this;

    return new Promise(function(resolve, reject){
      fs.unlink(_this.project.root + '/' + options.outputPath + '/' + capitalize(_this.project.pkg.name) + '.zip', function() {
        fs.unlink(_this.project.root + '/' + options.outputPath + '/' + capitalize(_this.project.pkg.name) + '.crx', function() {
          resolve();
        });
      });
    });
  },

  updateVersion: function(options) {
    if (options.updateVersion) {
      var _this = this;

      return new Promise(function(resolve, reject) {
        var manifest = JSON.parse(fs.readFileSync(_this.project.root + '/external/chrome/manifest.json'));

        manifest.version = _this.project.pkg.version;
        fs.writeFileSync(_this.project.root + '/external/chrome/manifest.json', JSON.stringify(manifest, null, 2) + '\n');

        resolve();
      });
    } else {
      return Promise.resolve();
    }
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
    var _this = this;

    this.ui.startProgress(chalk.green('Packaging'), chalk.green('.'));

    return cmd(crx, [
      'pack ' + this.project.root + '/external/chrome',
      '--output=' + this.project.root + '/' + options.outputPath + '/' + capitalize(_this.project.pkg.name) + '.crx',
      '--zip-output=' + this.project.root + '/' + options.outputPath + '/' + capitalize(_this.project.pkg.name) + '.zip',
      '--private-key=' + this.project.root + '/' + options.key
    ], {
      useExec: true,
      logStdout: options.log
    }).then(function(){
      _this.ui.stopProgress();
      _this.ui.writeLine(chalk.green('Packaged Chrome app succesfully. Stored in "' + options.outputPath + '" as "' + capitalize(_this.project.pkg.name) + '.zip" and "' + capitalize(_this.project.pkg.name) + '.crx"'));
    }, function(e){
      _this.ui.stopProgress();
      _this.ui.writeLine(chalk.red('Packaging failed.' + (e ? ' ' + e.message : '')));
    });
  },

  run: function(options) {
    var _this = this;
    return this.clean(options).then(function() {
      return _this.updateVersion(options).then(function() {
        return _this.build(options).then(function() {
          return _this.package(options);
        });
      });
    });
  }
};
