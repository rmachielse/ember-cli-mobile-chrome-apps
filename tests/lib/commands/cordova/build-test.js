var expect = require('chai').expect;
var MockUI = require('ember-cli/tests/helpers/mock-ui');
var MockAnalytics = require('ember-cli/tests/helpers/mock-analytics');
var Command = require('ember-cli/lib/models/command');
var cmd = require('../../../../lib/utils/cmd');
var cca = require('../../../../lib/utils/cca');
var build = require('../../../../lib/commands/cordova/build');

describe('lib/commands/cordova/build', function() {
  it('should be an object', function() {
    expect(typeof(build)).to.eq('object');
  });

  it('#name', function() {
    expect(build.name).to.eq('cordova:build');
  });

  describe('#run', function () {
    it('should be a function', function() {
      expect(typeof(build.run)).to.eq('function');
    });

    describe('when executed', function() {
      before(function() {
        BuildCommand = Command.extend(build);

        buildCommand = new BuildCommand({
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
        return buildCommand.run({ log: false }).then(function () {
          expect(cmd.run.calledTwice).to.eq(true);
          expect(cmd.run.calledWith(cca, ['prepare'])).to.eq(true);
          expect(cmd.run.calledWith(cca, ['build', undefined])).to.eq(true);
        });
      });

      describe('with a platform', function() {
        it('should invoke cca', function() {
          return buildCommand.run({ log: false, platform: 'android' }).then(function () {
            expect(cmd.run.calledTwice).to.eq(true);
            expect(cmd.run.calledWith(cca, ['prepare'])).to.eq(true);
            expect(cmd.run.calledWith(cca, ['build', 'android'])).to.eq(true);
          });
        });
      });

      describe('with debug', function() {
        it('should invoke cca', function() {
          return buildCommand.run({ log: false, debug: true }).then(function () {
            expect(cmd.run.calledTwice).to.eq(true);
            expect(cmd.run.calledWith(cca, ['prepare'])).to.eq(true);
            expect(cmd.run.calledWith(cca, ['build', undefined, '--debug'])).to.eq(true);
          });
        });
      });

      describe('with release', function() {
        it('should invoke cca', function() {
          return buildCommand.run({ log: false, release: true }).then(function () {
            expect(cmd.run.calledTwice).to.eq(true);
            expect(cmd.run.calledWith(cca, ['prepare'])).to.eq(true);
            expect(cmd.run.calledWith(cca, ['build', undefined, '--release'])).to.eq(true);
          });
        });
      });
    });
  });
});
