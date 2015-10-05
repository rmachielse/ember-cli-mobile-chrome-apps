var expect = require('chai').expect;
var MockUI = require('ember-cli/tests/helpers/mock-ui');
var MockAnalytics = require('ember-cli/tests/helpers/mock-analytics');
var Command = require('ember-cli/lib/models/command');
var cmd = require('../../../../lib/utils/cmd');
var cca = require('../../../../lib/utils/cca');
var upgrade = require('../../../../lib/commands/cordova/upgrade');

describe('lib/commands/cordova/upgrade', function() {
  it('should be an object', function() {
    expect(typeof(upgrade)).to.eq('object');
  });

  it('#name', function() {
    expect(upgrade.name).to.eq('cordova:upgrade');
  });

  describe('#run', function () {
    it('should be a function', function() {
      expect(typeof(upgrade.run)).to.eq('function');
    });

    describe('when executed', function() {
      before(function() {
        UpgradeCommand = Command.extend(upgrade);

        upgradeCommand = new UpgradeCommand({
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
        return upgradeCommand.run({ log: false }).then(function () {
          expect(cmd.run.calledOnce).to.eq(true);
          expect(cmd.run.calledWith(cca, ['upgrade'])).to.eq(true);
        });
      });
    });
  });
});
