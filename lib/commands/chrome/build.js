module.exports = {
  name: 'chrome:build',
  description: 'Build the chrome app',
  works: 'insideProject',

  availableOptions: [
    {
      name: 'environment',
      type: String,
      default: 'production',
      aliases: ['env', 'e'],
      description: 'build environment'
    }
  ],

  run: function() {
    console.log('chrome:build');
  }
}
