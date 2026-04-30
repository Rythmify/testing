import { LoginSelectors } from "../../support/selectors/auth.selectors";
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
    cy.contains("Reach more listeners.").should("be.visible");
    cy.contains(
      "Join millions of artists that use Rythmify to get heard.",
    ).should("be.visible");
    cy.contains("Premium").should("be.visible");
    cy.contains("Available plan.").should("be.visible");
    cy.contains("Compare features.").should("be.visible");
    cy.contains("Unlimited uploads").should("be.visible");
    cy.contains("Offline listening downloads").should("be.visible");
    cy.contains("Ad-free listening").should("be.visible");
  });
});
