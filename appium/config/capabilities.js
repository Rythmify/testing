const path = require('path');

module.exports = {
  platformName: 'Android',
  'appium:deviceName': '120767047G021697',
  'appium:platformVersion': '13',           
  'appium:automationName': 'Flutter',
  'appium:app': path.resolve(__dirname, '../apps/rythmify.apk'),
  'appium:noReset': false,
  'appium:fullReset': false,
  'appium:newCommandTimeout': 120,
  'appium:autoGrantPermissions': true,
};