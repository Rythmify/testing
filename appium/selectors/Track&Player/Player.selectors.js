const byDesc = (desc) =>
  `-android uiautomator:new UiSelector().description("${desc}")`;

const byClassInstance = (instance) =>
  `-android uiautomator:new UiSelector().className("android.widget.Button").instance(${instance})`;

module.exports = {

  HOME_TITLE:   "~Home",

  // ── Player Info ──
  PLAYER_NAME:          "",                                      //not implemented
  PLAYER_ARTIST:        "",                                     //not implemented
  PLAYER_INFO:          byDesc("Neon Nights Synthwave Boy"),    //depend on the audio name
  BEHIND_THE_TRACK:     "~Behind this track",
  MOVE_DOWN_ICON:       byClassInstance(4),
  FOLLOW_ICON:          byClassInstance(5),
  COMMENT_BAR:          "",                                     //not implemented
  IMOGIES_ICONS:        "",                                     //not implemented
  lIKE_BUTTON:          "",                                     //not implemented
  COMMENT_BUTTON:       "",                                     //not implemented
  SHARE_BUTTON:         "",                                     //not implemented
  NEXT_UP_BUTTON:       "",                                     //not implemented
  SETTINGS_BUTTON:      "",                                     //not implemented
  START_PAUSE_BUTTON:   '-android uiautomator:new UiSelector().className("android.view.View").instance(33)',
  PLAY_NEXT_BUTTON:     '-android uiautomator:new UiSelector().className("android.view.View").instance(34)',
  PLAY_PREVIOUS_BUTTON: '-android uiautomator:new UiSelector().className("android.view.View").instance(32)',
  SEEK_BAR:             "~1%",                                  //changes according to where the the audio is 

  PLAY_BUTTON:          "~1%",
  MINI_PLAYER:          "",
};