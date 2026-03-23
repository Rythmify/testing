// Auth selectors
const WelcomeSelectors = require('./auth/welcome.selectors');
const LoginSelectors = require('./auth/login.selectors');
const RegisterSelectors = require('./auth/register.selectors');
//TrackUpload selectros
const TrackUploadSelectors = require('./Track-Upload/TrackUpload.selectors');
//Track&Player selectors
const PlayerSelectors = require('./Track&Player/Player.selectors')
//Feed selectors
const HomeSelectors = require('./Feed/home.selectors'); 


module.exports = {
  WelcomeSelectors,
  LoginSelectors,
  RegisterSelectors,
  TrackUploadSelectors,
  PlayerSelectors,
  HomeSelectors,
 

};