import * as React from "react";

interface SavvyCalProps {
  inlineOptions?: SavvyCal.InlineOptions;
}

export default function SavvyCal(props: SavvyCalProps) {
  const { inlineOptions } = props;

  console.log({ inlineOptions });

  React.useEffect(() => {
    window.SavvyCal =
      window.SavvyCal ||
      function() {
        window.SavvyCal.q?.push(arguments);
      };

    window.SavvyCal.q = [];

    const scriptElm = document.createElement("script");
    scriptElm.async = true;
    scriptElm.type = "text/javascript";
    scriptElm.src = "https://embed.savvycal.com/v1/embed.js";

    scriptElm.onload = () => {
      window.SavvyCal("init");

      console.log("init!");

      if (inlineOptions) {
        window.SavvyCal("inline", inlineOptions);
      }
    };

    (document.body || document.head).appendChild(scriptElm);
    // Don't rerun this if user changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
