import Head from "next/head";
import * as React from "react";

import "../styles/_app.css";

export default function App({ Component, pageProps }) {
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
          key="fonts"
          rel="stylesheet"
          href="https://rsms.me/inter/inter.css"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed for rdjpalmer.com"
          href="/rss.xml"
        />
      </Head>
      <div className="container">
        <Component {...pageProps} />
      </div>
      <script
        src="https://llama.rdjpalmer.com/script.js"
        data-site="SYLMDFCN"
        data-honor-dnt="true"
        data-included-domains="rdjpalmer.com"
        defer
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          document.addEventListener("DOMContentLoaded", function() {
            var form = document.querySelector('#mc-embedded-subscribe-form');
            form && form.addEventListener("submit", function() {
              window.fathom && window.fathom.trackGoal('GVICDJHG', 0);
            }, { once: true });
          });
      `,
        }}
        defer
      ></script>
    </>
  );
}
