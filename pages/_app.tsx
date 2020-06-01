import { useEffect } from "react";

import "../styles/_app.css";

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

  return (
    <div className="container">
      <Component {...pageProps} />
    </div>
  );
}
