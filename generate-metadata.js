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

// var fs = require('fs');
// var path = require('path');
var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);

      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

console.log(path.resolve("./"));

walk(path.resolve("./"), (error, results) => {
  const log = results.filter(
    (result) =>
      !(
        result.includes(".git") ||
        result.includes("node_modules") ||
        result.includes(".next/cache")
      )
  );
  console.log(log);
});

async function generateMetaData() {
  // try {
  //   const sitemapJson = [
  //     {
  //       loc: "https://rdjpalmer.com/",
  //       changefreq: "weekly",
  //       priority: "1",
  //     },
  //   ];
  //   const feed = new RSS({
  //     title: "Richard Palmer, Creator of Timo and Byozo",
  //     description: "Creator of Timo & Byozo. Product focused engineer.",
  //     site_url: "https://rdjpalmer.com",
  //     feed_url: "https://rdjpalmer.com/feed.xml",
  //   });
  //   Object.entries(prerenderManifest.routes).map(([slug, routeConfig]) => {
  //     // const segments = routeConfig.dataRoute.split("/");
  //     // const jsonFileName = segments[segments.length - 1];
  //     // const pageConfigPath = path.resolve(`./.next/server/pages/${jsonFileName}`);
  //     if (slug !== "/") {
  //       console.log(routeConfig);
  //       const pageConfig = require(path.resolve(pageConfigPath));
  //       const pageSitemapConfig =
  //         sitemapConfiguration[slug] || sitemapConfiguration.fallback;
  //       const location = `https://rdjpalmer.com${slug}`;
  //       sitemapJson.push({
  //         url: omitBy(
  //           {
  //             loc: location,
  //             lastmod: pageConfig.pageProps.updated || null,
  //             ...pageSitemapConfig,
  //           },
  //           (value) => value == null
  //         ),
  //       });
  //       feed.item({
  //         ...rssDefaultValues,
  //         title: pageConfig.pageProps.title,
  //         guid: pageConfig.pageProps.slug,
  //         url: location,
  //         date: pageConfig.pageProps.updated,
  //         description: pageConfig.pageProps.description,
  //       });
  //     }
  //   });
  //   const sitemapXml = dedent`
  //     <?xml version="1.0" encoding="UTF-8"?>
  //     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  //       ${jsontoxml(sitemapJson)}
  //     </urlset>
  //   `;
  //   await Promise.all([
  //     writeFile("./.next/static/sitemap.xml", sitemapXml),
  //     writeFile("./.next/static/rss.xml", feed.xml()),
  //   ]);
  // } catch (error) {
  //   console.error("Unable to generate site metadata", error);
  //   throw new Error(error);
  // }
}

generateMetaData();
