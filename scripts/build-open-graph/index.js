const path = require("path");
const fs = require("fs");
const util = require("util");
const fetch = require("node-fetch");
const parse = require("date-fns/parse");
const initialiseRenderer = require("./renderer");

const prerenderManifest = require("../../.next/prerender-manifest.json");

const writeFile = util.promisify(fs.writeFile);

const { VERCEL_URL } = process.env;
const pagePath = VERCEL_URL
  ? "./.next/serverless/pages/"
  : "./.next/server/pages/";

function encodeTitle(title) {
  return title
    .replace(/[^a-z0-9_-]/gi, "-")
    .replace(/-{2,}/g, "-")
    .toLowerCase();
}

async function buildOpenGraphImages() {
  try {
    const stopRenderer = await initialiseRenderer();

    await Object.entries(prerenderManifest.routes)
      .map(([slug, routeConfig]) => {
        const segments = routeConfig.dataRoute.split("/");
        const jsonFileName = segments[segments.length - 1];
        const pageConfigPath = path.resolve(`${pagePath}${jsonFileName}`);
        const pageConfig = require(path.resolve(pageConfigPath));

        return {
          slug,
          page: pageConfig,
          route: routeConfig,
        };
      })
      .filter(({ page }) => typeof page.pageProps.title !== "undefined")
      .sort((a, b) => {
        const aDate = parse(a.page.pageProps.updated, "yyyy-MM-dd", new Date());
        const bDate = parse(b.page.pageProps.updated, "yyyy-MM-dd", new Date());

        return bDate - aDate;
      })
      .map(({ page }) => async () => {
        const { title, shortTitle } = page.pageProps;
        const text = shortTitle || title;

        const imagePath = path.resolve(
          `./public/open-graph/${encodeTitle(text)}.png`
        );

        if (!fs.existsSync(imagePath)) {
          console.log(
            `buildOpenGraphImages(): No cache found for ${text}. Generating image`
          );

          if (shortTitle) {
            console.log(`buildOpenGraphImages(): Using short title`);
          }

          if (text) {
            try {
              const image = await fetch(
                `http://localhost:3000/${text}.png`
              ).then((response) => response.buffer());

              await writeFile(imagePath, image, "binary");

              console.log(
                `buildOpenGraphImages(): Image written to ${imagePath}`
              );

              return true;
            } catch (error) {
              console.error(
                `buildOpenGraphImages(): failed to fetch image for ${text}. Skipping`
              );
            }
          }
        } else {
          console.log(
            `buildOpenGraphImages(): Cache found for ${text}. Skipping`
          );
        }
      })
      .reduce((p, x) => p.then((_) => x()), Promise.resolve());

    await stopRenderer();
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
}

buildOpenGraphImages();
