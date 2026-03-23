import { DiscoverSelectors } from '../../support/selectors/feed-search.selectors';
describe ('Discover Page', () => {
    beforeEach(() => {
        cy.visit('/discover');
    })
    it ('Should display the discover page', () => {
        cy.contains(/More of what you like/i).should('be.visible');
        cy.contains(/artist tool/i).should('be.visible');
    })
    it ('Should display the first row of artists tools ', () => {
        cy.get(DiscoverSelectors.artistToolMonetizeButton).should('be.visible');
        cy.get(DiscoverSelectors.artistToolsCollapseButton).click();
        cy.get(DiscoverSelectors.artistToolAmplifyButton).click().location("pathname",/checkout/i);
    })
    it('Should navigate to track page when track card is clicked',() => {
        cy.get(DiscoverSelectors.trackCard).first().click();
        cy.location("pathname",/\/[^\/]+\/[^\/]+/i);
    })
    it('Should display track cards on discover page', () => {
        cy.get(DiscoverSelectors.trackCard)
        .should('have.length.greaterThan', 0)
    })
    it ('Should play a track when play button is clicked', () => {
        cy.get(DiscoverSelectors.trackCard).first().trigger('mouseover');
        cy.get(DiscoverSelectors.playButton).first().click();
        cy.get(DiscoverSelectors.stickyPlayer).should('be.visible');
    })
    // Corner case
    it('Should expand artist tools after collapsing', () => {
        cy.get(DiscoverSelectors.artistToolsCollapseButton).click()
        cy.get(DiscoverSelectors.artistToolsCollapseButton).click()
        cy.get(DiscoverSelectors.artistToolMonetizeButton)
        .should('be.visible')
    })

    it('Should display carousel with multiple tracks', () => {
        cy.get(DiscoverSelectors.carouselScrollContainer)
        .should('be.visible')
        .children()
        .should('have.length.greaterThan', 1)
    })
})