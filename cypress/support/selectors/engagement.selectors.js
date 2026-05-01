export const EngagementSelectors = {
  // Engagement tabs
  engagementTab: '[data-test^="engagement-tab-"]',
  likesTab: '[data-test="engagement-tab-likes"]',
  repostsTab: '[data-test="engagement-tab-reposts"]',
  commentsTab: '[data-test="engagement-tab-comments"]',

  // Engagement items
  engagementFollowerCount: '[data-test^="engagement-follower-count-"]',

  // Like and repost buttons
  likeButton: '[data-test="button-like"]',
  repostButton: '[data-test="button-repost"]',

  // Stats
  likeCountStat: '[data-test="stat-like-count"]',
  repostCountStat: '[data-test="stat-repost-count"]',

  // Track engagement buttons
  likeTrackButton: '[data-test^="button-like-track-"]',
  repostTrackButton: '[data-test^="button-repost-track-"]',

  // Track engagement counts
  trackLikesCount: '[data-test^="track-likes-"]',
  trackRepostsCount: '[data-test^="track-reposts-"]',
};
