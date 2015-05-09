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

    return new Promise(function(resolve, reject){
      if (!fs.existsSync(options.project.root + '/external/chrome/assets')) {
        fs.symlinkSync('../../dist/assets', options.project.root + '/external/chrome/assets', 'dir');
      }
      if (!fs.existsSync(options.project.root + '/external/chrome/window.html')) {
        fs.symlinkSync('../../dist/index.html', options.project.root + '/external/chrome/window.html');
      }
      resolve();
    });
  }
}
