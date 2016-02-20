exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['js/tests/e2e/*.js'],
  capabilities: {
    browserName: 'chrome'
  },
  jasmineNodeOpts: {
    showColors: true
  },
  directConnect: true
};
