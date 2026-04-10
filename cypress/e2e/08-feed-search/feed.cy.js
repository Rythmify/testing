import { LoginSelectors } from "../../support/selectors/auth.selectors";
import { DiscoverSelectors } from '../../support/selectors/feed-search.selectors';
import {FeedSelectors} from '../../support/selectors/feed-search.selectors';
describe ('Feed Page', () => {
    beforeEach(() => {
        cy.viewport('macbook-13');
        cy.wait(2000);
        cy.visit('/signin');
        cy.get(LoginSelectors.emailInput).click();
        cy.get(LoginSelectors.emailInput).type('mo.khaled@example.com');
        cy.get(LoginSelectors.continueButton).click();
        cy.get(LoginSelectors.passwordInput).type('Password123!');
        cy.get(LoginSelectors.continueButton).click();
        cy.location("pathname").should("equal","/discover");
        cy.contains('Feed').click();
    })
    it ('Should go to Feed Page', () => {
        cy.contains(/Hear the latest posts from the people you're following:/i).should('be.visible');
        cy.get(FeedSelectors.trackCard).should('be.visible');
    })
    it('Should play a track when play button is clicked', () => {
        cy.get(FeedSelectors.trackCard).first().trigger('mouseover');
        cy.get(FeedSelectors.trackCardPlayBtn).first().click();
        cy.get(DiscoverSelectors.stickyPlayer).should('be.visible');
    })  
    it('Should not show reposts when toggle is on', () => {
        cy.get(FeedSelectors.buttonFeedReportsToggle).should('be.visible');
        cy.contains(/Reposts/i).should('be.visible');
        cy.get(FeedSelectors.buttonFeedReportsToggle).find('button').click();
        cy.contains(/reposted/i).should('not.exist');
    })
    it('Should redirect to login page if not authenticated', () => {
        cy.clearLocalStorage();
        cy.visit('/feed', { failOnStatusCode: false });
        cy.location("pathname").should("equal","/signin");
        cy.get(LoginSelectors.emailInput).should('be.visible');
    })
})