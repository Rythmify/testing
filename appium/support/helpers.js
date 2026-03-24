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
  const { width, height } = await driver.getWindowSize();
  await driver.performActions([{
    type: 'pointer',
    id: 'finger1',
    parameters: { pointerType: 'touch' },
    actions: [
      { type: 'pointerMove', duration: 0, x: Math.floor(width / 2), y: Math.floor(height * 0.7) },
      { type: 'pointerDown', button: 0 },
      { type: 'pause', duration: 100 },
      { type: 'pointerMove', duration: 600, x: Math.floor(width / 2), y: Math.floor(height * 0.2) },
      { type: 'pointerUp', button: 0 },
    ],
  }]);
  await driver.pause(500);
}

async function scrollUp() {
  const { width, height } = await driver.getWindowSize();
  await driver.performActions([{
    type: 'pointer',
    id: 'finger1',
    parameters: { pointerType: 'touch' },
    actions: [
      { type: 'pointerMove', duration: 0, x: Math.floor(width / 2), y: Math.floor(height * 0.2) },
      { type: 'pointerDown', button: 0 },
      { type: 'pause', duration: 100 },
      { type: 'pointerMove', duration: 600, x: Math.floor(width / 2), y: Math.floor(height * 0.7) },
      { type: 'pointerUp', button: 0 },
    ],
  }]);
  await driver.pause(500);
}

async function scrollRight(startY) {
  const { width } = await driver.getWindowSize();
  await driver.performActions([{
    type: 'pointer',
    id: 'finger1',
    parameters: { pointerType: 'touch' },
    actions: [
      { type: 'pointerMove', duration: 0, x: Math.floor(width * 0.8), y: startY },
      { type: 'pointerDown', button: 0 },
      { type: 'pause', duration: 100 },
      { type: 'pointerMove', duration: 600, x: Math.floor(width * 0.2), y: startY },
      { type: 'pointerUp', button: 0 },
    ],
  }]);
  await driver.pause(400);
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
  scrollRight,
  pause,
};