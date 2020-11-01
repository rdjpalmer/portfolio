module.exports = async function screenshot(driver, html, fileType, isDev) {
  await driver.setViewport({ width: 1024, height: 512 });
  await driver.setContent(html);

  return driver.screenshot({ type: fileType });
};
