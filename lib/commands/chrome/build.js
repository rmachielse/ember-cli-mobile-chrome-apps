var fs = require('fs');
var chalk = require('chalk');
var ChromeExtension = require("crx");
var Promise = require('es6-promise').Promise;
var path = require('path');

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
      name: 'skip-build',
      type: Boolean,
      default: false,
      aliases: ['sb']
    }
  ],

  config: {
    inputPath: 'apps/chrome',
    outputPath: 'apps/chrome',
    keyPath: 'apps/key.pem',
    useWebStore: true
  },

  loadConfig: function() {
    var _this = this;
    this.config.appName = this.project.pkg.name;

    return new Promise(function(resolve, reject){
      var configPath = path.join(_this.project.root, 'config', 'mobile-chrome-apps.js');

      fs.exists(configPath, function(exists){
        if (exists) {
          config = require(configPath);

          for (var key in config) {
            _this.config[key] = config[key];
          }
        }

        resolve();
      });
    });
  },

  clean: function() {
    var _this = this;

    return new Promise(function(resolve, reject){
      fs.unlink(path.join(_this.project.root, _this.config.outputPath, _this.config.appName + '.zip'), function() {
        fs.unlink(path.join(_this.project.root, _this.config.outputPath, _this.config.appName + '.crx'), function() {
          fs.unlink(path.join(_this.project.root, _this.config.outputPath, '/update.xml'), function() {
            resolve();
          });
        });
      });
    });
  },

  build: function() {
    if (this.options.skipBuild) {
      return Promise.resolve();
    } else {
      var BuildTask = this.tasks.Build;
      var buildTask = new BuildTask({
        ui: this.ui,
        analytics: this.analytics,
        project: this.project
      });

      return buildTask.run({
        environment: this.options.environment,
        outputPath: 'dist/'
      });
    }
  },

  ensureOutputDir: function () {
    var _this = this;

    return new Promise(function(resolve, reject){
      fs.exists(path.join(_this.project.root, _this.config.outputPath), function(exists){
        if (!exists) {
          fs.mkdir(path.join(_this.project.root, _this.config.outputPath), function(err){
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        } else {
          resolve();
        }
      });
    });
  },

  package: function() {
    var _this = this;

    return new Promise(function(resolve, reject){
      _this.ui.startProgress(chalk.green('Packaging'), chalk.green('.'));

      var crx = new ChromeExtension({
        rootDirectory: path.join(_this.project.root, _this.config.inputPath),
        codebase: _this.config.codebase,
        privateKey: fs.readFileSync(path.join(_this.project.root, _this.config.keyPath))
      });

      crx.load()
        .then(function(){
          return crx.loadContents();
        })
        .then(function(archiveBuffer){
          if (_this.config.codebase === undefined) {
            fs.writeFile(path.join(_this.project.root, _this.config.outputPath, _this.config.appName + '.zip'), archiveBuffer);
          }

          return crx.pack(archiveBuffer);
        })
        .then(function(crxBuffer){
          if (_this.config.codebase !== undefined) {
            var xmlBuffer = crx.generateUpdateXML();
            fs.writeFile(path.join(_this.project.root, _this.config.outputPath, 'update.xml'), xmlBuffer);

            return fs.writeFile(path.join(_this.project.root, _this.config.outputPath, _this.config.appName + '.crx'), crxBuffer);
          }
        })
        .then(function(){
          _this.ui.stopProgress();
          _this.ui.writeLine(chalk.green('Packaged Chrome app succesfully. Stored in "' + _this.config.outputPath + '" as "' + (_this.config.codebase === undefined ? _this.config.appName + '.zip"' : _this.config.appName + '.crx" and "update.xml"')));
        }, function(e){
          _this.ui.stopProgress();
          _this.ui.writeLine(chalk.red('Packaging failed.' + (e ? ' ' + e.message : '')));
        });
    });
  },

  run: function(options) {
    var _this = this;
    this.options = options;

    return this.loadConfig().then(function(){
      return _this.clean().then(function(){
        return _this.build().then(function(){
          return _this.ensureOutputDir().then(function(){
            return _this.package();
          });
        });
      });
    });
  }
};
