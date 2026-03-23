// Auth selectors
const WelcomeSelectors = require('./auth/welcome.selectors');
const LoginSelectors = require('./auth/login.selectors');
const RegisterSelectors = require('./auth/register.selectors');

// Home selectors
const HomeSelectors = require('./Feed/home.selectors'); 

// Track Upload selectors
const TrackUploadSelectors = require('./Track-Upload/TrackUpload.selectors');

module.exports = {
  WelcomeSelectors,
  LoginSelectors,
  RegisterSelectors,
  HomeSelectors,
  TrackUploadSelectors,


};