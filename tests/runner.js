var glob = require('glob');
var Mocha = require('mocha');

var mocha = new Mocha({
  reporter: 'spec'
});

glob('tests/**/*-test.js', function(err, files) {
  files.forEach(function(file) {
    mocha.addFile(file);
  });

  mocha.run(function(failures) {
    process.on('exit', function() {
      process.exit(failures);
    });
  });

  require('mocha-sinon');
});
