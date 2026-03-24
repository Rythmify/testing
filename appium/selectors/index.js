// Auth selectors
const WelcomeSelectors = require('./auth/welcome.selectors');
const LoginSelectors = require('./auth/login.selectors');
const RegisterSelectors = require('./auth/register.selectors');
//Profile selectros
const ProfileSelectors = require('./Profile/Profile.selectors');
//TrackUpload selectros
const TrackUploadSelectors = require('./Track-Upload/TrackUpload.selectors');
//Track&Player selectors
const TrackSelectors =  require('./Track&Player/Track.selectors')
const PlayerSelectors = require('./Track&Player/Player.selectors')
//Feed selectors
const HomeSelectors = require('./Feed/home.selectors'); 


module.exports = {
  WelcomeSelectors,
  LoginSelectors,
  RegisterSelectors,
  ProfileSelectors,
  TrackUploadSelectors,
  TrackSelectors,
  PlayerSelectors,
  HomeSelectors,
 
};