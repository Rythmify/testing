const BasePage = require('../base.page');
const { PlayerSelectors } = require('../../selectors');

class PlayerPage extends BasePage {

    // ── Home Screen 
    async waitForHomeScreen() {
        await this.getElement(PlayerSelectors.HOME_TITLE);
    }

    // ── Player Tabs 
    async isAllTabsVisible() {
        const results = await Promise.all([
        this.isVisible(PlayerSelectors.PLAYER_NAME),
        this.isVisible(PlayerSelectors.PLAYER_ARTIST),
        this.isVisible(PlayerSelectors.PLAYER_INFO),
        this.isVisible(PlayerSelectors.BEHIND_THE_TRACK),
        this.isVisible(PlayerSelectors.MOVE_DOWN_ICON),
        this.isVisible(PlayerSelectors.FOLLOW_ICON),
        this.isVisible(PlayerSelectors.COMMENT_BAR),
        this.isVisible(PlayerSelectors.IMOGIES_ICONS),
        this.isVisible(PlayerSelectors.lIKE_BUTTON),
        this.isVisible(PlayerSelectors.COMMENT_BUTTON),
        this.isVisible(PlayerSelectors.SHARE_BUTTON),
        this.isVisible(PlayerSelectors.NEXT_UP_BUTTON),
        this.isVisible(PlayerSelectors.SETTINGS_BUTTON),
        this.isVisible(PlayerSelectors.SEEK_BAR),
        ]);
        return results.every(Boolean);
    }

    async isPlayActionVisible() {
        const results = await Promise.all([
        this.isVisible(PlayerSelectors.START_PAUSE_BUTTON),
        this.isVisible(PlayerSelectors.PLAY_NEXT_BUTTON),
        this.isVisible(PlayerSelectors.PLAY_PREVIOUS_BUTTON),
        ]);
        return results.every(Boolean);
    }

    async isMiniPlayerVisible() {
        const results = await Promise.all([
        this.isVisible(PlayerSelectors.PLAYER_INFO),
        this.isVisible(PlayerSelectors.PLAY_NEXT_BUTTON),
        ]);
        return results.every(Boolean);
    }

    async tapPlayerInfo() {
        await this.tap(PlayerSelectors.PLAYER_INFO);
    }

    async tapMiniPlayer() {
        await this.tap(PlayerSelectors.MINI_PLAYER);
    }

    async tapPlayerStart_PauseButton() {
        await this.tap(PlayerSelectors.START_PAUSE_BUTTON);
    }

    async tapPlayButton() {
        await this.tap(PlayerSelectors.PLAY_BUTTON);
    }

    async tapStartPauseButton() {
        await this.tap(PlayerSelectors.START_PAUSE_BUTTON);
    }

    async tapMoveDownIcon() {
        await this.tap(PlayerSelectors.MOVE_DOWN_ICON);
    }

}

module.exports = new PlayerPage();
