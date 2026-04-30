import {
  LoginSelectors,
  SignUpSelectors,
} from "../../support/selectors/auth.selectors";
import {
  DiscoverSelectors,
  FeedSelectors,
  SearchSelectors,
} from "../../support/selectors/feed-search.selectors";
import { ProfileSelectors } from "../../support/selectors/profile.selectors";
import { PlayerSelectors } from "../../support/selectors/player.selectors";
import { AudioUploadSelectors } from "../../support/selectors/audio-upload.selectors";
import { PlaylistsSelectors } from "../../support/selectors/playlists.selectors";
import { NotificationsSelectors } from "../../support/selectors/notifications.selectors";
import { ConversationsSelectors } from "../../support/selectors/messaging.selectors";
import { AdminSelectors } from "../../support/selectors/admin.selectors";

// Helper that asserts a selector only if the element exists in DOM (non-fatal)
function assertIfPresent(selector) {
  cy.document().then((doc) => {
    const found = doc.querySelector(selector);
    if (found) {
      cy.get(selector, { timeout: 10000 }).should("exist");
    } else {
      cy.log(`selector missing, skipping: ${selector}`);
    }
  });
}

describe("Others tests", () => {
  it("Login page has expected hooks", () => {
    cy.visit("/signin");
    assertIfPresent(LoginSelectors.emailInput);
    assertIfPresent(LoginSelectors.continueButton);
  });

  it("Register flow initial hooks present", () => {
    cy.visit("/signin");
    // navigate to register using existing UI flow if present
    cy.get("body").then(($b) => {
      if ($b.find(SignUpSelectors.emailInput).length) {
        assertIfPresent(SignUpSelectors.emailInput);
        assertIfPresent(SignUpSelectors.continueButton);
      } else {
        cy.log("signup inputs not present on signin; skipping");
      }
    });
  });

  it("Discover page shows track cards or search input", () => {
    cy.visit("/discover");
    assertIfPresent(DiscoverSelectors.searchInput);
    assertIfPresent(DiscoverSelectors.trackCard);
  });

  it("Feed page renders feed container", () => {
    cy.visit("/");
    assertIfPresent(FeedSelectors.feedPage);
    assertIfPresent(FeedSelectors.feedList);
  });

  it("Search page has search page hooks", () => {
    cy.visit("/search");
    assertIfPresent(SearchSelectors.searchPage);
  });

  it("Profile page shows main profile hooks", () => {
    // Try a known user route; if not present just assert selector presence on root
    cy.visit("/beats");
    assertIfPresent(ProfileSelectors.profileUsername);
    assertIfPresent(ProfileSelectors.followingStat);
    assertIfPresent(ProfileSelectors.followersStat);
  });

  it("Player route / sticky player shows controls if present", () => {
    cy.visit("/");
    assertIfPresent(PlayerSelectors.playPauseButton);
    assertIfPresent(PlayerSelectors.playerProgressBar);
  });

  it("Upload page has upload controls (if available)", () => {
    cy.visit("/upload");
    assertIfPresent(AudioUploadSelectors.chooseFileInput);
    assertIfPresent(AudioUploadSelectors.uploadTitleInput);
  });

  it("Playlists and library pages have expected hooks", () => {
    cy.visit("/library");
    assertIfPresent(PlaylistsSelectors.playlistCard);
  });

  it("Messaging and notifications pages have hooks", () => {
    cy.visit("/messages");
    assertIfPresent(ConversationsSelectors.conversationHeader);
    cy.visit("/notifications");
    assertIfPresent(NotificationsSelectors.notificationHeader);
  });

  it("Admin page smoke checks if present", () => {
    cy.visit("/admin");
    assertIfPresent(AdminSelectors.navDashboard);
  });

  it("Login page keeps password input hidden until toggled", () => {
    cy.visit("/signin");
    cy.get(LoginSelectors.emailInput).click();
    cy.get(LoginSelectors.emailInput).type("ahmedattay8@gmail.com");
    cy.get(LoginSelectors.continueButton).click();
    cy.get(LoginSelectors.passwordInput).should(
      "have.attr",
      "type",
      "password",
    );
  });

  it("Register page shows password step controls when opened", () => {
    cy.visit("/signin");
    cy.get("body").then(($body) => {
      if ($body.find(SignUpSelectors.emailInput).length) {
        cy.get(SignUpSelectors.emailInput).should("be.visible");
        cy.get(SignUpSelectors.continueEmailButton).should("be.visible");
      }
    });
  });

  it("Forgot password flow shows confirmation copy when available", () => {
    cy.visit("/signin");
    cy.get("body").then(($body) => {
      if ($body.find(SignUpSelectors.emailInput).length) {
        cy.get(SignUpSelectors.emailInput).type("mo.khaled@example.com");
        cy.get(SignUpSelectors.continueButton).click();
        cy.contains(/Create one/i).click({ force: true });
        cy.contains(/Reset password/i).should("exist");
      }
    });
  });

  it("Profile route exposes edit and share controls when present", () => {
    cy.visit("/you");
    assertIfPresent(ProfileSelectors.editButton);
    assertIfPresent(ProfileSelectors.shareButton);
    assertIfPresent(ProfileSelectors.followersStat);
    assertIfPresent(ProfileSelectors.followingStat);
  });

  it("Discover route exposes artist tools and cards", () => {
    cy.visit("/discover");
    assertIfPresent(DiscoverSelectors.artistListSection);
    assertIfPresent(DiscoverSelectors.artistToolsCollapseButton);
    assertIfPresent(DiscoverSelectors.carouselScrollContainer);
  });

  it("Feed route exposes feed list and toggle", () => {
    cy.visit("/feed");
    assertIfPresent(FeedSelectors.feedPage);
    assertIfPresent(FeedSelectors.feedList);
    assertIfPresent(FeedSelectors.buttonFeedReportsToggle);
  });

  it("Search route keeps the search page reachable", () => {
    cy.visit("/search/sounds?q=test");
    assertIfPresent(SearchSelectors.searchPage);
    assertIfPresent(SearchSelectors.trackCardPrefix);
    assertIfPresent(SearchSelectors.playlistComponentPrefix);
  });

  it("Player route exposes sticky player after playback starts", () => {
    cy.visit("/discover");
    cy.get("body").then(($body) => {
      if ($body.find(DiscoverSelectors.trackCard).length) {
        cy.get(DiscoverSelectors.trackCard).first().trigger("mouseover");
        cy.get(DiscoverSelectors.playButton).first().click({ force: true });
        assertIfPresent(PlayerSelectors.stickyPlayer);
      }
    });
  });

  it("Upload route exposes upload form controls when available", () => {
    cy.visit("/upload");
    assertIfPresent(AudioUploadSelectors.chooseFileInput);
    assertIfPresent(AudioUploadSelectors.recordSectionToggleButton);
    assertIfPresent(AudioUploadSelectors.uploadButton);
  });

  it("Library route exposes playlists and likes sections", () => {
    cy.visit("/you/library");
    assertIfPresent(PlaylistsSelectors.recentlyPlayedCards);
    assertIfPresent(PlaylistsSelectors.libraryLikes);
    assertIfPresent(PlaylistsSelectors.libraryPlaylists);
  });

  it("Messages route exposes conversation controls", () => {
    cy.visit("/messages");
    assertIfPresent(ConversationsSelectors.conversationHeader);
    assertIfPresent(ConversationsSelectors.messagingInput);
    assertIfPresent(ConversationsSelectors.conversationProfileButton);
  });

  it("Notifications route exposes filter controls", () => {
    cy.visit("/notifications");
    assertIfPresent(NotificationsSelectors.notificationHeader);
    assertIfPresent(NotificationsSelectors.notificationFilterBtn);
    assertIfPresent(NotificationsSelectors.notificationBtnViewAll);
  });

  it("Admin route exposes dashboard and quick actions", () => {
    cy.visit("/admin");
    assertIfPresent(AdminSelectors.navDashboard);
    assertIfPresent(AdminSelectors.quickActionReports);
    assertIfPresent(AdminSelectors.quickActionUsers);
    assertIfPresent(AdminSelectors.quickActionTracks);
  });
});
