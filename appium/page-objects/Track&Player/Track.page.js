const BasePage = require('../base.page');
const { TrackSelectors } = require('../../selectors');

class TrackPage extends BasePage {

    // ── Home Screen 
    async waitForHomeScreen() {
        await this.getElement(PlayerSelectors.HOME_TITLE);
    }

    // ── Track Tabs 
    async isAllTabsVisible() {
        const results = await Promise.all([
        this.isVisible(TrackSelectors.lIKE_ICON),
        this.isVisible(TrackSelectors.COMMENT_ICON),
        this.isVisible(TrackSelectors.SHARE_ICON),
        this.isVisible(TrackSelectors.PLAY_BUTTON),
        this.isVisible(TrackSelectors.USER_NAME),
        this.isVisible(TrackSelectors.USER_CITY_COUNTRY),
        this.isVisible(TrackSelectors.FOLLOW_ICON),
        this.isVisible(TrackSelectors.FANS_LEADERBOARD),
        this.isVisible(TrackSelectors.TOP),
        this.isVisible(TrackSelectors.FIRST),
        ]);
        return results.every(Boolean);
    }

    async isTrackInfoVisible() {
        const results = await Promise.all([
        this.isVisible(TrackSelectors.TRACK_NAME),
        this.isVisible(TrackSelectors.ARTIST_NAME),
        ]);
        return results.every(Boolean);
    }

    async isTagsVisible() {
        return this.isVisible(TrackSelectors.TAGS);
    }

    async isShowMoreVisible() {
        return this.isVisible(TrackSelectors.SHOW_MORE_BUTTON);
    }

    async tapPlayButton() {
        await this.tap(TrackSelectors.PLAY_BUTTON);
    }

    async tapTopButton() {
        await this.tap(TrackSelectors.TOP);
    }

    async tapFirstButton() {
        await this.tap(TrackSelectors.FIRST);
    }

    async tapShowMore() {
        await this.tap(TrackSelectors.SHOW_MORE_BUTTON);
    }

}

module.exports = new TrackPage();
