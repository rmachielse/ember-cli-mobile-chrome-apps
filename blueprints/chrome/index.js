var fs = require('fs');
var capitalize = require('../../lib/utils/capitalize');

module.exports = {
  normalizeEntityName: function() {},

  locals: function(options) {
    return {
      capitalizedPackageName: capitalize(options.project.pkg.name),
      packageName: options.project.pkg.name,
      packageDescription: options.project.pkg.description,
      packageVersion: options.project.pkg.version
    };
  },

  afterInstall: function(options) {
    var _this = this;

    return new Promise(function(resolve, reject){
      if (!fs.existsSync(options.project.root + '/apps/chrome/assets')) {
        fs.symlinkSync('../../dist/assets', options.project.root + '/apps/chrome/assets', 'dir');
      }
      if (!fs.existsSync(options.project.root + '/apps/chrome/window.html')) {
        fs.symlinkSync('../../dist/index.html', options.project.root + '/apps/chrome/window.html');
      }

      _this.insertIntoFile('.gitignore', [
        '',
        '# apps',
        '/apps/chrome/dist',
      ].join('\n')).then(resolve, reject);
    });
  }
};
