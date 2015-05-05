module.exports = {
  name: 'cordova:run',
  description: 'Run the cordova app',
  works: 'insideProject',

  availableOptions: [
    {
      name: 'environment',
      type: String,
      default: 'production',
      aliases: ['env', 'e'],
      description: 'The environment to run'
    },
    {
      name: 'platform',
      type: String,
      default: 'android',
      aliases: ['p'],
      description: 'The platform to run'
    }
  ],

  run: function() {
    console.log('cordova:run');
  }
}
