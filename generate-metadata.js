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

const VERCEL_URL = process.env.VERCEL_URL;
const siteUrl = VERCEL_URL || "https://rdjpalmer.com";
const pagePath = VERCEL_URL
  ? "./next/serverless/pages"
  : "./.next/server/pages/";

async function generateMetaData() {
  try {
    const sitemapJson = [
      {
        loc: siteUrl,
        changefreq: "weekly",
        priority: "1",
      },
    ];

    const feed = new RSS({
      title: "Richard Palmer, Creator of Timo and Byozo",
      description: "Creator of Timo & Byozo. Product focused engineer.",
      site_url: siteUrl,
      feed_url: `${siteUrl}/feed.xml`,
    });

    Object.entries(prerenderManifest.routes).map(([slug, routeConfig]) => {
      const segments = routeConfig.dataRoute.split("/");
      const jsonFileName = segments[segments.length - 1];
      const pageConfigPath = path.resolve(`${pagePath}${jsonFileName}`);

      const pageConfig = require(path.resolve(pageConfigPath));
      const pageSitemapConfig =
        sitemapConfiguration[slug] || sitemapConfiguration.fallback;
      const location = `${siteUrl}${slug}`;

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
  } catch (error) {
    console.error("Unable to generate site metadata", error);
    throw new Error(error);
  }
}

generateMetaData();
