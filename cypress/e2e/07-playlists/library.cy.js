import { LoginSelectors } from "../../support/selectors/auth.selectors";
import { PlaylistsSelectors } from "../../support/selectors/playlists.selectors";
import { DiscoverSelectors } from '../../support/selectors/feed-search.selectors';
describe ('Library Page', () => {
    beforeEach(() => {
        cy.viewport('macbook-13');
        cy.wait(2000);
        cy.visit('/signin');
        cy.get(LoginSelectors.emailInput).click();
        cy.get(LoginSelectors.emailInput).type('mo.khaled@example.com')
        cy.get(LoginSelectors.continueButton).click();
        cy.get(LoginSelectors.passwordInput).type('Password123!');
        cy.get(LoginSelectors.continueButton).click();
        cy.location("pathname").should("equal","/discover");
        cy.wait(2000);
        cy.get(DiscoverSelectors.trackCard).first().trigger('mouseover');
        cy.get(DiscoverSelectors.playButton).first().click();
        cy.visit('/you/library');
        cy.wait(3000);
    })
    it ('should display recently played cards', () => {
        cy.get(PlaylistsSelectors.recentlyPlayedCards).should('be.visible');
        cy.get(PlaylistsSelectors.recentlyPlayedCards).children().should('have.length.greaterThan', 0);
        cy.get(PlaylistsSelectors.cardTrack).first().trigger('mouseover');
        cy.get(PlaylistsSelectors.cardTrack).first().find(PlaylistsSelectors.playButton).should('exist');
        cy.get(PlaylistsSelectors.cardTrack).first().find(PlaylistsSelectors.likeButton).should('exist');
    })
    it('should play a track when play button is clicked', () => {
        cy.get(PlaylistsSelectors.cardTrack).first().trigger('mouseover');
        cy.get(PlaylistsSelectors.cardTrack).first().find(PlaylistsSelectors.playButton).click();
        cy.get(DiscoverSelectors.stickyPlayer).should('be.visible');
    })
    it('should like a track when like button is clicked', () => {
        cy.get(PlaylistsSelectors.cardTrack).first().trigger('mouseover');
        cy.get(PlaylistsSelectors.cardTrack).first().find(PlaylistsSelectors.likeButton).click();
        cy.get(PlaylistsSelectors.libraryLikesCards).should('have.length.greaterThan',0);
        cy.get(PlaylistsSelectors.cardTrack).first().find(PlaylistsSelectors.likeButton).click();
        cy.contains(/You have no likes yet./i).should('be.visible');
    })
    it('should keep library sections after reload', () => {
        cy.reload();
        cy.get(PlaylistsSelectors.recentlyPlayedCards).should('be.visible');
        cy.get(PlaylistsSelectors.libraryLikes).should('be.visible');
    })
    it('should keep library page when navigating back from discover', () => {
        cy.visit('/discover');
        cy.go('back');
        cy.location("pathname").should("equal","/you/library");
        cy.get(PlaylistsSelectors.recentlyPlayedCards).should('be.visible');
    })
    it('Should keep like state after reload', () => {
        cy.get(PlaylistsSelectors.cardTrack).first().trigger('mouseover');
        cy.get(PlaylistsSelectors.cardTrack).first().find(PlaylistsSelectors.likeButton).click();
        cy.get(PlaylistsSelectors.libraryLikesCards).should('have.length.greaterThan',0);
        cy.reload();
        cy.get(PlaylistsSelectors.libraryLikesCards).should('have.length.greaterThan',0);
    })
    it('should follow from sticky bar and show in following section', () => {
        cy.visit('/discover');
        cy.get(DiscoverSelectors.trackCard).first().trigger('mouseover');
        cy.get(DiscoverSelectors.playButton).first().click();
        cy.get(DiscoverSelectors.stickyPlayer).should('be.visible');

        cy.get(PlaylistsSelectors.playerArtistName).invoke('attr', 'href').then((href) => {
            const artistUserName = (href || '').split('/').filter(Boolean)[0];

            cy.get(PlaylistsSelectors.playerFollowButton).click();

            cy.visit('/you/library');
            cy.get(PlaylistsSelectors.libraryFollowing).should('be.visible');
            cy.get(PlaylistsSelectors.libraryFollowingCards).should('contain', artistUserName);
        });
    })
    it('should like from sticky bar and show in likes section', () => {
        cy.visit('/discover');
        cy.get(DiscoverSelectors.trackCard).first().trigger('mouseover');
        cy.get(DiscoverSelectors.playButton).first().click();
        cy.get(DiscoverSelectors.stickyPlayer).should('be.visible');

        cy.get(PlaylistsSelectors.playerTrackTitle).invoke('text').then((trackTitle) => {
            cy.get(PlaylistsSelectors.playerLikeButton).click();

            cy.visit('/you/library');
            cy.get(PlaylistsSelectors.libraryLikes).should('be.visible');
            cy.get(PlaylistsSelectors.libraryLikes).should('contain', trackTitle.trim());
        });
    })
    it('should like playlist from discover and remove it after unlike', () => {
        cy.visit('/discover');
        cy.get(PlaylistsSelectors.playlistCard).first().find('p').first().invoke('text').then((playlistTitle) => {
            const selectedPlaylistTitle = playlistTitle.trim();

            cy.get(PlaylistsSelectors.playlistCard).first().trigger('mouseover');
            cy.get(PlaylistsSelectors.playlistCard).first().find(PlaylistsSelectors.likeButton).first().click();

            cy.visit('/you/library');
            cy.get(PlaylistsSelectors.playlistFilterToggle).click();
            cy.get(PlaylistsSelectors.playlistFilterLikedOption).click();
            cy.get(PlaylistsSelectors.libraryPlaylists).should('be.visible');
            cy.get(PlaylistsSelectors.libraryPlaylistsCards).should('contain', selectedPlaylistTitle);

            cy.get(PlaylistsSelectors.libraryPlaylistsCards).contains(selectedPlaylistTitle).closest(PlaylistsSelectors.playlistCard).trigger('mouseover').find(PlaylistsSelectors.likeButton).first().click();
            cy.get(PlaylistsSelectors.libraryPlaylistsCards).should('not.contain', selectedPlaylistTitle);
        });
    })
    it('should keep sticky player visible when moving from discover to library', () => {
        cy.visit('/discover');
        cy.get(DiscoverSelectors.trackCard).first().trigger('mouseover');
        cy.get(DiscoverSelectors.playButton).first().click();
        cy.get(DiscoverSelectors.stickyPlayer).should('be.visible');
        cy.contains('Library').click();
        cy.get(DiscoverSelectors.stickyPlayer).should('be.visible');
    })
    //! Fail the sticky player not showing after reload, need to investigate
    it('should keep sticky player visible after reload when a track is playing', () => {
        cy.visit('/discover');
        cy.get(DiscoverSelectors.trackCard).first().trigger('mouseover');
        cy.get(DiscoverSelectors.playButton).first().click();
        cy.get(DiscoverSelectors.stickyPlayer).should('be.visible');
        cy.reload();
        cy.get(DiscoverSelectors.stickyPlayer).should('be.visible');
    })
    it('should switch playlists filter between liked and all', () => {
        cy.get(PlaylistsSelectors.playlistFilterToggle).click();
        cy.get(PlaylistsSelectors.playlistFilterLikedOption).click();
        cy.get(PlaylistsSelectors.libraryPlaylists).should('be.visible');
        cy.get(PlaylistsSelectors.libraryPlaylistsCards).should('be.visible');
        cy.get(PlaylistsSelectors.playlistFilterToggle).click();
        cy.contains('All').click();
        cy.get(PlaylistsSelectors.libraryPlaylists).should('be.visible');
        cy.get(PlaylistsSelectors.libraryPlaylistsCards).should('be.visible');
    })
})