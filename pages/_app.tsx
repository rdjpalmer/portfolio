import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import * as Fathom from "fathom-client";
import loadTypekit from "../util/load-typekit";

import "../styles/_app.css";

const Color = {
  light: ["#008040", "#0000E0", "#DB0A5B", "#E00000"],
  dark: [
    "#00FF7F",
    "#36D7B7",
    "#FC6399",
    "#9370DB",
    "#FFD700",
    "#F9690E",
    "#F64747",
  ],
};

function getColor(isDarkMode) {
  if (isDarkMode) {
    const limit = Color.dark.length;
    const index = Math.floor(Math.random() * limit);
    return Color.dark[index];
  }

  const limit = Color.light.length;
  const index = Math.floor(Math.random() * limit);
  return Color.light[index];
}

export default function App({ Component, pageProps }) {
  const router = useRouter();

  React.useEffect(() => {
    Fathom.load("SYLMDFCN", {
      includedDomains: ["https://rdjpalmer.com"],
      url: "https://llama.rdjpalmer.com/script.js",
      honorDNT: true,
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on("routeChangeComplete", onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, []);

  React.useEffect(() => {
    loadTypekit("xdh4erl");
  }, []);

  const lightColor = getColor(false);
  const darkColor = getColor(true);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="Creator of Timo & Byozo. Product focused engineer."
          key="description"
        />
        <meta name="author" content="Richard Palmer" key="author" />
        <link rel="canonical" href="https://rdjpalmer.com" key="canonical" />
        <meta
          property="og:title"
          content="Richard Palmer, Creator of Timo and Byozo"
          key="ogTitle"
        />
        <meta
          property="og:site_name"
          content="rdjpalmer.com"
          key="ogSiteName"
        />
        <meta property="og:url" content="https://rdjpalmer.com" key="ogUrl" />
        <meta
          property="og:description"
          content="Creator of Timo & Byozo. Product focused engineer."
          key="ogDescription"
        />
        <meta property="og:type" content="article" key="ogType" />
        <meta name="twitter:card" content="summary" key="twitterCard" />
        <meta name="twitter:site" content="@rdjpalmer" key="twitterSite" />
        <meta
          name="twitter:creator"
          content="@rdjpalmer"
          key="twitterCreator"
        />
        <meta property="og:image" content="/mstile-310x310.png" key="ogImage" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed for rdjpalmer.com"
          href="/rss.xml"
        />
        <style>
          {`
            a { color: ${lightColor}; }
            input:focus { outline-color: ${lightColor}; }
            @media (prefers-color-scheme: dark) {
              a { color: ${darkColor}; }
              input:focus { outline-color: ${darkColor}; }
            }
          `}
        </style>
      </Head>
      <div className="container">
        <Component {...pageProps} />
      </div>
    </>
  );
}
