const byDesc = (desc) =>
  `-android uiautomator:new UiSelector().description("${desc}")`;

const byClassInstance = (instance) =>
  `-android uiautomator:new UiSelector().className("android.widget.Button").instance(${instance})`;

module.exports = {
   // ── Home Header  ──
  HEADER: {
    TITLE:        "~Home",        
    UPLOAD_BTN:   byClassInstance(0),
    MESSAGE_BTN:  byClassInstance(1),
    NOTIF_BTN:    byClassInstance(2),
  }, 

  // ── Bottom Navigation (5 tabs) ── 
  NAV: {
    HOME_TAB:     "~Home\nTab 1 of 5",
    FEED_TAB:     "~Feed\nTab 2 of 5",
    SEARCH_TAB:   "~Search\nTab 3 of 5",
    LIBRARY_TAB:  "~Library\nTab 4 of 5",
    UPGRADE_TAB:  "~Upgrade\nTab 5 of 5",
  },

  // ── 9 Genre Filter Tabs ──
  GENRE: {
    REGGAE:          "~Reggae\nTab 1 of 9",
    COUNTRY:         "~Country\nTab 2 of 9",
    ELECTRONIC:      "~Electronic\nTab 3 of 9",
    INDIE:           "~Indie\nTab 4 of 9",
    POP:             "~Pop\nTab 5 of 9",
    TECHO:           "~Techno\nTab 6 of 9",   
    JAZZ:            "~Jazz\nTab 7 of 9",
    HIPHOP_RAP:      "~Hip-Hop&Rap\nTab 8 of 9",
    ROCK_METAL_PUNK: "~Rock,Metal,Punk\nTab 9 of 9",
  },

  // ── Track Cards ──
  // Format: "<Track Title>\n<Artist Name>"
  TRACK: {
    NEON_NIGHTS:        "~Neon Nights\nSynthwave Boy",
    MID_NIHT_CHILL:     "~Midnight Chill\nLoFi Beats",
    DROP_THE_BASS:      "~Drop The Bass\nDJ Rythm",
    CAIRO_DRIFT:        "~Cairo Drift\nDesert Trap",
    ACOUSTIC_SUNRISE:   "~Acoustic Sunrise\nThe Indie Strings",
    DEEP_FOCUS:         "~Deep Focus\nAmbient Mind",
  },

  // ── Activity/Notification Card (format: "<Track Title>\n<Artist Name>\n<Notification message>")
   ACTIVITY_CARD: byDesc(
      "Hot For You 🔥\nNeon Nights\nSynthwave Boy\n1.5M people liked your track"
    ),
    ACTION_BTN: byClassInstance(3),
   
   // ── Sections (mock/dummy data — scroll-only testing) ──
  SECTIONS: {
    MIXED_FOR_YOU:         "~Mixed For You",
    DISCOVER_WITH_STATIONS: "~Discover with Stations",
    MORE_OF_WHAT_YOU_LIKE: "~More of what you like",
  },
};

  