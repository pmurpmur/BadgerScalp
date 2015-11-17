exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec.js']
};

exports.config = {  
        capabilities: {
            'browserName': 'chrome'
        },
        baseUrl: 'http://localhost:8100',
        specs: ['tests/*.test.js'],
        jasmineNodeOpts: {
            isVerbose: true,
        }
};