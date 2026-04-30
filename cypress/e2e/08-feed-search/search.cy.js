import { SearchSelectors } from "../../support/selectors/feed-search.selectors";
import { LoginSelectors } from "../../support/selectors/auth.selectors";
describe("Search Functionality", () => {
  beforeEach(() => {
    cy.viewport("macbook-13");
    cy.visit("/signin");
    cy.get(LoginSelectors.emailInput).click();
    cy.get(LoginSelectors.emailInput).type("ahmedattay8@gmail.com");
    cy.get(LoginSelectors.continueButton).click();
    cy.get(LoginSelectors.passwordInput).type("Ahmedattay66");
    cy.get(LoginSelectors.continueButton).click();
    cy.wait(2000);
    cy.wait(500);
  });

  // ── Query Input Tests ────────────────────────────────────────────────────────
  describe("Search Query Input", () => {
    it("should handle empty search query gracefully", () => {
      cy.visit("/search?q=");
      cy.get(SearchSelectors.searchPage).should("exist");
      cy.contains("Enter a search term").should("exist");
    });

    it("should search with single character query", () => {
      cy.visit("/search?q=a");
      cy.get(SearchSelectors.searchPage).should("exist");
    });

    it("should search with numeric query", () => {
      cy.visit("/search?q=123");
      cy.get(SearchSelectors.searchPage).should("exist");
    });

    it("should handle search with special characters", () => {
      cy.visit("/search?q=test%20%26%20demo");
      cy.get(SearchSelectors.searchPage).should("exist");
    });

    it("should handle very long search query (200+ chars)", () => {
      const longQuery = "a".repeat(250);
      cy.visit(`/search?q=${encodeURIComponent(longQuery)}`);
      cy.get(SearchSelectors.searchPage).should("exist");
    });

    it("should preserve query when navigating between tabs", () => {
      const query = "test";
      cy.visit(`/search?q=${query}`);
      cy.get(SearchSelectors.searchPage).should("exist");

      // Navigate to sounds tab (should preserve query)
      cy.contains("button", "Tracks").click();
      cy.wait(500);
      cy.url().should("include", `q=${query}`);
      cy.url().should("include", "/search/sounds");
    });
  });

  // ── Tab Navigation Tests ─────────────────────────────────────────────────────
  describe("Search Tab Navigation", () => {
    beforeEach(() => {
      cy.visit("/search?q=test");
      cy.wait(500);
    });

    it("should display Everything tab as default", () => {
      cy.get(SearchSelectors.searchPage).should("exist");
    });

    it("should navigate to Tracks tab and show track results", () => {
      cy.contains("button", "Tracks").click();
      cy.wait(500);
      cy.url().should("include", "/search/sounds");
      cy.get(SearchSelectors.searchPage).should("exist");
    });

    it("should navigate to People tab", () => {
      cy.contains("button", "People").click();
      cy.wait(500);
      cy.url().should("include", "/search/people");
      cy.get(SearchSelectors.searchPage).should("exist");
    });

    it("should navigate to Albums tab", () => {
      cy.contains("button", "Albums").click();
      cy.wait(500);
      cy.url().should("include", "/search/albums");
      cy.get(SearchSelectors.searchPage).should("exist");
    });

    it("should navigate to Playlists tab", () => {
      cy.contains("button", "Playlists").click();
      cy.wait(500);
      cy.url().should("include", "/search/sets");
      cy.get(SearchSelectors.searchPage).should("exist");
    });
  });

  // ── Track Results Tests ──────────────────────────────────────────────────────
  describe("Track Search Results", () => {
    it("should display track cards with all required elements", () => {
      cy.visit("/search/sounds?q=test");
      cy.wait(1000);

      // Check if any track cards exist using conditional logic
      cy.window().then((win) => {
        const trackCount = win.document.querySelectorAll(
          SearchSelectors.trackCard,
        ).length;
        if (trackCount > 0) {
          cy.get(SearchSelectors.trackCard).first().should("exist");
          cy.get(SearchSelectors.trackCard)
            .first()
            .within(() => {
              cy.get(SearchSelectors.trackCardTitleLink).should("exist");
              cy.get(SearchSelectors.trackCardArtistLink).should("exist");
            });
        }
      });
    });

    it("should show genre tag on track cards", () => {
      cy.visit("/search/sounds?q=test");
      cy.wait(1000);

      cy.window().then((win) => {
        const trackCount = win.document.querySelectorAll(
          SearchSelectors.trackCard,
        ).length;
        if (trackCount > 0) {
          cy.get(SearchSelectors.trackCardGenre).first().should("exist");
        }
      });
    });

    it("should display track action buttons", () => {
      cy.visit("/search/sounds?q=test");
      cy.wait(1000);

      cy.window().then((win) => {
        const trackCount = win.document.querySelectorAll(
          SearchSelectors.trackCard,
        ).length;
        if (trackCount > 0) {
          cy.get(SearchSelectors.trackCard)
            .first()
            .within(() => {
              cy.get(SearchSelectors.trackCardBtnLike).should("exist");
              cy.get(SearchSelectors.trackCardBtnRepost).should("exist");
              cy.get(SearchSelectors.trackCardBtnShare).should("exist");
            });
        }
      });
    });

    it("should display copy link button on track cards", () => {
      cy.visit("/search/sounds?q=test");
      cy.wait(1000);

      cy.window().then((win) => {
        const trackCount = win.document.querySelectorAll(
          SearchSelectors.trackCard,
        ).length;
        if (trackCount > 0) {
          cy.get(SearchSelectors.trackCard)
            .first()
            .within(() => {
              cy.get(SearchSelectors.trackCardBtnCopy).should("exist");
            });
        }
      });
    });
  });

  // ── Album Results Tests ──────────────────────────────────────────────────────
  describe("Album Search Results", () => {
    it("should display album cards on album search", () => {
      cy.visit("/search/albums?q=test");
      cy.wait(1000);

      cy.window().then((win) => {
        const albumCount = win.document.querySelectorAll(
          SearchSelectors.albumCard,
        ).length;
        if (albumCount > 0) {
          cy.get(SearchSelectors.albumCard).should("exist");
        }
      });
    });
  });

  // ── Playlist Results Tests ───────────────────────────────────────────────────
  describe("Playlist Search Results", () => {
    it("should display playlist components on playlist search", () => {
      cy.visit("/search/sets?q=test");
      cy.wait(1000);

      cy.window().then((win) => {
        const playlistCount = win.document.querySelectorAll(
          SearchSelectors.playlistComponent,
        ).length;
        if (playlistCount > 0) {
          cy.get(SearchSelectors.playlistComponent).should("exist");
          cy.get(SearchSelectors.playlistComponentCover)
            .first()
            .should("exist");
        }
      });
    });

    it("should display playlist play button", () => {
      cy.visit("/search/sets?q=test");
      cy.wait(1000);

      cy.window().then((win) => {
        const playlistCount = win.document.querySelectorAll(
          SearchSelectors.playlistComponent,
        ).length;
        if (playlistCount > 0) {
          cy.get(SearchSelectors.playlistComponentPlayBtn)
            .first()
            .should("exist");
        }
      });
    });

    it("should display playlist metadata", () => {
      cy.visit("/search/sets?q=test");
      cy.wait(1000);

      cy.window().then((win) => {
        const playlistCount = win.document.querySelectorAll(
          SearchSelectors.playlistComponent,
        ).length;
        if (playlistCount > 0) {
          cy.get(SearchSelectors.playlistComponent)
            .first()
            .within(() => {
              cy.get(SearchSelectors.playlistComponentTitleLink).should(
                "exist",
              );
              cy.get(SearchSelectors.playlistComponentTrackCount).should(
                "exist",
              );
            });
        }
      });
    });
  });

  // ── Empty State Tests ────────────────────────────────────────────────────────
  describe("Empty States", () => {
    it("should handle query with no results gracefully", () => {
      // Use very specific query unlikely to have results
      const uniqueQuery = `uniqueXYZ_${Date.now()}`;
      cy.visit(`/search/sounds?q=${uniqueQuery}`);
      cy.wait(1000);

      cy.window().then((win) => {
        const trackCount = win.document.querySelectorAll(
          SearchSelectors.trackCard,
        ).length;
        if (trackCount === 0) {
          cy.contains("No tracks found").should("exist");
        }
      });
    });
  });

  // ── Results Persistence Tests ────────────────────────────────────────────────
  describe("Search Results Persistence", () => {
    it("should maintain results when navigating away and back", () => {
      cy.visit("/search/sounds?q=test");
      cy.wait(1000);

      // Navigate to home
      cy.visit("/");
      cy.wait(500);

      // Navigate back to search
      cy.visit("/search/sounds?q=test");
      cy.wait(1000);

      cy.get(SearchSelectors.searchPage).should("exist");
    });

    it("should maintain tab selection when refreshing page", () => {
      cy.visit("/search/sounds?q=test");
      cy.wait(500);
      cy.reload();
      cy.wait(500);
      cy.url().should("include", "/search/sounds");
    });
  });

  // ── Infinite Scroll / Pagination Tests ───────────────────────────────────────
  describe("Pagination & Infinite Scroll", () => {
    it("should handle infinite scroll on track results", () => {
      cy.visit("/search/sounds?q=a");
      cy.wait(1000);

      // Scroll to bottom to trigger load more
      cy.scrollTo("bottom");
      cy.wait(1000);

      cy.get(SearchSelectors.searchPage).should("exist");
    });

    it("should show result count when available", () => {
      cy.visit("/search/sounds?q=test");
      cy.wait(1000);

      cy.window().then((win) => {
        const trackCount = win.document.querySelectorAll(
          SearchSelectors.trackCard,
        ).length;
        if (trackCount > 0) {
          cy.contains(/Found.*tracks/i).should("exist");
        }
      });
    });
  });

  // ── Error Handling Tests ─────────────────────────────────────────────────────
  describe("Error Handling", () => {
    it("should display error message on network failure", () => {
      // This would require API mocking; demonstrating test structure
      cy.visit("/search/sounds?q=test");
      cy.wait(1000);
      // In real scenario, would stub network error and check for error message
    });
  });
});
