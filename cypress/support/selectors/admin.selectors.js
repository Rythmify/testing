// Centralized selectors for admin pages
export const AdminSelectors = {
  // Layout nav
  navDashboard: '[data-test="nav-dashboard"]',
  navReports: '[data-test="nav-reports"]',
  navUsers: '[data-test="nav-users"]',
  navTracks: '[data-test="nav-tracks"]',
  btnLogout: '[data-test="btn-logout"]',

  // Dashboard
  periodBtnDay: '[data-test="period-btn-day"]',
  periodBtnWeek: '[data-test="period-btn-week"]',
  periodBtnMonth: '[data-test="period-btn-month"]',
  btnRefresh: '[data-test="btn-refresh"]',
  quickActionReports: '[data-test^="quick-action-reports"]',
  quickActionUsers: '[data-test^="quick-action-users"]',
  quickActionTracks: '[data-test^="quick-action-tracks"]',

  // Reports page
  reportsTabPrefix: '[data-test^="tab-"]',
  btnDecisionResolved: '[data-test="btn-decision-resolved"]',
  btnDecisionDismissed: '[data-test="btn-decision-dismissed"]',
  textareaAdminNote: '[data-test="textarea-admin-note"]',
  btnResolveCancel: '[data-test="btn-resolve-cancel"]',
  btnResolveConfirm: '[data-test="btn-resolve-confirm"]',
  textareaAppealNotes: '[data-test="textarea-appeal-notes"]',
  btnAppealCancel: '[data-test="btn-appeal-cancel"]',
  btnAppealConfirm: '[data-test="btn-appeal-confirm"]',
  selectStatusFilter: '[data-test="select-status-filter"]',
  selectReasonFilter: '[data-test="select-reason-filter"]',
  selectAppealStatusFilter: '[data-test="select-appeal-status-filter"]',

  // Dynamic action buttons
  btnResolvePrefix: '[data-test^="btn-resolve-"]',
  btnViewPrefix: '[data-test^="btn-view-"]',
  btnReviewPrefix: '[data-test^="btn-review-"]',

  // Track moderation
  btnTrackActionsPrefix: '[data-test^="btn-track-actions-"]',
  btnToggleHide: '[data-test="btn-toggle-hide"]',
  btnToggleUnhide: '[data-test="btn-toggle-unhide"]',
  btnDeleteTrack: '[data-test="btn-delete-track"]',
  textareaHideReason: '[data-test="textarea-hide-reason"]',
  btnHideCancel: '[data-test="btn-hide-cancel"]',
  btnHideConfirm: '[data-test="btn-hide-confirm"]',
  btnDeleteCancel: '[data-test="btn-delete-cancel"]',
  btnDeleteConfirm: '[data-test="btn-delete-confirm"]',
  inputTrackSearch: '[data-test="input-track-search"]',
  btnClearSearch: '[data-test="btn-clear-search"]',
  btnPrevPage: '[data-test="btn-prev-page"]',
  btnNextPage: '[data-test="btn-next-page"]',

  // Generic
  adminRoot: "body",
};
