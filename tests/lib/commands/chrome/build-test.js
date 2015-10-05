var expect = require('chai').expect;
var MockUI = require('ember-cli/tests/helpers/mock-ui');
var MockAnalytics = require('ember-cli/tests/helpers/mock-analytics');
var Command = require('ember-cli/lib/models/command');
var build = require('../../../../lib/commands/chrome/build');

describe('lib/commands/chrome/build', function() {
  it('should be an object', function() {
    expect(typeof(build)).to.eq('object');
  });

  it('#name', function() {
    expect(build.name).to.eq('chrome:build');
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
        var functions = ['loadConfig', 'clean', 'build', 'ensureOutputDir', 'package'];

        for (var i in functions) {
          this.sinon.stub(buildCommand, functions[i], function() {
            return Promise.resolve();
          });
        }
      });

      it('should invoke functions', function() {
        return buildCommand.run().then(function () {
          expect(buildCommand.loadConfig.calledOnce).to.eq(true);
          expect(buildCommand.clean.calledOnce).to.eq(true);
          expect(buildCommand.build.calledOnce).to.eq(true);
          expect(buildCommand.ensureOutputDir.calledOnce).to.eq(true);
          expect(buildCommand.package.calledOnce).to.eq(true);
        });
      });
    });
  });
});
