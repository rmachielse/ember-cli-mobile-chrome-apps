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
    }
  ],

  run: function() {
    var cca = require('../../utils/cca');
    var cmd = require('../../utils/cmd');

    return new Promise(function(resolve, reject){
      cmd(cca, ['prepare'], {
        cwd: this.project.root + '/external/cordova'
      }).then(function(){
        var args = ['build', options.platform]
        if (options.debug) args.push('--debug');
        if (options.release) args.push('--release');

        cmd(cca, args, {
          cwd: this.project.root + '/external/cordova'
        }).then(resolve, reject);
      }, reject);
    });
  }
}
