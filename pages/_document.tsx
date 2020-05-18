import NextDocument, { Html, Head, Main, NextScript } from "next/document";

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

export default class Document extends NextDocument {
  render() {
    const lightColor = getColor(false);
    const darkColor = getColor(true);

    return (
      <Html lang="en">
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
              a {
                color: ${lightColor};
              }

              @media (prefers-color-scheme: dark) {
                a {
                  color: ${darkColor};
                }
              }
            `}
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
