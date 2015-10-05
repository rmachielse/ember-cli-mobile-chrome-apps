var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

module.exports = function(command, args, options) {
  if (options === undefined) options = {};

  return new Promise(function(resolve, reject) {
    var child;

    if (options.useExec !== null && options.useExec) {
      child = exec(command + ' ' + args.join(' '), {
        cwd: options.cwd
      }, function(error, stdout, stderr){
        if (stdout.length > 0 && (options.logStdout === undefined || options.logStdout)) {
          console.log(stdout.trim());
        }
        if (stderr.length > 0 && (options.logStderr === undefined || options.logStderr)) {
          console.error(stderr.trim());
        }

        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    } else {
      child = spawn(command, args, {
        cwd: options.cwd,
        stdio: [
          'inherit',
          (options.logStdout === undefined || options.logStdout) ? process.stdout : 'ignore',
          (options.logStderr === undefined || options.logStderr) ? process.stderr : 'ignore'
        ]
      });

      child.on('close', function(code){
        if (code === 0) {
          resolve();
        } else {
          reject();
        }
      });
    }
  });
};
