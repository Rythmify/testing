// Email screen
// Password screen
module.exports = {

  // ─── Email Screen ───
  EMAIL_INPUT:          'android=new UiSelector().className("android.widget.EditText").instance(0)',
  CONTINUE_BUTTON:      '~Continue',
  GOOGLE_BUTTON:        '~Continue with Google',
  FACEBOOK_BUTTON:      '~Continue with Facebook',
  APPLE_BUTTON:         '~Continue with Apple',

  // ─── Password Screen ───
  PASSWORD_INPUT:       'android=new UiSelector().className("android.widget.EditText").instance(0)',
  SIGN_IN_BUTTON:       'android=new UiSelector().className("android.view.View").instance(5)',
  FORGOT_PASSWORD_LINK: '~Forgot password?',   

  // ─── Home Page ───
  HOME_PAGE:          'android=new UiSelector().description("Home\nTab 1 of 5")',
  FEED_TAB:           '~Feed\nTab 2 of 5',
  SEARCH_TAB:         '~Search\nTab 3 of 5',
  LIBRARY_TAB:        '~Library\nTab 4 of 5',
  UPGRADE_TAB:        '~Upgrade\nTab 5 of 5',
  
  // ─── Error Messages ───
  ERROR_INVALID_CREDENTIALS: '~Invalid email or password.',  
  ERROR_EMPTY_EMAIL:         '~Please enter your email',    
  ERROR_EMPTY_PASSWORD:      '~Please enter your password',
  ERROR_INVALID_EMAIL:       '~Please enter a valid email',

};