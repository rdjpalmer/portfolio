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
        />
        <meta name="author" content="Richard Palmer" />
        <style>
          {`
            a { color: ${lightColor}; }
            @media (prefers-color-scheme: dark) {
              a { color: ${darkColor}; }
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
