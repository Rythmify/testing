const byDesc = (desc) =>
  `-android uiautomator:new UiSelector().description("${desc}")`;

const byClassInstance = (instance) =>
  `-android uiautomator:new UiSelector().className("android.widget.Button").instance(${instance})`;

module.exports = {

  HOME_TITLE:   "~Home",
  UPLOAD_TITLE: "~Upload",

  // ── Upload Screen ──
  UPLOAD_BUTTON: byClassInstance(0),
  TRACK_FILE:    `-android uiautomator:new UiSelector().className("android.widget.RelativeLayout").instance(3)`,

  // ── Upload Header Tabs ──
  TRACK_INFO_TAP:    "~Track info\nTab 1 of 3",
  ADVANCED_TAP:      "~Advanced\nTab 2 of 3",
  PERMISSIONS_TAP:   "~Permissions\nTab 3 of 3",

  // ── Upload Form Fields ──
  TRACK_COVER:        byClassInstance(12),
  TRACK_TITLE_INPUT:  `-android uiautomator:new UiSelector().className("android.widget.EditText").instance(0)`,
  ARTIST_TITLE_INPUT: `-android uiautomator:new UiSelector().className("android.widget.EditText").instance(1)`,
  GENRE_DROPDOWN:     "~Help fans discover your track",
  TAGS_INPUT:         "-android uiautomator:new UiSelector().className(\"android.widget.EditText\").instance(0)",
  DESCRIPTION_INPUT:  "-android uiautomator:new UiSelector().className(\"android.widget.EditText\").instance(1)",
  CAPTION_INPUT:      "-android uiautomator:new UiSelector().className(\"android.widget.EditText\").instance(2)",
  PUBLIC_BUTTON:      "~Public\nAnyone can find this",
  PRIVATE_BUTTON:     "~Unlisted (Private)\nAnyone with private link can access",
  SAVE_BUTTON_1:      "~Save",
  SAVE_BUTTON_2:      "~Save",

  UPLOAD_SUCCESS_MESSAGE: "~Upload complete!\nYour track is being processed\nTap to continue",

  // ── Genre Dropdown Options ──
  GENRE: {
    ELECTRONIC: "~Electronic",
    HIPHOP:     "~Hip-Hop",
    ROCK:       "~Rock",
    POP:        "~Pop",
    JAZZ:       "~Jazz",
    CLASSIC:    "~Classic",
    RandB_SOUL: "~R&B / Soul",
    AMBIENT:    "~Ambient",
    FOLK:       "~Folk",
    METAL:      "~Metal",
    COUNTRY:    "~Country",
    REGGAE:     "~Reggae",
    PODCAST:    "~Podcast",
    OTHER:      "~Other",
  },
};