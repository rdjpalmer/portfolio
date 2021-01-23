import Head from "next/head";
import { useEffect } from "react";

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
  useEffect(() => {
    if (process.env.ANALYTICS === "true") {
      const tracker = window.document.createElement("script");
      const firstScript = window.document.getElementsByTagName("script")[0];
      tracker.defer = true;
      tracker.setAttribute("site", "SYLMDFCN");
      tracker.setAttribute("spa", "auto");
      tracker.src = "https://llama.rdjpalmer.com/script.js";
      firstScript.parentNode.insertBefore(tracker, firstScript);
    }
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
        <link
          rel="stylesheet"
          href="https://use.typekit.net/xdh4erl.css"
          media="none"
          // @ts-ignore
          onload="if(media!='all')media='all'"
        ></link>
      </Head>
      <div className="container">
        <Component {...pageProps} />
      </div>
    </>
  );
}
