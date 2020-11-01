const chromium = require("chrome-aws-lambda");
const path = require("path");

const exePath =
  process.platform === "win32"
    ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    : process.platform === "linux"
    ? "/usr/bin/google-chrome"
    : path.resolve(
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
      );

async function getOptions(isDev) {
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

  console.log({ options });

  return options;
}

module.exports = async function getDriver(isDev) {
  return chromium.puppeteer.launch(await getOptions(isDev));
};
