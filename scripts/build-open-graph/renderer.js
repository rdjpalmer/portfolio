const fastify = require("fastify");
const getHtml = require("./template");
const getScreenshot = require("./screenshot");
const getDriver = require("./driver");

const isDev = process.env.NOW_REGION === "dev1";

const isHtmlDebug = process.env.OG_HTML_DEBUG === "1";

const server = fastify({
  logger: true,
});

function parseUrl(url) {
  const [text, fileType] = url.split("/")[1].split(".");
  return [decodeURIComponent(text), fileType];
}

let driver;

module.exports = function initialiseRenderer() {
  server.get("/*", async (request, reply) => {
    const [text, fileType] = parseUrl(request.url);
    const html = getHtml(text);

    if (!driver) {
      // Cached driver, for performance yo
      driver = await getDriver(isDev);
    }

    if (isHtmlDebug) {
      reply.header("Content-Type", "text/html");
      reply.send(html);
      return;
    }

    const screenshot = await getScreenshot(driver, html, fileType, isDev);
    reply.header("Content-Type", `image/${fileType}`);
    reply.send(screenshot);
  });

  return new Promise((resolve, reject) => {
    server.listen(3000, (err, address) => {
      if (err) {
        reject(err);
        return;
      }

      server.log.info(`server listening on ${address}`);

      resolve(() => {
        server.close();
        server.log.info(`server closed`);
      });
    });
  });
};
