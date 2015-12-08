// Karma configuration
// Generated on Tue Dec 08 2015 09:58:41 GMT-0600 (Central Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      '../www/lib/ionic/js/ionic.bundle.js',
      '../www/lib/ngCordova/dist/ng-cordova.js',
      '../www/lib/firebase/firebase.js',
      '../www/lib/angularfire/dist/angularfire.min.js',
      '../www/lib/angular-messages/angular-messages.min.js',
      '../www/lib/angular-mocks/angular-mocks.js',
      '../tests/unit-tests/chatController.unit.js',
      // '../tests/unit-tests/**/*.js',
      '../www/js/controllers/*.js',
      '../www/js/app.js/',
      '../www/js/services/*.js',
      '../www/templates/*.html',
      '../www/templates/auth/*.html',
      '../www/index.html'
      // '../www/lib/ionic/js/ionic.bundle.js',
      // '../www/lib/angular-mocks/angular-mocks.js',
      //'**/*.html',
      //'**/*.js'
      // '../tests/unit-tests/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage'],

  // optionally, configure the reporter
coverageReporter: {
type: 'html',
dir: 'tests/coverage/',
file: 'coverage.txt'
},


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  })
}
