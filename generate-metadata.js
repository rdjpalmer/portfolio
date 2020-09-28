const path = require("path");
const fs = require("fs");
const util = require("util");
const jsontoxml = require("jsontoxml");
const dedent = require("dedent");
const RSS = require("rss");
const omitBy = require("lodash.omitby");
const prerenderManifest = require("./.next/prerender-manifest.json");

const writeFile = util.promisify(fs.writeFile);

const sitemapConfiguration = {
  "/": {
    changefreq: "weekly",
    priority: "1",
  },
  fallback: {
    changefreq: "monthly",
    priority: "0.8",
  },
};

const rssDefaultValues = {
  author: "Richard Palmer",
};

async function generateMetaData() {
  const sitemapJson = [
    {
      loc: "https://rdjpalmer.com/",
      changefreq: "weekly",
      priority: "1",
    },
  ];
  const feed = new RSS({
    title: "Richard Palmer, Creator of Timo and Byozo",
    description: "Creator of Timo & Byozo. Product focused engineer.",
    site_url: "https://rdjpalmer.com",
    feed_url: "https://rdjpalmer.com/feed.xml",
  });

  Object.entries(prerenderManifest.routes).map(([slug, routeConfig]) => {
    const segments = routeConfig.dataRoute.split("/");
    const jsonFileName = segments[segments.length - 1];
    const pageConfigPath = path.resolve(`./.next/server/pages/${jsonFileName}`);
    if (slug !== "/") {
      const pageConfig = require(path.resolve(pageConfigPath));

      const pageSitemapConfig =
        sitemapConfiguration[slug] || sitemapConfiguration.fallback;

      const location = `https://rdjpalmer.com${slug}`;

      sitemapJson.push({
        url: omitBy(
          {
            loc: location,
            lastmod: pageConfig.pageProps.updated || null,
            ...pageSitemapConfig,
          },
          (value) => value == null
        ),
      });

      feed.item({
        ...rssDefaultValues,
        title: pageConfig.pageProps.title,
        guid: pageConfig.pageProps.slug,
        url: location,
        date: pageConfig.pageProps.updated,
        description: pageConfig.pageProps.description,
      });
    }
  });

  const sitemapXml = dedent`
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${jsontoxml(sitemapJson)}
    </urlset>
  `;

  await Promise.all([
    writeFile("./.next/static/sitemap.xml", sitemapXml),
    writeFile("./.next/static/rss.xml", feed.xml()),
  ]);
}

generateMetaData();
