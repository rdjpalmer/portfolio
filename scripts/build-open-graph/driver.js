const path = require("path");

const exePath =
  process.platform === "win32"
    ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    : process.platform === "linux"
    ? "/usr/bin/google-chrome"
    : path.resolve(
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
      );

async function getOptions({ isDev, chromium }) {
  let options;
  if (isDev) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true,
      ignoreHTTPSErrors: true,
      product: "chrome",
    };
  } else {
    options = {
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      product: "chrome",
    };
  }

  return options;
}

module.exports = async function getDriver(isDev) {
  let chromium, puppeteer;

  if (isDev) {
    puppeteer = require("puppeteer");
  } else {
    chromium = require("chrome-aws-lambda");
    puppeteer = chromium.puppeteer;
  }

  return puppeteer.launch(await getOptions({ isDev, chromium }));
};
