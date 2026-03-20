// selectors for login page
export const LoginSelectors = {
    facebookButton: '[data-test="btn-continue-facebook"]',
    googleButton: '[data-test="btn-continue-google"]',
    appleButton: '[data-test="btn-continue-apple"]',
    emailInput: '[data-test="input-email"]',
    continueEmailButton: '[data-test="btn-continue-email"]',
    continueButton : '[data-test="input-email"]',
    passwordInput: '[data-test="input-password"]',
    buttonTogglePassword: '[data-test="btn-toggle-password"]',
} 

// selectors for reset password page
export const ResetPasswordSelectors = {
    emailInput: '[data-test="input-email"]',
    continueEmailButton: '[data-test="btn-continue-email"]',
    continueButton : '[data-test="input-email"]',
    forgotPasswordButton: '[data-test="btn-forgot-password"]',
    sendResetLinkButton: '[data-test="btn-send-reset-link"]',
    backToLoginButton: '[data-test="btn-back-to-login"]',
}
// selectors for sign up page
export const SignUpSelectors = {
    emailInput: '[data-test="input-email"]',
    continueEmailButton: '[data-test="btn-continue-email"]',
    passwordInput: '[data-test="input-password"]',
    createAccountButton: '[data-test="btn-create-account"]',
    continueButton: '[data-test="btn-continue"]',
    displayNameInput: '[data-test="input-display-name"]',
    selectDateOfBirthMonthButton: '[data-test="select-dob-month"]',
    selectDateOfBirthDayButton: '[data-test="select-dob-day"]',
    selectDateOfBirthYearButton: '[data-test="select-dob-year"]',
    selectGenderButton: '[data-test="select-gender"]',
}