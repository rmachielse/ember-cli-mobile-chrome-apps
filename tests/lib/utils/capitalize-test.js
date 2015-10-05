var expect = require('chai').expect;
var capitalize = require('../../../lib/utils/capitalize');

describe('lib/utils/capitalize', function() {
  it('should capitalize string', function () {
    expect(capitalize("string")).to.eq("String");
    expect(capitalize("String")).to.eq("String");
    expect(capitalize("sTRING")).to.eq("STRING");
  });
});
