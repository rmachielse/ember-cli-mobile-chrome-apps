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
      default: 'device',
      aliases: [
        't',
        { 'device': 'device' },
        { 'emulate': 'emulate' }
      ]
    }
  ],

  run: function(options) {
    var cca = require('../../utils/cca');
    var cmd = require('../../utils/cmd');

    switch(options.target) {
      case 'device':
      case 'emulate':
        var target = '--' + options.target;
        break;
      default:
        var target = '--target=' + options.target;
    };

    return cmd(cca, ['run', options.platform, target], {
      cwd: this.project.root + '/external/cordova'
    });
  }
}
