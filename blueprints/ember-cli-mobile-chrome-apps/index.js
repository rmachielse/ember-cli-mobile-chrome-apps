module.exports = {
  normalizeEntityName: function() {},

  locals: function(options) {
    return {
      packageName: options.project.pkg.name
    };
  },
};
