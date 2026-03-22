const path = require('path');

module.exports = {
  platformName: 'Android',
  'appium:deviceName': '120767047G021697',
  'appium:platformVersion': '13',           
  'appium:automationName': 'UiAutomator2',
  'appium:app': path.resolve(__dirname, '../app/rythmify.apk'),
  'appium:appPackage': 'com.example.rythmify',
  'appium:appActivity': 'com.example.rythmify.MainActivity',
  'appium:noReset': true,
  'appium:fullReset': false,
  'appium:newCommandTimeout': 120,
  'appium:autoGrantPermissions': true,
  'appium:flutterServerLaunchTimeout': 60000,
  'appium:flutterElementWaitTimeout': 30000,
  'appium:intentAction': 'android.intent.action.MAIN',
  'appium:intentCategory': 'android.intent.category.LAUNCHER',
};