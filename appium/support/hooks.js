// ─────────────────────────────────────────────
// SUITE LEVEL — runs once before ALL tests
// ─────────────────────────────────────────────
exports.before = async function () {
  console.log('Rythmify Cross-Platform Tests Started');
  console.log(`Device: ${driver.capabilities.deviceName}`);
  console.log(`Platform: ${driver.capabilities.platformVersion}`);
};

// ─────────────────────────────────────────────
// TEST LEVEL — runs before EACH individual test
// ─────────────────────────────────────────────
exports.beforeTest = async function (test) {
  console.log(`\n▶ Running: ${test.title}`);

  // Reset app to clean state
  await driver.reset();
};

// ─────────────────────────────────────────────
// TEST LEVEL — runs after EACH individual test
// ─────────────────────────────────────────────
exports.afterTest = async function (test, context, { error, passed }) {
  if (passed) {
    console.log(`✅ Passed: ${test.title}`);
  } else {
    console.log(`❌ Failed: ${test.title}`);
    if (error) {
      console.log(`   Reason: ${error.message}`);
    }
  }
};

// ─────────────────────────────────────────────
// SUITE LEVEL — runs once after ALL tests
// ─────────────────────────────────────────────
exports.after = async function (result) {
  const status = result === 0 ? '✅ All tests passed' : '❌ Some tests failed';
  console.log(`\n${status}`);
};