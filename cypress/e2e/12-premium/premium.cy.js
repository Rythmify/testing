import { LoginSelectors } from "../../support/selectors/auth.selectors";
import PremiumSelectors from "../../support/selectors/premium.selectors";

describe("Premium page", () => {
  const premiumPlan = {
    subscription_plan_id: "plan-premium",
    name: "premium",
    price: "19.99",
    duration_days: 30,
    track_limit: null,
    playlist_limit: null,
  };

  const stubPlans = () => {
    cy.intercept("GET", "**/subscriptions/plans", {
      statusCode: 200,
      body: {
        data: {
          items: [premiumPlan],
        },
        message: "ok",
      },
    }).as("getPlans");
  };

  const stubCheckout = () => {
    cy.intercept("POST", "**/subscriptions/checkout", {
      statusCode: 200,
      body: {
        data: {
          transaction_id: "txn-123",
          user_subscription_id: "sub-123",
          payment_url: "/creator/payment",
          checkout_status: "pending",
        },
        message: "ok",
      },
    }).as("checkoutPremium");
  };

  beforeEach(() => {
    cy.viewport("macbook-13");
    cy.visit("/signin");
    cy.typeEmailAndPassword();
    cy.get(LoginSelectors.continueButton).click();
    stubPlans();
    cy.visit("/premium");
    cy.wait("@getPlans");
  });

  it("shows the premium landing content", () => {
    cy.get(PremiumSelectors.premiumPlanPage).should("be.visible");
    cy.get(PremiumSelectors.premiumHeroSection).should("be.visible");
    cy.contains("Reach more listeners.").should("be.visible");
    cy.contains(
      "Join millions of artists that use Rythmify to get heard.",
    ).should("be.visible");
    cy.get(PremiumSelectors.premiumHeroGetPremium).should("be.visible");
    cy.get(PremiumSelectors.premiumHeroSeePlan).should("be.visible");
    cy.get(PremiumSelectors.premiumHeroFeatureGrid).should("be.visible");
  });

  it("shows premium pricing and comparison sections", () => {
    cy.get(PremiumSelectors.premiumPricingSection).should("be.visible");
    cy.get(PremiumSelectors.premiumPricingCard).should("be.visible");
    cy.contains("Available plan.").should("be.visible");
    cy.contains("Unlimited uploads").should("be.visible");
    cy.contains("Offline listening downloads").should("be.visible");
    cy.contains("Ad-free listening").should("be.visible");
    cy.get(PremiumSelectors.premiumCompareTable).should("be.visible");
    cy.get(PremiumSelectors.premiumCompareFooter).should("be.visible");
  });

  it("scrolls to pricing section when See plan is clicked", () => {
    cy.get(PremiumSelectors.premiumHeroSeePlan).click();
    cy.location("hash").should("eq", "#pricing-cards");
    cy.get(PremiumSelectors.premiumPricingSection).should("be.visible");
  });
  it("shows monthly price and footer sign out action", () => {
    cy.contains("EGP 19.99").should("be.visible");
    cy.get(PremiumSelectors.premiumCompareSignOut).should("be.visible");
  });
});
