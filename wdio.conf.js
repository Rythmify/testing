const path = require('path');
const hooks = require('./appium/support/hooks');

exports.config = {

  //Runner
  runner: 'local',

  //Test files
  specs: [
    './appium/test/**/*.test.js'
  ],
  exclude: [],

  //One instance at a time (real device)
  maxInstances: 1,

  //Device capabilities
  capabilities: [require('./appium/config/capabilities')],

  //Log level
  logLevel: 'info',

  //Stop after first failure (set to 0 to run all)
  bail: 0,

  //Timeouts
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  //Auto-start Appium server
  services: [
    ['appium', {
      command: 'appium',
      args: {
        port: 4723,
        relaxedSecurity: true,
        log: './reports/appium.log',
      }
    }]
  ],

  //Framework
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },

  //Hooks
  before: hooks.before,
  beforeTest: hooks.beforeTest,
  afterTest: hooks.afterTest,
  after: hooks.after,
};