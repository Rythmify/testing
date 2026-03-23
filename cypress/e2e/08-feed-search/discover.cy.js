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
    
})