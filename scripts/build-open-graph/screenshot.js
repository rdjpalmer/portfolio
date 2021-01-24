module.exports = async function screenshot(driver, html, fileType, isDev) {
  const page = await driver.newPage();
  await page.setViewport({ width: 1024, height: 512 });
  await page.setContent(html);

  // Delay to ensure font has loaded
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return page.screenshot({ type: fileType });
};
