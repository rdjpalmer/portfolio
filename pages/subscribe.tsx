import Head from "next/head";

import Input from "../src/components/Input/Input";
import Button from "../src/components/Button/Button";

export default function SubscribePage() {
  return (
    <>
      <Head>
        <title>
          Subscribe to Rich's newsletter | Richard Palmer, Creator of Timo
        </title>
        <link
          rel="canonical"
          href="https://rdjpalmer.com/subscribe"
          key="canonical"
        />
      </Head>

      <div className="newsletter-footer">
        <h1>Subscribe to Rich's newsletter</h1>

        <p>
          You'll get each blog post, plus a tonne of thought provoking or useful
          articles, direct to your inbox.
        </p>

        <form
          action="https://rdjpalmer.us20.list-manage.com/subscribe/post?u=0cb4f80ca9869534161bfc334&amp;id=5e488d017e"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          target="_blank"
        >
          <div className="subscribe-form">
            <Input
              label="Name"
              placeholder=""
              type="text"
              name="FNAME"
              required
            />
            <Input name="EMAIL" label="Email" required />
            <Button>Subscribe</Button>
          </div>
          <div
            style={{ position: "absolute", left: "-5000px" }}
            aria-hidden="true"
          >
            <input
              type="text"
              name="b_0cb4f80ca9869534161bfc334_5e488d017e"
              tabIndex={-1}
              value=""
              readOnly
            />
          </div>
          <p className="small">
            <small>
              You can unsubscribe at any time, by hitting the unsubscribe link
              at the bottom of the emails you'll receive. I use Mailchimp, so by
              signing up, I will share your data with them.
            </small>
          </p>
        </form>
      </div>
    </>
  );
}

export const config = { unstable_runtimeJS: false };
