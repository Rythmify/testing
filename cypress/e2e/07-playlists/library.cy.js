import { LoginSelectors } from "../../support/selectors/auth.selectors";
import { PlaylistsSelectors } from "../../support/selectors/playlists.selectors";
import { DiscoverSelectors } from '../../support/selectors/feed-search.selectors';
describe ('Library Page', () => {
    beforeEach(() => {
        cy.viewport('macbook-13');
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
})