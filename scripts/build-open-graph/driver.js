const chromium = require("chrome-aws-lambda");

const exePath =
  process.platform === "win32"
    ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    : process.platform === "linux"
    ? "/usr/bin/google-chrome"
    : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

module.exports = async function getDriver(isDev) {
  return chromium.puppeteer.launch({
    args: chromium.args,
    executablePath: isDev ? exePath : await chromium.executablePath,
    headless: isDev ? true : chromium.headless,
  });
};
