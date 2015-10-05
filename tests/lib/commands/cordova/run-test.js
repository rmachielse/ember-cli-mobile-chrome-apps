var expect = require('chai').expect;
var MockUI = require('ember-cli/tests/helpers/mock-ui');
var MockAnalytics = require('ember-cli/tests/helpers/mock-analytics');
var Command = require('ember-cli/lib/models/command');
var cmd = require('../../../../lib/utils/cmd');
var cca = require('../../../../lib/utils/cca');
var run = require('../../../../lib/commands/cordova/run');

describe('lib/commands/cordova/run', function() {
  it('should be an object', function() {
    expect(typeof(run)).to.eq('object');
  });

  it('#name', function() {
    expect(run.name).to.eq('cordova:run');
  });

  describe('#run', function () {
    it('should be a function', function() {
      expect(typeof(run.run)).to.eq('function');
    });

    describe('when executed', function() {
      before(function() {
        RunCommand = Command.extend(run);

        runCommand = new RunCommand({
          ui: new MockUI(),
          project: {
            isEmberCLIProject: function() {
              return true;
            }
          }
        });
      });

      beforeEach(function() {
        this.sinon.stub(cmd, 'run', function() {
          return Promise.resolve();
        });
      });

      it('should invoke cca', function() {
        return runCommand.run({ log: false }).then(function () {
          expect(cmd.run.calledOnce).to.eq(true);
          expect(cmd.run.calledWith(cca, ['run', undefined, '--target=undefined'])).to.eq(true);
        });
      });

      describe('with a platform', function() {
        it('should invoke cca', function() {
          return runCommand.run({ log: false, platform: 'android' }).then(function () {
            expect(cmd.run.calledOnce).to.eq(true);
            expect(cmd.run.calledWith(cca, ['run', 'android', '--target=undefined'])).to.eq(true);
          });
        });
      });

      describe('with a target', function() {
        it('should invoke cca', function() {
          return runCommand.run({ log: false, target: 'device' }).then(function () {
            expect(cmd.run.calledOnce).to.eq(true);
            expect(cmd.run.calledWith(cca, ['run', undefined, '--device'])).to.eq(true);
          });
        });
      });
    });
  });
});
