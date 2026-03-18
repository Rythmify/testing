// ─────────────────────────────────────────────
// Wait for element with clear timeout message
// ─────────────────────────────────────────────
async function waitForElement(selector, timeout = 10000) {
  const element = await $(selector);
  await element.waitForDisplayed({
    timeout,
    timeoutMsg: `Element "${selector}" was not visible after ${timeout}ms`,
  });
  return element;
}

// ─────────────────────────────────────────────
// Scroll helpers
// ─────────────────────────────────────────────
async function scrollDown() {
  await driver.execute('mobile: scroll', { direction: 'down' });
}

async function scrollUp() {
  await driver.execute('mobile: scroll', { direction: 'up' });
}

// ─────────────────────────────────────────────
// Pause — only when waiting for animations
// ─────────────────────────────────────────────
async function pause(ms = 1000) {
  await driver.pause(ms);
}

module.exports = {
  waitForElement,
  scrollDown,
  scrollUp,
  pause,
};