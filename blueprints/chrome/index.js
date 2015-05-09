module.exports = {
  normalizeEntityName: function() {},

  locals: function(options) {
    var dasherize = require('../../lib/utils/dasherize');

    return {
      dasherizedPackageName: dasherize(options.project.pkg.name),
      packageName: options.project.pkg.name,
      packageDescription: options.project.pkg.description,
      packageVersion: options.project.pkg.version
    }
  },

  afterInstall: function(options) {
    var fs = require('fs');
    var dasherize = require('../../lib/utils/dasherize');
    var _this = this;

    return new Promise(function(resolve, reject){
      if (!fs.existsSync(options.project.root + '/external/chrome/assets')) {
        fs.symlinkSync('../../dist/assets', options.project.root + '/external/chrome/assets', 'dir');
      }
      if (!fs.existsSync(options.project.root + '/external/chrome/window.html')) {
        fs.symlinkSync('../../dist/index.html', options.project.root + '/external/chrome/window.html');
      }

      _this.insertIntoFile('.gitignore', [
        '',
        '# external',
        '/external/chrome/' + dasherize(_this.project.pkg.name) + '.crx',
        '/external/chrome/' + dasherize(_this.project.pkg.name) + '.zip'
      ].join('\n')).then(resolve, reject);
    });
  }
}
