var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var cmd = require('../../../lib/utils/cmd');

describe('lib/utils/cmd', function() {
  it('should be an object', function () {
    expect(typeof(cmd)).to.eq('object');
  });

  describe('#run', function() {
    it('should be a function', function () {
      expect(typeof(cmd.run)).to.eq('function');
    });

    describe('when executing', function() {
      beforeEach(function () {
        this.sinon.stub(console, 'log');
      });

      it('should work', function() {
        var package = fs.readFileSync('package.json').toString().trim();

        return cmd.run('cat', ['package.json'], { useExec: true }).then(function() {
          expect(console.log.calledOnce).to.eq(true);
          expect(console.log.calledWith(package)).to.eq(true);
        });
      });

      describe('when logging disabled', function() {
        it('should not write to console', function() {
          return cmd.run('cat', ['package.json'], { useExec: true, logStdout: false }).then(function() {
            expect(console.log.calledOnce).to.eq(false);
          });
        });
      });

      describe('when changing working directory', function() {
        it('should work', function () {
          var dir = path.join('node_modules', 'glob');
          var package = fs.readFileSync(path.join(dir, 'package.json')).toString().trim();

          return cmd.run('cat', ['package.json'], { useExec: true, cwd: dir }).then(function() {
            expect(console.log.calledOnce).to.eq(true);
            expect(console.log.calledWith(package)).to.eq(true);
          });
        });
      });
    });
  });
});
