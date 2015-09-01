var capitalize = require('../../lib/utils/capitalize');
var cca = require('../../lib/utils/cca');
var cmd = require('../../lib/utils/cmd');

module.exports = {
  normalizeEntityName: function() {},

  locals: function(options) {
    return {
      capitalizedPackageName: capitalize(options.project.pkg.name),
      packageName: options.project.pkg.name
    };
  },

  afterInstall: function(options) {
    var _this = this;

    return new Promise(function(resolve, reject) {
      cmd(cca, [
        'create',
        options.project.root + '/apps/cordova',
        '--link-to=' + options.project.root + '/apps/chrome/manifest.json'
      ], { logStdout: false }).then(function(){
        _this.insertIntoFile('.gitignore', '/apps/cordova').then(resolve, reject);
      }, reject);
    });
  }
};
