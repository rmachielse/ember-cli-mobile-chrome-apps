var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var cca = require('../../../lib/utils/cca');
var cmd = require('../../../lib/utils/cmd');

describe('lib/utils/cca', function() {
  it('should be a path', function() {
    expect(typeof(cca)).to.eq('string');
  });

  it('should exist', function(done) {
    fs.exists(cca, function(exists) {
      expect(exists).to.eq(true);
      done();
    });
  });
});
