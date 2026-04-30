export const DiscoverSelectors = {
  searchInput: '[data-test="input-search"]',
  artistToolAmplifyButton: '[data-test="button-tool-amplify"]',
  artistToolMonetizeButton: '[data-test="button-tool-monetize"]',
  artistToolsCollapseButton: '[data-test="button-artist-tools-collapse"]',
  artistToolsCtaButton: '[data-test="button-artist-tools-cta"]',
  artistListSectionRefresh: '[data-test="artist-list-section-refresh"]',
  artistListSection: '[data-test="artist-list-section"]',
  trackCard: '[data-test="card-track"]',
  playButton: '[data-test="button-play"]',
  carouselScrollContainer: '[data-test="carousel-scroll-container"]',
  trendingContainer: '[data-test="trending-container"]',
  stickyPlayer: '[data-test="sticky-player"]',
};

export const FeedSelectors = {
  buttonFeedReportsToggle: '[data-test="button-feed-reposts-toggle"]',
  feedPage: '[data-test="feed-page"]',
  feedList: '[data-test="feed-list"]',
  feedItem: '[data-test^="feed-item-"]',
  trackCard: '[data-test="track-card"]',
  trackCardPlayBtn: '[data-test="track-card-play-btn"]',
  trackCardBtnLike: '[data-test="track-card-btn-like"]',
};

export const SearchSelectors = {
  searchPage: '[data-test="search-page"]',
  trackCard: '[data-test="track-card"]',
  trackCardArtistLink: '[data-test="track-card-artist-link"]',
  trackCardTitleLink: '[data-test="track-card-title-link"]',
  trackCardPostedAt: '[data-test="track-card-posted-at"]',
  trackCardGenre: '[data-test="track-card-genre"]',
  trackCardRepostedBy: '[data-test="track-card-reposted-by-link"]',
  trackCardBtnLike: '[data-test="track-card-btn-like"]',
  trackCardBtnRepost: '[data-test="track-card-btn-repost"]',
  trackCardBtnEdit: '[data-test="track-card-btn-edit"]',
  trackCardBtnReplace: '[data-test="track-card-btn-replace"]',
  trackCardBtnShare: '[data-test="track-card-btn-share"]',
  trackCardBtnCopy: '[data-test="track-card-btn-copy"]',
  trackCardBtnQueue: '[data-test="track-card-btn-queue"]',
  trackCardBtnMore: '[data-test="track-card-btn-more"]',
  trackCardMoreDropdown: '[data-test="track-card-more-dropdown"]',
  trackCardBtnComments: '[data-test="track-card-btn-comments"]',
  trackCardCommentCount: '[data-test="track-card-comment-count"]',
  albumCard: '[data-test="album-card"]',

  // ── Playlist Results ────────────────────────────────────────────────────
  playlistComponent: '[data-test="playlist-component"]',
  playlistComponentCover: '[data-test="playlist-component-cover"]',
  playlistComponentPlayBtn: '[data-test="playlist-component-play-btn"]',
  playlistComponentPrivateBadge:
    '[data-test="playlist-component-private-badge"]',
  playlistComponentCreatorLink: '[data-test="playlist-component-creator-link"]',
  playlistComponentRepostedBy:
    '[data-test="playlist-component-reposted-by-link"]',
  playlistComponentTitleLink: '[data-test="playlist-component-title-link"]',
  playlistComponentPostedAt: '[data-test="playlist-component-posted-at"]',
  playlistComponentTrackCount: '[data-test="playlist-component-track-count"]',
  playlistComponentTrackList: '[data-test="playlist-component-track-list"]',
  playlistComponentViewAllLink:
    '[data-test="playlist-component-view-all-link"]',
  playlistComponentTotalPlays: '[data-test="playlist-component-total-plays"]',

  // ── Prefix Selectors for Dynamic Elements ───────────────────────────────
  // Use these with cy.get() to match multiple dynamic elements
  trackCardPrefix: '[data-test^="track-card"]',
  albumCardPrefix: '[data-test^="album-card"]',
  playlistComponentPrefix: '[data-test^="playlist-component"]',
  playlistTrackRowPrefix: '[data-test^="playlist-component-track-row-"]',
};
