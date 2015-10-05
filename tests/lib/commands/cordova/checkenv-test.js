var expect = require('chai').expect;
var MockUI = require('ember-cli/tests/helpers/mock-ui');
var MockAnalytics = require('ember-cli/tests/helpers/mock-analytics');
var Command = require('ember-cli/lib/models/command');
var cmd = require('../../../../lib/utils/cmd');
var cca = require('../../../../lib/utils/cca');
var checkenv = require('../../../../lib/commands/cordova/checkenv');

describe('lib/commands/cordova/checkenv', function() {
  it('should be an object', function() {
    expect(typeof(checkenv)).to.eq('object');
  });

  it('#name', function() {
    expect(checkenv.name).to.eq('cordova:checkenv');
  });

  describe('#run', function () {
    it('should be a function', function() {
      expect(typeof(checkenv.run)).to.eq('function');
    });

    describe('when executed', function() {
      before(function() {
        CheckenvCommand = Command.extend(checkenv);

        checkenvCommand = new CheckenvCommand({
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
        return checkenvCommand.run().then(function () {
          expect(cmd.run.calledOnce).to.eq(true);
          expect(cmd.run.calledWith(cca, ['checkenv'])).to.eq(true);
        });
      });
    });
  });
});
