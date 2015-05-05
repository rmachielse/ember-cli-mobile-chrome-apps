module.exports = {
  name: 'cordova:build',
  description: 'Build the cordova app',
  works: 'insideProject',

  availableOptions: [
    {
      name: 'environment',
      type: String,
      default: 'production',
      aliases: ['env', 'e'],
      description: 'The environment to build'
    },
    {
      name: 'platform',
      type: String,
      default: 'android',
      aliases: ['p'],
      description: 'The platform to build'
    }
  ],

  run: function() {
    console.log('cordova:build');
  }
}
