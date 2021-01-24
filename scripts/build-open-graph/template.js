const { readFileSync } = require("fs");

console.log(__dirname);

const helveticaBold = readFileSync(
  `${__dirname}/fonts/Helvetica-Bold.woff2`
).toString("base64");

function getCss(rotation) {
  let background = "white";
  let foreground = "black";

  return `
    * {
        box-sizing: border-box;
    }

    html {
        margin: 0;
        padding: 0;
    }

    body {
        background: ${background};
        margin: 0;
        max-height: 100vh;
        max-width: 100vw;
        position: relative;
        overflow: hidden;
    }

    .body {
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    .spacer {
        margin: 150px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }

    .heading {
        font-family: adobe-caslon-pro, serif;
        font-size: 180px;
        font-size: min(9vw, 18vh);
        font-style: normal;
        color: ${foreground};
        line-height: 1.1;
        font-weight: 600;
        margin: 0;
        padding: 0;
        position: relative;
        width: 90vw;
        text-align: left;
        widows: 2;
        orphans: 2;
        margin-top: 3rem;
    }

    .overlay {
        position: absolute;
        top: -50%;
        left: -50%;
        width: 2048px;
        height: 1024px;
        mix-blend-mode: hard-light;
        transform: rotate(${rotation}deg) scale(2);
    }
    `;
}

module.exports = function getHtml(text) {
  const hash = text.split("").reduce((num, char) => {
    return num + char.charCodeAt(0);
  }, 0);

  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link
        rel="stylesheet"
        href="https://use.typekit.net/xdh4erl.css"
    ></link>
    <style>
        ${getCss(hash)}
    </style>
    <body>
        <div class="body">
            <div class="heading">
                ${text}
            </div>
            </div>
            <svg class="overlay" width="2124" height="1926" viewBox="0 0 2124 1926" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0)">
<g filter="url(#filter0_f)">
<circle cx="950.002" cy="1503.32" r="423" fill="#FF0A0A"/>
</g>
<g filter="url(#filter1_f)">
<circle cx="423" cy="759" r="423" fill="#01944A"/>
</g>
<g opacity="0.6" filter="url(#filter2_f)">
<circle cx="1417" cy="423" r="423" fill="white"/>
</g>
<g opacity="0.6" filter="url(#filter3_f)">
<circle cx="867" cy="1313" r="423" fill="white"/>
</g>
<g filter="url(#filter4_f)">
<circle cx="1759.5" cy="685.5" r="364.5" fill="#001AFF"/>
</g>
</g>
<defs>
<filter id="filter0_f" x="277.002" y="830.324" width="1346" height="1346" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="125" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter1_f" x="-250" y="86" width="1346" height="1346" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="125" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter2_f" x="744" y="-250" width="1346" height="1346" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="125" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter3_f" x="194" y="640" width="1346" height="1346" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="125" result="effect1_foregroundBlur"/>
</filter>
<filter id="filter4_f" x="1145" y="71" width="1229" height="1229" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="125" result="effect1_foregroundBlur"/>
</filter>
<clipPath id="clip0">
<rect width="2124" height="1926" fill="white"/>
</clipPath>
</defs>
</svg>
    </body>
</html>`;
};
