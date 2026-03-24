const byDesc = (desc) =>
  `-android uiautomator:new UiSelector().description("${desc}")`;

const byText = (text) =>
  `-android uiautomator:new UiSelector().text("${text}")`;

const byViewInstance = (instance) =>
  `-android uiautomator:new UiSelector().className("android.view.View").instance(${instance})`;

const byButtonInstance = (instance) =>
  `-android uiautomator:new UiSelector().className("android.widget.Button").instance(${instance})`;

module.exports = {

  LIBRARY_TAB: `~Library\nTab 4 of 5`,
  MY_PROFILE_CARD: byViewInstance(7),

  // ── Profile Screen ──
  EDIT_PROFILE_BUTTON: byViewInstance(10),
  COVER_PHOTO_AREA:    byViewInstance(10),   

  // Read-only display labels on the profile screen.
  DISPLAY_USERNAME: (username) => byText(username),
  DISPLAY_LOCATION: (location) => byText(location),
  DISPLAY_COUNTRY:  (country)  => byDesc(`Country\n${country}`),
  DISPLAY_BIO:      (bio)      => byDesc(`Bio\n${bio}`),

  // ── Edit-Profile Form ──
  // Same pattern: pass the value currently rendered inside the input/field.
  USERNAME_FIELD:   (value)            => byText(value),
  LOCATION_FIELD:   (value)            => byText(value),
  COUNTRY_DROPDOWN: (country = "Egypt")=> byDesc(`Country\n${country}`),
  COUNTRY_OPTION:   (country)          => `~${country}`,
  BIO_FIELD:        (value)            => byDesc(`Bio\n${value}`),

  DONE_BUTTON:            "~Done",
  SAVE_BUTTON:            "~Save",
  FIRST_NATIVE_BUTTON:    byButtonInstance(0),
  DISCARD_CHANGES_BUTTON: "~DISCARD CHANGES",
  CONTINUE_EDITITNG_BUTTON: "~CONTINUE EDITING",
};
