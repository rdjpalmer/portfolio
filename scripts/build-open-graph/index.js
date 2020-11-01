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
      const { title } = page.pageProps;
      const imagePath = path.resolve(
        `./public/open-graph/${encodeTitle(title)}.png`
      );

      if (!fs.existsSync(imagePath)) {
        console.log(
          `buildOpenGraphImages(): No cache found for ${title}. Generating image`
        );
        if (title) {
          try {
            const image = await fetch(
              `http://localhost:3000/${title}.png`
            ).then((response) => response.buffer());

            console.log(
              `buildOpenGraphImages(): Image created for ${title}. Writing to /public/open-graph`
            );

            await writeFile(imagePath, image, "binary");
            return true;
          } catch (error) {
            console.error(
              `buildOpenGraphImages(): failed to fetch image for ${title}. Skipping`
            );
          }
        }
      } else {
        console.log(
          `buildOpenGraphImages(): Cache found for ${title}. Skipping`
        );
      }
    })
    .reduce((p, x) => p.then((_) => x()), Promise.resolve());

  await stopRenderer();
  process.exit();
}

buildOpenGraphImages();
