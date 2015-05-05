module.exports = {
  name: 'cordova:emulate',
  description: 'Emulate the cordova app',
  works: 'insideProject',

  availableOptions: [
    {
      name: 'environment',
      type: String,
      default: 'production',
      aliases: ['env', 'e'],
      description: 'The environment to emulate'
    },
    {
      name: 'platform',
      type: String,
      default: 'android',
      aliases: ['p'],
      description: 'The platform to emulate'
    }
  ],

  run: function() {
    console.log('cordova:emulate');
  }
}
